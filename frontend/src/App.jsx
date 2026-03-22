import { useState, useCallback } from "react";
import "./index.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";


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

export default function App() {
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
    <>
      {/* Animated background */}
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
          <div className="navbar-pills">
            <div className="pill"><div className="dot" />Live</div>
            <div className="pill">⚡ Instant</div>
            <div className="pill">☁️ Cloud AI</div>
          </div>
          <a
            href="https://drive.google.com/file/d/1S6hlyA70uo1SDGKfdpFQe7eMsDNKyW2Z/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="cv-link"
          >
            📄 CV
          </a>
        </nav>

        {/* Main */}
        <div className="main-content">

          {/* Hero */}
          <div className="hero">
            <div className="hero-badge">✨ AI-Powered Deployment Analysis</div>
            <h1 className="hero-title">
              Deploy Smarter with<br />
              <span className="gradient-text">AI Coaching</span>
            </h1>
            <p className="hero-subtitle">
              Describe your application and instantly get platform recommendations,
              cost estimates, and a step-by-step deployment plan.
            </p>
            <div className="stats-row">
              <div className="stat-item">
                <div className="stat-num">10+</div>
                <div className="stat-label">Platforms</div>
              </div>
              <div className="stat-item">
                <div className="stat-num">~2s</div>
                <div className="stat-label">Analysis Time</div>
              </div>
              <div className="stat-item">
                <div className="stat-num">Free</div>
                <div className="stat-label">No API Key</div>
              </div>
            </div>
          </div>

          {/* Analysis Form */}
          <div className="analysis-card">
            <div className="card-header">
              <div className="card-icon">🔍</div>
              <div className="card-header-text">
                <h2>Describe Your Application</h2>
                <p>Tech stack, expected traffic, special requirements</p>
              </div>
            </div>

            <div className="textarea-wrapper">
              <textarea
                className="input-textarea"
                placeholder="e.g.  React frontend + Node.js backend, expecting 10k users/day, needs database..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                maxLength={500}
                id="app-description"
              />
              <span className="char-count">{input.length}/500</span>
            </div>

            <div className="examples-label">Quick Examples</div>
            <div className="chips-row">
              {EXAMPLES.map((ex) => (
                <button
                  key={ex}
                  className="chip"
                  onClick={() => setInput(ex)}
                >
                  {ex}
                </button>
              ))}
            </div>

            <button
              id="analyze-btn"
              className="btn-analyze"
              onClick={handleAnalyze}
              disabled={loading || !input.trim()}
            >
              {loading ? (
                <>Analyzing <LoadingDots /></>
              ) : (
                <>🚀 Analyze Deployment &nbsp;·&nbsp; <span style={{ opacity: 0.7, fontSize: "12px" }}>Ctrl+Enter</span></>
              )}
            </button>

            {error && (
              <div style={{ marginTop: "16px", padding: "12px 16px", background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)", borderRadius: "10px", color: "#f87171", fontSize: "13px" }}>
                {error}
              </div>
            )}
          </div>

          {/* Results */}
          {result && (
            <div className="result-section">
              <div className="result-header">
                <div className="result-title">📊 Deployment Strategy</div>
                <button id="copy-btn" className={`btn-copy${copied ? " copied" : ""}`} onClick={handleCopy}>
                  {copied ? "✅ Copied!" : "📋 Copy"}
                </button>
              </div>

              <div className="result-grid">
                <ResultCard
                  icon="☁️" label="Recommended Platform"
                  value={result.platform}
                  tag={result.platformTag} tagColor="green"
                  highlighted
                />
                <ResultCard
                  icon="💰" label="Estimated Cost"
                  value={result.cost}
                  tag={result.costTag} tagColor="blue"
                />
                <ResultCard
                  icon="⚠️" label="Risk Level"
                  value={result.risk}
                  tag={result.riskTag} tagColor={result.riskColor || "orange"}
                />
                <ResultCard
                  icon="📈" label="Scaling Advice"
                  value={result.scaling}
                  tag={result.scalingTag} tagColor="purple"
                />
                <ResultCard
                  icon="📋" label="Deployment Steps"
                  fullWidth
                >
                  <StepsList steps={result.steps} />
                </ResultCard>

                {result.tips && result.tips.length > 0 && (
                  <ResultCard
                    icon="💡" label="Pro Tips"
                    fullWidth
                  >
                    <ul className="steps-list">
                      {result.tips.map((tip, i) => (
                        <li key={i} className="step-item">
                          <div className="step-num" style={{ background: "linear-gradient(135deg, #f97316, #eab308)" }}>✦</div>
                          <span className="step-text">{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </ResultCard>
                )}
              </div>
            </div>
          )}

          {/* Feature Cards */}
          {!result && (
            <div className="features-section">
              <div className="feature-card">
                <div className="feature-emoji">⚡</div>
                <div className="feature-name">Instant Analysis</div>
                <div className="feature-desc">Get deployment recommendations in seconds without waiting</div>
              </div>
              <div className="feature-card">
                <div className="feature-emoji">💰</div>
                <div className="feature-name">Cost Estimation</div>
                <div className="feature-desc">Accurate monthly cost ranges based on your traffic expectations</div>
              </div>
              <div className="feature-card">
                <div className="feature-emoji">🛡️</div>
                <div className="feature-name">Risk Assessment</div>
                <div className="feature-desc">Identify potential bottlenecks and scalability issues early</div>
              </div>
              <div className="feature-card">
                <div className="feature-emoji">📋</div>
                <div className="feature-name">Step-by-Step Plan</div>
                <div className="feature-desc">Clear action items so you know exactly what to do next</div>
              </div>
              <div className="feature-card">
                <div className="feature-emoji">☁️</div>
                <div className="feature-name">Multi-Cloud Ready</div>
                <div className="feature-desc">Recommendations across Vercel, Render, AWS, GCP and more</div>
              </div>
              <div className="feature-card">
                <div className="feature-emoji">🤖</div>
                <div className="feature-name">AI-Powered</div>
                <div className="feature-desc">Smart analysis engine trained on real deployment patterns</div>
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <footer className="footer">
          <div>Built with modern web technologies · Open source & free to use</div>
          <div className="footer-tech">
            <span className="tech-tag">React</span>
            <span className="tech-tag">Vite</span>
            <span className="tech-tag">Express</span>
            <span className="tech-tag">Node.js</span>
          </div>
        </footer>
      </div>
    </>
  );
}