import React from 'react';
import FileUpload  from'./Components/FileUpload.js';

function App() {
  return (
    <div className="App">
      <header className="bg-primary text-white text-center py-4">
        <h1>Explain My Lab Results</h1>
        <p>Upload your lab test PDF to get insights</p>
      </header>
      <main>
        <FileUpload />
      </main>
      <footer className="bg-light text-center py-3 mt-5">
        <p>&copy; 2024 Explain My Lab Results</p>
      </footer>
    </div>
  );
}

export default App;
