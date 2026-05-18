# Mini Service Request Board

A beginner-friendly full-stack service request platform built with Next.js 15, Tailwind CSS, Axios, Node.js, Express.js, and MongoDB.

## Project Structure

- `frontend/` - Next.js 15 App Router UI
- `backend/` - Express API with MongoDB and Mongoose

## Features

- Browse all service requests on the home page
- Filter jobs by category
- View full job details
- Update job status
- Delete job requests
- Create new service requests with validation
- Responsive, modern UI with loading and error states

## Backend Setup

1. Open the backend folder:

   ```bash
   cd backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file from `.env.example`:

   ```env
   PORT=5000
   MONGODB_URI=mongodb://127.0.0.1:27017/mini_service_request_board
   CORS_ORIGIN=http://localhost:3000
   ```

4. Start the backend:

   ```bash
   npm run dev
   ```

5. Optional: seed sample data

   ```bash
   npm run seed
   ```

### Authentication

- The backend provides JWT authentication with endpoints under `/api/auth`:
   - `POST /api/auth/register` — register and receive a token as an HTTP-only cookie
   - `POST /api/auth/login` — login and receive a token as an HTTP-only cookie
   - `POST /api/auth/logout` — clears the auth cookie
   - `GET /api/auth/profile` — returns the authenticated user's profile (protected)

- Make sure to set `JWT_SECRET` in the backend `.env` (see `.env.example`). If you are testing locally without HTTPS, keep `COOKIE_SECURE=false`.

## Frontend Setup

1. Open the frontend folder:

   ```bash
   cd frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env.local` file from `.env.example`:

   ```env
   NEXT_PUBLIC_API_BASE_URL=http://localhost:5000/api
   ```

4. Start the frontend:

   ```bash
   npm run dev
   ```

## API Endpoints

- `GET /api/jobs`
- `GET /api/jobs/:id`
- `POST /api/jobs`
- `PATCH /api/jobs/:id`
- `DELETE /api/jobs/:id`

  ## Live Demo

Frontend:
https://mini-service-request-board-roan.vercel.app

Backend:
https://mini-service-request-board-production-f10e.up.railway.app

---


## Notes

- The backend expects a running MongoDB instance.
- Frontend requests go through the shared Axios client in `frontend/services/api.js`.
- The app is organized with reusable components, validation, and standard HTTP status handling.
