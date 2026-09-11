import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();

  // ==========================================
  // CURRENT LOGGED-IN USER
  // ==========================================

  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    // If no token, go to login
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchCurrentUser = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/auth/me",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          // Token invalid or expired
          localStorage.removeItem("token");
          localStorage.removeItem("user");

          navigate("/login");
          return;
        }

        // Save user from MongoDB
        setUser(data.user);

        // Update localStorage
        localStorage.setItem(
          "user",
          JSON.stringify(data.user)
        );

      } catch (error) {
        console.error(
          "Get Current User Error:",
          error
        );
      } finally {
        setLoadingUser(false);
      }
    };

    fetchCurrentUser();
  }, [navigate]);

  // Dynamic username
  const username = user?.name || "User";

  // Dynamic avatar letter
  const avatarLetter = username
    .charAt(0)
    .toUpperCase();


  // ==========================================
  // RESUMES
  // ==========================================

  const resumes = [
    {
      title: "Senior Software Engineer",
      status: "Completed",
      statusClass: "completed",
      edited: "Last edited 2 days ago",
    },
    {
      title: "Product Manager - Tech",
      status: "Draft",
      statusClass: "draft",
      edited: "Last edited 1 week ago",
    },
  ];


  // ==========================================
  // JOBS
  // ==========================================

  const jobs = [
    {
      title: "Lead Backend Engineer",
      company: "Acme Corp",
      location: "Remote",
      match: "95%",
      skill: "Python",
    },
    {
      title: "Senior Full Stack Developer",
      company: "Globex",
      location: "San Francisco, CA",
      match: "88%",
      skill: "React",
    },
    {
      title: "Staff Software Engineer",
      company: "Initech",
      location: "Hybrid",
      match: "82%",
      skill: "System Design",
    },
  ];


  // ==========================================
  // LOADING
  // ==========================================

  if (loadingUser) {
    return (
      <div
        className="dashboard-page"
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h3>Loading dashboard...</h3>
      </div>
    );
  }


  // ==========================================
  // DASHBOARD
  // ==========================================

  return (
    <div className="dashboard-page">

      {/* Navbar */}
      <nav className="dashboard-navbar">

        <div className="container-fluid dashboard-nav-inner">

          <Link
            to="/"
            className="dashboard-logo"
          >
            <span className="logo-symbol">
              ✦
            </span>

            ResumeNova
          </Link>


          <div className="dashboard-nav-links">

            <Link to="/">
              Home
            </Link>

            <Link
              to="/dashboard"
              className="active"
            >
              Dashboard
            </Link>

            <Link to="/my-resumes">
              My Resumes
            </Link>

            <Link to="/ai-tools">
              AI Tools
            </Link>

          </div>


          {/* USER AREA */}

          <div className="dashboard-user">

            <button
              className="notification-btn"
              type="button"
            >
              🔔
            </button>


            <div className="user-profile">

              {/* Dynamic avatar */}

              <div className="user-avatar">
                {avatarLetter}
              </div>


              {/* Dynamic username */}

              <span>
                {username}
              </span>

            </div>

          </div>

        </div>

      </nav>


      {/* Main */}

      <main className="dashboard-main">

        <div className="container-fluid dashboard-container">


          {/* Welcome */}

          <div className="welcome-section">

            <div>

              {/* Dynamic username */}

              <h1>
                Welcome back, {username}.
              </h1>

              <p>
                Here is a summary of your career assets
                and job matches.
              </p>

            </div>


            {/* Profile completeness */}

            <div className="profile-widget">

              <div className="progress-circle">

                <span>
                  85%
                </span>

              </div>


              <div>

                <h6>
                  Profile Completeness
                </h6>

                <p>
                  Add education details to reach 100%
                </p>

                <button type="button">
                  Complete Profile →
                </button>

              </div>

            </div>

          </div>


          {/* Dashboard grid */}

          <div className="row g-4">


            {/* Left */}

            <div className="col-lg-8">


              <div className="dashboard-section-header">

                <h2>
                  My Resumes
                </h2>

                <Link to="/my-resumes">
                  View All →
                </Link>

              </div>


              <div className="row g-3">


                {/* Create resume */}

                <div className="col-md-6">

                  <Link
                    to="/resume-builder"
                    className="create-resume-card"
                  >

                    <div className="create-icon">
                      +
                    </div>

                    <h3>
                      Create New Resume
                    </h3>

                    <p>
                      Start from scratch or use AI
                    </p>

                  </Link>

                </div>


                {/* Resume cards */}

                {resumes.map(
                  (resume, index) => (

                    <div
                      className="col-md-6"
                      key={index}
                    >

                      <div className="resume-card">

                        <div>

                          <div className="resume-card-top">

                            <span
                              className={`status ${resume.statusClass}`}
                            >
                              {resume.status}
                            </span>

                            <button type="button">
                              ⋮
                            </button>

                          </div>


                          <h3>
                            {resume.title}
                          </h3>


                          <p>
                            {resume.edited}
                          </p>

                        </div>


                        <div className="resume-actions">

                          <Link to="/resume-builder">

                            ✎{" "}

                            {resume.status === "Draft"
                              ? "Continue"
                              : "Edit"}

                          </Link>


                          <button type="button">
                            ↓
                          </button>

                        </div>

                      </div>

                    </div>

                  )
                )}

              </div>


              {/* AI Insights */}

              <div className="insights-card">

                <h3>
                  AI Insights
                </h3>


                <div className="row g-3">


                  <div className="col-md-6">

                    <div className="insight-item">

                      <div className="insight-icon green">
                        ↗
                      </div>

                      <div>

                        <small>
                          Keyword Match
                        </small>

                        <strong>
                          Strong (92%)
                        </strong>

                      </div>

                    </div>

                  </div>


                  <div className="col-md-6">

                    <div className="insight-item">

                      <div className="insight-icon blue">
                        👁
                      </div>

                      <div>

                        <small>
                          Profile Views
                        </small>

                        <strong>
                          47 this week
                        </strong>

                      </div>

                    </div>

                  </div>

                </div>

              </div>

            </div>


            {/* Right */}

            <div className="col-lg-4">

              <div className="jobs-card">


                <div className="jobs-header">

                  <h2>
                    💼 Recommended Jobs
                  </h2>

                  <span>
                    Based on profile
                  </span>

                </div>


                {jobs.map(
                  (job, index) => (

                    <div
                      className="job-item"
                      key={index}
                    >

                      <h4>
                        {job.title}
                      </h4>

                      <p>
                        {job.company} • {job.location}
                      </p>


                      <div className="job-tags">

                        <span className="match">
                          {job.match} Match
                        </span>

                        <span>
                          {job.skill}
                        </span>

                      </div>

                    </div>

                  )
                )}


                <button
                  className="view-jobs-btn"
                  type="button"
                >
                  View All Matches
                </button>

              </div>

            </div>

          </div>

        </div>

      </main>


      {/* Footer */}

      <footer className="dashboard-footer">

        <p>
          © 2026 ResumeNova. All rights reserved.
        </p>

        <div>

          <Link to="/privacy">
            Privacy
          </Link>

          <Link to="/support">
            Support
          </Link>

          <Link to="/terms">
            Terms
          </Link>

        </div>

      </footer>

    </div>
  );
}

export default Dashboard;
