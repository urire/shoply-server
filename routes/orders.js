const router = require("express").Router();
const admin = require("../middleware/admin");
const verify = require("../middleware/verify");
const objectId = require("../middleware/objectId");
const validate = require("../middleware/validate");
const controller = require("../controllers/orders");
const Order = require("../models/order");

router.get("/", [verify, admin], controller.findAll);
router.get("/me", verify, controller.findById);
router.post("/", validate(Order.validate), controller.create);
router.delete("/:id", [verify, admin, objectId], controller.delete);

module.exports = router;
