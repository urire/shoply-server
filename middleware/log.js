const logger = require("../services/logger");

module.exports = (req, res, next) => {
	logger.info(`METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);

	res.on("finish", () => {
		logger.info(
			`METHOD: [${req.method}] - URL: [${req.url}] - STATUS: [${res.statusCode}] - IP: [${req.socket.remoteAddress}]`
		);
	});

	next();
};
