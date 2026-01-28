var express = require("express");
var router = express.Router();
var vareService = require("../services/vare.service");

router.get("/", async function (req, res, next) {
	try {
		const today = new Date().toISOString().slice(0, 10);
		let oneWeekFromNow = new Date();
		oneWeekFromNow.setDate(oneWeekFromNow.getDate() + 7);
		let oneWeekSliced = oneWeekFromNow.toISOString().slice(0, 10);

		const expired = await vareService.findByDate({ $lt: today });
		const soonExpired = await vareService.findByDate({
			$gte: today,
			$lte: oneWeekSliced,
		});
		return res.render("Varslinger", {
			title: "Varslinger",
			expired,
			soonExpired: soonExpired,
		});
	} catch (err) {
		console.error("Error finding items:", err);
		throw new Error("Failed to fetch data from db");
	}
});

module.exports = router;
