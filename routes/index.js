var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");
var jsonParser = bodyParser.json();
var vareService = require("../services/vare.service");
const { loggedIn } = require('./authmiddlewares');
const logoCC = require('../controllers/logoClick.controller');


/* GET home page. */
router.get("/", loggedIn, async function (req, res, next) {
  try {
    if (!req.user?.varer || req.user.varer.length < 1) {
      req.user.varer = await vareService.findAll(req.user.id);
    }
    
    return res.render("index", { title: "Framside", varer: req.user.varer, theme: req.user?.theme ?? "primary" });
  } catch (err) {
    console.error("Error fetching fridge data:", err);
    next(err);
  }
});

/* POST add new ware */
router.post("/create", loggedIn, jsonParser, async function (req, res, next) {
  try {
    const postRequest = req.body;
    req.user.varer = null;
    await vareService.createWare(req.user.id, postRequest);
    return res.redirect("..");
  } catch (err) {
    console.error("Error creating new ware:", err);
    next(err);
  }
});

/* POST Update / edit ware */
router.post("/edit", loggedIn, jsonParser, async function (req, res, next) {
  try {
    const editRequest = req.body;
    await vareService.editWare(editRequest);
    req.user.varer = null;
    return res.redirect("..");
  } catch (err) {
    console.error("Error updating ware:", err);
    next(err);
  }
});

/* DELETE ware */
router.post("/delete", loggedIn, async function (req, res, next) {
  try {
    let vareId = req.body.id;
    await vareService.deleteWare(req.user.id, vareId);
    req.user.varer = null;
    return res.redirect(200, "index");
  } catch (err) {
    console.error("Error deleting ware:", err);
    next(err);
  }
});

/* Logo clicked */
router.post("/logoClicked", loggedIn, logoCC.logoClicked);

/* POST sort wares & reload/redirect */
router.post("/sortert/:sortering", loggedIn, jsonParser, async function (req, res, next) {
  try {
    req.user.sortBy = req.params.sortering;
    req.user.param;
    if (req.user.lastSorted == req.user.sortBy) {
      req.user.lastSorted = "";
      req.user.param = -1;
    } else {
      req.user.lastSorted = req.params.sortering;
      req.user.param = 1;
    }
    req.user.varer = await vareService.sortBy(req.user.id, req.user.sortBy, req.user.param);

    return res.redirect(200, "/");
  } catch (err) {
    console.error("Error sorting wares:", err);
    next(err);
  }
});

module.exports = router;
