import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import MyResumes from "./pages/MyResumes";
import Register from "./pages/Register";
import ResumeBuilder from "./pages/ResumeBuilder";
import Login from "./pages/Login";
import AiTools from "./pages/AiTools";
import ScoreChecker from "./pages/ScoreChecker";
import Templates from "./pages/Templates";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/my-resumes" element={<MyResumes />} />
          <Route path="/resume-builder/:id?" element={<ResumeBuilder />} />
        <Route path="/ai-tools" element={<AiTools />} />
        <Route path="/ai-tools/score" element={<ScoreChecker />} />
        <Route path="/templates" element={<Templates />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
