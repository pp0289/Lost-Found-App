const express = require("express");
const router = express.Router();
const controllers = require("../controllers/controller");
const {signUpSchema, loginSchema} = require("../validator/auth-validator");
const validate = require("../middleware/validate-middleware");
const authMiddleware = require("../middleware/auth-middleware");



router.route("/").post(controllers.home);

router.route("/register").post(validate(signUpSchema), controllers.register);
router.route("/login").post(validate(loginSchema),controllers.login);

router.route("/user").get(authMiddleware, controllers.user);

router.route("/delete/:id").delete(authMiddleware, controllers.deleteItemByID);

module.exports = router;