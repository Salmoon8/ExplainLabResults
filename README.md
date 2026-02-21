# ExplainLabResults

A web-based application that leverages the **Gemini API** to translate complex medical laboratory results into easy-to-understand, layman's terms.

## 🚀 Features

- **AI Interpretation**: Uses Google Gemini to explain biomarkers and clinical findings with intuitive color coded results and automatic personalization/advice.
- **Full-Stack Architecture**: Python-based backend and JavaScript/HTML/CSS frontend.
- **Containerized**: Fully Dockerized for consistent deployment.

## 🛠️ Tech Stack

- **Backend**: Python (Gemini API integration)
- **Frontend**: JavaScript, HTML, CSS
- **Orchestration**: Docker Compose

## 📦 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Salmoon8/ExplainLabResults.git
cd ExplainLabResults
```

### 2. Configure API Key

Add your Google Gemini API key to your environment variables or backend configuration.

Example:

```bash
export GEMINI_API_KEY=your_api_key_here
```

Or create a `.env` file in the backend folder:

```
GEMINI_API_KEY=your_api_key_here
```

### 3. Launch with Docker

```bash
docker-compose up --build
```
