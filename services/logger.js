const { db } = require("./config");
const { createLogger, format, transports } = require("winston");
require("winston-mongodb");
require("express-async-errors");

process.on("unhandledRejection", ex => {
	throw ex;
});

const jsonFormat = format.combine(format.timestamp(), format.json());

module.exports = createLogger({
	transports: [
		new transports.Console({
			level: "info",
			handleExceptions: true,
			format: format.simple()
		}),
		new transports.File({
			level: "info",
			filename: "./logs/info.log",
			format: jsonFormat
		}),
		new transports.File({
			filename: "./logs/exceptions.log",
			level: "error",
			handleExceptions: true,
			format: jsonFormat
		}),
		new transports.MongoDB({
			level: "error",
			collection: "exceptions",
			db: db.url,
			handleExceptions: true,
			options: db.error.options,
			format: jsonFormat
		})
	]
});
