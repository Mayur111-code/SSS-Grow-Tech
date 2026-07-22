# Web Craft

> Full-stack project (Node/Express backend + React/Vite frontend) for managing services, projects, blogs and inquiries.

## Overview

Web Craft is a MERN-style application with a Node.js/Express backend and a React frontend built with Vite. The backend exposes REST endpoints for user authentication, admin operations, services, projects, inquiries and blogs. The frontend is a React app that consumes those APIs.

## Features

- User authentication (Google OAuth + local flows)
- Admin dashboard for managing services, projects and blogs
- File/image uploads via Cloudinary
- Contact/inquiry handling
- CRUD APIs for services, projects and blogs

## Tech Stack

- Backend: Node.js, Express, Mongoose, Passport (Google OAuth), Cloudinary
- Frontend: React, Vite, Tailwind (present in deps), React Router
- DB: MongoDB

## Repository Structure

- `backend/` - Express API and models
- `frontend/` - React (Vite) frontend
- See [backend/index.js](backend/index.js) and [frontend/package.json](frontend/package.json) for entry points.

## Prerequisites

- Node.js (16+ recommended)
- npm or yarn
- MongoDB instance (Atlas or local)
- Cloudinary account (for file uploads)

## Environment Variables

Create a `.env` file inside `backend/` with at least the following variables:

- `MONGO_URI` — MongoDB connection string
- `CLOUDINARY_CLOUD_NAME` — Cloudinary cloud name
- `CLOUDINARY_API_KEY` — Cloudinary API key
- `CLOUDINARY_API_SECRET` — Cloudinary API secret
- `GOOGLE_CLIENT_ID` — Google OAuth client ID
- `GOOGLE_CLIENT_SECRET` — Google OAuth client secret
- `COOKIE_SECRET` — (optional) session cookie secret (defaults present in code)
- `PORT` — (optional) backend port

Note: The frontend currently points to `https://web-craft.onrender.com/api` as the API base URL at `frontend/src/api/api.js`. Update that as needed for local development.

## Setup & Running Locally

Backend

```bash
cd backend
npm install
# create .env file with variables listed above
# start the server (no script defined; use one of the commands below)
# run with node:
node index.js
# or install nodemon globally and run:
npx nodemon index.js
```

Frontend

```bash
cd frontend
npm install
npm run dev
```

Open the frontend dev server URL shown by Vite (usually http://localhost:5173).

## API Routes (overview)

The app exposes these route groups (see `backend/routes`):

- `/api/user` — authentication and user endpoints
- `/api/admin` — admin authentication/actions
- `/api/services` — services CRUD
- `/api/projects` — projects CRUD
- `/api/inquiries` — contact/inquiry submission
- `/api/blogs` — blog CRUD

Explore the route files in `backend/routes/` for detailed endpoints and payload shapes.

## Deployment Notes

- Ensure all environment variables are provided in your hosting platform.
- If deploying frontend separately (e.g., Vercel), set the API base URL to your backend's public URL.
- For Google OAuth, configure the callback URL in the Google Cloud Console to match your deployed backend's callback path.

## Contributing

1. Open an issue describing the change or bug.
2. Create a branch, implement your changes, and open a PR.

## License

This project does not include a license file. Add a `LICENSE` if you want to define usage terms.

---

If you'd like, I can:

- add a sample `.env.example` in `backend/`
- add `start`/`dev` scripts to `backend/package.json`
- update the frontend to read the API base URL from an env var (`import.meta.env`)

Let me know which of the above you'd like me to do next.
