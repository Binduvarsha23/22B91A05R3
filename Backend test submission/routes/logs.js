const express = require("express");
const router = express.Router();
const store = require("../data/store");

router.post("/", (req, res) => {
  store.logs.push({
    ...req.body,
    receivedAt: new Date().toISOString(),
  });

  res.status(200).json({ success: true });
});

module.exports = router;
