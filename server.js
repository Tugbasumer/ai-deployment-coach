import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ─── Routes ────────────────────────────────────────────────────────────────────
app.get("/", (req, res) => {
  res.json({ status: "ok", message: "AI Deployment Coach API 🚀", version: "2.0.0" });
});

app.get("/health", (req, res) => {
  res.json({ status: "healthy", uptime: process.uptime() });
});

app.get("/examples", (req, res) => {
  res.json({
    examples: [
      "React + Node.js, 10k users/day",
      "Python Flask + AI model, GPU needed",
      "Next.js e-commerce, 50k monthly visitors",
      "Vue.js static site, small blog",
      "Full-stack app with PostgreSQL, 5k users",
      "Microservices with Docker, enterprise scale",
    ]
  });
});

// ─── Smart Analysis Engine ─────────────────────────────────────────────────────
function analyzeDeployment(input) {
  const t = input.toLowerCase();

  let platform = "Vercel";
  let platformTag = "Recommended";

  if (t.includes("microservice") || t.includes("docker") || t.includes("kubernetes")) {
    platform = "AWS ECS / Kubernetes";
    platformTag = "Enterprise";
  } else if (t.includes("ai") || t.includes("ml") || t.includes("gpu")) {
    platform = "AWS EC2 (GPU) / RunPod";
    platformTag = "GPU Required";
  } else if (t.includes("python") || t.includes("flask")) {
    platform = "Render / Railway";
    platformTag = "Python-Optimized";
  } else if (t.includes("node") || t.includes("express")) {
    platform = "Render + Vercel";
    platformTag = "Full-Stack";
  }

  return { platform, platformTag };
}

// ─── API Route ────────────────────────────────────────────────────────────────
app.post("/analyze", (req, res) => {
  const { prompt } = req.body;
  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required" });
  }

  const result = analyzeDeployment(prompt);
  res.json(result);
});

// ─── SERVER START ─────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 AI Deployment Coach API running on port ${PORT}`);
});
