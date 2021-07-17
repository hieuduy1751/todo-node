const md5 = require('md5');
const db = require('../db');
module.exports.regexLogin = (req, res, next) => {
    let username = req.body.username;
    let password = req.body.password;
    let usernameError = '';
    let passwordError = '';

    if(!username) 
        usernameError = 'Username required';
    else if (!username.match(/^[a-zA-Z0-9]+$/))
        usernameError = 'Username contains letters and digits';
    else 
        usernameError = '';
    
    if(!password) 
        passwordError = 'Password required';
    else if(!password.match(/^[a-zA-Z0-9]+$/)) 
        passwordError = 'Password contains letters and digits';
    else
        passwordError = '';
    
    if(!usernameError && !passwordError) {
        res.locals.username = username;
        res.locals.password = md5(password);
        next();
    }
    else {
        res.render('./auth/login', {
            username,
            usernameError,
            passwordError        
        })
    }
}

module.exports.regexRegister = (req, res, next) => {
    let username = req.body.username;
    let password = req.body.password;
    let retypePassword = req.body.retypePassword;
    let usernameError = '';
    let passwordError = '';
    let retypePasswordError = '';

    if(!username) 
        usernameError = 'Username required';
    else if (!username.match(/^[a-zA-Z0-9]{6,}$/))
        usernameError = 'Username contains letters and digits, at least 6 character';
    else
        usernameError = '';
    
    if(!password) 
        passwordError = 'Password required';
    else if(!password.match(/^[a-zA-Z0-9]{6,}$/)) 
        passwordError = 'Password contains letters and digits, at least 6 character';
    else
        passwordError = '';

    if(password != retypePassword)
        retypePasswordError = 'Password doesn\'t match';
    else
        retypePasswordError = '';
    
    if(!usernameError && !passwordError && !retypePasswordError) {
        res.locals.username = username;
        res.locals.password = md5(password);
        next();
    }
    else {
        res.render('./auth/register', {
            username,
            password,
            retypePassword,
            usernameError,
            passwordError,
            retypePasswordError
        })
    }    
}

module.exports.checkCookie = (req, res, next) => {
    let user = db.get('users').find({username: req.cookies.username}).value();
    if(!user || user.token != req.cookies.sessionID)
        res.redirect('/auth/login');
    else
        next();
}