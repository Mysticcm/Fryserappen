var express = require('express');
var router = express.Router();
require('dotenv').config();
const { loggedIn } = require('./authmiddlewares');
const logoCC = require('../controllers/logoClick.controller');
const userService = require("../services/user.service");

const baseUrl = process.env.BASE_URL;
const colorThemes = ["primary", "secondary", "success", "danger", "warning", "info", "dark"]

/* GET settings page. */
router.get('/', loggedIn, async function(req, res, next) {
	try {
		return res.render('Settings', { title: 'Innstillinger', theme: req.user?.theme ?? "primary", colorThemes, baseUrl });
	} catch (err) {
		console.error('Error fetching settings page:', err);
		next(err);
	}
});
/* Change theme */
router.post('/theme', loggedIn, (req, res, next) => {
	try {
		// const themeId = colorThemes.indexOf();
		userService.setUserTheme(req.user.id, req.body.theme);
		req.user.theme = req.body.theme;
		return res.status(200).json({status: "success"});
	} catch (err) {
		console.error('Error fetching settings page:', err);
		next(err);
	}
})

/* Logo clicked */
router.post("/logoClicked", loggedIn, logoCC.logoClicked);

module.exports = router;
