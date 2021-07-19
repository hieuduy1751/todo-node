const express = require('express');

const controllers = require('../../controllers/auth.controller');
const middleware = require('../../middleware/auth.middleware');

const router = express.Router();

router.get('/login', controllers.login);

router.get('/register', controllers.register);

router.post('/login', middleware.regexLogin, controllers.postLogin);

router.post('/register', middleware.regexRegister, controllers.postRegister);

router.get('/logout', controllers.logout);

module.exports = router;
