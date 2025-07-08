var express = require('express');
var router = express.Router();

/* GET settings page. */
router.get('/', async function(req, res, next) {
  res.render('Settings', { title: 'Innstillinger' });
});

module.exports = router;
