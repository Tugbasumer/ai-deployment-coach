import { useState, useCallback } from "react";
import "./index.css";
import CVBuilder from "./CVBuilder.jsx";

const API_URL = import.meta.env.VITE_API_URL || "https://ai-deployment-coach.onrender.com/api";

fetch(`${API_URL}/analyze`)
const EXAMPLES = [
  "React + Node.js, 10k users/day",
  "Python Flask + AI model, GPU needed",
  "Next.js e-commerce, 50k monthly visitors",
  "Vue.js static site, small blog",
  "Full-stack app with PostgreSQL, 5k users",
  "Microservices with Docker, enterprise scale",
];

function LoadingDots() {
  return (
    <div className="loading-dots">
      <span /><span /><span />
    </div>
  );
}

function ResultCard({ icon, label, value, tag, tagColor, children, fullWidth, highlighted }) {
  return (
    <div className={`result-card${fullWidth ? " full-width" : ""}${highlighted ? " highlighted" : ""}`}>
      <div className="rc-header">
        <span className="rc-icon">{icon}</span>
        <span className="rc-label">{label}</span>
      </div>
      {value && <div className="rc-value">{value}</div>}
      {tag && <div className={`rc-tag ${tagColor}`}>{tag}</div>}
      {children}
    </div>
  );
}

function StepsList({ steps }) {
  return (
    <ul className="steps-list">
      {steps.map((step, i) => (
        <li key={i} className="step-item">
          <div className="step-num">{i + 1}</div>
          <span className="step-text">{step}</span>
        </li>
      ))}
    </ul>
  );
}

