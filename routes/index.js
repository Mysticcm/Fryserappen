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

/* // 🧠 Add virtual for formatted date
vareSchema.virtual('formattedExpiryDate').get(function () {
  return this.date
    ? this.date.toISOString().slice(0, 10) // yyyy-mm-dd
    : null;
});

// ⚙️ Make sure virtuals are included when converting to JSON
vareSchema.set('toJSON', { virtuals: true });
vareSchema.set('toObject', { virtuals: true }); */


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

/* Logo clicked */
router.post('/logoClicked', async function(req, res, next) {
  result = '';
  res.redirect(200, 'index');
});

/* GET sort wares */
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
