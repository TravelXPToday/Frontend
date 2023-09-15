import React, { useEffect, useState } from 'react';
import JourneyCard from './Components/Journeycard';

const App = () => {
  const [journeyData, setJourneyData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://127.0.0.1:5000/journey/all')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log(data);
        setJourneyData(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="journey-card p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Journey from {journeyData.start_location} to {journeyData.end_location}</h2>
      <p className="mb-2"><strong>Start Time:</strong> {journeyData.start_time}</p>
      <p className="mb-2"><strong>End Time:</strong> {journeyData.end_time}</p>
      <p className="mb-2"><strong>Duration:</strong> {journeyData.duration}</p>
      <p className="mb-2"><strong>Mode of Transport:</strong> {journeyData.mode_of_transport}</p>
      <p className="mb-2"><strong>Status:</strong> {journeyData.status}</p>
      <p className="mb-4"><strong>Notes:</strong> {journeyData.notes}</p>
      <h3 className="text-lg font-medium mb-2">Participants:</h3>
      
    </div>
  );
}

export default App;