const express = require("express");
const router = express.Router();
const store = require("../data/store");
const Log = require("../../logging-middleware/logger");

router.get("/:shortcode", async (req, res) => {
  const { shortcode } = req.params;
  const entry = store.urls.find((u) => u.shortcode === shortcode);

  if (!entry) {
    await Log("backend", "error", "handler", `shortcode not found: ${shortcode}`);
    return res.status(404).send("Short URL not found.");
  }

  if (new Date() > new Date(entry.expiresAt)) {
    await Log("backend", "warn", "handler", `expired shortcode: ${shortcode}`);
    return res.status(410).send("Link expired.");
  }

  store.clicks.push({
    shortcode,
    timestamp: new Date(),
    source: req.headers["user-agent"] || "unknown",
    location: req.ip || "unknown",
  });

  await Log("backend", "info", "service", `redirected from ${shortcode} to ${entry.originalUrl}`);

  res.redirect(entry.originalUrl);
});

module.exports = router;
