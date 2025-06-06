# Task Manager API

A simple RESTful API for managing tasks using Node.js, Express, and JSON file storage.

## Quick Start

1. Install dependencies:
```bash
npm install
```

2. Start the server:
```bash
node server.js
```

3. Access API at:
```
http://localhost:4000/api/tasks
```

---

## 📌 API Endpoints

| Method | Endpoint         | Description             |
| ------ | ---------------- | ----------------------- |
| GET    | `/api/tasks`     | Get all tasks           |
| GET    | `/api/tasks/:id` | Get a single task by ID |
| POST   | `/api/tasks`     | Create a new task       |
| PUT    | `/api/tasks/:id` | Mark task as completed  |
| DELETE | `/api/tasks/:id` | Delete a task           |

---

## 🔍 Filter Tasks by Status

Use query parameters to filter tasks:

* ✅ Completed Tasks:

  ```
  GET /api/tasks?status=completed
  ```

* ⏳ Pending Tasks:

  ```
  GET /api/tasks?status=pending
  ```

---

## 🧱 Task Object Format

```json
{
  "id": 1,
  "title": "Do homework",
  "completed": false,
  "createdAt": "2025-06-05T10:00:00Z",
  "updatedAt": "2025-06-05T10:00:00Z"
}
```

---

## 📁 Project Structure

```
task-manager/
│
├── controllers/
│   └── taskController.js
│
├── routes/
│   └── taskRoutes.js
│
├── public/
│   └── index.html
│   └── styles.css
│
├── tasks.json
├── server.js
├── package.json
└── README.md
```

