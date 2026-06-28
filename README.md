<div align="center">
✅ TaskFlow
A full-stack Task Tracker built with the MERN Stack
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Vercel](https://img.shields.io/badge/Frontend-Vercel-black?style=for-the-badge&logo=vercel)
![Render](https://img.shields.io/badge/Backend-Render-46E3B7?style=for-the-badge&logo=render&logoColor=white)
🌐 Live Demo • 🔗 API

---
📋 Table of Contents
Overview
Features
Tech Stack
Getting Started
API Reference
Project Structure
Deployment
Author
---
🚀 Overview
TaskFlow is a responsive full-stack Task Tracker web application that allows users to create, manage, and track their daily tasks in real time — no page refresh needed. Built as part of a MERN Stack internship assignment to demonstrate full-stack development skills including REST APIs, MongoDB integration, and React fundamentals.
---
✨ Features
Feature	Description
➕ Create Tasks	Add tasks with title and optional description
📋 View Tasks	See all tasks with status badges
✏️ Edit Tasks	Update task title and description inline
🗑️ Delete Tasks	Remove tasks instantly
✅ Toggle Status	Mark tasks as Pending or Completed
🔍 Filter Tasks	Filter by All / Pending / Completed
📊 Live Stats	Real-time count of total, pending, done tasks
🔔 Toast Notifications	Instant feedback on every action
📱 Responsive UI	Works on mobile, tablet, and desktop
⚡ No Page Refresh	Dynamic updates using React state + axios
---
🛠️ Tech Stack
Frontend
React.js — UI library
Axios — HTTP requests
CSS3 — Custom responsive styling
Backend
Node.js — Runtime
Express.js — Web framework
Mongoose — MongoDB ODM
CORS — Cross-origin support
dotenv — Environment variables
Database
MongoDB Atlas — Cloud database
Deployment
Vercel — Frontend hosting
Render — Backend hosting
---
🏁 Getting Started
Prerequisites
Make sure you have installed:
Node.js v18+
MongoDB (local) or a MongoDB Atlas account
Git
Installation
1. Clone the repository
```bash
git clone https://github.com/somesh-pandey12/task-tracker.git
cd task-tracker
```
2. Setup Backend
```bash
cd server
npm install
```
Create a `.env` file inside `server/`:
```env
MONGO_URI=mongodb://localhost:27017/tasktracker
PORT=5000
```
Start the server:
```bash
node index.js
```
> Server runs on `http://localhost:5000`
3. Setup Frontend
```bash
cd ../client
npm install
```
Create a `.env` file inside `client/`:
```env
REACT_APP_API_URL=http://localhost:5000
```
Start React:
```bash
npm start
```
> App runs on `http://localhost:3000`
---
📡 API Reference
Base URL: `https://task-tracker-3nev.onrender.com`
Method	Endpoint	Description
`GET`	`/api/tasks`	Get all tasks
`POST`	`/api/tasks`	Create a new task
`PUT`	`/api/tasks/:id`	Update a task
`DELETE`	`/api/tasks/:id`	Delete a task
Example Request
```bash
# Create a task
curl -X POST https://task-tracker-3nev.onrender.com/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title": "Complete assignment", "description": "MERN stack project"}'
```
Example Response
```json
{
  "_id": "64f1a2b3c4d5e6f7a8b9c0d1",
  "title": "Complete assignment",
  "description": "MERN stack project",
  "status": "pending",
  "createdAt": "2024-09-01T10:30:00.000Z"
}
```
---
📁 Project Structure
```
task-tracker/
│
├── client/                   # React Frontend
│   ├── public/
│   ├── src/
│   │   ├── App.js            # Main component (CRUD + UI)
│   │   ├── App.css           # Styling
│   │   └── index.js
│   ├── .env                  # Frontend env variables
│   └── package.json
│
├── server/                   # Node/Express Backend
│   ├── index.js              # Server + API routes + DB
│   ├── .env                  # Backend env variables
│   └── package.json
│
└── README.md
```
---
🌍 Deployment
Frontend → Vercel
Push code to GitHub
Go to vercel.com → Import project
Set root directory to `client`
Add environment variable:
`REACT_APP_API_URL` = `https://task-tracker-3nev.onrender.com`
Deploy!
Backend → Render
Go to render.com → New Web Service
Connect GitHub repo
Set root directory to `server`
Add environment variables:
`MONGO_URI` = your MongoDB Atlas connection string
`PORT` = `5000`
Deploy!
---
🔗 Live Links
	Link
🌐 Frontend (Vercel)	https://task-tracker-six-sage.vercel.app
⚙️ Backend API (Render)	https://task-tracker-3nev.onrender.com/api/tasks
💾 GitHub Repo	https://github.com/somesh-pandey12/task-tracker.git
👨‍💻 Author
<div align="center">
Somesh Pandey
![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)
![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)
Built with ❤️ as part of MERN Stack Internship Assignment
</div>
---
<div align="center">
⭐ Star this repo if you found it helpful!
</div>