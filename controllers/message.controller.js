const models = require('../models');

function sendMessage(req, res){
    models.Session.findOne({where: {id: req.body.sessionId}, limit: 1}).then(session => {
        if(session){
            const newMessage = {
                content: req.body.content,
                sessionId: session.id,
                authorId: req.userData.userId,
                status: "unread"
            }

            models.Message.create(newMessage).then(newMessage_result => {
                return res.status(201).json({
                    message: "Message sent",
                    data: newMessage_result
                });
            }).catch(error => {
                return res.status(500).json({
                    message: "Message cannot be sent",
                    error: error
                });
            });
        }
    });
}

module.exports = {
    sendMessage: sendMessage
}