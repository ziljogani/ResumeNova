import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {

  const navigate = useNavigate();

  // Store email and password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Store error message
  const [message, setMessage] = useState("");

  // Store loading status
  const [loading, setLoading] = useState(false);

  // Runs when the Login button is clicked
  async function handleSubmit(event) {
    event.preventDefault();

    // Clear old message
    setMessage("");

    // Start loading
    setLoading(true);

    try {
      // Send email and password to backend
      const response = await fetch(
        "http://localhost:5000/api/auth/login",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            email: email,
            password: password,
          }),
        }
      );

      // Get response from backend
      const data = await response.json();

      // Check if login failed
      if (!response.ok) {
        setMessage(data.message || "Login failed");
        setLoading(false);
        return;
      }

      // Login successful
      localStorage.setItem("token", data.token);

      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

      // Go to dashboard
      navigate("/dashboard");

    } catch (error) {
      console.log(error);

      setMessage(
        "Unable to connect to server. Please make sure the backend is running."
      );
    }

    // Stop loading
    setLoading(false);
  }

  return (
    <div style={styles.page}>

      <div style={styles.card}>

        <Link to="/" style={styles.logo}>
          ✦ ResumeNova
        </Link>

        <h1 style={styles.title}>
          Welcome back
        </h1>

        <p style={styles.subtitle}>
          Log in to continue building your resume.
        </p>

        {/* Show error message if there is one */}
        {message !== "" && (
          <div style={styles.message}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>

          {/* Email */}
          <label style={styles.label}>
            Email
          </label>

          <input
            style={styles.input}
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />

          {/* Password */}
          <label style={styles.label}>
            Password
          </label>

          <input
            style={styles.input}
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />

          {/* Login button */}
          <button
            type="submit"
            style={styles.button}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

        <p style={styles.switchText}>
          Don't have an account?{" "}

          <Link to="/register" style={styles.link}>
            Create one
          </Link>
        </p>

        <Link to="/" style={styles.back}>
          ← Back to Home
        </Link>

      </div>
    </div>
  );
}


// CSS styles
const styles = {

  page: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "30px 20px",
    background: "#f7f7fc",
  },

  card: {
    width: "100%",
    maxWidth: "430px",
    padding: "40px",
    background: "#ffffff",
    border: "1px solid #e7e8ef",
    borderRadius: "18px",
    boxShadow: "0 20px 60px rgba(35, 30, 70, 0.10)",
  },

  logo: {
    display: "block",
    textAlign: "center",
    marginBottom: "28px",
    color: "#171c2d",
    fontSize: "21px",
    fontWeight: "700",
    textDecoration: "none",
  },

  title: {
    margin: "0",
    textAlign: "center",
    color: "#171c2d",
    fontSize: "28px",
  },

  subtitle: {
    margin: "10px 0 25px",
    textAlign: "center",
    color: "#747b8b",
    fontSize: "14px",
    lineHeight: "1.6",
  },

  message: {
    marginBottom: "18px",
    padding: "11px",
    borderRadius: "8px",
    background: "#fff0f0",
    color: "#c62828",
    fontSize: "13px",
  },

  label: {
    display: "block",
    marginBottom: "7px",
    color: "#303749",
    fontSize: "13px",
    fontWeight: "600",
  },

  input: {
    width: "100%",
    height: "46px",
    padding: "0 13px",
    marginBottom: "16px",
    border: "1px solid #dfe2e9",
    borderRadius: "9px",
    outline: "none",
    fontSize: "14px",
  },

  button: {
    width: "100%",
    height: "46px",
    marginTop: "6px",
    border: "none",
    borderRadius: "9px",
    background: "#6c5ce7",
    color: "#ffffff",
    fontSize: "14px",
    fontWeight: "650",
    cursor: "pointer",
  },

  switchText: {
    marginTop: "22px",
    textAlign: "center",
    color: "#747b8b",
    fontSize: "13px",
  },

  link: {
    color: "#6c5ce7",
    fontWeight: "650",
    textDecoration: "none",
  },

  back: {
    display: "block",
    marginTop: "18px",
    textAlign: "center",
    color: "#7b8190",
    fontSize: "12px",
    textDecoration: "none",
  },
};

export default Login;