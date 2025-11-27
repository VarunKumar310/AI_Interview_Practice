# AI Interview Practice Partner 🤖

An intelligent interview preparation platform that uses AI agents to simulate realistic interview experiences with personalized feedback and comprehensive performance analysis.

## 🌟 Features

### 🎯 Interview Simulation
- **Role-Specific Questions**: Tailored questions based on job role (Software Engineer, Data Scientist, Product Manager, etc.)
- **Experience-Based Difficulty**: Questions adapt to your experience level (Entry, Mid, Senior, Executive)
- **Resume Integration**: Analyzes your resume to generate contextual questions about your experience
- **Multi-Modal Input**: Support for both voice and text responses

### 🤖 AI-Powered Evaluation
- **Multi-Agent System**: Uses 4 specialized AI agents for comprehensive evaluation
  - **Interviewer Agent**: Generates relevant questions
  - **Follow-up Agent**: Evaluates answers and decides next questions
  - **Scoring Agent**: Scores responses across multiple dimensions
  - **Feedback Agent**: Generates detailed performance reports
- **Real-Time Feedback**: Instant evaluation of your responses
- **Dynamic Follow-ups**: AI decides whether to ask follow-up questions based on answer quality

### 📊 Performance Analytics
- **Multi-Dimensional Scoring**: 
  - Technical Accuracy
  - Communication Skills
  - Confidence Level
  - Speech Pace & Clarity
  - Filler Word Detection
- **Comprehensive Reports**: Detailed PDF reports with strengths, weaknesses, and recommendations
- **Progress Tracking**: Monitor improvement over multiple sessions

### 🎨 Modern UI/UX
- **Responsive Design**: Works seamlessly on desktop and mobile
- **Real-Time Interface**: Live interview simulation with timer and progress tracking
- **Interactive Components**: Voice controls, video backgrounds, smooth animations
- **Professional Layout**: Clean, modern interface optimized for interview practice

## 🏗️ Architecture

### Backend (Python FastAPI)
```
backend/
├── main.py                 # FastAPI application
├── agents/                 # AI Agent implementations
│   ├── interviewer_agent.py    # Question generation
│   ├── followup_agent.py       # Answer evaluation
│   ├── scoring_agent.py        # Performance scoring
│   └── feedback_agent.py       # Report generation
├── memory/                 # Session management
│   └── session_memory.py       # Interview state tracking
├── models/                 # Data models
│   └── schemas.py              # Pydantic models
└── utils/                  # Utilities
    └── pdf_generator.py        # PDF report generation
```

### Frontend (React + Vite)
```
Interview_prac/Interview_Practice/
├── src/
│   ├── components/        # Reusable components
│   │   ├── Report.jsx           # Performance reports
│   │   ├── VoiceControls.jsx    # Recording interface
│   │   ├── QuestionDisplay.jsx  # Question presentation
│   │   └── Timer.jsx           # Interview timer
│   ├── pages/             # Application pages
│   │   ├── Home.jsx            # Landing page
│   │   ├── ChatWindow.jsx      # Interview interface
│   │   ├── RoleSelector.jsx    # Job role selection
│   │   └── ResumeUpload.jsx    # Resume processing
│   └── utils/             # Utilities
│       ├── InterviewContext.jsx # State management
│       ├── audio.js           # Audio processing
│       └── speech.js          # Speech recognition
```

## 🚀 Technologies Used

### Backend
- **FastAPI**: Modern, fast web framework for building APIs
- **CrewAI**: Multi-agent AI orchestration framework
- **Groq/Gemini AI**: Advanced language models for question generation and evaluation
- **Pydantic**: Data validation and settings management
- **Python-Multipart**: File upload support
- **ReportLab**: PDF generation for reports

### Frontend
- **React 18**: Modern JavaScript library for building user interfaces
- **Vite**: Fast build tool and development server
- **TailwindCSS**: Utility-first CSS framework for styling
- **React Router**: Declarative routing for React applications
- **Framer Motion**: Animation library for smooth transitions
- **Lucide React**: Beautiful icon library
- **jsPDF**: PDF generation in the browser
- **Chart.js**: Data visualization for performance metrics

