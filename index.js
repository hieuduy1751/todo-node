const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const userRouter = require('./routes/api/task.route');
const authRouter = require('./routes/auth/auth.route');

const authMiddleware = require('./middleware/auth.middleware');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser('hieuduy1751'));
app.use(express.static('public'));

app.set('view engine', 'pug');
app.set('views', './views');

app.use('/auth', authRouter);
app.use('/task', authMiddleware.checkCookie, userRouter);

app.get('/', authMiddleware.checkCookie, (req,res) => {
	res.render('./home');
})

app.listen(port, () => {
	console.log('Server listening on port', port);
});
