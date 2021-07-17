const shortid = require('shortid');
const db = require('../db');

module.exports.home = (req, res) => {
	res.render('./app/index', {
		todo: db.get('todo').value().filter(item => item.status == false).reverse(),
		done: db.get('todo').value().filter(item => item.status == true)
	});
} 

module.exports.postCreate = (req, res) => {
	let body = {
		id: shortid.generate(),
		content: req.body.task,
		status: false
	}
	db.get('todo')
		.push(body)
		.write();
	res.redirect('/task/todo');
}

module.exports.delete = (req, res) => {
	let index = 0;
	for(let i of db.get('todo').value()) {
		if(i.id === req.params.id)
			break;
		else
			index++;
	}
	if(index === 0 && !db.get('todo').value()[0] === req.params.id) {
		console.log('khong tim thay');
	}
	else {
		db.get('todo')
			.splice(index, 1)
			.write();
		res.redirect('/task/todo');
	}
}

module.exports.changeStatus = (req, res) => {
	let element = db.get('todo').find(item => item.id === req.params.id).value();
	element.status = element.status == false ? true : false;
	db.get('todo').write();
	res.redirect('/task/todo');
}

module.exports.editTask = (req, res) => {
	let element = db.get('todo').find(item => item.id === req.params.id).value();
	element.content = req.query.content;
	db.get('todo').write();
	res.redirect('/task/todo');
}

module.exports.getTask = (req, res) => {
	let element = req.body;
	return element;
}