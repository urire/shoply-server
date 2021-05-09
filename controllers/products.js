const _ = require("lodash");
const Product = require("../models/product");

module.exports.findAll = async (req, res) => {
	const products = await Product.find({}).select("-__v");

	res.send(products);
};

module.exports.findById = async (req, res) => {
	const product = await Product.findById(req.params.id).select("-__v -_id");
	if (!product) return res.status(404).send("Product with given id was not found");

	res.send(product);
};

module.exports.create = async (req, res) => {
	const product = new Product(req.body);

	await product.save();

	return res.send(_.pick(product, ["availableSizes", "image", "title", "description", "price"]));
};

module.exports.update = async (req, res) => {
	const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true }).select("-__v -_id");
	if (!product) return res.status(404).send("Product with given id was not found");

	res.send(product);
};

module.exports.delete = async (req, res) => {
	const product = await Product.findByIdAndRemove(req.params.id).select("-__v");
	if (!product) return res.status(404).send("Product with given id was not found");

	res.send(product);
};
