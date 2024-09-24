import React, { useState } from 'react';
import axios from 'axios';

const FileUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedFile) {
      setUploadStatus("No file selected");
      return;
    }
    
    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      setUploadStatus("Uploading...");
      const response = await axios.post("http://localhost:5000//api/upload", formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setUploadStatus("File uploaded successfully!");
      console.log(response.data);
    } catch (error) {
      setUploadStatus("Error uploading file");
      console.error("Error:", error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-lg p-4">
            <h2 className="text-center mb-4">Explain My Lab Results</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="fileInput" className="font-weight-bold">
                  Upload your lab test PDF:
                </label>
                <input 
                  type="file" 
                  className="form-control-file" 
                  id="fileInput" 
                  accept="application/pdf" 
                  onChange={handleFileChange} 
                />
              </div>
              <button type="submit" className="btn btn-primary btn-block mt-3">
                Upload
              </button>
            </form>
            {uploadStatus && (
              <div className={`alert mt-4 ${uploadStatus.includes("Error") ? 'alert-danger' : 'alert-success'}`}>
                {uploadStatus}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileUpload;
