var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");
var jsonParser = bodyParser.json();
var vareService = require("../services/vare.service");

let result;
/* GET home page. */
router.get("/", async function (req, res, next) {
  try {
    if (!result) {
      result = await vareService.findAll();
    }
    return res.render("index", { title: "Framside", varer: result });
  } catch (err) {
    console.error("Error fetching fridge data:", err);
    next(err);
  }
});

/* POST add new ware */
router.post("/create", jsonParser, async function (req, res, next) {
  try {
    const postRequest = req.body;
    result = "";
    await vareService.createWare(postRequest);
    return res.redirect("..");
  } catch (err) {
    console.error("Error creating new ware:", err);
    next(err);
  }
});

/* POST Update / edit ware */
router.post("/edit", jsonParser, async function (req, res, next) {
  try {
    const editRequest = req.body;
    await vareService.editWare(editRequest);
    result = "";
    return res.redirect("..");
  } catch (err) {
    console.error("Error updating ware:", err);
    next(err);
  }
});

/* DELETE ware */
router.post("/delete", async function (req, res, next) {
  try {
    let vareId = req.body.id;
    await vareService.deleteWare(vareId);
    result = "";
    return res.redirect(200, "index");
  } catch (err) {
    console.error("Error deleting ware:", err);
    next(err);
  }
});

/* Logo clicked */
router.post("/logoClicked", async function (req, res, next) {
  try {
    result = "";
	return res.status(200).json({status: "success"})
  } catch (err) {
    console.error("Error returning to index:", err);
    next(err);
  }
});

/* POST sort wares & reload/redirect */
let lastSorted;
router.post("/sortert/:sortering", jsonParser, async function (req, res, next) {
  try {
    let sortBy = req.params.sortering;
    let param;
    if (lastSorted == sortBy) {
      lastSorted = "";
      param = -1;
    } else {
      lastSorted = req.params.sortering;
      param = 1;
    }
    result = await vareService.sortBy(sortBy, param);

    return res.redirect(200, "/");
  } catch (err) {
    console.error("Error sorting wares:", err);
    next(err);
  }
});

module.exports = router;
