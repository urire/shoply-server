const mongoose = require("mongoose");
const validator = require("../services/validator");

const schema = new mongoose.Schema({
	image: {
		type: String,
		required: true
	},
	title: {
		type: String,
		required: true,
		min: 5,
		max: 50
	},
	description: {
		type: String,
		required: true,
		min: 5,
		max: 1024
	},
	price: {
		type: Number,
		required: true,
		min: 0
	},
	availableSizes: {
		type: [String]
	}
});

schema.statics.validate = product => {
	const schema = {
		image: validator.string().required(),
		title: validator.string().min(5).max(50).required(),
		description: validator.string().min(5).max(1024).required(),
		price: validator.number().min(0).required(),
		availableSizes: validator.array().items(validator.string()).required()
	};

	return validator.validate(schema, product);
};

module.exports = mongoose.model("Product", schema);
