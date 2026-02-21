var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");
var jsonParser = bodyParser.json();
var vareService = require("../services/vare.service");
const { loggedIn } = require('./authmiddlewares');
const logoCC = require('../controllers/logoClick.controller');

router.get("/", loggedIn, jsonParser, async function (req, res, next) {
  try {
    const fridgeCount = await vareService.different(req.user.id, "fridgeNumber");
    // Wait for all fridge queries to resolve
    const fridgeContainers = await Promise.all(
      fridgeCount.map((fridge) => vareService.findByFridge(req.user.id, fridge)),
    );

    return res.render("fryser", { title: "Fryseroversikt", fridgeContainers, theme: req.user?.theme ?? "primary" });
  } catch (err) {
    console.error("Error fetching fridge data:", err);
    next(err);
  }
});

/* POST Update / edit ware */
router.post("/edit", loggedIn, jsonParser, async function (req, res, next) {
  try {
    // const editRequest = req.body;
    await vareService.editWare(req.body);
    req.user.varer = null;
    return res.redirect('../fryser');
  } catch (err) {
    console.error("Error updating ware:", err);
    next(err);
  }
});

/* Logo clicked */
router.post("/logoClicked", loggedIn, logoCC.logoClicked);


module.exports = router;
