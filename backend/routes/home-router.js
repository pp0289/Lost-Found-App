const express = require("express");
const cards = require("../controllers/card-controller");
const router = express.Router();


router.route("/").get(cards);

module.exports = router;