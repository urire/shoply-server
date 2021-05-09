const config = require("config");

if (!config.get("secret")) throw new Error("secret is not defined");

module.exports = {
	db: config.get("db"),
	user: config.get("user"),
	secret: config.get("secret"),
	port: process.env.PORT || 3000
};
