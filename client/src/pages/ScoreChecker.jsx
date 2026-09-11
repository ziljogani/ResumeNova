import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ScoreChecker.css";

function ScoreChecker() {
  const navigate = useNavigate();
  const [resumeText, setResumeText] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const analyzeResume = () => {
    if (!resumeText.trim()) return;
    setLoading(true);

    // Placeholder scoring logic — replace with a real API call later
    setTimeout(() => {
      const wordCount = resumeText.trim().split(/\s+/).length;

      const keywords = [
        "developed", "led", "managed", "built", "designed",
        "improved", "implemented", "achieved", "created", "optimized",
      ];
      const foundKeywords = keywords.filter((kw) =>
        resumeText.toLowerCase().includes(kw)
      );

      const hasNumbers = /\d/.test(resumeText);
      const hasEmail = /\S+@\S+\.\S+/.test(resumeText);

      let score = 40;
      if (wordCount > 150) score += 15;
      if (wordCount > 300) score += 10;
      score += foundKeywords.length * 3;
      if (hasNumbers) score += 10;
      if (hasEmail) score += 5;
      score = Math.min(score, 100);

      const tips = [];
      if (wordCount < 150) tips.push("Your resume looks short — add more detail to your experience.");
      if (foundKeywords.length < 3) tips.push("Use more strong action verbs like 'led', 'built', or 'improved'.");
      if (!hasNumbers) tips.push("Add measurable results (e.g. 'increased sales by 20%').");
      if (!hasEmail) tips.push("Make sure your contact email is included.");
      if (tips.length === 0) tips.push("Great job! Your resume covers the key basics well.");

      setResult({ score, foundKeywords, tips, wordCount });
      setLoading(false);
    }, 800);
  };

  return (
    <div className="score-container">
      <button className="back-link" onClick={() => navigate("/ai-tools")}>
        ← Back to AI Tools
      </button>

      <h1>Resume Score / ATS Checker</h1>
      <p className="score-subtitle">
        Paste your resume text below to check its quality and ATS-friendliness.
      </p>

      <textarea
        className="score-textarea"
        placeholder="Paste your resume text here..."
        value={resumeText}
        onChange={(e) => setResumeText(e.target.value)}
        rows={12}
      />

      <button
        className="analyze-btn"
        onClick={analyzeResume}
        disabled={loading || !resumeText.trim()}
      >
        {loading ? "Analyzing..." : "Analyze Resume"}
      </button>

      {result && (
        <div className="score-result">
          <div className="score-circle-wrap">
            <div
              className="score-circle"
              style={{
                background: `conic-gradient(#4f46e5 ${result.score * 3.6}deg, #eee 0deg)`,
              }}
            >
              <span>{result.score}%</span>
            </div>
            <p>Overall Score</p>
          </div>

          <div className="score-details">
            <h3>Suggestions</h3>
            <ul>
              {result.tips.map((tip, i) => (
                <li key={i}>{tip}</li>
              ))}
            </ul>

            {result.foundKeywords.length > 0 && (
              <>
                <h3>Strong Words Found</h3>
                <div className="keyword-chips">
                  {result.foundKeywords.map((kw) => (
                    <span className="chip" key={kw}>{kw}</span>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default ScoreChecker;