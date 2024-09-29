// src/Components/Results.js
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Results.css';

const ResultsTable = ({ analysisData }) => {
  if (!analysisData || !analysisData.Results || analysisData.Results.length === 0) {
    return (
      <div className="alert alert-info" role="alert">
        No results available. Please upload a valid lab test PDF.
      </div>
    );
  }

  const getRowClass = (interpretation) => {
    if (interpretation.toLowerCase().includes('within the normal range')) {
      return 'result-normal';
    }
    if (interpretation.toLowerCase().includes('significantly below') || interpretation.toLowerCase().includes('significantly above')) {
      return 'result-danger';
    }
    if (interpretation.toLowerCase().includes('below') || interpretation.toLowerCase().includes('above')) {
      return 'result-warning';
    }
    return '';
  };

  return (
    <div className="results-container">
      <h2 className="text-center mb-4">{analysisData["Test Name"]}</h2>

      <div className="alert alert-info mb-4">
        <strong>Final Comments:</strong> {analysisData["Final Comments"]}
      </div>

      <div className="table-responsive results-table">
        <table className="table table-hover table-bordered">
          <thead className="thead-dark">
            <tr>
              <th>Status</th>
              <th>Parameter</th>
              <th>Result</th>
              <th>Normal Range</th>
              <th>Interpretation</th>
            </tr>
          </thead>
          <tbody>
            {analysisData.Results.map((result, index) => (
              <React.Fragment key={index}>
                <tr className={getRowClass(result.Interpretation)}>
                  <td className="status-square"><div className="square"></div></td>
                  <td>{result.Parameter}</td>
                  <td>{result.Result}</td>
                  <td>{result["Normal Range"]}</td>
                  <td>{result.Interpretation}</td>
                </tr>
                {result.Comments !== "No further action is required." && (
                  <tr className="table-light">
                    <td colSpan="5" className="text-muted">
                      <small><strong>Comments:</strong> {result.Comments}</small>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 interpretation-legend">
        <h5>Interpretation Legend:</h5>
        <ul className="list-unstyled">
          <li><span className="legend-normal"></span> Within normal range</li>
          <li><span className="legend-warning"></span> Outside normal range</li>
          <li><span className="legend-danger"></span> Significantly outside normal range</li>
        </ul>
      </div>
    </div>
  );
};

export default ResultsTable;