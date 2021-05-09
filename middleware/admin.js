module.exports = (req, res, next) => {
	if (!res.locals.jwt.isAdmin) return res.status(403).send("Access denied: user not a admin");

	next();
};
