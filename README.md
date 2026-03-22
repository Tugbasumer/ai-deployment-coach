# 🚀 AI Deployment Coach

An AI-powered web app that analyzes your application description and instantly generates a tailored deployment strategy — including platform recommendations, cost estimates, risk assessment, and step-by-step deployment plans.

## ✨ Features

- ⚡ Instant deployment analysis
- 💰 Cost estimation by traffic scale
- 🛡️ Risk level assessment
- 📋 Dynamic step-by-step deployment plan
- 💡 Pro tips per project type
- 📋 Copy-to-clipboard results
- 📄 CV link in navbar

## 🛠️ Tech Stack

- **Frontend**: React + Vite
- **Backend**: Node.js + Express
- **Styling**: Vanilla CSS (glassmorphism dark theme)

## 🏃 Run Locally

### Backend
```bash
npm install
node server.js
# Runs on http://localhost:3000
```

### Frontend
```bash
cd frontend
npm install
npm run dev
# Runs on http://localhost:5173
```

## 🌐 Deploy

### Backend → [Render.com](https://render.com) (Free)
1. Push code to GitHub
2. Go to render.com → New Web Service
3. Connect your repo, set build command: `npm install`, start command: `node server.js`
4. Copy the Render URL (e.g. `https://ai-deployment-coach.onrender.com`)

### Frontend → [Vercel](https://vercel.com) or [Cloudflare Pages](https://pages.cloudflare.com) (Free)
1. Go to vercel.com → New Project → Import your GitHub repo
2. Set **Root Directory** to `frontend`
3. Add environment variable: `VITE_API_URL` = your Render backend URL
4. Deploy!

## 📁 Project Structure

```
ai-deployment-coach/
├── server.js          # Express backend API
├── package.json
├── frontend/
│   ├── src/
│   │   ├── App.jsx    # Main React component
│   │   └── index.css  # All styles
│   ├── index.html
│   └── package.json
```
