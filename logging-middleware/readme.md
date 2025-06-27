# Logging Middleware

## Overview

This folder contains a reusable logging function `Log()` that is used across both the backend and frontend applications. It sends structured logs to AffordMed's official evaluation log server. This is a mandatory component for the Full Stack track and replaces all console logging in the application.

---

## ✨ Features

- Sends logs to: `http://20.244.56.144/evaluation-service/logs`
- Validates allowed values for `stack`, `level`, and `package`
- Can be used by both backend and frontend
- No `console.log()` is used anywhere — only `Log()` is used for all events and errors

---

## 🔧 Function Signature

```js
Log(stack, level, package, message);
Parameters:
Parameter	Type	Required	Description
stack	string	✅	"frontend" or "backend"
level	string	✅	"debug", "info", "warn", "error", "fatal"
package	string	✅	See allowed package values below
message	string	✅	Descriptive log message

📦 Log API Endpoint
nginx
Copy code
POST http://20.244.56.144/evaluation-service/logs
✅ Sample Request Body:
json
Copy code
{
  "stack": "backend",
  "level": "error",
  "package": "handler",
  "message": "received string, expected bool"
}
✅ Sample Success Response:
json
Copy code
{
  "logID": "a4aad02e-19d0-4153-86d9-58bf55d7c402",
  "message": "log created successfully"
}
✅ Allowed Values
stack:
"frontend"

"backend"

level:
"debug"

"info"

"warn"

"error"

"fatal"

package:
Backend-only:
"cache", "controller", "cron_job", "db", "domain", "handler", "repository", "route", "service"

Frontend-only:
"api", "component", "hook", "page", "state", "style"

Shared:
"auth", "config", "middleware"

✅ Example Usage
In Backend (routes/shorten.js)
js
Copy code
const Log = require("../../logging-middleware/logger");

Log("backend", "info", "service", "Shortened URL created");
Log("backend", "error", "handler", "Invalid URL received");
In Frontend (src/utils/logger.js)
js
Copy code
import { Log } from "../utils/logger";

Log("frontend", "info", "component", "Home page loaded");
Log("frontend", "error", "api", "Failed to fetch statistics");
📝 Notes
The Log() function is located inside logging-middleware/logger.js

Both backend-test-submission/ and frontend-test-submission/ import and use this function

All logs are sent to the official test server, not your own backend

No personal names, no company names, and no console logs are used anywhere

Validations are enforced in the Log() function for accepted stack, level, and package values

📁 Folder Structure
sql
Copy code
logging-middleware/
├── logger.js       # Contains reusable Log() function
└── README.md       # This documentation
