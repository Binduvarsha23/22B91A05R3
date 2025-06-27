# Backend Test Submission

## Overview

This is the backend Express application for the Full Stack URL Shortener. It provides APIs for URL shortening, redirection, statistics tracking, and integrates the reusable logging middleware to log all significant events and errors to the evaluation server.

---

## 🚀 Features

- Shorten long URLs with optional custom shortcode and validity
- Redirection based on generated shortcode
- Statistics tracking: clicks, timestamp, location
- All API actions logged using `Log()` middleware
- Express-style middleware for request logging to server.log

---

## 📸 Screenshot

![Backend API Screenshot](./Screenshot%202025-06-27%20111319.png)

---

## 📄 How to Run

1. Navigate to the backend folder:

```bash
cd backend-test-submission
Install dependencies:

bash
Copy code
npm install
Start the server:

bash
Copy code
node server.js
Runs on: http://localhost:5000

📦 Folder Structure
pgsql
Copy code
backend-test-submission/
├── routes/
├── middleware/
├── utils/
├── server.js
├── package.json
