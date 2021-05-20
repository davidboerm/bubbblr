const path = require('path');
const PORT = process.env.PORT || 3001;
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io')(server);
app.use((req, res, next) => {
	res.locals['socketio'] = io;
	next();
});

const session = require('express-session');
const exphbs = require('express-handlebars');
const sequelize = require('./config/connection');

const routes = require('./controllers');

const SequelizeStore = require('connect-session-sequelize')(session.Store);

const helpers = require('./utils/helpers');

const hbs = exphbs.create({ helpers });

const sess = {
	secret: 'superdupersecret',
	cookie: { maxAge: 600000 },
	resave: false,
	saveUninitialized: true,
	store: new SequelizeStore({
		db: sequelize
	})
};

app.use(session(sess));
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(routes);

io.on('connection', (socket) => {
	socket.emit('initialize');
	socket.on('inputtedMessage', (msg) => {
		console.log(msg);
		io.emit('sentMessage', msg);
	});
	console.log('a user connected');
});

sequelize.sync({ force: false }).then(() => {
	server.listen(PORT, () => {
		console.log('listening on port');
	});
});
