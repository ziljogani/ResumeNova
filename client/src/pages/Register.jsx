import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");

    if (formData.password !== formData.confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    if (formData.password.length < 6) {
      setMessage("Password must contain at least 6 characters");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            password: formData.password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Registration failed");
        setLoading(false);
        return;
      }

      localStorage.setItem("token", data.token);

      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

      navigate("/dashboard");

    } catch (error) {
      console.error("Registration Error:", error);

      setMessage(
        "Unable to connect to server. Please make sure the backend is running."
      );
    }

    setLoading(false);
  };

  return (
    <div style={styles.page}>

      <div style={styles.card}>

        <Link to="/" style={styles.logo}>
          ✦ ResumeNova
        </Link>

        <h1 style={styles.title}>
          Create your account
        </h1>

        <p style={styles.subtitle}>
          Start building your professional resume with ResumeNova.
        </p>

        {message && (
          <div style={styles.message}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>

          <label style={styles.label}>
            Full Name
          </label>

          <input
            style={styles.input}
            type="text"
            name="name"
            placeholder="Enter your full name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <label style={styles.label}>
            Email
          </label>

          <input
            style={styles.input}
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label style={styles.label}>
            Password
          </label>

          <input
            style={styles.input}
            type="password"
            name="password"
            placeholder="Create a password"
            value={formData.password}
            onChange={handleChange}
            minLength="6"
            required
          />

          <label style={styles.label}>
            Confirm Password
          </label>

          <input
            style={styles.input}
            type="password"
            name="confirmPassword"
            placeholder="Confirm your password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            style={styles.button}
            disabled={loading}
          >
            {loading
              ? "Creating account..."
              : "Create Account"}
          </button>

        </form>

        <p style={styles.switchText}>
          Already have an account?{" "}

          <Link to="/login" style={styles.link}>
            Login
          </Link>
        </p>

        <Link to="/" style={styles.back}>
          ← Back to Home
        </Link>

      </div>

    </div>
  );
}


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

export default Register;