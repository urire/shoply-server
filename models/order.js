const mongoose = require("mongoose");
const validator = require("../services/validator");

const schema = new mongoose.Schema(
	{
		email: {
			type: String,
			required: true,
			minlength: 5,
			maxlength: 255
		},
		name: {
			type: String,
			required: true,
			minlength: 5,
			maxlength: 50
		},
		address: {
			type: String,
			required: true,
			minlength: 5,
			maxlength: 255
		},
		total: {
			type: Number,
			required: true,
			min: 0
		},
		cart: {
			type: [
				{
					title: { type: String, required: true },
					price: { type: Number, required: true },
					count: { type: Number, required: true }
				}
			],
			required: true
		}
	},
	{ timestamps: true }
);

schema.statics.validate = order => {
	const schema = {
		email: validator.string().min(5).max(255).email().required(),
		name: validator.string().min(5).max(50).required(),
		address: validator.string().min(5).max(255).required(),
		total: validator.number().min(0).required(),
		cart: validator.array().required()
	};

	return validator.validate(schema, order);
};

module.exports = mongoose.model("Order", schema);
