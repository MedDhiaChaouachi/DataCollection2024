import React, { useEffect } from 'react';
//import '../css/DownloadPage.css';

const Downloadthirdpartcookies = () => {
  const downloadUrl = 'https://we.tl/3o4qpfpUSR';

  useEffect(() => {
    document.body.classList.add('download-page');
    return () => {
      document.body.classList.remove('download-page');
    };
  }, []);

  return (
    <div className="container">
      <h1 className="title">Install Stop Third-Party Cookies</h1>
      <p className="description">
        Click the button below to download the Extension that stops third-party 
      </p>
      <a href={downloadUrl} download className="download-button">
        Download Extension
      </a>
    </div>
  );
};

export default Downloadthirdpartcookies;
