const router = require("express").Router();
const admin = require("../middleware/admin");
const verify = require("../middleware/verify");
const validate = require("../middleware/validate");
const controller = require("../controllers/users");
const User = require("../models/user");

router.get("/me", verify, controller.me);
router.get("/all", [verify, admin], controller.all);
router.post("/register", validate(User.validate), controller.register);
router.post("/login", validate(User.login), controller.login);

module.exports = router;
