const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
//UNCOMMENT when adding authorization
// const SequelizeStore = require('connect-session-sequelize')(session.Store);

//UNCOMMENT when routes are being added
// const routes = require('./controllers');
const sequelize = require('./config/connection');
const helpers = require('./utils/helpers');

const app = express();
const PORT = process.env.PORT || 3001;

const hbs = exphbs.create({ helpers });

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

//UNCOMMENT when routes are being added
// app.use(routes);

sequelize.sync({ force: false }).then(() => {
	app.listen(PORT, () => console.log('Now listening'));
});