# DevTrack Client

The React client is a Vite application. Its `App.jsx` loads issues with `useEffect`, keeps dashboard and form values in React state, and uses `services/issueService.js` for Axios requests.

Run `npm run dev` from the project root. Vite serves `client/` and proxies `/api` requests to the Express API at `http://localhost:5000`.

See the root `README.md` for installation, MongoDB setup, API details, and the demo flow.