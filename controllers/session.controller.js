const models = require('../models');
var Sequelize = require('sequelize');
var Op = Sequelize.Op;
const sessionValidator = require('../validators/sessions');

function createSession(req, res){

    const errors = sessionValidator.sessionValidationFormatter(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    models.User.findOne({where: {email: req.body.email}, limit: 1}).then(user => {

        if(user && user.email != req.userData.email){

            models.Session.findOne({
                include: [{
                    model: models.SessionUser, 
                    as: 'allparticipants',
                    where: {
                        userId: user.id
                    },
                    include: [{
                        model: models.User, 
                        as: 'userData',
                        attributes: ['id','name','email'],
                    }]
                }],
                where: {
                    authorId: req.userData.userId
                }
            }).then(session => {
                if(session){
                    return res.status(200).json({
                        message: "Session opened",
                        session: session
                    });
                }else{

                    const newSession = {
                        authorId: req.userData.userId,
                        status: 1,
                    };

                    models.Session.create(newSession).then(newSession_result => {
                        
                        const participants = [
                            {userId:req.userData.userId,sessionId: newSession_result.id},
                            {userId:user.id,sessionId: newSession_result.id}
                        ];

                        models.SessionUser.bulkCreate(participants).then(participants_result => {
                            return res.status(201).json({
                                message: "Session created",
                                session: newSession_result
                            });
                        }).catch(error => {
                            console.log(error);
                            res.status(500).json({
                                message: 'Something Went Wrong',
                                error: error
                            });
                        });
                    }).catch(error => {
                        console.log(error);
                        res.status(500).json({
                            message: 'Something Went Wrong',
                            error: error
                        });
                    });
                }
            }).catch(error => {
                console.log(error);
                return res.status(500).json({
                    message: "Something went wrong!"
                });
            });
        }else{
            return res.status(404).json({
                message: "User not present on this chat platform."
            });
        }
    });
}


function getMySessions(req, res){
    models.Session.findAll({
        include: [
            {
                model: models.SessionUser, 
                as: 'me',
                include: [{
                    model: models.User, 
                    as: 'userData',
                    attributes: ['id','name','email'],
                }],
                where:{userId: req.userData.userId},
            },
            {
                model: models.SessionUser, 
                as: 'allparticipants',
                include: [{
                    model: models.User, 
                    as: 'userData',
                    attributes: ['id','name','email'],
                }]
            }
    ]
    }).then(sessions => {

        

        const sessionArr = sessions.map(session => {
            let contact = null;
            session.allparticipants.map(participant => {
                if(participant.userId != req.userData.userId){
                    contact = participant;
                }
            });
            return {
                id: session.id,
                authorId:session.authorId,
                status: session.status,
                contact: contact
            }
        });

        res.status(200).json({
            count: sessions.length,
            sessions: sessionArr
        });
    }).catch(error => {
        console.log(error);
        return res.status(500).json({
            message: "Something went wrong",
            error: error
        });
    });
}



function getSession(req, res){

    const id = req.params.id;

    models.Session.findOne({
        include: [{
            model: models.SessionUser, 
            as: 'allparticipants',
            include: [{
                model: models.User, 
                as: 'userData',
                attributes: ['id','name','email'],
            }]
        },
        {
            model: models.Message, 
            as: 'messages'
        }],
        where:{id:id}
    }).then(session => {

        var sessionAuthor = session.allparticipants.find( function( participant ) { 
            return participant.userId === req.userData.userId;
        });

        if (sessionAuthor == null){
            return res.status(404).json({
                message: "Session not found"
            });
        }

        let contact = null;
        session.allparticipants.map(participant => {
            if(participant.userId != req.userData.userId){
                contact = participant;
            }
        });

        let messagesArr = [];
        session.messages.forEach(message => {
            messagesArr.push({
                id:message.id,
                content:message.content,
                sessionId:message.sessionId,
                authorId:message.authorId,
                party: (message.authorId == req.userData.userId ? 'self' : 'other'),
                status:message.status,
                createdAt:message.createdAt,
                updatedAt:message.updatedAt,
            }); 
        });

        return res.status(200).json({
            message: "Session opened",
            data: {
                id: session.id,
                authorId: session.authorId,
                status: session.status,
                createdAt: session.createdAt,
                updatedAt: session.updatedAt,
                contact: contact,
                messages: messagesArr
            }
        });
    }).catch(error => {
        console.log(error);
        return res.status(500).json({
            message: "Something went wrong",
            error: error
        });
    });
}



module.exports = {
    createSession: createSession,
    getMySessions: getMySessions,
    getSession: getSession
}