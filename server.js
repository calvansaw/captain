require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const logController = require('./controllers/captainLog');
const mongoURI = process.env.DB_URI || 'mongodb://localhost:27017/captain';

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
app.use('/logs', logController);

////////////////////////Route//////////////////
///    ?? shifted to controllers
///////////////////////////////////////////////

///////////////////////////////////////////////
app.listen(port, () => {
	console.log('Listening at port', port);
});
