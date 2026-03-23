import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// __dirname tanımı (ES module için gerekli)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ─── Routes ────────────────────────────────────────────────────────────────────
app.get('/', (req, res) => {
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

  if (t.includes("microservice") || t.includes("docker") || t.includes("kubernetes") || t.includes("k8s")) {
    platform = "AWS ECS / Kubernetes";
    platformTag = "Enterprise";
  } else if (t.includes("ai") || t.includes("machine learning") || t.includes("ml") || t.includes("gpu") || t.includes("pytorch") || t.includes("tensorflow")) {
    platform = "AWS EC2 (GPU) / RunPod";
    platformTag = "GPU Required";
  } else if (t.includes("python") || t.includes("flask") || t.includes("django") || t.includes("fastapi")) {
    platform = "Render / Railway";
    platformTag = "Python-Optimized";
  } else if (t.includes("node") || t.includes("express") || (t.includes("react") && t.includes("backend"))) {
    platform = "Render + Vercel";
    platformTag = "Full-Stack";
  } else if (t.includes("next") || t.includes("nuxt") || t.includes("sveltekit")) {
    platform = "Vercel (Edge)";
    platformTag = "Edge-Optimized";
  } else if (t.includes("postgres") || t.includes("mysql") || t.includes("database") || t.includes("db")) {
    platform = "Railway / Supabase + Vercel";
    platformTag = "DB Included";
  } else if (t.includes("static") || t.includes("blog") || t.includes("landing")) {
    platform = "Netlify / GitHub Pages";
    platformTag = "Free Tier";
  } else if (t.includes("enterprise") || t.includes("corporate") || t.includes("compliance")) {
    platform = "AWS / Azure / GCP";
    platformTag = "Enterprise";
  }

  const hasHighTraffic =
    t.includes("10k") || t.includes("50k") || t.includes("100k") ||
    t.includes("10000") || t.includes("50000") || t.includes("100000") ||
    t.includes("million") || t.includes("enterprise") || t.includes("large");

  const hasMediumTraffic =
    t.includes("5k") || t.includes("1k") || t.includes("5000") ||
    t.includes("1000") || t.includes("thousands");

  let cost = "$0-5/month";
  let costTag = "Free Tier";

  if (t.includes("ai") || t.includes("ml") || t.includes("gpu") || t.includes("pytorch") || t.includes("tensorflow")) {
    cost = "$50-200+/month";
    costTag = "Compute Heavy";
  } else if (t.includes("enterprise") || t.includes("microservice") || t.includes("kubernetes")) {
    cost = "$200-1000+/month";
    costTag = "Enterprise";
  } else if (hasHighTraffic) {
    cost = "$30-80/month";
    costTag = "Scaled";
  } else if (hasMediumTraffic) {
    cost = "$10-30/month";
    costTag = "Growing";
  } else if (t.includes("node") || t.includes("python") || t.includes("backend") || t.includes("database")) {
    cost = "$7-20/month";
    costTag = "Backend Included";
  } else if (t.includes("static") || t.includes("blog") || t.includes("landing")) {
    cost = "$0/month";
    costTag = "Free";
  }

  let risk = "Low – straightforward deployment";
  let riskTag = "Low Risk";
  let riskColor = "green";

  if (t.includes("ai") || t.includes("gpu") || t.includes("ml")) {
    risk = "High – AI/ML workloads require careful resource planning and cold start management";
    riskTag = "High Risk";
    riskColor = "orange";
  } else if (hasHighTraffic || t.includes("enterprise") || t.includes("microservice")) {
    risk = "Medium-High – High traffic demands load balancing, auto-scaling, and CDN";
    riskTag = "Medium Risk";
    riskColor = "orange";
  } else if (hasMediumTraffic || t.includes("database") || t.includes("auth")) {
    risk = "Medium – Database and auth layers add complexity, plan for backups";
    riskTag = "Medium Risk";
    riskColor = "orange";
  }

  let scaling = "No scaling needed — free tier is sufficient";
  let scalingTag = "No Action";

  if (t.includes("ai") || t.includes("ml") || t.includes("gpu")) {
    scaling = "Use GPU spot instances; implement model caching and request batching";
    scalingTag = "GPU Scaling";
  } else if (t.includes("enterprise") || t.includes("microservice") || t.includes("kubernetes")) {
    scaling = "Horizontal auto-scaling with Kubernetes HPA; use a service mesh for microservices";
    scalingTag = "Auto-Scale";
  } else if (hasHighTraffic) {
    scaling = "Enable auto-scaling + CDN (Cloudflare); use Redis for session caching";
    scalingTag = "CDN + Cache";
  } else if (hasMediumTraffic) {
    scaling = "Monitor with Datadog/Grafana; plan upgrade path to paid tier at 80% usage";
    scalingTag = "Monitor";
  }

  return { platform, platformTag, cost, costTag, risk, riskTag, riskColor, scaling, scalingTag };
}

// ─── API Route ────────────────────────────────────────────────────────────────
app.post("/analyze", (req, res) => {
  const { prompt } = req.body;
  if (!prompt || typeof prompt !== "string" || prompt.trim().length === 0) {
    return res.status(400).json({ error: "Prompt is required" });
  }
  const result = analyzeDeployment(prompt.trim());
  res.json(result);
});

// ─── FRONTEND SERVE ───────────────────────────────────────────────────────────
app.use(express.static(path.join(__dirname, "frontend/dist")));

app.use((req, res) => {
  res.sendFile(path.join(__dirname, "frontend/dist/index.html"));
});

// ─── SERVER START ─────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 AI Deployment Coach running on port ${PORT}`);
});
