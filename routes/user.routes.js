const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const { loggedIn } = require('./authmiddlewares');


router.get("/", loggedIn, userController.getUsers);

router.post("/", loggedIn, userController.createUser);

module.exports = router;
