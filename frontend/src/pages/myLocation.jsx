import React, { useState, useEffect } from 'react';
//import '../css/LocationApp.css';

const LocationApp = () => {
  const [location, setLocation] = useState({});
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const apiKey = 'pk.704176111c745fa2218a1565e9a82c65'; // Your LocationIQ API key

  useEffect(() => {
    document.body.classList.add('location-app');
    return () => {
      document.body.classList.remove('location-app');
    };
  }, []);

  const getLocation = () => {
    setLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  };

  const showPosition = (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    setLocation({ latitude, longitude });

    fetch(`https://us1.locationiq.com/v1/reverse.php?key=${apiKey}&lat=${latitude}&lon=${longitude}&format=json`)
      .then(response => response.json())
      .then(data => {
        setLoading(false);
        if (data && data.display_name) {
          setLocation(prevState => ({
            ...prevState,
            address: data.display_name
          }));
        } else {
          setError("Address not found");
        }
      })
      .catch(error => {
        setLoading(false);
        setError(`Error fetching address: ${error}`);
      });
  };

  const showError = (error) => {
    setLoading(false);
    switch(error.code) {
      case error.PERMISSION_DENIED:
        setError("User denied the request for Geolocation.");
        break;
      case error.POSITION_UNAVAILABLE:
        setError("Location information is unavailable.");
        break;
      case error.TIMEOUT:
        setError("The request to get user location timed out.");
        break;
      case error.UNKNOWN_ERROR:
        setError("An unknown error occurred.");
        break;
      default:
        setError("An unknown error occurred.");
    }
  };

  return (
    <div className="container">
      <h1 className="title">Get Your Current Location</h1>
      <button className="getLocationBtn" onClick={getLocation}>Get Location</button>
      <div id="locationInfo" className={`locationInfo ${loading ? 'loading' : 'show'}`}>
        {location.latitude && <p>Latitude: {location.latitude}</p>}
        {location.longitude && <p>Longitude: {location.longitude}</p>}
        {location.address && <p>Address: {location.address}</p>}
        {error && <p>{error}</p>}
      </div>
    </div>
  );
};

export default LocationApp;
