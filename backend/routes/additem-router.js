const express = require("express");
const router = express.Router();
const addItemForm = require("../controllers/additem-controller");


router.route("/additem").post(addItemForm);

module.exports = router;