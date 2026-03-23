import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ status: "ok", message: "AI Deployment Coach API 🚀", version: "2.0.0" });
});

app.get("/health", (req, res) => {
  res.json({ status: "healthy", uptime: process.uptime() });
});

app.use((req, res) => {
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

  // === Platform Detection ===
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

  // === Traffic / User Scale ===
  const hasHighTraffic =
    t.includes("10k") || t.includes("50k") || t.includes("100k") ||
    t.includes("10000") || t.includes("50000") || t.includes("100000") ||
    t.includes("million") || t.includes("enterprise") || t.includes("large");

  const hasMediumTraffic =
    t.includes("5k") || t.includes("1k") || t.includes("5000") ||
    t.includes("1000") || t.includes("thousands");

  // === Cost Estimation ===
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

  // === Risk Level ===
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

  // === Scaling Advice ===
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

  // === Step-by-Step Plan ===
  const steps = buildSteps(t, platform);

  // === Pro Tips ===
  const tips = buildTips(t);

  return {
    platform,
    platformTag,
    cost,
    costTag,
    risk,
    riskTag,
    riskColor,
    scaling,
    scalingTag,
    steps,
    tips,
  };
}

function buildSteps(t, platform) {
  const steps = [];

  // Frontend
  if (t.includes("react") || t.includes("vue") || t.includes("next") || t.includes("svelte") || t.includes("nuxt")) {
    steps.push("Run `npm run build` to generate a production bundle");
    steps.push("Deploy frontend to Vercel via GitHub integration or Vercel CLI");
  } else if (t.includes("static") || t.includes("html")) {
    steps.push("Deploy static files to Netlify (drag & drop or Git-connected)");
  }

  // Backend
  if (t.includes("node") || t.includes("express") || t.includes("backend")) {
    steps.push("Push backend to GitHub; connect repo to Render.com");
    steps.push("Set all environment variables in Render's dashboard");
    steps.push("Enable auto-deploy on push to main branch");
  }

  if (t.includes("python") || t.includes("flask") || t.includes("django") || t.includes("fastapi")) {
    steps.push("Create a `requirements.txt` and add a `Procfile` for the Python server");
    steps.push("Deploy to Railway or Render; set SECRET_KEY and DB_URL env vars");
  }

  // Database
  if (t.includes("postgres") || t.includes("postgresql")) {
    steps.push("Provision a PostgreSQL instance on Supabase or Railway");
    steps.push("Set DATABASE_URL environment variable and run migrations");
  } else if (t.includes("mongo") || t.includes("mongodb")) {
    steps.push("Create a MongoDB Atlas cluster (free tier available)");
    steps.push("Whitelist server IP and set MONGO_URI environment variable");
  } else if (t.includes("database") || t.includes("db")) {
    steps.push("Choose a managed database provider (PlanetScale, Supabase, or MongoDB Atlas)");
  }

  // AI/ML steps
  if (t.includes("ai") || t.includes("ml") || t.includes("gpu") || t.includes("model")) {
    steps.push("Package your AI model and upload to Hugging Face Hub or S3");
    steps.push("Deploy to a GPU-enabled instance (RunPod or AWS EC2 p3)");
    steps.push("Expose as API endpoint and add request throttling / rate limiting");
  }

  // Generic tail steps
  if (t.includes("docker")) {
    steps.push("Build and tag your Docker image; push to Docker Hub or AWS ECR");
    steps.push("Deploy container to your cloud platform and configure health checks");
  }

  steps.push("Set up a custom domain and enable HTTPS via Let's Encrypt / Cloudflare");
  steps.push("Configure monitoring alerts (UptimeRobot + Sentry for error tracking)");

  return steps;
}

function buildTips(t) {
  const tips = [];

  if (t.includes("react") || t.includes("vue") || t.includes("next")) {
    tips.push("Use Lighthouse CI in your GitHub Actions pipeline to catch performance regressions before deploy");
  }
  if (t.includes("database") || t.includes("postgres") || t.includes("mongo")) {
    tips.push("Always enable automated daily backups before going to production — recovery is priceless");
  }
  if (t.includes("ai") || t.includes("ml")) {
    tips.push("Cache your model in memory between requests to reduce cold start latency by up to 80%");
  }
  if (t.includes("node") || t.includes("python")) {
    tips.push("Use a `.env.example` file in your repo so future contributors know what variables are needed");
  }
  tips.push("Implement a `/health` endpoint — essential for uptime monitoring and load balancer readiness probes");
  if (!t.includes("enterprise")) {
    tips.push("Start on a free/hobby tier, set a budget alert, and scale up only when metrics demand it");
  }

  return tips.slice(0, 3); // Return max 3 tips
}

// ─── Routes ────────────────────────────────────────────────────────────────────
app.post("/analyze", (req, res) => {
  const { prompt } = req.body;
  if (!prompt || typeof prompt !== "string" || prompt.trim().length === 0) {
    return res.status(400).json({ error: "Prompt is required" });
  }
  const result = analyzeDeployment(prompt.trim());
  res.json(result);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`\n🚀 AI Deployment Coach API running on http://localhost:${PORT}\n`);
});
