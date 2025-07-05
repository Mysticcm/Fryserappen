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
// const Varer = mongoose.model('Vare', vareSchema);


/* GET home page. */
router.get('/', async function(req, res, next) {

  const result = await vareService.findAll();
    // console.log("Varer: ", result)

  res.render('index', { title: 'Framside', varer: result });
});

router.post('/', jsonParser, async function(req, res, next) {

  const postRequest = req.body;
  vareService.createWare(postRequest)

  res.status(200).redirect('/')  

})

module.exports = router;
