import React from 'react';

const JourneyCard = ({ journey }) => {
  return (
    <div className="journey-card p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Journey from {journey.start_location} to {journey.end_location}</h2>
      <p className="mb-2"><strong>Start Time:</strong> {journey.start_time}</p>
      <p className="mb-2"><strong>End Time:</strong> {journey.end_time}</p>
      <p className="mb-2"><strong>Duration:</strong> {journey.duration}</p>
      <p className="mb-2"><strong>Mode of Transport:</strong> {journey.mode_of_transport}</p>
      <p className="mb-2"><strong>Status:</strong> {journey.status}</p>
      <p className="mb-4"><strong>Notes:</strong> {journey.notes}</p>
      <h3 className="text-lg font-medium mb-2">Participants:</h3>
      
    </div>
  );
}

export default JourneyCard;