function DeploymentCoach() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const handleAnalyze = useCallback(async () => {
    if (!input.trim()) return;
    setLoading(true);
    setError("");
    setResult(null);
    try {
      const res = await fetch(`${API_URL}/analyze`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: input }),
      });
      if (!res.ok) throw new Error("Server error");
      const data = await res.json();
      setResult(data);
    } catch {
      setError("⚠️ Could not connect to server. Make sure the backend is running on port 3000.");
    } finally {
      setLoading(false);
    }
  }, [input]);

  const handleCopy = () => {
    if (!result) return;
    const text = [
      `Platform: ${result.platform}`,
      `Cost: ${result.cost}`,
      `Risk: ${result.risk}`,
      `Scaling: ${result.scaling}`,
      `Steps:\n${result.steps.map((s, i) => `${i + 1}. ${s}`).join("\n")}`,
    ].join("\n\n");
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) handleAnalyze();
  };

  return (
    <div className="main-content">

      {/* Hero */}
      <div className="hero">
        <div className="hero-badge">🧠 AI-Powered Analysis</div>
        <h1 className="hero-title">
          Deploy with <span className="gradient-text">Confidence</span>
        </h1>
        <p className="hero-subtitle">
          Describe your app and get instant platform recommendations, cost estimates, and a step-by-step deployment plan.
        </p>
        <div className="stats-row">
          <div className="stat-item">
            <span className="stat-num">8+</span>
            <span className="stat-label">Platforms</span>
          </div>
          <div className="stat-item">
            <span className="stat-num">Instant</span>
            <span className="stat-label">Analysis</span>
          </div>
          <div className="stat-item">
            <span className="stat-num">Free</span>
            <span className="stat-label">Forever</span>
          </div>
        </div>
      </div>

      {/* Analysis Card */}
      <div className="analysis-card">
        <div className="card-header">
          <div className="card-icon">🔍</div>
          <div className="card-header-text">
            <h2>Describe Your Application</h2>
            <p>Include stack, traffic, and any special requirements</p>
          </div>
        </div>

        <div className="textarea-wrapper">
          <textarea
            className="input-textarea"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="e.g. React + Node.js backend, 10k users/day, needs PostgreSQL database..."
            rows={4}
          />
          <span className="char-count">{input.length} chars</span>
        </div>

        <p className="examples-label">Quick Examples</p>
        <div className="chips-row">
          {EXAMPLES.map((ex) => (
            <button key={ex} className="chip" onClick={() => setInput(ex)}>
              {ex}
            </button>
          ))}
        </div>

        <button
          className="btn-analyze"
          onClick={handleAnalyze}
          disabled={loading || !input.trim()}
        >
          {loading ? (
            <>Analyzing <LoadingDots /></>
          ) : (
            <>🚀 Analyze Deployment</>
          )}
        </button>

        {error && (
          <div style={{ marginTop: 12, color: "var(--accent-orange)", fontSize: 13 }}>
            {error}
          </div>
        )}
      </div>

      {/* Results */}
      {result && (
        <div className="result-section">
          <div className="result-header">
            <span className="result-title">✅ Analysis Complete</span>
            <button className={`btn-copy${copied ? " copied" : ""}`} onClick={handleCopy}>
              {copied ? "✓ Copied!" : "📋 Copy Report"}
            </button>
          </div>

          <div className="result-grid">
            <ResultCard
              icon="🏗️"
              label="Recommended Platform"
              value={result.platform}
              tag={result.platformTag}
              tagColor="green"
              highlighted
            />
            <ResultCard
              icon="💰"
              label="Estimated Cost"
              value={result.cost}
              tag={result.costTag}
              tagColor="blue"
            />
            <ResultCard
              icon="⚠️"
              label="Risk Assessment"
              value={result.risk}
              tag={result.riskTag}
              tagColor={result.riskColor === "orange" ? "orange" : "green"}
            />
            <ResultCard
              icon="📈"
              label="Scaling Strategy"
              value={result.scaling}
              tag={result.scalingTag}
              tagColor="purple"
            />

            {result.steps?.length > 0 && (
              <ResultCard icon="📋" label="Deployment Steps" fullWidth>
                <StepsList steps={result.steps} />
              </ResultCard>
            )}

            {result.tips?.length > 0 && (
              <ResultCard icon="💡" label="Pro Tips" fullWidth>
                <ul className="steps-list">
                  {result.tips.map((tip, i) => (
                    <li key={i} className="step-item">
                      <div className="step-num" style={{ background: "linear-gradient(135deg, #f97316, #a855f7)" }}>
                        ✦
                      </div>
                      <span className="step-text">{tip}</span>
                    </li>
                  ))}
                </ul>
              </ResultCard>
            )}
          </div>
        </div>
      )}

      {/* Features */}
      {!result && (
        <div className="features-section">
          <div className="feature-card">
            <div className="feature-emoji">⚡</div>
            <div className="feature-name">Instant Analysis</div>
            <div className="feature-desc">Get deployment recommendations in under a second, no waiting.</div>
          </div>
          <div className="feature-card">
            <div className="feature-emoji">🎯</div>
            <div className="feature-name">Smart Platform Match</div>
            <div className="feature-desc">AI detects your stack and traffic to suggest the perfect host.</div>
          </div>
          <div className="feature-card">
            <div className="feature-emoji">📊</div>
            <div className="feature-name">Cost Breakdown</div>
            <div className="feature-desc">Real pricing estimates so you can budget before you build.</div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function App() {
  const [activeTab, setActiveTab] = useState("coach");

  return (
    <>
      {/* Animated Background */}
      <div className="bg-canvas">
        <div className="grid-overlay" />
        <div className="bg-orb bg-orb-1" />
        <div className="bg-orb bg-orb-2" />
        <div className="bg-orb bg-orb-3" />
      </div>

      <div className="app-layout">
        {/* Navbar */}
        <nav className="navbar">
          <div className="navbar-brand">
            <div className="navbar-logo">🚀</div>
            AI Deployment Coach
          </div>

          <div className="nav-tabs">
            <button
              className={`nav-tab${activeTab === "coach" ? " nav-tab-active" : ""}`}
              onClick={() => setActiveTab("coach")}
            >
              🚀 Coach
            </button>
            <button
              className={`nav-tab${activeTab === "cv" ? " nav-tab-active" : ""}`}
              onClick={() => setActiveTab("cv")}
            >
              📄 CV Builder
            </button>
          </div>

          <div className="navbar-pills">
            <div className="pill">
              <span className="dot" />
              Live
            </div>
            <div className="pill">v2.0</div>
          </div>
        </nav>

        {/* Page Content */}
        {activeTab === "coach" ? <DeploymentCoach /> : <CVBuilder />}

        {/* Footer */}
        <footer className="footer">
          <p>Built with ❤️ — AI Deployment Coach</p>
          <div className="footer-tech">
            <span className="tech-tag">React</span>
            <span className="tech-tag">Vite</span>
            <span className="tech-tag">Node.js</span>
            <span className="tech-tag">Express</span>
          </div>
        </footer>
      </div>
    </>
  );
}
