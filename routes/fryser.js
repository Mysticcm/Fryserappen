var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");
var jsonParser = bodyParser.json();
var vareService = require("../services/vare.service");

router.get("/", jsonParser, async function (req, res, next) {
  try {
    const fridgeCount = await vareService.different("fridgeNumber");
    // Wait for all fridge queries to resolve
    const fridgeContainers = await Promise.all(
      fridgeCount.map((fridge) => vareService.findByFridge(fridge)),
    );

    return res.render("fryser", { title: "Fryseroversikt", fridgeContainers });
  } catch (err) {
    console.error("Error fetching fridge data:", err);
    next(err);
  }
});

/* POST Update / edit ware */
router.post("/edit", jsonParser, async function (req, res, next) {
  try {
    const editRequest = req.body;
    await vareService.editWare(editRequest);
    result = "";
    return res.redirect('../fryser');
  } catch (err) {
    console.error("Error updating ware:", err);
    next(err);
  }
});

module.exports = router;
