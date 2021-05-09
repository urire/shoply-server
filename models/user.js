const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const config = require("../services/config");
const validator = require("../services/validator");

const schema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		minlength: 5,
		maxlength: 50
	},
	email: {
		type: String,
		unique: true,
		required: true,
		minlength: 5,
		maxlength: 255
	},
	password: {
		type: String,
		required: true,
		minlength: 5,
		maxlength: 1024
	},
	isAdmin: {
		type: Boolean,
		default: false
	}
});

schema.statics.validate = user => {
	const schema = {
		name: validator.string().min(5).max(50).required(),
		email: validator.string().min(5).max(255).email().required(),
		password: validator.password().required(),
		isAdmin: validator.boolean()
	};

	return validator.validate(schema, user);
};

schema.statics.login = user => {
	const schema = {
		email: validator.string().min(5).max(255).email().required(),
		password: validator.string().min(5).max(1024).required()
	};

	return validator.validate(schema, user);
};

schema.methods.authToken = function () {
	return jwt.sign({ _id: this._id, isAdmin: this.isAdmin }, config.secret);
};

schema.methods.hashPassword = async function () {
	const salt = await bcrypt.genSalt();
	this.password = await bcrypt.hash(this.password, salt);

	return this.password;
};

schema.methods.checkPassword = async function (password) {
	return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("User", schema);
