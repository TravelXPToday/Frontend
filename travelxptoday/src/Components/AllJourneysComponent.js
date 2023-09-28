import React, { useEffect, useState } from "react";

const AllJourneyComponents = () => {
  const [journeyData, setJourneyData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/journey/all")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        const sortedData = data.sort((a, b) => new Date(b.end_time) - new Date(a.end_time));
        setJourneyData(sortedData);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);  

  if (loading) return <div className="flex justify-center items-center mt-10"><div className="animate-spin rounded-lg p-2 bg-pink-500 text-white text-2xl">Loading...</div></div>;
  if (error) return <div>Error: {error.message}</div>;
  if (journeyData.length === 0) return <div>No journeys to display</div>;  // Handling case when no journeys are available

  return (
    <section className="py-16">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-semibold mb-8 text-white">All my Journeys</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 md:mx-10">
          {journeyData.map((journey) => (
            <div key={journey.id} className="flex flex-col bg-slate-900 rounded-lg shadow-md shadow-teal-300 overflow-hidden lg:mx-8 sm:mx-4 h-full">
              <img
                src={journey.image_url} 
                alt={`Journey to ${journey.name}`}  // Made alt text more descriptive
                className="w-full mb-4 h-48 overflow-hidden"
              />
              <div className="px-6 pt-4 pb-2 flex-grow"> 
                <h3 className="text-white font-bold text-xl mb-2">{journey.name}</h3>
                <p className="text-gray-200 text-base">{journey.description}</p>
              </div>
              <div className="px-6 pt-4 border-t-2 border-pink-700">
                <p className="text-white text-base mb-2">Travelers: </p>
                {journey.travelers.map((traveler) => (
                  <span className="inline-block bg-pink-500 rounded-full px-3 mb-4 py-1 text-sm font-semibold text-white mr-2" key={traveler.name}>{traveler.name}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default AllJourneyComponents;
