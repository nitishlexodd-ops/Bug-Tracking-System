# DevTrack - Mini Bug Tracking System

DevTrack is a small internal issue tracker built to demonstrate the fundamentals of a MERN application. The React dashboard calls an Express REST API, and Mongoose stores issues in MongoDB.

## Tech Stack

- MongoDB
- Express.js
- React.js
- Node.js
- JavaScript
- Mongoose
- Axios

## Features

- Create issues with a required title, description, priority, and status.
- View issues sorted newest first, including their creation date.
- Edit every issue field and change status directly from the issue list.
- Delete issues after confirming the action.
- Search issue titles and descriptions.
- Combine status and priority filters with search.
- See live total, open, in-progress, and resolved counts.
- Show loading, API error, empty, validation, and success states.
- Use the responsive dashboard on desktop and mobile.
- Persist issue data in MongoDB with automatic `createdAt` and `updatedAt` timestamps.

## Project Structure

```text
client/
  index.html
  src/
    components/
      Navbar.jsx
      Dashboard.jsx
      IssueForm.jsx
      IssueList.jsx
      IssueCard.jsx
      Filters.jsx
    services/
      issueService.js
    App.jsx
    main.jsx
    index.css
server/
  models/
    Issue.js
  routes/
    issueRoutes.js
  controllers/
    issueController.js
  .env
  .env.example
  server.js
  README.md
vite.config.js
package.json
README.md
```

The repository uses one root `package.json` for the client and server dependencies. This keeps the beginner setup to one `npm install`; the frontend is served from `client/` and the API is started from `server/server.js`.

## Setup

1. Install Node.js (18 or newer).
2. Start a local MongoDB server, or create a MongoDB Atlas database.
3. From the project root, install the dependencies:

   ```bash
   npm install
   ```

4. Copy `server/.env.example` to `server/.env` and set the MongoDB connection string:

   ```env
   MONGODB_URI=mongodb://127.0.0.1:27017/devtrack
   PORT=5000
   ```

   For Atlas, replace the local URI with your Atlas connection string. Do not commit database credentials.

5. Start the backend from the project root in one terminal:

   ```bash
   node server/server.js
   ```

6. Start the React frontend from the project root in a second terminal:

   ```bash
   npm run dev
   ```

7. Open the local URL printed by Vite, usually `http://localhost:5173`.

Vite forwards `/api` requests to `http://localhost:5000`. Keep the backend and MongoDB running while using the dashboard. The `.env` file in this project is configured for local MongoDB; change it if you use Atlas.

## API Endpoints

| Method | Endpoint | Purpose | Success status |
| --- | --- | --- | --- |
| `GET` | `/api/issues` | Get all issues | `200` |
| `POST` | `/api/issues` | Create an issue | `201` |
| `PUT` | `/api/issues/:id` | Update title, description, priority, or status | `200` |
| `DELETE` | `/api/issues/:id` | Delete an issue | `200` |

Create request body:

```json
{
  "title": "Login button not working",
  "description": "Login button does not respond after entering valid credentials.",
  "priority": "High",
  "status": "Open"
}
```

The API returns `400` for invalid input or IDs, `404` when an issue does not exist, and `500` for unexpected server errors.

## Data Flow

- **Create:** React form -> Axios `POST` -> Express route -> controller -> Mongoose -> MongoDB.
- **Read:** React `useEffect` -> Axios `GET` -> Express -> MongoDB -> JSON -> React state.
- **Update:** User edit/status action -> Axios `PUT` -> Express -> MongoDB -> updated issue -> React state.
- **Delete:** Confirmation -> Axios `DELETE` -> Express -> MongoDB -> remove issue from React state.

## MERN Concepts Demonstrated

- React components, props, `useState`, `useEffect`, controlled inputs, and list rendering.
- Axios service functions kept separate from UI components.
- Express routing, controllers, JSON middleware, and HTTP status codes.
- Node.js environment variables and server startup.
- Mongoose schema validation, enums, CRUD methods, and timestamps.
- MongoDB document persistence and client/server data flow.

## Common Errors

- **MongoDB connection refused:** Start the local MongoDB service and check the URI in `server/.env`, or verify the Atlas URI and network access.
- **`MONGODB_URI` is missing:** Make sure `server/.env` exists and contains the variable.
- **Frontend shows “Unable to load issues”:** Start the API on port `5000`, then retry. The Vite development proxy expects that port.
- **Port already in use:** Stop the process using the port. If you change the API port, update the target in `vite.config.js` to match.
- **A form field is rejected:** Title, description, priority, and status are all required; priority and status must use one of the listed options.

## Demo Flow

1. Start MongoDB, the API, and Vite, then show the dashboard counts and issue list.
2. Create “Login button not working” with High priority and Open status.
3. Search for `login`, then combine the Open status and High priority filters.
4. Change the issue to In Progress, open Edit, and update its description or priority.
5. Clear the filters, resolve the issue, and demonstrate Delete with the confirmation prompt.

To populate the dashboard for a demo, create these issues from the form: **Login button not working** (High, Open), **API returning 500 error** (Medium, In Progress), and **Incorrect date format** (Low, Resolved).

## Production Build

```bash
npm run build
npm run preview
```

The frontend build is written to the root `dist/` directory. The Express API remains a separate Node.js process.