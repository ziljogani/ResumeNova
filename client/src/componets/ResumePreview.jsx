
import "./ResumePreview.css";
const ResumePreview = ({ resumeData, template }) => {

  const {
    personal,
    summary,
    education,
    experience,
    projects,
    skills
  } = resumeData;

  const accent = template?.accent || "#6C5CE7";
  const font = template?.font || "'Inter', sans-serif";
  const layout = template?.layout || "single-column";
  const isTwoColumn = layout === "two-column";

  // ---- Reusable section blocks (built once, placed differently per layout) ----

  const summarySection = summary && (
    <div className="preview-section">
      <h3>SUMMARY</h3>
      <p>{summary}</p>
    </div>
  );

  const experienceSection = experience.length > 0 && (
    <div className="preview-section">
      <h3>EXPERIENCE</h3>
      {experience.map((item, index) => (
        <div className="preview-item" key={index}>
          <strong>{item.jobTitle}</strong>
          <span>{item.company}</span>
          <p>{item.description}</p>
        </div>
      ))}
    </div>
  );

  const projectsSection = projects.length > 0 && (
    <div className="preview-section">
      <h3>PROJECTS</h3>
      {projects.map((item, index) => (
        <div className="preview-item" key={index}>
          <strong>{item.name}</strong>
          <span>{item.technologies}</span>
          <p>{item.description}</p>
        </div>
      ))}
    </div>
  );

  const educationSection = education.length > 0 && (
    <div className="preview-section">
      <h3>EDUCATION</h3>
      {education.map((item, index) => (
        <div className="preview-item" key={index}>
          <strong>{item.degree}</strong>
          <span>{item.institution}</span>
          <p>{item.startYear} - {item.endYear}</p>
        </div>
      ))}
    </div>
  );

  const skillsSection = skills.length > 0 && (
    <div className="preview-section">
      <h3>SKILLS</h3>
      <div className="preview-skills">
        {skills.map((skill, index) => (
          <span key={index}>{skill}</span>
        ))}
      </div>
    </div>
  );

  const headerBlock = (
    <div className="resume-paper-header">
      <h1>{personal.fullName || "Your Name"}</h1>
      <h2>{personal.role || "Professional Title"}</h2>
      <p>
        {personal.email}
        {personal.phone && ` • ${personal.phone}`}
        {personal.location && ` • ${personal.location}`}
      </p>
    </div>
  );

  return (
    <aside className="resume-preview-area">

      <div className="preview-heading">
        <span>LIVE PREVIEW</span>
        <span>Auto Preview</span>
      </div>

      <div
        className="resume-paper"
        style={{ "--accent-color": accent, fontFamily: font }}
        data-layout={layout}
      >
        {headerBlock}

        {isTwoColumn ? (
          // ---- TWO COLUMN: main content left, Education + Skills as sidebar right ----
          <div className="resume-two-col">
            <div className="resume-col-main">
              {summarySection}
              {experienceSection}
              {projectsSection}
            </div>
            <div className="resume-col-side">
              {educationSection}
              {skillsSection}
            </div>
          </div>
        ) : (
          // ---- SINGLE COLUMN: everything stacked in original order ----
          <>
            {summarySection}
            {experienceSection}
            {educationSection}
            {projectsSection}
            {skillsSection}
          </>
        )}
      </div>

    </aside>
  );
};

export default ResumePreview;