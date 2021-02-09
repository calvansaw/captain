require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const Log = require('./models/logs');
const mongoURI = process.env.DB_URI || 'mongodb://localhost27017/captain';

/////////// connect to mongoose /////////
mongoose.connect(mongoURI, {
	useNewUrlParser: true,
});
mongoose.connection.once('open', () => {
	console.log('connected to mongo');
});

//////////// middleware /////////////
app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: false }));

/////////////////////////Route//////////////////

//////Index//////
app.get('/logs', (req, res) => {
	Log.find({}, (err, log) => {
		res.render('index.ejs', {
			allLogs: log,
		});
	});
});

//////New//////
app.get('/logs/new', (req, res) => {
	res.render('new.ejs');
});

//////Show//////
app.get('/logs/:id', (req, res) => {
	Log.findById(req.params.id, (err, log) => {
		res.render('show.ejs', {
			logObj: log,
		});
	});
});

//////Create//////
app.post('/logs', (req, res) => {
	if (req.body.shipIsBroken === 'on') req.body.shipIsBroken = true;
	else false;
	// res.send(req.body);
	Log.create(req.body, (err, log) => {
		console.log(log);
		res.redirect('/logs');
	});
});

///////////////////////////////////////////////
app.listen(port, () => {
	console.log('Listening at port', port);
});
