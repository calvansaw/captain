const express = require('express');
const router = express.Router();
const Log = require('../models/logs');

/////////////////////////Route//////////////////

//////Index//////
router.get('/', (req, res) => {
	Log.find({}, (err, log) => {
		res.render('index.ejs', {
			allLogs: log,
		});
	});
});

//////New//////
router.get('/new', (req, res) => {
	res.render('new.ejs');
});

//////Show//////
router.get('/:id', (req, res) => {
	Log.findById(req.params.id, (err, log) => {
		res.render('show.ejs', {
			logObj: log,
		});
	});
});

//////Create//////
router.post('/', (req, res) => {
	if (req.body.shipIsBroken === 'on') req.body.shipIsBroken = true;
	else false;
	// res.send(req.body);
	Log.create(req.body, (err, log) => {
		console.log(log);
		res.redirect('/logs/' + log._id);
	});
});

//////Delete//////
router.delete('/:id', (req, res) => {
	Log.findByIdAndRemove(req.params.id, (err, log) => {
		res.redirect('/logs');
	});
});

//////Edit//////
router.get('/:id/edit', (req, res) => {
	Log.findById(req.params.id, (err, log) => {
		res.render('edit.ejs', {
			logObj: log,
		});
	});
});

//////Update//////
router.put('/:id', (req, res) => {
	if (req.body.shipIsBroken === 'on') req.body.shipIsBroken = true;
	else req.body.shipIsBroken = false;
	Log.findByIdAndUpdate(
		req.params.id,
		req.body,
		{ new: true },
		(err, log) => {
			res.redirect('/logs');
		}
	);
});

module.exports = router;
