const express = require('express');

const controllers = require('../../controllers/task.controller');

const router = express.Router();

router.get('/todo', controllers.home);

router.get('/:id', controllers.getTask);

router.post('/create', controllers.postCreate);

router.get('/status/:id', controllers.changeStatus);

router.get('/delete/:id', controllers.delete);

router.get('/edit/:id', controllers.editTask);

module.exports = router;
