import { useNavigate } from "react-router-dom";
import "./AiTools.css";

const tools = [
  {
    id: "score",
    icon: "📊",
    title: "Resume Score / ATS Checker",
    description: "Check your resume quality and see how well it passes ATS filters.",
  },
  {
    id: "suggestions",
    icon: "✨",
    title: "AI Resume Suggestions",
    description: "Get smart suggestions to improve your resume content and wording.",
  },
  {
    id: "matcher",
    icon: "🎯",
    title: "Job Description Matcher",
    description: "Paste a job description and see how well your resume matches it.",
  },
  {
    id: "cover-letter",
    icon: "📝",
    title: "Cover Letter Generator",
    description: "Generate a tailored cover letter from your resume and a job description.",
  },
];

function AiTools() {
  const navigate = useNavigate();

  return (
    <div className="aitools-container">
      <h1>AI Tools</h1>
      <p className="aitools-subtitle">
        Smart tools to help your resume stand out and match the right jobs.
      </p>

      <div className="tools-grid">
        {tools.map((tool) => (
          <div className="tool-card" key={tool.id}>
            <div className="tool-icon">{tool.icon}</div>
            <h3>{tool.title}</h3>
            <p>{tool.description}</p>
            <button
              className="tool-btn"
              onClick={() => navigate(`/ai-tools/${tool.id}`)}
            >
              Try Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AiTools;