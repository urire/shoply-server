const _ = require("lodash");
const Order = require("../models/order");
const User = require("../models/user");

module.exports.findAll = async (req, res) => {
	const orders = await Order.find({}).select("-__v");

	res.send(orders);
};

module.exports.findById = async (req, res) => {
	const user = await User.findOne({ _id: res.locals.jwt._id });
	if (!user) return res.status(404).send("User with given id was not found");

	const orders = await Order.find({ email: user.email }).select("-__v");

	res.send(orders);
};

module.exports.create = async (req, res) => {
	const order = new Order(req.body);

	await order.save();

	res.send(_.pick(order, ["_id", "email", "name", "address", "total", "cart"]));
};

module.exports.delete = async (req, res) => {
	const order = await Order.findByIdAndRemove(req.params.id).select("-__v");
	if (!order) return res.status(404).send("Order with given id was not found");

	res.send(order);
};
