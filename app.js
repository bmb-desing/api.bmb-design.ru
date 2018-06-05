const express = require('express');
const routes = require('./app/routes');
const seeder = require('./database/seeder');
const bodyParser = require('body-parser');
const app = express();
const config = require('./config');

app.use(config.passport.initialize());

config.database.sequelize.sync({force:  process.env.NODE_ENV == 'dev' ? true : false}).then(function() {
	seeder(config.database)
  console.log('База данных успешно обновлена')
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('./public'));
app.use(function (req, res, next) {
	res.header('Access-Control-Allow-Credentials', true);
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
	res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
	next();
});

app.use('/', routes);

app.listen(process.env.PORT, () => {
	console.log('server running on port ' + process.env.PORT);
});

