import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  const features = [
    {
      icon: "✨",
      title: "AI Resume Suggestions",
      description:
        "Get smart suggestions to improve your resume content and make your experience stand out.",
    },
    {
      icon: "🎨",
      title: "Professional Templates",
      description:
        "Choose from clean, modern and ATS-friendly resume templates designed for different careers.",
    },
    {
      icon: "📊",
      title: "Resume Score",
      description:
        "Check your resume quality and discover areas where you can improve.",
    },
    {
      icon: "📄",
      title: "Easy Export",
      description:
        "Create your resume and export it as a professional PDF when you're ready.",
    },
  ];

  return (
    <div className="home-page">
      {/* Navbar */}
      <header className="navbar">
        <div className="logo">
          <span className="logo-icon">✦</span>
          <span>ResumeNova</span>
        </div>

        <nav className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/my-resumes">My Resumes</Link>
          <Link to="/ai-tools">AI Tools</Link>
        </nav>

        <div className="nav-buttons">
          <Link to="/login" className="login-btn">
            Login
          </Link>

          <Link to="/register" className="signup-btn">
            Get Started
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-badge">
            ✨ AI-powered resume builder
          </div>

          <h1>
            Build a Resume That
            <span> Gets You Noticed.</span>
          </h1>

          <p>
            Create a professional, ATS-friendly resume in minutes.
            ResumeNova helps you build, improve and personalize your resume
            with smart AI-powered tools.
          </p>

          <div className="hero-buttons">
            <Link to="/resume-builder" className="primary-btn">
              Start Building Free →
            </Link>

            <Link to="/templates" className="secondary-btn">
              Explore Templates
            </Link>
          </div>

          <div className="trust-section">
            <div className="avatars">
              <span>👩🏻</span>
              <span>👨🏻</span>
              <span>👩🏽</span>
              <span>+</span>
            </div>

            <p>
              Trusted by students and professionals building their next
              opportunity.
            </p>
          </div>
        </div>

        {/* Resume Preview */}
        <div className="resume-preview-wrapper">
          <div className="resume-glow"></div>

          <div className="resume-preview">
            <div className="browser-bar">
              <span></span>
              <span></span>
              <span></span>
            </div>

            <div className="resume-content">
              <div className="resume-header">
                <div className="profile-circle"></div>

                <div>
                  <div className="skeleton large"></div>
                  <div className="skeleton medium"></div>

                  <div className="small-tags">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>

              <div className="resume-columns">
                <div className="resume-left">
                  <div className="section-title"></div>

                  <div className="text-line"></div>
                  <div className="text-line short"></div>
                  <div className="text-line"></div>

                  <div className="section-title second"></div>

                  <div className="skill-tags">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>

                <div className="resume-right">
                  <div className="section-title"></div>
                  <div className="heading-line"></div>
                  <div className="date-line"></div>

                  <div className="text-line"></div>
                  <div className="text-line"></div>
                  <div className="text-line short"></div>

                  <div className="heading-line second-heading"></div>
                  <div className="date-line"></div>

                  <div className="text-line"></div>
                  <div className="text-line short"></div>
                </div>
              </div>
            </div>
          </div>

          {/* AI Suggestion */}
          <div className="ai-card">
            <div className="ai-card-title">
              <span>💡</span>
              <strong>AI Suggestion</strong>
            </div>

            <p>
              Consider adding relevant skills from the job description to
              improve your ATS score.
            </p>

            <button>Add Suggestion</button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="features-section">
        <div className="section-heading">
          <p className="section-label">WHY RESUMENOVA?</p>

          <h2>Everything you need to stand out.</h2>

          <p>
            Build a resume that looks professional, reads naturally and
            performs better with applicant tracking systems.
          </p>
        </div>

        <div className="features-grid">
          {features.map((feature, index) => (
            <div className="feature-card" key={index}>
              <div className="feature-icon">{feature.icon}</div>

              <h3>{feature.title}</h3>

              <p>{feature.description}</p>

              <span className="feature-arrow">→</span>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="cta-box">
          <p className="section-label">YOUR NEXT OPPORTUNITY STARTS HERE</p>

          <h2>Ready to build your best resume?</h2>

          <p>
            Create a professional resume in minutes and take the next step
            toward your career goals.
          </p>

          <Link to="/resume-builder" className="primary-btn">
            Create My Resume 🚀
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-logo">
          <span>✦</span> ResumeNova
        </div>

        <p>© 2026 ResumeNova. Built with MERN.</p>

        <div className="footer-links">
          <Link to="/privacy">Privacy</Link>
          <Link to="/support">Support</Link>
          <Link to="/terms">Terms</Link>
        </div>
      </footer>
    </div>
  );
}

export default Home;