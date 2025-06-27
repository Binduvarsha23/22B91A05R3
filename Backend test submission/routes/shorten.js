const express = require("express");
const router = express.Router();
const store = require("../data/store");
const generateShortCode = require("../utils/generateShortCode");
const Log = require("../../logging-middleware/logger");

router.post("/", async (req, res) => {
  const urls = req.body.urls;

  if (!Array.isArray(urls) || urls.length > 5) {
    await Log("backend", "error", "handler", "received non-array or more than 5 URLs");
    return res.status(400).json({ error: "Max 5 URLs allowed" });
  }

  const baseUrl = "http://localhost:5000/";
  const shortened = [];

  for (let entry of urls) {
    const { url, validity = 30, shortcode } = entry;

    if (!url || typeof url !== "string" || !url.startsWith("http")) {
      await Log("backend", "error", "handler", "invalid URL format");
      return res.status(400).json({ error: "Invalid URL" });
    }

    const code = shortcode || await generateShortCode();
    const existing = store.urls.find((u) => u.shortcode === code);
    if (existing) {
      await Log("backend", "warn", "repository", `shortcode collision for ${code}`);
      return res.status(409).json({ error: "Shortcode already in use" });
    }

    const createdAt = new Date();
    const expiresAt = new Date(createdAt.getTime() + validity * 60000);
    const shortUrl = baseUrl + code;

    store.urls.push({ originalUrl: url, shortcode: code, shortUrl, createdAt, expiresAt });

    shortened.push({ originalUrl: url, shortUrl, shortcode: code, createdAt, expiresAt });

    await Log("backend", "info", "service", `shortened URL: ${code} → ${url}`);
  }

  res.status(201).json({ urls: shortened });
});
module.exports = router;
