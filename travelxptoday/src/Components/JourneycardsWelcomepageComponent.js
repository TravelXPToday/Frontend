/*
Component for displaying 3 most recent journeys.
*/

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const JourneycardsWelcompage = () => {
  const [journeyData, setJourneyData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user, isAuthenticated, isLoading } = useAuth0();
  useEffect(() => {
    fetch("http://127.0.0.1:5000/journey/all")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        const sortedData = data.sort((a, b) => new Date(b.end_time) - new Date(a.end_time));
        console.log(sortedData);
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

  return (
    <section className=" py-16">
      <div className="container mx-auto text-center ">
        <h2 className="text-4xl font-semibold mb-8 text-white">My Most Recent Journeys</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 md:mx-10">
          {journeyData && journeyData.slice(0, 3).map((journey) => ( 
            <Link to={`/journey/${journey._id}`} className="transition ease-in-out delay-150 hover:-translate-y-1 md:hover:scale-110 hover:scale-y-110 duration-100" style={{ textDecoration: 'none' }}>
            <div key={journey.id} className="flex flex-col bg-slate-900 rounded-lg shadow-md shadow-teal-300 overflow-hidden lg:mx-8 sm:mx-4 h-full">
            <img
                src={journey.image_url} 
                alt={journey.name}
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
        </Link>
          ))}
        </div>
      </div>
    </section>
);
}

export default JourneycardsWelcompage;