## 🛠️ Installation & Setup

### Prerequisites
- Python 3.9+
- Node.js 16+
- Groq API Key (get from [Groq Console](https://console.groq.com/))
- Google AI API Key (optional, for Gemini models)

### Backend Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/VarunKumar310/AI_Interview_Practice.git
   cd AI_Interview_Practice/backend
   ```

2. **Create virtual environment**
   ```bash
   python -m venv venv
   source venv/Scripts/activate  # Windows
   # or
   source venv/bin/activate     # Linux/Mac
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your API keys
   ```

5. **Start the backend server**
   ```bash
   python main.py
   ```

   The API will be available at `http://localhost:8000`

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd Interview_prac/Interview_Practice
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:5173`

## 📖 Usage Guide

### 1. Start Interview Session
- Choose your job role from the available options
- Select your experience level
- Set the difficulty preference
- Upload your resume (optional but recommended)

An intelligent, multi-agent interview simulation platform that helps candidates practice real-world interviews with personalized feedback, adaptive follow-ups, and detailed performance reports.


---

##⭐ Why This Problem

India’s job market is fiercely competitive, where success often hinges not on what you know—but on how you express it under pressure. Every year, millions of students graduate with technical knowledge but fail to crack interviews due to lack of structured practice, real-time feedback, and familiarity with interviewer behavior.

Traditional mock interview tools fall short — they offer static questions, no follow-ups, and no personalized guidance. They don’t react when a candidate performs well, nor do they guide when the answer is vague. The result? Candidates remain unsure about why they failed or how to improve.

What’s truly needed is an interview partner that:

Thinks like a real interviewer

Adapts dynamically to your responses

Evaluates you on depth, clarity, and communication

Provides actionable, role-specific feedback


That’s exactly what AI Interview Practice Partner delivers.


---

##🚀 Solution — What Our Interview Practice Partner Does

Our system uses CrewAI-powered multi-agent architecture to recreate realistic, intelligent, and adaptive interview sessions. Instead of one chatbot, it’s powered by a team of AI agents, each with a distinct role — Interviewer, Follow-Up Evaluator, Scoring Agent, and Feedback Generator.

##🧠 How It Works

1. Setup & Personalization – You choose a role (Software Engineer, Data Analyst, etc.), experience level, and difficulty. Optionally, upload your resume for tailored questions.


2. Interview Begins – The Interviewer Agent starts asking domain-specific questions.


3. Adaptive Follow-Up

If your answer is vague, the Follow-Up Agent probes deeper with clarifying questions.

If your answer is strong, it raises the bar with a harder follow-up to test depth.



4. Evaluation Phase – The Scoring Agent scores every response on:

Technical accuracy

Clarity & communication

Reasoning & completeness



5. Feedback Generation – The Feedback Agent compiles everything into a detailed report with strengths, weaknesses, and improvement suggestions.



The outcome feels like a real interview panel — structured, challenging, supportive, and deeply insightful.


---

##✨ Key Features

🎯 Interview Simulation

Role-specific questions

Experience-based difficulty

Resume-based contextual questions

Voice + text input support


🤖 AI-Powered Evaluation

Multi-agent coordination (Interviewer, Follow-Up, Scoring, Feedback)

Real-time scoring and adaptive follow-ups

Instant performance feedback


📊 Performance Analytics

Scores across technical, communication, and confidence metrics

Speech clarity and filler word detection

Downloadable PDF reports

Track improvement across sessions


🎨 Modern UI/UX

Fully responsive design

Real-time interface with timer and progress tracking

Smooth animations with Framer Motion

Clean, professional dashboard



---

🧩 High-Level Architecture

Backend (FastAPI + CrewAI)

backend/
├── main.py
├── agents/
│   ├── interviewer_agent.py
│   ├── followup_agent.py
│   ├── scoring_agent.py
│   └── feedback_agent.py
├── memory/session_memory.py
├── models/schemas.py
└── utils/pdf_generator.py

Frontend (React + Vite)

Interview_prac/Interview_Practice/
├── src/
│   ├── components/
│   │   ├── Report.jsx
│   │   ├── VoiceControls.jsx
│   │   ├── QuestionDisplay.jsx
│   │   └── Timer.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── ChatWindow.jsx
│   │   ├── RoleSelector.jsx
│   │   └── ResumeUpload.jsx
│   └── utils/
│       ├── InterviewContext.jsx
│       ├── audio.js
│       └── speech.js


---

⚙️ Technologies Used

Backend

FastAPI – Modern, high-performance web framework

CrewAI – Multi-agent orchestration framework

Groq / Gemini AI – LLMs for question generation & analysis

ReportLab – PDF report generation

Pydantic – Data validation

Python-Multipart – File uploads


Frontend

React 18 + Vite – High-speed, modern UI development

TailwindCSS – Sleek, responsive design

Framer Motion – Interactive animations

React Router – SPA routing

Chart.js – Visual performance insights

jsPDF – Browser-based report exports



---

🧠 Why This Stack

CrewAI allows structured agent collaboration — enabling each AI (Interviewer, Evaluator, Scorer, Feedback) to think independently yet work cohesively. This design ensures conversations feel natural and adaptive, while keeping the code modular, scalable, and easy to extend.


---

##🌟 Unique Selling Points (USP)

🧩 Multi-Agent Intelligence: Each agent mimics real interviewer behavior — probing, evaluating, and scoring collaboratively.

🎢 Adaptive Follow-Ups: Vague answers trigger clarification; strong answers trigger harder ones.

📈 Per-Question Scoring: Every response chain gets scored for depth, clarity, and communication.

🧭 Actionable Feedback: Clear strengths, weaknesses, and personalized improvement paths.

🎤 Human-Like Interaction: Realistic, natural conversation flow.

💡 Transparent Evaluation: Every follow-up, score, and suggestion is tied to user actions.

---

##🔧 Installation & Setup

Backend

git clone https://github.com/VarunKumar310/AI_Interview_Practice.git
cd AI_Interview_Practice/backend
python -m venv venv
source venv/Scripts/activate  # Windows
# or
source venv/bin/activate     # Linux/Mac
pip install -r requirements.txt
cp .env.example .env  # Add API keys
python main.py

API will run at http://localhost:8000

Frontend

cd Interview_prac/Interview_Practice
npm install
npm run dev

App available at http://localhost:5173


---

##🧭 API Endpoints

Category	Endpoint	Description

Authentication	POST /login	Authenticate user
Role Setup	POST /set-role	Set job role
Interview	POST /generate-questions	Generate questions
Evaluation	POST /evaluate-answer	Evaluate user response
Analysis	POST /analyze-speech	Speech clarity check
Reporting	POST /generate-report	Create performance report
Multi-Agent	POST /crew-interview-*	Manage full AI agent workflow



---

##🔮 Future Scope

1. Integration with MCP Tools
Connect domain-specific APIs and live data fetchers to make interviews more realistic and up-to-date.


2. Multi-Modal Interviewing (Video + Voice)
Add emotion, tone, and expression analysis for deeper behavioral insights.


3. Adaptive Learning System
Automatically increase difficulty and generate micro-lessons based on past performance.


4. Plug-and-Play Agents
Extend the ecosystem with Resume Fixer, Communication Coach, or Company-Specific Research Agents.




---

##🎬 Demo & Documentation

🎥 Demo Video: Watch here
📘 Documentation: View full report


---

##🤝 Contributing

1. Fork the repo


2. Create your feature branch: git checkout -b feature/awesome-feature


3. Commit your changes: git commit -m 'Add awesome feature'


4. Push the branch: git push origin feature/awesome-feature


5. Submit a Pull Request 🎉




---

📝 License

Licensed under the MIT License — see LICENSE for details.


---

💬 Contact

👤 Varun Kumar G.V.K
🔗 GitHub Profile
🌐 Project Link
⭐ If you find this project helpful, please give it a star on GitHub!
