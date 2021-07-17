const db = require('../db');
const md5 = require('md5');
const shortid = require('shortid');

module.exports.login = (req, res) => {
    res.render('./auth/login');
}

module.exports.register = (req, res) => {
    res.render('./auth/register');
}

module.exports.postLogin = (req, res) => {
    let user = db.get('users').find({username: res.locals.username}).value();
    if(user && user.password == res.locals.password) {
        user.token = md5(user.userID);
        db.write();
        res.cookie('username', user.username);
        res.cookie('sessionID', user.token);
        res.redirect('/task/todo')
    }
    else if(user) {
        res.render('./auth/login', {
            username: res.locals.username,
            passwordError: 'Wrong password'
        })        
    }
    else {
        res.render('./auth/login', {
            username: res.locals.username,
            usernameError: 'Username doesn\'t exist',
        })
    }
}

module.exports.postRegister = (req, res) => {
    let user = db.get('users').find({username: res.locals.username}).value();
    if(user) {
        res.render('./auth/register', {
            username: res.locals.username,
            passwordError: 'Username is already taken'
        })        
    }
    else {
        db.get('users')
            .push({
                userID: shortid.generate(),
                username: res.locals.username,
                password: res.locals.password
            })
            .write();
        res.redirect('/auth/login');
    }
}