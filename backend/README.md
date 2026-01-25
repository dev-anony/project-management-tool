# Backend - Project Management Tool

A Node.js Express backend API for a project management tool that manages tasks, boards, and team members using MongoDB.

## Overview

This backend provides RESTful API endpoints for managing project management features including task creation, updates, deletion, and retrieval. The server is built with Express.js and uses MongoDB with Mongoose for data persistence.

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js (v5.2.1)
- **Database:** MongoDB with Mongoose (v9.0.1)
- **Environment:** dotenv (v17.2.3)
- **CORS:** cors (v2.8.5)
- **Dev Tool:** nodemon (v3.1.11)

## Project Structure

```
src/
├── server.js           # Main server entry point
├── config/
│   └── db.js          # MongoDB connection configuration
├── controllers/
│   └── controller.js   # Request handlers for API routes
├── models/
│   ├── Admin.js       # Admin user model
│   ├── Board.js       # Board/project model
│   ├── Devs.js        # Developer/team member model
│   └── Task.js        # Task model
└── routes/
    └── router.js      # API route definitions
```

## Models

- **Admin:** Manages administrator accounts
- **Board:** Represents project boards
- **Devs:** Represents developers/team members
- **Task:** Represents individual tasks in the project

## API Endpoints

All endpoints are prefixed with `/api`

### Tasks
- `GET /` - Retrieve all tasks
- `POST /` - Create a new task
- `PUT /:id` - Update a task by ID
- `DELETE /:id` - Delete a task by ID

## API Usage Examples

### Get All Tasks
```bash
curl -X GET http://localhost:5000/api/
```

### Create a New Task
```bash
curl -X POST http://localhost:5000/api/ \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Complete project setup",
    "description": "Set up the backend and frontend",
    "status": "In Progress",
    "priority": "High",
    "assignee": "John Doe"
  }'
```

### Update a Task by ID
Replace `{taskId}` with the actual MongoDB ObjectId of the task.

```bash
curl -X PUT http://localhost:5000/api/65a3f4b2c1e9d8f2a3b4c5d6 \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Complete project setup",
    "description": "Updated description",
    "status": "Completed",
    "priority": "Medium",
    "assignee": "Jane Smith"
  }'
```

**Example Request with JavaScript (Fetch API):**
```javascript
const taskId = "65a3f4b2c1e9d8f2a3b4c5d6";

fetch(`http://localhost:5000/api/${taskId}`, {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    title: "Updated Task Title",
    status: "Completed",
    priority: "Low"
  })
})
.then(response => response.json())
.then(data => console.log('Task updated:', data))
.catch(error => console.error('Error:', error));
```

### Delete a Task by ID
Replace `{taskId}` with the actual MongoDB ObjectId of the task.

```bash
curl -X DELETE http://localhost:5000/api/65a3f4b2c1e9d8f2a3b4c5d6
```

**Example Request with JavaScript (Fetch API):**
```javascript
const taskId = "65a3f4b2c1e9d8f2a3b4c5d6";

fetch(`http://localhost:5000/api/${taskId}`, {
  method: 'DELETE'
})
.then(response => response.json())
.then(data => console.log('Task deleted:', data))
.catch(error => console.error('Error:', error));
```

## Installation

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the root directory with the following variables:
```env
MONGO_URI=your_mongodb_connection_string
```

## Running the Server

### Development Mode (with auto-reload)
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

The server runs on **Port 5000** by default.

## Environment Variables

- `MONGO_URI` - MongoDB connection string (required)

## Features

- RESTful API for task management
- MongoDB persistence layer
- CORS support for cross-origin requests
- Request logging and debugging
- ES6 modules
- Development server with auto-reload (nodemon)

## Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| express | ^5.2.1 | Web framework |
| mongoose | ^9.0.1 | MongoDB ODM |
| dotenv | ^17.2.3 | Environment variables |
| cors | ^2.8.5 | CORS middleware |
| nodemon | ^3.1.11 | Auto-reload for development |

## Notes

- The server includes request logging middleware that logs HTTP method, URL, remote address, and headers
- CORS is configured via middleware (see server.js)
- All requests go through JSON body parsing middleware
- The application uses ES6 module syntax (`import`/`export`)
