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
  res.redirect('/');
});
/* Logo clicked */
router.post('/logoClicked', async function(req, res, next) {
  result = '';
  res.redirect(200, '/');
});
/* GET sort wares */
let lastSorted;
router.post('/sortert/:sortering', jsonParser, async function(req, res, next) {
  let sortBy = req.params.sortering;
  let param;
  if(lastSorted == sortBy && sortBy == 'navn') {
    lastSorted = '';
    param = -1;
    console.log('LAST SORTED')
  } else if(sortBy == 'navn') {
    lastSorted = req.params.sortering;
    param = 1;
    console.log('LAST SORTED 2')
  }
  switch(sortBy) {
    case 'navn': 
      result = await vareService.sortByName(param);
      break;
    case 'type': 
    console.log(req.params.type)
      result = await vareService.findByType(req.body.type);
      break;
    case 'dato': 
      break;
    case 'fryser':

      break;  
  }
  res.redirect(200, '/');
});

module.exports = router;
