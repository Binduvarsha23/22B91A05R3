# Frontend Test Submission

## Overview

This is the frontend React application for the Full Stack URL Shortener. The application allows users to input up to 5 long URLs and generate shortened versions using the backend API.

The frontend integrates the reusable logging middleware to send logs to the evaluation server, and uses Material UI for clean, responsive design.

---

## 🚀 Features

- Shorten up to 5 URLs concurrently
- Optional shortcode and validity input
- View all generated short URLs with expiration
- Statistics page to view click data
- Frontend logging to the external log server
- Responsive layout for mobile and desktop

---

## 🛠️ Tech Stack

- ReactJS
- Material UI
- JavaScript
- Logging middleware (`Log()` to test server)

---

## 📸 Screenshots

### Desktop View

![Desktop Screenshot](./Screenshot%202025-06-27%20123823.png)

### Mobile View

![Mobile Screenshot](./Screenshot%202025-06-27%20123901.png)

---

## 📦 Folder Structure

frontend-test-submission/
├── public/
├── src/
│ ├── components/
│ ├── utils/
│ │ └── logger.js ✅
├── package.json
├── README.md

yaml
Copy code

---

## 📄 How to Run

1. Navigate to the frontend folder:

```bash
cd frontend-test-submission
Install dependencies:

bash
Copy code
npm install
Start the app:

bash
Copy code
npm start
It will run at: http://localhost:3000

🔗 Logging
The Log() function is called from the frontend to send events and errors to:

nginx
Copy code
POST http://20.244.56.144/evaluation-service/logs
All logs follow the format:

json
Copy code
{
  "stack": "frontend",
  "level": "info",
  "package": "component",
  "message": "Dashboard loaded"
}
