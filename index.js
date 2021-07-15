const express = require('express');
const bodyParser = require('body-parser');

const userRouter = require('./routes/api/task.route');
const controllers = require('./controllers/task.controller');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

app.set('view engine', 'pug');
app.set('views', './views');

app.get('/', controllers.home);

app.use('/api/task', userRouter);

app.listen(port, () => {
	console.log('Server listening on port', port);
});
