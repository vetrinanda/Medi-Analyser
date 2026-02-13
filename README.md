# Medi Analyser

![Medi Analyser Banner](./frontend/public/banner.png) <!-- Update with your actual banner if available -->

Medi Analyser is an advanced, AI-powered medical report analysis tool designed to provide users with comprehensive health insights. By leveraging cutting-edge Large Language Models (LLMs) and a multi-agent architecture, it simulates a team of specialized medical experts to analyze uploaded medical documents.

Built with a modern tech stack including **React**, **FastAPI**, **LangChain**, and **Google Gemini AI**, Medi Analyser offers a seamless and secure experience for understanding complex medical data.

---

## 🚀 Features

-   **Multi-Specialist Analysis**: Your report is analyzed by three distinct AI specialists:
    -   **Cardiologist**: Focuses on heart health and related metrics.
    -   **Pulmonologist**: Examines respiratory system indicators.
    -   **Psychologist**: Reviews potential stress or mental health correlations.
-   **Unified Team Diagnosis**: A final, synthesized report that combines insights from all specialists into a cohesive summary.
-   **Instant Processing**: Get detailed results in seconds, powered by high-performance backend architecture.
-   **Secure & Private**: Built with privacy in mind. Reports are processed securely and not stored permanently.
-   **Modern UI/UX**: strict adherence to modern design principles with glassmorphism, smooth animations, and a responsive layout using Tailwind CSS.
-   **Rate Limiting**: Fair usage policy implemented with intelligent rate limiting (5 free analyses per day).

---

## 🛠️ Tech Stack

### Frontend
-   **React 19**: The latest version of the popular UI library.
-   **Vite**: Next-generation frontend tooling for blistering fast builds.
-   **Tailwind CSS v4**: Utility-first CSS framework for rapid UI development.
-   **shadcn/ui**: High-quality, accessible, and customizable component library.
-   **Lucide React**: Beautiful & consistent icons.
-   **Axios**: Promise-based HTTP client for the browser.
-   **Framer Motion / Tailwind Animate**: For fluid UI transitions and effects.

### Backend
-   **FastAPI**: A modern, fast (high-performance) web framework for building APIs with Python.
-   **LangChain & LangGraph**: Framework for developing applications powered by language models.
-   **Google Gemini AI**: The core intelligence engine driving the analysis.
-   **Uvicorn**: An ASGI web server implementation for Python.
-   **PyPDF2**: For extracting text from PDF medical reports.
-   **SlowAPI**: For implementing API rate limiting.

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
-   **Node.js** (v18 or higher)
-   **Python** (v3.10 or higher)
-   **Git**

You will also need a **Google Gemini API Key**. You can get one from [Google AI Studio](https://aistudio.google.com/).

---

## 🔧 Installation & Setup

Follow these steps to set up the project locally.

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/medi-analyser.git
cd medi-analyser
```

### 2. Backend Setup
Navigate to the backend directory and set up the Python environment.

```bash
cd backend
# Create a virtual environment
python -m venv .venv

# Activate the virtual environment
# On Windows:
.venv\Scripts\activate
# On macOS/Linux:
source .venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

**Configuration:**
Create a `.env` file in the `backend` directory and add your Google API key:

```env
GOOGLE_API_KEY=your_actual_api_key_here
```

**Run the Backend Server:**
```bash
# Start the FastAPI server
python main.py
# OR
uvicorn app.main:app --reload
```
The backend will start at `http://localhost:8000`.

### 3. Frontend Setup
Open a new terminal, navigate to the frontend directory, and install dependencies.

```bash
cd frontend
npm install
```

**Run the Frontend Development Server:**
```bash
npm run dev
```
The frontend will start at `http://localhost:5173`.

---

## 📖 Usage Guide

1.  Open your browser and navigate to `http://localhost:5173`.
2.  Click on the **"Upload Report"** card or drag and drop your medical report (PDF or Image).
3.  Click the **"Analyze Report"** button.
4.  Wait for the AI agents to process the document. You will see a loading animation representing the specialists at work.
5.  Once complete, view the detailed breakdown from the **Cardiologist**, **Pulmonologist**, and **Psychologist**, along with the final **Team Summary**.

---

## 📂 Project Structure

```
medi-analyser/
├── backend/                # FastAPI Backend
│   ├── app/                # Application Source
│   │   ├── main.py         # App Entry Point & API Routes
│   │   ├── agent.py        # LangChain Agent Logic
│   │   └── limiter.py      # Rate Limiting Logic
│   ├── .env                # Environment Variables (Create this)
│   ├── requirements.txt    # Python Dependencies
│   └── main.py             # Server Entry Point
│
├── frontend/               # React Frontend
│   ├── src/
│   │   ├── components/     # UI Components (SpecialistCard, FileUpload, etc.)
│   │   ├── App.jsx         # Main Application Component
│   │   └── main.jsx        # React Entry Point
│   ├── package.json        # Node.js Dependencies
│   └── vite.config.js      # Vite Configuration
│
└── README.md               # Project Documentation
```

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1.  Fork the repository.
2.  Create your feature branch (`git checkout -b feature/AmazingFeature`).
3.  Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4.  Push to the branch (`git push origin feature/AmazingFeature`).
5.  Open a Pull Request.

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Disclaimer**: *Medi Analyser is an AI-powered tool for informational purposes only. It is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.*
