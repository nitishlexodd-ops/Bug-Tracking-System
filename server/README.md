# DevTrack API

The API uses Express routes and controller functions to perform issue CRUD operations. `models/Issue.js` defines the Mongoose schema, accepted priority/status values, and automatic timestamps.

The server reads `MONGODB_URI` and `PORT` from `server/.env`. Copy `.env.example` to `.env`, then run this command from the project root:

```bash
node server/server.js
```

The repository keeps both the client and server dependencies in the root `package.json`, so run `npm install` once from the project root. API routes are documented in the root `README.md`.