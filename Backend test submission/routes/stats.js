const express = require("express");
const router = express.Router();
const store = require("../data/store");

router.get("/", (req, res) => {
  const result = store.urls.map((url) => {
    const relatedClicks = store.clicks.filter(c => c.shortcode === url.shortcode);
    return {
      ...url,
      clicks: relatedClicks,
    };
  });

  res.json(result);
});

module.exports = router;
