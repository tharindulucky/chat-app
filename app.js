const express = require('express');
const bodyParser = require('body-parser');

const userRoutes = require('./routes/users');
const sessionRoutes = require('./routes/sessions');
const messageRoutes = require('./routes/messages');

const app = express();

//Setting Headers for CORS
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    if(req.method === 'OPTIONS'){
        res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
        return res.status(200).json({});
    }
    next();
});

//middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/users', userRoutes);
app.use('/sessions', sessionRoutes);
app.use('/messages', messageRoutes);


/*
Error Handling
 */
app.use((req, response, next) => {
    const error = new Error('Not found!');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500).json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;