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

### 2. Interview Process
- Answer questions using voice or text
- Receive real-time feedback on your responses
- Get follow-up questions based on your answers
- Track your progress with the timer and progress bar

### 3. Performance Review
- View detailed scores across multiple dimensions
- Read personalized feedback and recommendations
- Download comprehensive PDF report
- Identify areas for improvement

### 4. Continuous Improvement
- Practice multiple sessions to track progress
- Focus on weak areas identified in reports
- Compare performance across different interview types

## 🔧 API Endpoints

### Authentication & Session
- `POST /login` - User authentication
- `POST /set-role` - Set interview role
- `POST /set-experience` - Set experience level
- `POST /set-difficulty` - Set difficulty preference

### Interview Management
- `POST /generate-questions` - Generate interview questions
- `POST /evaluate-answer` - Evaluate candidate responses
- `POST /analyze-speech` - Analyze speech quality
- `POST /generate-report` - Create performance report

### Multi-Agent System
- `POST /crew-interview-start` - Start AI agent interview
- `POST /crew-interview-answer` - Process answer through agents
- `POST /crew-interview-end` - End interview and get report

## 🎯 Key Features Explained

### AI Agent Coordination
The system uses a sophisticated multi-agent architecture where each AI agent has a specific responsibility:
- **Interviewer Agent** creates contextually relevant questions
- **Follow-up Agent** evaluates response quality and determines next steps
- **Scoring Agent** provides detailed scoring across multiple metrics
- **Feedback Agent** synthesizes all data into actionable feedback

### Resume Integration
The AI analyzes uploaded resumes to:
- Extract key skills and experiences
- Generate questions about specific projects
- Tailor difficulty based on stated experience
- Provide contextual feedback

### Speech Analysis
Advanced speech processing evaluates:
- Speaking pace and rhythm
- Filler word usage (um, ah, like)
- Clarity and articulation
- Confidence indicators

## 🚀 Deployment

### Backend Deployment (Production)
```bash
# Using Docker
docker build -t ai-interview-backend .
docker run -p 8000:8000 ai-interview-backend

# Or using Gunicorn
pip install gunicorn
gunicorn -w 4 -k uvicorn.workers.UvicornWorker main:app
```

### Frontend Deployment
```bash
# Build for production
npm run build

# Deploy to static hosting (Vercel, Netlify, etc.)
npm run preview
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **CrewAI** for the multi-agent framework
- **Groq** for fast AI inference
- **FastAPI** for the modern web framework
- **React** for the frontend framework

## 📞 Contact

- **GitHub**: [@VarunKumar310](https://github.com/VarunKumar310)
- **Project Link**: [https://github.com/VarunKumar310/AI_Interview_Practice](https://github.com/VarunKumar310/AI_Interview_Practice)

---

⭐ If you find this project helpful, please give it a star on GitHub!
