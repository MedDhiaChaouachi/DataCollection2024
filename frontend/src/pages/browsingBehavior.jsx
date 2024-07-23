import React, { useEffect } from 'react';
import '../css/DownloadPage.css';

const DownloadDataCollect = () => {
  const downloadUrl = 'https://we.tl/HfspwC4NWT';

  useEffect(() => {
    document.body.classList.add('download-page');
    return () => {
      document.body.classList.remove('download-page');
    };
  }, []);

  return (
    <div className="container">
      <h1 className="title">Install AnalyTica Data Collection</h1>
      <p className="description">
        Click the button below to download AnalyTica Data Collection Extension 
      </p>
      <a href={downloadUrl} download className="download-button">
        Download Extension
      </a>
    </div>
  );
};

export default DownloadDataCollect;
