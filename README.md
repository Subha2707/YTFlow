Here's a professional, complete `README.md` for your project. Place it at the root of your repository.

```markdown
# 🎬 YouTube Strategy & Content Planner

A full‑stack SaaS platform that helps YouTube creators generate unique content ideas, optimize SEO, and plan their content strategy using AI — powered by **Groq** (free tier). Built with React, Node.js, Express, MongoDB, and JWT authentication.

![GitHub repo size](https://img.shields.io/github/repo-size/your-username/youtube-strategy-planner)
![GitHub license](https://img.shields.io/github/license/your-username/youtube-strategy-planner)

---

## ✨ Features

- **AI Content Generation** – Get 5 distinct video ideas, SEO titles, tags, and a compelling description from a single topic (uses Groq Llama3 / Mixtral models).
- **User Authentication** – Secure JWT‑based login and registration.
- **Save & Retrieve Plans** – All generated plans are stored in your own dashboard.
- **Responsive Glassmorphism + Neon UI** – Modern, polished, mobile‑first design.
- **Smart Prompt Engineering** – Cleans messy user input and forces creative, varied outputs every time.
- **Fallback Data** – If the AI API fails, the system still delivers relevant demo content.

---

## 🧠 Tech Stack

| Frontend | Backend | Database | AI |
|----------|---------|----------|-----|
| React (Vite) | Node.js + Express | MongoDB (Atlas) | Groq API |
| React Router DOM | JWT (jsonwebtoken) | Mongoose | Llama3‑8B |
| Plain CSS (no Tailwind) | bcryptjs | | |

---

## 📁 Folder Structure

```
youtube-strategy-planner/
├── client/                 # React (Vite) frontend
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/     # Navbar, Card, Loader, ProtectedRoute
│   │   ├── pages/          # Home, Login, Register, Dashboard, Planner, SavedPlans
│   │   ├── App.jsx
│   │   ├── App.css         # All styling (glassmorphism, neon, responsive)
│   │   ├── api.js          # Axios instance with JWT interceptor
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
├── server/                 # Express backend
│   ├── models/             # User.js, Plan.js
│   ├── routes/             # auth.js, generate.js, plans.js
│   ├── middleware/         # auth.js (JWT verify)
│   ├── server.js
│   ├── package.json
│   └── .env.example
├── .gitignore
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16+ recommended)
- MongoDB instance (local or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) – free tier works)
- [Groq API Key](https://console.groq.com) (free, used for AI generation)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/youtube-strategy-planner.git
   cd youtube-strategy-planner
   ```

2. **Install server dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Install client dependencies**
   ```bash
   cd ../client
   npm install
   ```

4. **Set up environment variables**

   - Create a `.env` file in the `server` folder. Use the provided `.env.example` as a template.

   ```env
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=a_strong_random_string
   GROQ_API_KEY=gsk_your_groq_api_key
   PORT=5000
   ```

   - To get your `MONGO_URI` from Atlas:
     1. Connect to your cluster → “Drivers” → copy the connection string.
     2. Replace `<username>`, `<password>`, and the database name (e.g., `youtube_planner`).
     3. If you’re using a local MongoDB, use `mongodb://localhost:27017/youtube_planner`.

   - To get a `GROQ_API_KEY`:
     - Sign up at [console.groq.com](https://console.groq.com), then create an API key.

### Running the App

1. **Start the backend**
   ```bash
   cd server
   npm run dev
   ```
   You should see: `Server running on port 5000` and `MongoDB connected`.

2. **Start the frontend**
   Open a new terminal:
   ```bash
   cd client
   npm run dev
   ```
   The app will run on `http://localhost:5173` (or `3000` depending on your Vite config).

   The frontend **automatically proxies `/api` requests** to the backend at `http://localhost:5000` — this is configured in `client/vite.config.js`.

---

## 🔌 API Endpoints

### Authentication

| Method | Endpoint           | Description          | Auth |
|--------|--------------------|----------------------|------|
| POST   | `/api/auth/register` | Register a new user  | No   |
| POST   | `/api/auth/login`    | Login, returns JWT   | No   |

### Content Generation

| Method | Endpoint         | Description                          | Auth |
|--------|------------------|--------------------------------------|------|
| POST   | `/api/generate`  | Generate ideas, titles, tags, desc   | Yes  |

Body: `{ "topic": "your topic" }`  
Returns: JSON object with `ideas`, `titles`, `tags`, `description`.

### Plans

| Method | Endpoint    | Description                       | Auth |
|--------|-------------|-----------------------------------|------|
| POST   | `/api/plans` | Save a new plan                   | Yes  |
| GET    | `/api/plans` | Get all plans for logged‑in user  | Yes  |

---

## 🌍 Deployment

### Frontend (Vercel / Netlify)

1. Push your `client` folder to a GitHub repo (or a monorepo).
2. On Vercel / Netlify, import the project.
3. Set **Build Command**: `npm run build`
4. Set **Output Directory**: `dist`
5. Add environment variable: `VITE_API_URL` pointing to your backend URL (e.g., `https://your-backend.onrender.com/api`), then update `api.js` to use that variable instead of `/api`.

### Backend (Render / Railway)

1. Deploy the `server` folder as a Web Service.
2. Set the following environment variables:
   - `MONGO_URI`
   - `JWT_SECRET`
   - `GROQ_API_KEY`
   - `PORT` (Render provides this automatically)
3. Start command: `node server.js`

### Performance Tips

- Use `compression` middleware on the backend.
- Add pagination to `/plans` if you have many entries.
- Consider lazy‑loading routes in React with `React.lazy()`.

---

## 🤝 Contributing

Contributions are welcome! Please open an issue or submit a pull request.

---

## 📝 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## 💬 Support

If you run into any issues, feel free to open a GitHub issue or reach out to [your-email@example.com].

---

Made with ❤️ for creators who want to grow their YouTube channels.
```

Replace `your-username` and contact details as needed. This README gives a polished overview and clear instructions for anyone to set up and run the project.
