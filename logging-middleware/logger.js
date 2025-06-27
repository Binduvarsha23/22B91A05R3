// utils/logger.js
const fetch = require("node-fetch");

async function Log(stack, level, pkg, message) {
  const validStacks = ["frontend", "backend"];
  const validLevels = ["debug", "info", "warn", "error", "fatal"];
  const validPackages = [
    "cache", "controller", "cron_job", "db", "domain", "handler", "repository", "route", "service",
    "api", "component", "hook", "page", "state", "style",
    "auth", "config", "middleware"
  ];

  if (!validStacks.includes(stack) || !validLevels.includes(level) || !validPackages.includes(pkg)) {
    return;
  }

  const payload = { stack, level, package: pkg, message };

  try {
    const res = await fetch("http://20.244.56.144/evaluation-service/logs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    return await res.json();
  } catch (err) {
  }
}

module.exports = Log;