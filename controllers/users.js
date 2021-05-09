const _ = require("lodash");
const User = require("../models/user");

module.exports.me = async (req, res) => {
	const user = await User.findById(res.locals.jwt._id).select("-password -__v");

	res.send(user);
};

module.exports.all = async (req, res) => {
	const users = await User.find().select("-password");

	res.send(users);
};

module.exports.register = async (req, res) => {
	const { email, name, password, isAdmin } = req.body;

	let user = await User.findOne({ email });
	if (user) return res.status(400).send("Already registered");

	user = new User({ email, name, password, isAdmin });

	await user.hashPassword();

	await user.save();

	res.send({
		token: user.authToken(),
		user: _.pick(user, ["_id", "name", "email", "isAdmin"])
	});
};

module.exports.login = async (req, res) => {
	const { email, password } = req.body;

	const user = await User.findOne({ email });
	if (!user) return res.status(400).send("Invalid email");

	const validPassword = await user.checkPassword(password);
	if (!validPassword) return res.status(400).send("Invalid password");

	res.send(user.authToken());
};
