import { Log } from "./utils/logger";

const BASE_URL = "http://localhost:5000/api";

export const shortenURLs = async (urls) => {
  try {
    const res = await fetch(`${BASE_URL}/shorten`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ urls }),
    });
    const data = await res.json();
    Log("frontend", "info", "api", "Shortened URLs");
    return data;
  } catch (err) {
    Log("frontend", "error", "api", "Error shortening URLs: " + err.message);
    throw err;
  }
};

export const fetchStats = async () => {
  try {
    const res = await fetch(`${BASE_URL}/stats`);
    const data = await res.json();
    Log("frontend", "info", "api", "Fetched statistics");
    return data;
  } catch (err) {
    Log("frontend", "error", "api", "Error fetching stats: " + err.message);
    throw err;
  }
};
