const shortid = require('shortid');
const db = require('../db');
let user;
module.exports.home = (req, res) => {
	user = db.get('users').find(
		{username: req.signedCookies.sessionID}
	).value();
	res.render('./app/index', {
		todo: user.tasks.filter(item => item.status == false),
		done: user.tasks.filter(item => item.status == true)
	});
} 

module.exports.postCreate = (req, res) => {
	let body = {
		id: shortid.generate(),
		content: req.body.task,
		status: false
	}
	user.tasks.push(body)
	db.get('users').write();
	res.redirect('/task/todo');
}

module.exports.delete = (req, res) => {
	let index = 0;
	for(let i of user.tasks) {
		if(i.id === req.params.id)
			break;
		else
			index++;
	}
	if(index === 0 && !user.tasks[0] === req.params.id) {
		console.log('khong tim thay');
	}
	else {
		user.tasks.splice(index, 1)
		db.get('users').write();
		res.redirect('/task/todo');
	}
}

module.exports.changeStatus = (req, res) => {
	let element = user.tasks.find(item => item.id === req.params.id);
	element.status = element.status == false ? true : false;
	db.get('todo').write();
	res.redirect('/task/todo');
}

module.exports.editTask = (req, res) => {
	let element = user.tasks.find(item => item.id === req.params.id);
	element.content = req.query.content;
	db.get('todo').write();
	res.redirect('/task/todo');
}

module.exports.getTask = (req, res) => {
	let element = req.body;
	return element;
}