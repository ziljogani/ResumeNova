import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import "./Templates.css";

const templates = [
  { id: 1, name: "Minimal", category: "Minimal", color: "#6C5CE7", popular: true },
  { id: 2, name: "Modern Edge", category: "Modern", color: "#00B894", popular: false },
  { id: 3, name: "Classic Pro", category: "Classic", color: "#0984E3", popular: true },
  { id: 4, name: "Creative Bold", category: "Creative", color: "#E17055", popular: false },
  { id: 5, name: "Clean Slate", category: "Minimal", color: "#636E72", popular: false },
  { id: 6, name: "Executive", category: "Classic", color: "#2D3436", popular: false },
];

const categories = ["All", "Minimal", "Modern", "Classic", "Creative"];

function TemplatePreview({ color }) {
  return (
    <div className="template-preview">
      <div className="preview-header" style={{ background: color }} />
      <div className="preview-body">
        <div className="preview-line short" />
        <div className="preview-line" />
        <div className="preview-line" />
        <div className="preview-line medium" />
        <div className="preview-line" />
      </div>
    </div>
  );
}

function Templates() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const resumeId = searchParams.get("resumeId"); // present when switching templates on an existing resume

  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [previewTemplate, setPreviewTemplate] = useState(null);

  const filteredTemplates = templates.filter((t) => {
    const matchesCategory = activeCategory === "All" || t.category === activeCategory;
    const matchesSearch = t.name.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleUseTemplate = (templateId) => {
    localStorage.setItem("selectedTemplate", templateId);

    // carry resumeId through so the builder reloads the SAME data with the new template
    const destination = resumeId
      ? `/resume-builder/${templateId}?resumeId=${resumeId}`
      : `/resume-builder/${templateId}`;

    navigate(destination);
  };

  return (
    <div className="templates-page">
      <h1>{resumeId ? "Choose a New Template" : "Choose a Template"}</h1>
      <p className="templates-subtitle">
        {resumeId
          ? "Your existing details will carry over — only the style changes."
          : "Pick a starting point — you can customize everything later."}
      </p>

      <div className="templates-controls">
        <input
          type="text"
          placeholder="Search templates..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="templates-search"
        />
        <div className="templates-tabs">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`tab-btn ${activeCategory === cat ? "active" : ""}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {filteredTemplates.length === 0 ? (
        <p className="no-results">No templates match your search.</p>
      ) : (
        <div className="templates-grid">
          {filteredTemplates.map((t) => (
            <div key={t.id} className="template-card">
              {t.popular && <span className="badge-popular">Popular</span>}
              <TemplatePreview color={t.color} />
              <h3>{t.name}</h3>
              <span className="template-category">{t.category}</span>
              <div className="template-actions">
                <button className="btn-preview" onClick={() => setPreviewTemplate(t)}>
                  Preview
                </button>
                <button className="btn-use" onClick={() => handleUseTemplate(t.id)}>
                  Use This
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {previewTemplate && (
        <div className="preview-modal-overlay" onClick={() => setPreviewTemplate(null)}>
          <div className="preview-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setPreviewTemplate(null)}>
              ✕
            </button>
            <h2>{previewTemplate.name}</h2>
            <div className="modal-preview-large">
              <TemplatePreview color={previewTemplate.color} />
            </div>
            <button
              className="btn-use full-width"
              onClick={() => handleUseTemplate(previewTemplate.id)}
            >
              Use This Template
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Templates;