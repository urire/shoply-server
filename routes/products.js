const router = require("express").Router();
const admin = require("../middleware/admin");
const verify = require("../middleware/verify");
const objectId = require("../middleware/objectId");
const validate = require("../middleware/validate");
const controller = require("../controllers/products");
const Product = require("../models/product");

router.get("/", controller.findAll);
router.get("/:id", objectId, controller.findById);
router.post("/", [verify, admin, validate(Product.validate)], controller.create);
router.put("/:id", [verify, admin, objectId], controller.update);
router.delete("/:id", [verify, admin, objectId], controller.delete);

module.exports = router;
