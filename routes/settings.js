var express = require('express');
var router = express.Router();

/* GET settings page. */
router.get('/', async function(req, res, next) {
	try {
		return res.render('Settings', { title: 'Innstillinger' });
	} catch (err) {
		console.error('Error fetching settings page:', err);
		next(err);
	}
});

module.exports = router;
