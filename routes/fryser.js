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
}) 

var vareService = new VareService(vareSchema);

router.get('/', async function(req, res, next) {

  res.render('fryser', { title: 'Fryseroversikt' });
});

module.exports = router; 