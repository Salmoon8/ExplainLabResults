// src/App.js
import React, { useState } from 'react';
import FileUpload from './Components/FileUpload';
import ResultsTable from './Components/Results';
import LoadingSpinner from './Components/LoadingSpinner';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'; // We'll create this for custom styles

const App = () => {
  const [analysisData, setAnalysisData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleUploadSuccess = async (response) => {
    setAnalysisData(response.data);
    setIsLoading(false);
  };

  const handleUploadStart = () => {
    setIsLoading(true);
    setError(null);
    setAnalysisData(null);
  };

  const handleUploadError = (errorMessage) => {
    setIsLoading(false);
    setError(errorMessage);
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <header className="bg-primary text-white text-center py-4">
        <h1 className="mb-2">Lab Results Analyzer</h1>
        <p className="lead">Upload your lab test PDF and get detailed interpretations.</p>
      </header>

      <main className="container my-4 flex-grow-1">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card shadow-sm mb-4">
              <div className="card-body">
                <FileUpload 
                  onUploadSuccess={handleUploadSuccess}
                  onUploadStart={handleUploadStart}
                  onUploadError={handleUploadError}
                />
              </div>
            </div>

            {isLoading && <LoadingSpinner />}

            {error && (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            )}

            {analysisData && (
              <div className="card shadow-sm mt-4 results-card">
                <div className="card-header bg-info text-white">
                  <h5>Analysis Results</h5>
                </div>
                <div className="card-body">
                  <ResultsTable analysisData={analysisData} />
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <footer className="bg-dark text-white text-center py-3">
        <p className="mb-0">&copy; 2024 Lab Results Analyzer. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;