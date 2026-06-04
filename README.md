# project-management-tool
An open-source trello/JIRA alternative for streamlining the product development and staging the process, built on MERN stack.

## Tech Stack
- ReactJS (FrontEnd)
- MongoDB (Database)
- NodeJS (RTE)
- ExpressJS (Backend)
- Tailwind (for styling)
- Deployment (AWS)
- Docker (for containerization)
- Postman (for testing)


## Tech Features
- JWT Auth
- Dashboard (for you section, workspaces, draw.io)
- Board

## Getting Started

### Prerequisites
- Node.js (v16+ recommended)
- npm (comes with Node) or Yarn
- MongoDB running locally or a connection string for the backend

### Launching the Backend
1. Open a terminal and change to the `backend` folder:

```bash
cd backend
```

2. Install dependencies:

```bash
npm install
```

3. Configure environment (create `.env` in `backend` if needed) — typical values:

```
MONGO_URI=<your-mongo-connection-string>
PORT=4000
JWT_SECRET=<your-jwt-secret>
```

4. Start the backend (development):

```bash
npm run dev
```

Or start production build:

```bash
npm start
```

### Launching the Frontend
1. Open a new terminal and change to the `frontend` folder:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Start the dev server:

```bash
npm run dev
```

The frontend dev server (Vite) should print the local URL (usually `http://localhost:5173`). If your backend is running on a different port (e.g., 4000), ensure the frontend's API calls point to the correct backend base URL (check `src` config or environment files).

