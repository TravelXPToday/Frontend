import React, { useEffect, useState } from "react";
import ModalJourneyComponent from "./ModalJourneyComponent";
import { Link } from "react-router-dom";
import { motion, useScroll } from "framer-motion"
import ScrollComponent from "./ScrollComponent";

const AllJourneyComponents = () => {
  const [journeyData, setJourneyData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); 

  const toggleModal = () => setIsModalOpen(!isModalOpen);  
  const refresh = () => {
    setTimeout(() => {
      window.location.reload();
    }, 200);  
  }; 
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

  const Modal = () => ( 
    <div className="fixed z-20 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-gradient-to-b from-teal-700 to-blue-gray-900 transition-opacity ease-in-out delay-150" aria-hidden="true"></div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <div className="inline-block align-bottom bg-white border-4 border-pink-500 rounded-lg text-left overflow-hidden shadow-md shadow-teal-900 transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            
            <ModalJourneyComponent toggleModal={toggleModal} refresh={refresh} />
            
          </div>
          <div className=" px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button onClick={toggleModal} type="button" className="mt-3 w-full  inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-pink-500 text-base font-medium text-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm hover:text-pink-500 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  if (loading) return <div className="flex justify-center items-center mt-10"><div className="animate-spin rounded-lg p-2 bg-pink-500 text-white text-2xl">Loading...</div></div>;
  if (error) return <div>Error: {error.message}</div>;
  if (journeyData.length === 0) return <div>No journeys to display</div>;

  return (
    <section className="py-16">
      <ScrollComponent />
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-semibold mb-8 text-white">All my Journeys</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 md:mx-10">
          <div className="flex flex-col bg-slate-900 rounded-lg shadow-md shadow-teal-300 overflow-hidden lg:mx-8 sm:mx-4 h-full justify-center items-center">
          <button onClick={toggleModal} className="bg-pink-500 m-6 sticky  top-[80px] text-white font-bold py-2 px-4 rounded-full border-2 animate-pulse">
            Create New Journey
          </button>
          <button 
            onClick={toggleModal} 
            className="fixed bottom-8 right-8 bg-pink-500 text-white font-bold py-2 px-4 rounded-full border-2 z-10 animate-pulse"
        >
             New
        </button>
          </div>
          {journeyData.map((journey) => (
            <Link to={`/journey/${journey._id}`} className="transition ease-in-out delay-150 hover:-translate-y-1 md:hover:scale-110 hover:scale-y-110 duration-100" style={{ textDecoration: 'none' }}
            
            >
              <div key={journey.id} className="flex flex-col bg-slate-900 rounded-lg shadow-md shadow-teal-300 overflow-hidden lg:mx-8 sm:mx-4 h-full">
                <img
                  src={journey.image_url}
                  alt={`Journey to ${journey.name}`}
                  className="w-full mb-4 h-48 overflow-hidden object-cover"
                />
                <div className="px-6 pt-4 pb-2 flex-grow">
                  <h3 className="text-white font-bold text-xl mb-2">{journey.name}</h3>
                  <p className="text-gray-200 text-base">{journey.description}</p>
                </div>
                <div className="px-6 pt-4 border-t-2 border-pink-700">
                  <p className="text-white text-base mb-2">Travelers: </p>
                  {journey.travelers.map((traveler) => (
                    <span className="inline-block bg-pink-500 rounded-full px-3 mb-4 py-1 text-sm font-semibold text-white  mr-2" key={traveler.name}>{traveler.name}</span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      {isModalOpen && <Modal />}  
    </section>
  );
};

export default AllJourneyComponents;  
