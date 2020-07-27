const models = require('../models');

function createSession(req, res){

    models.User.findOne({where: {email: req.body.email}, limit: 1}).then(user => {

        if(user){

            if(req.userData.email == user.email){
                return res.status(400).json({
                    message: "No users present with the email provided",
                });
            }

            models.Session.findOne({where: {senderId: req.userData.userId, receiverId: user.id}, limit: 1}).then(session => {
                if(session){
                    return res.status(200).json({
                        message: "Session opened",
                        session: session
                    });
                }else{
                    models.Session.findOne({where: {senderId: user.id, receiverId: req.userData.userId}, limit: 1}).then(session => {
                        if(session){
                            return res.status(200).json({
                                message: "Session opened",
                                session: session
                            });
                        }else{
                            const newSession = {
                                senderId: req.userData.userId,
                                receiverId: user.id,
                                status: 1,
                            };

                            models.Session.create(newSession).then(result => {
                                res.status(201).json({
                                    message: 'Session Created Successfully',
                                    session: result
                                });
                            }).catch(error => {
                                console.log(error);
                                res.status(500).json({
                                    message: 'Something Went Wrong',
                                    error: error
                                });
                            });
                        }
                    });
                }
            });
        }else{
            return res.status(404).json({
                message: "User not present on this chat platform."
            });
        }

        
    });
}

module.exports = {
    createSession: createSession
}