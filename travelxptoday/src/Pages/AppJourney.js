import React, { useEffect, useState } from "react";
import "../App.css";

const AppJourney = () => {
  const [journeyData, setJourneyData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/journey/all")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setJourneyData(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div class="flex flex-row flex-wrap">
      {journeyData.map((journey) => (
        <div class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 m-2.5">
          <a href="#">
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Journey from {journey.start_location} to {journey.end_location}
            </h5>
          </a>
          <p class="mb-2 font-normal text-gray-700 dark:text-gray-400">
            <strong>Start Time:</strong> {journey.start_time}
          </p>
          <p class="mb-2 font-normal text-gray-700 dark:text-gray-400">
            <strong>End Time:</strong> {journey.end_time}
          </p>
          <p class="mb-2 font-normal text-gray-700 dark:text-gray-400">
            <strong>Duration:</strong> {journey.duration}
          </p>
          <p class="mb-2 font-normal text-gray-700 dark:text-gray-400">
            <strong>Mode of Transport:</strong> {journey.mode_of_transport}
          </p>
          <p class="mb-2 font-normal text-gray-700 dark:text-gray-400">
            <strong>Status:</strong> {journey.status}
          </p>
          <p class="mb-4 font-normal text-gray-700 dark:text-gray-400">
            <strong>Notes:</strong> {journey.notes}
          </p>
          <h3 class="text-lg font-medium mb-2">Participants:</h3>
          {/* Add code here to display participants */}
          <a
            href="http://127.0.0.1:5000/traveler/all"
            class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Read more
            <svg
              class="w-3.5 h-3.5 ml-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </a>
        </div>
      ))}
    </div>
  );
};

export default AppJourney;
