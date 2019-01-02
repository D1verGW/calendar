const express = require('express');
const cors = require('cors');
const app = express();
const User = require('./users');

const port = 3000;

app.use(cors());

app.get('/login', (request, response) => {
    User.loginByUsername({
        username: request.headers.username,
        password: request.headers.password
    }).then( (userData) => {
        response.send({ userData });
    });
});

app.get('/cookie', (request, response) => {
    User.loginByCookie({
        cookie: request.headers.cookie
    }).then( (userData) => {
        response.send({ userData });
    });
});

app.get('/register', (request, response) => {
    let userData = new User({
        username: request.headers.username,
        password: request.headers.password,
        calendarData: request.headers.calendarData
    });
    
    response.send({
        userData
    });
});

app.get('/update', (request, response) => {
    User.update({
        username: request.headers.username,
        calendarData: request.headers.calendardata
    }).then( (data) => {
        response.send(data);
    });
});

app.use((err, request, response, next) => {
    // логирование ошибки, пока просто console.log
    console.log(err);
    response.status(500).send('Something broke!');
});

app.listen(port, (err) => {
    if (err) {
        return console.log('something bad happened', err)
    }
    console.log(`server is listening on ${port}`)
});