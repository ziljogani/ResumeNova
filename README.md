ResumeNova

ResumeNova is a team project that helps users review their resumes. Users can upload a PDF resume and receive a score, a check of key resume sections and technical skills, and suggestions for improvement.

Features

• Upload and analyze a PDF resume
• Extract text from the PDF
• Check for sections such as summary, skills, projects, education, and experience
• Identify recognized technical skills, action verbs, and measurable achievements
• Calculate a resume score
• Suggest improvements, such as adding relevant skills or strengthening project descriptions
• User authentication through the backend

Technologies

• Frontend: React, Vite, Bootstrap
• Backend: Node.js, Express
• Database: MongoDB
• PDF analysis: Python and pypdf

Project structure

ResumeNova/
  client/       React frontend
  backend/      Express API and authentication
  python-ai/    Python PDF resume analyzer

Run the project locally

Frontend

    cd client
    npm install
    npm run dev

Vite will display the local address for the frontend in the terminal.

Backend

    cd backend
    npm install

Create a local .env file with the environment variables required by the backend. Do not upload this file or share real passwords, database credentials, or secret keys.

Start the backend:

    node server.js

The server uses the PORT value from .env, or port 5000 by default.

Python PDF analyzer

Install Python and the pypdf package:

    python -m pip install pypdf

Run the analyzer with a PDF file path:

    python python-ai/analyzer.py path/to/resume.pdf

The analyzer prints a JSON result with the resume score, recognized skills, section checks, and suggestions.

My contribution

ResumeNova was built by a team of three. I worked on the user interface and the Python PDF analyzer, including resume scoring and suggestions for improving resume sections and skills.

About the analysis

The PDF analyzer uses text extraction, keyword checks, and patterns to review resume content. Its score and suggestions are intended as guidance and do not guarantee job interviews or ATS results.

Learning project

ResumeNova was created as a student team project to practice building a web application with a React frontend, an Express backend, a database, and a Python resume analyzer.
