var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
const mongoose = require('mongoose');
var VareService = require('../services/VareService');

// Mongodb
const vareSchema = new mongoose.Schema({
	name: String, 
	type: String,
	weight: Number,
	date: String,
	fridgeNumber: Number,
	comment: String
});

const Vare = mongoose.model('Vare', vareSchema);
var vareService = new VareService(vareSchema);

let result;
/* GET home page. */
router.get('/', async function(req, res, next) {
	if(!result) {
		result = await vareService.findAll();
	}
	res.render('index', { title: 'Framside', varer: result });
});


/* POST add new ware */
router.post('/create', jsonParser, async function(req, res, next) {
	const postRequest = req.body;
	result = '';
	vareService.createWare(postRequest);
	res.redirect('..');
});

/* POST Update / edit ware */
router.post('/edit', jsonParser, async function(req, res, next) {
	const editRequest = req.body;
	await vareService.editWare(editRequest);
	result= '';
	res.redirect('..');
});

/* DELETE ware */
router.post('/delete', async function(req, res, next) {
	let vareId = req.body.id;
	await vareService.deleteWare(vareId);
	result = '';
	res.redirect(200, 'index');
});

/* Logo clicked */
router.post('/logoClicked', async function(req, res, next) {
	result = '';
	res.redirect(200, 'index');
});

/* POST sort wares & reload/redirect */
let lastSorted;
router.post('/sortert/:sortering', jsonParser, async function(req, res, next) {
	
	let sortBy = req.params.sortering;
	let param;
	if(lastSorted == sortBy) {
		lastSorted = '';
		param = -1;
	} else {
		lastSorted = req.params.sortering;
		param = 1;
	}
	result = await vareService.sortBy(sortBy, param);

	res.redirect(200, '/');
});



module.exports = router;
