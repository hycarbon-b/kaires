# Kaires App

Kaires App is the consumer AI chat application for the Kaires product suite. It includes a React frontend and a lightweight serverless-style backend for account authentication, API Key management, subscriptions, and chat proxying.

The user-facing product keeps the API provider details hidden. Users only see simple account, subscription, and API management screens.

## Stack

- React 19 + TypeScript
- Vite 6
- Tailwind CSS
- Node 22 serverless-style API
- SQLite via Node's built-in `node:sqlite`
- Cookie-based sessions

## Local Development

Install dependencies:

```bash
npm install
```

Copy the environment example:

```bash
cp .env.example .env
```

Start the backend API:

```bash
npm run dev:api
```

Start the frontend in another terminal:

```bash
npm run dev
```

Default local URLs:

- Frontend: `http://localhost:5175`
- Backend API: `http://localhost:8787`

Vite proxies frontend `/api/*` requests to `http://localhost:8787` during development.

## Environment Variables

```bash
PORT=8787
KAIRES_DB_PATH=./data/kaires.sqlite

GATEWAY_MOCK=1
GATEWAY_BASE_URL=http://localhost:3000
GATEWAY_USERNAME=
GATEWAY_PASSWORD=
GATEWAY_COOKIE=
```

### Local Test Mode

Keep `GATEWAY_MOCK=1` for local development and end-to-end testing without an external gateway. In this mode, the backend generates a mock managed API Key and returns deterministic chat responses.

### Managed Gateway Mode

Set `GATEWAY_MOCK=0` and configure one of the following:

- `GATEWAY_USERNAME` + `GATEWAY_PASSWORD`
- `GATEWAY_COOKIE`

The backend uses these credentials server-side to create and refresh managed API Keys. The frontend never receives raw provider credentials and users only see masked API Key values.

## Backend API

All routes are served under `/api`.

### Auth

`POST /api/auth/register`

```json
{
  "email": "demo@kaires.local",
  "password": "secret123",
  "name": "Kaires User"
}
```

Creates a user, starts a session, and creates a default `free` subscription.

`POST /api/auth/login`

```json
{
  "email": "demo@kaires.local",
  "password": "secret123"
}
```

Starts a cookie session.

`POST /api/auth/logout`

Clears the current session.

`GET /api/me`

Returns the current user, subscription, masked API Key metadata, and gateway mode.

### Subscription

`POST /api/subscription`

```json
{
  "plan": "pro"
}
```

Supported plans:

| Plan | Monthly chat limit |
| ---- | ------------------ |
| `free` | 100 |
| `pro` | 2,000 |
| `team` | 10,000 |

### API Key Management

`POST /api/api-key/refresh`

Refreshes the user's managed API Key and stores only an encoded server-side copy plus masked metadata for the UI.

Example response:

```json
{
  "apiKey": {
    "provider": "managed-api",
    "token_id": "123",
    "masked_key": "sk-kai********abcd",
    "refreshed_at": "2026-05-18T00:00:00.000Z"
  },
  "gateway": {
    "mock": false
  }
}
```

### Chat

`POST /api/chat`

```json
{
  "model": "KAIROS Pro",
  "messages": [
    { "role": "user", "content": "Hello" }
  ]
}
```

The backend checks the user's subscription quota, ensures a managed API Key exists, proxies the chat request through the gateway, stores message history, and increments monthly usage.

## Database

SQLite data is stored at `KAIRES_DB_PATH`, defaulting to `./data/kaires.sqlite`.

Tables:

- `users`: registered users and password hashes
- `sessions`: cookie sessions
- `subscriptions`: plan, status, limit, usage, period end
- `api_keys`: managed API Key metadata and server-side key storage
- `chat_messages`: persisted chat history

The `data/` directory is ignored by git.

## Frontend Routes

- `/login`: register and login
- `/chat`: chat interface
- `/chat/:id`: chat route placeholder for history items
- `/image`: image workbench
- `/account`: account, subscription, and API management

## Verification

Run the frontend build:

```bash
npm run build
```

Run the backend end-to-end flow:

```bash
npm run test:flow
```

The flow covers:

1. User registration
2. Subscription update
3. API Key refresh
4. Chat request through the backend
5. Subscription usage increment

## Deployment Notes

- Use Node 22 or newer because the backend depends on `node:sqlite`.
- Set `KAIRES_DB_PATH` to a persistent writable path.
- Set `GATEWAY_MOCK=0` in production.
- Keep gateway credentials server-side only.
- Serve the built frontend from `dist/` and route `/api/*` to the serverless backend.
