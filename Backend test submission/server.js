const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const logger = require("./middleware/logger");
const shortenRoute = require("./routes/shorten");
const statsRoute = require("./routes/stats");
const logsRoute = require("./routes/logs");
const redirectRoute = require("./routes/redirect"); 

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(logger); 

// API routes
app.use("/api/shorten", shortenRoute);
app.use("/shorturls", statsRoute);      
app.use("/api/logs", logsRoute);

// Redirection route
app.use("/", redirectRoute); 

app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});
