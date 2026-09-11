import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./MyResumes.css";

function MyResumes() {
  const navigate = useNavigate();

  // Replace with resumes fetched from your backend/MongoDB
  const [resumes, setResumes] = useState([
    {
      id: 1,
      title: "Senior Software Engineer",
      status: "Completed",
      lastEdited: "2 days ago",
    },
    {
      id: 2,
      title: "Product Manager - Tech",
      status: "Draft",
      lastEdited: "1 week ago",
    },
  ]);

  const [search, setSearch] = useState("");

  const filteredResumes = resumes.filter((r) =>
    r.title.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (id) => {
    setResumes(resumes.filter((r) => r.id !== id));
  };

  const handleDuplicate = (resume) => {
    const newResume = {
      ...resume,
      id: Date.now(),
      title: resume.title + " (Copy)",
      status: "Draft",
      lastEdited: "Just now",
    };
    setResumes([newResume, ...resumes]);
  };

  return (
    <div className="myresumes-container">
      <div className="myresumes-header">
        <div>
          <h1>My Resumes</h1>
          <p>Manage, edit, and download all your resumes.</p>
        </div>
        <button className="create-btn" onClick={() => navigate("/dashboard")}>
          + Create New Resume
        </button>
      </div>

      <input
        type="text"
        placeholder="Search resumes..."
        className="search-input"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {filteredResumes.length === 0 ? (
        <div className="empty-state">
          <p>You haven't created a resume yet.</p>
          <button className="create-btn" onClick={() => navigate("/dashboard")}>
            Start Your First Resume
          </button>
        </div>
      ) : (
        <div className="resume-grid">
          {filteredResumes.map((resume) => (
            <div className="resume-card" key={resume.id}>
              <span
                className={`status-badge ${
                  resume.status === "Completed" ? "completed" : "draft"
                }`}
              >
                {resume.status}
              </span>

              <h3>{resume.title}</h3>
              <p className="last-edited">Last edited {resume.lastEdited}</p>

              <div className="card-actions">
                <button
                  className="edit-btn"
                  onClick={() => navigate(`/dashboard/edit/${resume.id}`)}
                >
                  ✏️ Edit
                </button>
                <button
                  className="icon-btn"
                  onClick={() => handleDuplicate(resume)}
                  title="Duplicate"
                >
                  ⧉
                </button>
                <button
                  className="icon-btn"
                  onClick={() => alert("Downloading PDF...")}
                  title="Download PDF"
                >
                  ⬇
                </button>
                <button
                  className="icon-btn delete"
                  onClick={() => handleDelete(resume.id)}
                  title="Delete"
                >
                  🗑
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyResumes;