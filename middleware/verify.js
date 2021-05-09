const jwt = require("jsonwebtoken");
const config = require("../services/config");

module.exports = (req, res, next) => {
	const token = req.headers.authorization;
	if (!token) return res.status(401).send("Access denied: no token provided");

	try {
		res.locals.jwt = jwt.verify(token, config.secret);
		next();
	} catch (ex) {
		res.status(400).send("Access denied: invalid token");
	}
};
