const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const routes = require('./controllers');
const sequelize = require('./config/connection');
const helpers = require('./utils/helpers');

const app = express();
const PORT = process.env.PORT || 3001;

const hbs = exphbs.create({ helpers });

const sess = {
	secret: 'superdupersecret',
	cookie: { maxAge: 1200000 },
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

const http = require('http');
const server = http.createServer(app);
const io = require('socket.io')(server);

io.on('connection', (socket) => {
	socket.emit('initialize');
	socket.on('inputtedMessage', (msg) => {
		io.emit('sentMessage', msg);
	});
	console.log('a user connected');
});

sequelize.sync({ force: false }).then(() => {
	server.listen(PORT, () => {
		console.log('listening on port');
	});
});
