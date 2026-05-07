<div align="center">

<br/>

```
██╗   ██╗████████╗███████╗██╗      ██████╗ ██╗    ██╗
╚██╗ ██╔╝╚══██╔══╝██╔════╝██║     ██╔═══██╗██║    ██║
 ╚████╔╝    ██║   █████╗  ██║     ██║   ██║██║ █╗ ██║
  ╚██╔╝     ██║   ██╔══╝  ██║     ██║   ██║██║███╗██║
   ██║      ██║   ██║     ███████╗╚██████╔╝╚███╔███╔╝
   ╚═╝      ╚═╝   ╚═╝     ╚══════╝ ╚═════╝  ╚══╝╚══╝
```

### YouTube Strategy & Content Planner

**AI-powered content strategy. SEO-ready plans. 60 seconds.**

<br/>

[**Live Demo**](https://ytflow-app.netlify.app/) · [**Report a Bug**](../../issues/new?template=bug_report.md) · [**Request a Feature**](../../issues/new?template=feature_request.md)

<br/>

</div>

---

## What is YTFlow?

YTFlow solves a simple but painful problem: **YouTube creators waste 3–5 hours every week on content planning** — brainstorming in blank documents, manually checking competitor channels, writing titles by guesswork, and scheduling uploads in disconnected spreadsheets.

Enter a topic. Choose a mode. Get a complete, ready-to-execute content strategy in under 60 seconds.

```
Input:  "Personal Finance for College Students India"
        └── Ideas Mode  OR  7-Day Calendar Mode

Output: ✓ 5 video ideas
        ✓ 3 SEO-optimised title variants per idea
        ✓ 15+ relevant tags
        ✓ Ready-to-publish description
        ✓ Full 7-day publishing calendar  (Calendar Mode)
        ✓ Save to personal plan library
```

---

## Features

| Feature | Description |
|---------|-------------|
| 🤖 **AI Content Generation** | Groq LLaMA3-8B generates structured JSON plans — never unformatted prose |
| 📅 **7-Day Calendar Mode** | One-click weekly publishing calendar with a unique angle per day |
| 🔍 **YouTube Analytics** | Paste any channel or video URL — get real-time views, CTR, subscriber count, and engagement rate via YouTube Data API v3 |
| 💾 **Saved Plans Library** | Full CRUD — save, view, and delete plans from your personal dashboard |
| 🔐 **JWT Authentication** | Secure registration and login; all routes protected via Express middleware |
| 📊 **Interactive Dashboard** | Plans saved, plans this month, last generation date — all at a glance |
| ⚡ **Fallback Resilience** | If Groq times out, the app returns a graceful error state — it never crashes |
| 📱 **Mobile Responsive** | Fully usable on 375px mobile viewports |

---

## Tech Stack

```
┌─────────────────────────────────────────────────────────────┐
│                        FRONTEND                             │
│   React 18 + Vite · React Router v6 · Axios · Recharts     │
│   Plain CSS (glassmorphism + neon) · JWT in localStorage    │
├─────────────────────────────────────────────────────────────┤
│                        BACKEND                              │
│   Node.js + Express · jsonwebtoken · bcryptjs              │
│   Groq SDK (llama3-8b-8192) · YouTube Data API v3          │
├─────────────────────────────────────────────────────────────┤
│                        DATABASE                             │
│   MongoDB Atlas (free tier) · Mongoose ODM                  │
├─────────────────────────────────────────────────────────────┤
│                     INFRASTRUCTURE                          │
│   Frontend → Vercel  ·  Backend → Render  ·  DB → Atlas    │
│   Uptime → UptimeRobot (pings /api/health every 5 min)     │
└─────────────────────────────────────────────────────────────┘
```

---

## Project Structure

```
ytflow/
├── client/                         # React (Vite) frontend
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Card.jsx
│   │   │   ├── Loader.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Planner.jsx
│   │   │   ├── SavedPlans.jsx
│   │   │   ├── PlanDetails.jsx
│   │   │   ├── Analytics.jsx
│   │   │   ├── Features.jsx
│   │   │   ├── HowItWorks.jsx
│   │   │   ├── Blog.jsx
│   │   │   ├── BlogDetail.jsx
│   │   │   ├── Tutorial.jsx
│   │   │   ├── FAQ.jsx
│   │   │   ├── Contact.jsx
│   │   │   ├── Privacy.jsx
│   │   │   └── Terms.jsx
│   │   ├── App.jsx
│   │   ├── App.css                 # All styles — glassmorphism, neon, responsive
│   │   ├── api.js                  # Axios instance with JWT interceptor
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js              # /api proxy → localhost:5000
│
├── server/                         # Express backend
│   ├── models/
│   │   ├── User.js                 # name, email, password (hashed)
│   │   └── Plan.js                 # userId, topic, type, content, createdAt
│   ├── routes/
│   │   ├── auth.js                 # POST /register, POST /login
│   │   ├── generate.js             # POST /generate (Groq AI)
│   │   └── plans.js                # GET / POST / DELETE /plans
│   ├── middleware/
│   │   └── auth.js                 # JWT verification middleware
│   ├── server.js
│   ├── package.json
│   └── .env.example
│
├── .gitignore
└── README.md
```

---

## Getting Started

### Prerequisites

- **Node.js** v18 or higher — [Download](https://nodejs.org)
- **MongoDB** — local instance or [Atlas free tier](https://www.mongodb.com/atlas) (512 MB, no credit card)
- **Groq API key** — free at [console.groq.com](https://console.groq.com) (no billing required)
- **YouTube Data API v3 key** — free quota via [Google Cloud Console](https://console.cloud.google.com)

---

### 1 · Clone the repository

```bash
git clone https://github.com/your-username/ytflow.git
cd ytflow
```

---

### 2 · Configure the server

```bash
cd server
npm install
cp .env.example .env
```

Open `server/.env` and fill in your values:

```env
# ── Database ─────────────────────────────────────────────────
MONGO_URI=mongodb+srv://<user>:<password>@cluster0.xxxxx.mongodb.net/ytflow

# ── Auth ─────────────────────────────────────────────────────
JWT_SECRET=replace_with_a_long_random_string_minimum_32_chars

# ── AI ───────────────────────────────────────────────────────
GROQ_API_KEY=gsk_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# ── YouTube ──────────────────────────────────────────────────
YOUTUBE_API_KEY=AIzaSyxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# ── Server ───────────────────────────────────────────────────
PORT=5000
NODE_ENV=development
```

> **Getting your MongoDB URI from Atlas**
> 1. Create a free cluster → Connect → Drivers → copy the connection string.
> 2. Replace `<username>` and `<password>` with your Atlas credentials.
> 3. Append `/ytflow` as the database name before the `?retryWrites` query.

---

### 3 · Configure the client

```bash
cd ../client
npm install
```

For local development, the Vite proxy in `vite.config.js` automatically forwards `/api` requests to `http://localhost:5000` — no changes needed.

For production builds, create `client/.env`:

```env
VITE_API_URL=https://your-backend.onrender.com/api
```

Then update `client/src/api.js`:

```js
// Replace:
baseURL: '/api'

// With:
baseURL: import.meta.env.VITE_API_URL || '/api'
```

---

### 4 · Run the app

```bash
# Terminal 1 — backend
cd server && npm run dev
# Expected: "Server running on port 5000" + "MongoDB connected"

# Terminal 2 — frontend
cd client && npm run dev
# Opens at http://localhost:5173
```

---

## API Reference

### Base URL

```
Development:  http://localhost:5000/api
Production:   https://your-backend.onrender.com/api
```

---

### Authentication

All protected endpoints require a `Bearer` token in the `Authorization` header:

```
Authorization: Bearer <your_jwt_token>
```

---

### Endpoints

#### `POST /auth/register`
Register a new user.

**Request body**
```json
{
  "name": "Subhadip Dey",
  "email": "subhadip@example.com",
  "password": "your_password"
}
```

**Response `201`**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": { "id": "...", "name": "Subhadip Dey", "email": "subhadip@example.com" }
}
```

---

#### `POST /auth/login`
Login and receive a JWT.

**Request body**
```json
{
  "email": "subhadip@example.com",
  "password": "your_password"
}
```

**Response `200`**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": { "id": "...", "name": "Subhadip Dey" }
}
```

---

#### `POST /generate` 🔒
Generate an AI content plan.

**Request body**
```json
{
  "topic": "Personal Finance for College Students India",
  "mode": "ideas"
}
```

`mode` accepts `"ideas"` (5-idea bundle) or `"calendar"` (7-day plan).

**Response `200`**
```json
{
  "ideas": [
    "How to Build an Emergency Fund on ₹5,000/Month",
    "5 Best Zero-Fee Student Bank Accounts in India 2026",
    "..."
  ],
  "titles": [
    ["Title Variant A", "Title Variant B", "Title Variant C"],
    "..."
  ],
  "tags": ["personal finance india", "student budget", "..."],
  "description": "Ready-to-publish video description...",
  "calendar": null
}
```

For `"calendar"` mode, `calendar` is an array of 7 objects `{ day, topic, title, angle }`.

---

#### `GET /plans` 🔒
Retrieve all saved plans for the authenticated user.

**Response `200`**
```json
[
  {
    "_id": "664abc...",
    "topic": "Personal Finance for College Students India",
    "type": "ideas",
    "content": { ... },
    "createdAt": "2026-04-18T10:30:00.000Z"
  }
]
```

---

#### `POST /plans` 🔒
Save a generated plan.

**Request body**
```json
{
  "topic": "Personal Finance for College Students India",
  "type": "ideas",
  "content": { ... }
}
```

**Response `201`** — Returns the saved plan object.

---

#### `DELETE /plans/:id` 🔒
Delete a saved plan by ID.

**Response `200`**
```json
{ "message": "Plan deleted successfully" }
```

---

#### `GET /analytics` 🔒
Fetch YouTube channel or video statistics.

**Request body**
```json
{
  "url": "https://www.youtube.com/@mkbhd"
}
```

**Response `200`**
```json
{
  "channelTitle": "Marques Brownlee",
  "subscriberCount": "18400000",
  "viewCount": "4200000000",
  "videoCount": "1800",
  "recentVideos": [ { "title": "...", "views": "...", "publishedAt": "..." } ]
}
```

---

#### `GET /health`
Server health check. Used by UptimeRobot to prevent Render cold starts.

**Response `200`**
```json
{ "status": "ok", "uptime": 3600 }
```

---

## Deployment

### Frontend → Netlify

1. Push the `client` folder to GitHub (or use a monorepo).
2. Import the project on [vercel.com](https://netlify.com).
3. Set the following in **Project Settings → Environment Variables**:

   | Variable | Value |
   |----------|-------|
   | `VITE_API_URL` | `https://your-backend.onrender.com/api` |

4. Set **Build Command** to `npm run build` and **Output Directory** to `dist`.
5. Deploy. Vercel handles SSL and CDN automatically.

---

### Backend → Render

1. Create a new **Web Service** on [render.com](https://render.com).
2. Point it to your repository root (or `server/` subfolder).
3. Set **Start Command** to `node server.js`.
4. Add the following environment variables:

   | Variable | Value |
   |----------|-------|
   | `MONGO_URI` | Your Atlas connection string |
   | `JWT_SECRET` | A strong 32+ character random string |
   | `GROQ_API_KEY` | `gsk_...` |
   | `YOUTUBE_API_KEY` | `AIzaSy...` |
   | `NODE_ENV` | `production` |

5. Enable **Auto-Deploy** from your main branch.

> **Prevent cold starts on Render free tier**
> Add your `/api/health` URL to [UptimeRobot](https://uptimerobot.com) as an HTTP monitor, pinging every 5 minutes. Free plan supports 50 monitors.

---

### Database → MongoDB Atlas

1. Create a free **M0 cluster** (512 MB, always free).
2. Under **Network Access**, add `0.0.0.0/0` to allow connections from Render's dynamic IPs.
3. Under **Database Access**, create a user with **readWrite** access to the `ytflow` database.
4. Copy the connection string and paste it as `MONGO_URI` in your Render environment.

---

## Environment Variables Reference

### Server (`server/.env`)

| Variable | Required | Description |
|----------|----------|-------------|
| `MONGO_URI` | ✅ | MongoDB Atlas connection string |
| `JWT_SECRET` | ✅ | Secret key for JWT signing. Use a 32+ char random string. |
| `GROQ_API_KEY` | ✅ | Groq API key from console.groq.com |
| `YOUTUBE_API_KEY` | ✅ | YouTube Data API v3 key from Google Cloud Console |
| `PORT` | ✅ | Port for Express server (default `5000`) |
| `NODE_ENV` | ✅ | `development` or `production` |

### Client (`client/.env`)

| Variable | Required | Description |
|----------|----------|-------------|
| `VITE_API_URL` | Production only | Full URL of your deployed backend API |

---

## Rate Limits & Quotas

| Service | Free Tier Limit | Notes |
|---------|----------------|-------|
| Groq API | 30 req/min · 6,000 req/day | Resets daily. Increase by upgrading plan. |
| YouTube Data API v3 | 10,000 units/day | Each analytics fetch costs ~3–5 units. |
| MongoDB Atlas M0 | 512 MB storage · 500 connections | Sufficient for thousands of saved plans. |
| Render (free) | 750 hrs/month · sleeps after 15 min idle | Solved by UptimeRobot health ping. |

---

## Local Development Tips

```bash
# Run both frontend and backend concurrently (from root)
npm install -g concurrently
concurrently "cd server && npm run dev" "cd client && npm run dev"

# Seed the database with a test user
cd server && node scripts/seed.js

# Test the /generate endpoint directly
curl -X POST http://localhost:5000/api/generate \
  -H "Authorization: Bearer <your_token>" \
  -H "Content-Type: application/json" \
  -d '{"topic": "Budget smartphones India", "mode": "ideas"}'
```

---

## Known Limitations

- **Groq response time** can reach 30–45 seconds under heavy load. A loading spinner is shown on the frontend during generation.
- **YouTube API quota** resets at midnight Pacific Time. If analytics returns a 403, the daily quota has been exhausted.
- **Render cold start** takes 30–60 seconds after 15 minutes of inactivity on the free tier. UptimeRobot prevents this during active usage.
- **MongoDB Atlas M0** does not support transactions or change streams. These features are not required by YTFlow.

---

## Roadmap

- [ ] **Multilingual output** — Hindi, Bengali, Tamil plan generation (v2.0)
- [ ] **Direct YouTube publish** — OAuth 2.0 + YouTube Upload API integration (v2.0)
- [ ] **AI chat refinement sidebar** — Iterate on generated plans conversationally (v2.0)
- [ ] **Full YouTube OAuth analytics** — Private channel data with creator consent (v2.0)
- [ ] **Mobile app** — React Native client post-revenue (v3.0)
- [ ] **Competitor bulk analysis** — Batch YouTube API calls with rate-limit management (v3.0)
- [ ] **B2B Agency API** — White-label plan generation at scale for content agencies (v3.0)

---

## Contributing

Contributions are welcome. Please follow these steps:

1. Fork the repository.
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m "feat: add your feature"`
4. Push to your fork: `git push origin feature/your-feature-name`
5. Open a pull request against `main`.

Please follow [Conventional Commits](https://www.conventionalcommits.org/) for commit messages and ensure your code passes `eslint` before opening a PR.

---

## License

This project is licensed under the **MIT License**. See [LICENSE](LICENSE) for details.

---

## Team

Built by **POD 60** — B.Tech Information Technology, Haldia Institute of Technology (2026)

---

<div align="center">

Made with ❤️ for creators who deserve a better strategy system.

**[ytflow.netlify.app](https://ytflow-app.netlify.app)**

</div>
