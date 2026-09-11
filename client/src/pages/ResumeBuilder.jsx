import { useState, useEffect } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import {
  FiUser,
  FiBookOpen,
  FiBriefcase,
  FiFolder,
  FiAward,
  FiFileText,
  FiDownload,
  FiSave,
  FiPenTool
} from "react-icons/fi";

import PersonalInfo from "../componets/PersonalInfo";
import Education from "../componets/Education";
import Experience from "../componets/Experience";
import Projects from "../componets/Projects";
import Skills from "../componets/Skills";
import ResumePreview from "../componets/ResumePreview";
import '../Pages/ResumeBuilder.css';

const templateStyles = {
  1: { name: "Minimal", accent: "#6C5CE7", font: "'Inter', sans-serif", layout: "single-column" },
  2: { name: "Modern Edge", accent: "#00B894", font: "'Poppins', sans-serif", layout: "two-column" },
  3: { name: "Classic Pro", accent: "#0984E3", font: "'Georgia', serif", layout: "single-column" },
  4: { name: "Creative Bold", accent: "#E17055", font: "'Poppins', sans-serif", layout: "two-column" },
  5: { name: "Clean Slate", accent: "#636E72", font: "'Inter', sans-serif", layout: "single-column" },
  6: { name: "Executive", accent: "#2D3436", font: "'Georgia', serif", layout: "single-column" },
};
const defaultTemplate = { id: 1, ...templateStyles[1] };

const resolveTemplate = (templateId) => {
  const id = templateId || localStorage.getItem("selectedTemplate");
  const style = templateStyles[id];
  return style ? { id: Number(id), ...style } : defaultTemplate;
};

const blankResumeData = () => {
  const base = {
    personal: {
      fullName: "",
      role: "",
      email: "",
      phone: "",
      location: "",
      linkedin: "",
      github: "",
      portfolio: ""
    },
    summary: "",
    education: [],
    experience: [],
    projects: [],
    skills: []
  };

  const pending = JSON.parse(localStorage.getItem("pendingSkills") || "[]");
  if (pending.length > 0) {
    base.skills = [...new Set(pending)];
  }
  return base;
};

