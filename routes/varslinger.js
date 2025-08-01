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
    const today = new Date().toISOString().slice(0, 10);
    let oneWeekFromNow = new Date();
    oneWeekFromNow.setDate(oneWeekFromNow.getDate() + 7);
    let oneWeekSliced = oneWeekFromNow.toISOString().slice(0, 10);

    try {
        const expired = await vareService.findByDate({ $lt: today });
        const soonExpired = await vareService.findByDate({ 
            $gte: today, 
            $lte: oneWeekSliced 
            });
        res.render('Varslinger', { title: 'Varslinger', expired, soonExpired: soonExpired })
    } catch (err) {
            console.error('Error finding items:', err);
            throw new Error('Failed to fetch data from db');
        }
});



module.exports = router;