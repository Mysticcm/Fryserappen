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

router.get('/', jsonParser, async function(req, res, next) {
    try {
        const fridgeCount = await vareService.different('fridgeNumber');

        // Wait for all fridge queries to resolve
        const fridgeContainers = await Promise.all(
            fridgeCount.map(fridge => vareService.findByFridge(fridge))
        );

        res.render('fryser', { title: 'Fryseroversikt', fridgeContainers });
    } catch (err) {
        console.error('Error fetching fridge data:', err);
        next(err);
    }
});


module.exports = router; 