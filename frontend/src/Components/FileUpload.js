// src/components/FileUpload.js
import React, { useState } from 'react';
import axios from 'axios';

const FileUpload = ({ onUploadSuccess, onUploadStart, onUploadError }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedFile(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedFile) {
      onUploadError("No file selected");
      return;
    }
    
    const formData = new FormData();
    formData.append("file", selectedFile);
    const backendUrl = process.env.REACT_APP_BACKEND_URL || 'backend/api/upload';
    console.log(backendUrl);
    console.log( process.env)

    try {
      onUploadStart();
      const response = await axios.post(backendUrl, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      onUploadSuccess(response);
    } catch (error) {
      onUploadError("Error uploading file. Please try again.");
      console.error("Error:", error);
    }
  };

  return (
    <div className="upload-container">
      <h2 className="text-center mb-4">Explain My Lab Results</h2>
      <form onSubmit={handleSubmit} onDragEnter={handleDrag} className={`upload-form ${dragActive ? 'drag-active' : ''}`}>
        <input 
          type="file" 
          id="fileInput" 
          className="file-input"
          accept="application/pdf" 
          onChange={handleFileChange}
        />
        <label htmlFor="fileInput" className="file-label">
          {selectedFile ? selectedFile.name : 'Drag and drop your PDF here or click to select'}
        </label>
        {dragActive && 
          <div 
            className="drag-file-element"
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          ></div>
        }
        <button type="submit" className="btn btn-primary btn-block mt-3" disabled={!selectedFile}>
          Upload and Analyze
        </button>
      </form>
    </div>
  );
};

export default FileUpload;