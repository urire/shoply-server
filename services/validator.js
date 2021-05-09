const config = require("./config");
const Joi = require("joi");
const objectId = require("joi-objectid");
const passwordComplexity = require("joi-password-complexity");

module.exports = Joi;
module.exports.password = () => passwordComplexity(config.user.passwordComplexity);
module.exports.validate = (schema, model) => Joi.object(schema).validate(model).error;
module.exports.objectId = objectId(Joi);
