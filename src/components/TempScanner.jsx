import { useState, useEffect } from "react";
import { analyzeURL } from "../utils/urlAnalyzer";

function Scanner() {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState(null);

  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem("scanHistory");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("scanHistory", JSON.stringify(history));
  }, [history]);

  const handleScan = () => {
    if (!url.trim()) return;

    const res = analyzeURL(url);

    setResult(res);

    const newScan = {
      url,
      status: res.status,
      score: res.score,
      time: new Date().toLocaleTimeString(),
    };

    setHistory((prev) => [newScan, ...prev].slice(0, 5));
  };

  const clearHistory = () => {
    localStorage.removeItem("scanHistory");
    setHistory([]);
  };

  return (
    <>
      {/* Scanner */}

      <div className="scanner">
        <input
          type="text"
          placeholder="Paste suspicious URL..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />

        <button onClick={handleScan}>Analyze Threat</button>
      </div>

      {/* Result */}

      {result && (
        <div className="result-card">

          <div style={{ textAlign: "center" }}>
            <h2
              className={
                result.status === "Safe"
                  ? "safe"
                  : result.status === "Suspicious"
                  ? "warning"
                  : "danger"
              }
            >
              {result.status === "Safe"
                ? "🟢 SAFE"
                : result.status === "Suspicious"
                ? "🟡 SUSPICIOUS"
                : result.status === "Dangerous"
                ? "🔴 DANGEROUS"
                : "⚫ INVALID URL"}
            </h2>
          </div>

          <h3>Risk Score : {result.score}%</h3>

          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${result.score}%` }}
            ></div>
          </div>

          <p className="checks">
            Checks Triggered : <strong>{result.reasons.length}</strong>
          </p>

          <ul>
            {result.reasons.map((reason, index) => (
              <li key={index}>✔ {reason}</li>
            ))}
          </ul>

          <div className="recommendation">
            <h3>Recommendation</h3>

            <p>
              {result.status === "Safe"
                ? "This website appears safe to visit."
                : result.status === "Suspicious"
                ? "Proceed carefully. Verify the website before entering personal information."
                : result.status === "Dangerous"
                ? "Avoid visiting this website. Multiple phishing indicators were detected."
                : "Please enter a valid URL."}
            </p>

            <hr className="divider" />

            <div className="scan-summary">
              <p>⚡ Detection completed in real-time</p>
              <p>
                🛡 {result.reasons.length} heuristic security checks completed
              </p>
            </div>
          </div>

        </div>
      )}

      {/* Threat Statistics */}

      <div className="history-card">

        <h2>Threat Statistics</h2>

        <div className="stats">

          <div className="stat">
            <h1>{history.length}</h1>
            <p>Total</p>
          </div>

          <div className="stat">
            <h1 className="safe-number">
              {history.filter((item) => item.status === "Safe").length}
            </h1>
            <p>🟢 Safe</p>
          </div>

          <div className="stat">
            <h1 className="warning-number">
              {history.filter((item) => item.status === "Suspicious").length}
            </h1>
            <p>🟡 Suspicious</p>
          </div>

          <div className="stat">
            <h1 className="danger-number">
              {history.filter((item) => item.status === "Dangerous").length}
            </h1>
            <p>🔴 Dangerous</p>
          </div>

        </div>

      </div>

      {/* Recent Scans */}

      <div className="history-card">

        <div className="history-header">

          <h2>Recent Scans</h2>

          {history.length > 0 && (
            <button className="clear-btn" onClick={clearHistory}>
              Clear
            </button>
          )}

        </div>

        {history.length === 0 ? (
          <p>No scans yet.</p>
        ) : (
          history.map((item, index) => (
            <div className="history-item" key={index}>

              <strong>{item.url}</strong>

              <span
                className={
                  item.status === "Safe"
                    ? "safe"
                    : item.status === "Suspicious"
                    ? "warning"
                    : "danger"
                }
              >
                {item.status === "Safe"
                  ? "🟢 SAFE"
                  : item.status === "Suspicious"
                  ? "🟡 SUSPICIOUS"
                  : item.status === "Dangerous"
                  ? "🔴 DANGEROUS"
                  : "⚫ INVALID"}
              </span>

              <span>
                📊 Risk Score : <strong>{item.score}%</strong>
              </span>

              <small>{item.time}</small>

            </div>
          ))
        )}

      </div>

    </>
  );
}

export default Scanner;