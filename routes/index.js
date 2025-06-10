var express = require('express');
var router = express.Router();
const mongoClient = require('mongodb').MongoClient;
const url = 'mongodb://127.0.0.1:27017';
const dbname = 'fryserdb';

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Framside' });
});

mongoClient.connect(url, {}, (error, client) => {
if(error)
    console.log("Cannot connect");
  console.log("Connection OK");
  const db = client.db(dbname);

  db.collection('Fryser').find({
    Name: "Fisk"
  }).toArray((error, result) => {
    console.log(result);
  });

  db.collection.insertOne({Name: "Kjøttdeig", Weight: "400", Date: "17.09.2025", FridgeNumber: "1"})
});

module.exports = router;
