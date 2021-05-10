const config = require("./services/config");
const logger = require("./services/logger");
const log = require("./middleware/log");
const error = require("./middleware/error");
const route = require("express-routes-path");
const compression = require("compression");
const cors = require("cors");
const helmet = require("helmet");
const mongoose = require("mongoose");
const express = require("express");
const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(compression());
app.use(error);
app.use(log);

route(app);

mongoose.connect(config.db.url, config.db.options).then(logger.info(`Connected to ${config.db.host}...`));

module.exports = app.listen(config.port, () => logger.info(`Listening on port ${config.port}...`));