const ResumeBuilder = () => {
  const { templateId } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const resumeId = searchParams.get("resumeId");
  const autoPrint = searchParams.get("autoPrint") === "true";

  const template = resolveTemplate(templateId);

  useEffect(() => {
    if (templateId) {
      localStorage.setItem("selectedTemplate", templateId);
    }
  }, [templateId]);

  const [activeSection, setActiveSection] = useState("personal");

  const [resumeData, setResumeData] = useState(() => {
    if (resumeId) {
      const saved = JSON.parse(localStorage.getItem("savedResumes") || "[]");
      const existing = saved.find((r) => String(r.id) === resumeId);
      if (existing) return existing.data;
    }
    return blankResumeData();
  });

  useEffect(() => {
    if (localStorage.getItem("pendingSkills")) {
      localStorage.removeItem("pendingSkills");
    }
  }, []);

  useEffect(() => {
    if (autoPrint) {
      const timer = setTimeout(() => window.print(), 500);
      return () => clearTimeout(timer);
    }
  }, [autoPrint]);

  const updatePersonal = (field, value) => {
    setResumeData((prev) => ({
      ...prev,
      personal: {
        ...prev.personal,
        [field]: value
      }
    }));
  };

  const updateData = (section, value) => {
    setResumeData((prev) => ({
      ...prev,
      [section]: value
    }));
  };

  // Saves current form data to localStorage, creating a resume id if there isn't one yet.
  // Returns the id used, so callers (Save button, Change Template) can both reuse it.
  const persistResume = (statusOverride) => {
    const saved = JSON.parse(localStorage.getItem("savedResumes") || "[]");
    const title = resumeData.personal.fullName
      ? `${resumeData.personal.fullName}'s Resume`
      : "Untitled Resume";

    if (resumeId) {
      const updated = saved.map((r) =>
        String(r.id) === resumeId
          ? {
              ...r,
              title,
              data: resumeData,
              templateId: template.id,
              status: statusOverride || r.status,
              lastEdited: "Just now"
            }
          : r
      );
      localStorage.setItem("savedResumes", JSON.stringify(updated));
      return resumeId;
    } else {
      const newId = Date.now();
      const newResume = {
        id: newId,
        title,
        status: statusOverride || "Draft",
        lastEdited: "Just now",
        templateId: template.id,
        data: resumeData
      };
      localStorage.setItem("savedResumes", JSON.stringify([newResume, ...saved]));
      return newId;
    }
  };

  const handleSave = () => {
    persistResume("Completed");
    alert("Resume saved!");
    navigate("/my-resumes");
  };

  // Auto-saves current progress as a draft first, then opens the Templates page
  // carrying the same resume id — so picking a new template reloads the SAME data,
  // just styled differently, instead of starting over blank.
  const handleChangeTemplate = () => {
    const id = persistResume();
    navigate(`/templates?resumeId=${id}`);
  };

  const sections = [
    { id: "personal", name: "Personal Information", icon: <FiUser /> },
    { id: "summary", name: "Professional Summary", icon: <FiFileText /> },
    { id: "education", name: "Education", icon: <FiBookOpen /> },
    { id: "experience", name: "Experience", icon: <FiBriefcase /> },
    { id: "projects", name: "Projects", icon: <FiFolder /> },
    { id: "skills", name: "Skills", icon: <FiAward /> }
  ];

  const downloadResume = () => {
    window.print();
  };

  return (
    <div
      className="resume-builder"
      style={{ "--accent-color": template.accent, fontFamily: template.font }}
    >
      <header className="resume-navbar">
        <div className="resume-logo">
          Resume<span>Nova</span>
        </div>

        <div className="resume-navbar-title">
          Resume Builder · <span className="active-template-name">{template.name}</span>
        </div>

        <div className="resume-actions">
          <button className="template-btn" onClick={handleChangeTemplate}>
            <FiPenTool />
            Change Template
          </button>

          <button className="save-btn" onClick={handleSave}>
            <FiSave />
            Save
          </button>

          <button className="download-btn" onClick={downloadResume}>
            <FiDownload />
            Download PDF
          </button>
        </div>
      </header>

      <div className="resume-workspace">
        <aside className="resume-sidebar">
          <h3>Build Your Resume</h3>
          <p className="sidebar-subtitle">Complete each section</p>

          <div className="section-menu">
            {sections.map((section) => (
              <button
                key={section.id}
                className={
                  activeSection === section.id ? "section-btn active" : "section-btn"
                }
                onClick={() => setActiveSection(section.id)}
              >
                <span className="section-icon">{section.icon}</span>
                <span>{section.name}</span>
              </button>
            ))}
          </div>

          <div className="ai-box">
            <div className="ai-icon">✨</div>
            <h4>AI Resume Assistant</h4>
            <p>Improve your resume content and make it more professional.</p>
          </div>
        </aside>

        <main className="resume-form-area">
          {activeSection === "personal" && (
            <PersonalInfo data={resumeData.personal} updateData={updatePersonal} />
          )}

          {activeSection === "summary" && (
            <div className="form-section">
              <h2>Professional Summary</h2>
              <p>Write a short introduction about yourself.</p>
              <textarea
                className="summary-textarea"
                placeholder="Example: Passionate Full Stack Developer with experience in..."
                value={resumeData.summary}
                onChange={(e) => updateData("summary", e.target.value)}
              />
              <button className="ai-improve-btn">✨ Improve with AI</button>
            </div>
          )}

          {activeSection === "education" && (
            <Education
              data={resumeData.education}
              updateData={(value) => updateData("education", value)}
            />
          )}

          {activeSection === "experience" && (
            <Experience
              data={resumeData.experience}
              updateData={(value) => updateData("experience", value)}
            />
          )}

          {activeSection === "projects" && (
            <Projects
              data={resumeData.projects}
              updateData={(value) => updateData("projects", value)}
            />
          )}

          {activeSection === "skills" && (
            <Skills
              data={resumeData.skills}
              updateData={(value) => updateData("skills", value)}
            />
          )}
        </main>

        <ResumePreview resumeData={resumeData} template={template} />
      </div>
    </div>
  );
};

export default ResumeBuilder;