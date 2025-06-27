module.exports = (req, res, next) => {
  const logEntry = {
    method: req.method,
    path: req.originalUrl,
    timestamp: new Date().toISOString(),
    body: req.body,
  };

  require("fs").appendFileSync("server.log", JSON.stringify(logEntry) + "\n");

  next();
};
