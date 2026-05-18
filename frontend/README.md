# Mini Service Request Board Frontend

This is the Next.js 15 App Router frontend for the Mini Service Request Board.

## Run locally

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create a `.env.local` file from `.env.example` and set the API URL.

3. Start the development server:

   ```bash
   npm run dev
   ```

## Pages

- `/` - browse jobs and filter by category
- `/jobs/new` - create a new job request
- `/jobs/[id]` - view, update, or delete a job request