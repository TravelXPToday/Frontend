import React from 'react';
import { Link } from "react-router-dom";

import bgImage from '../Assets/Image/Background.jpg';
import JourneycardsWelcompage from '../Components/JourneycardsWelcomepageComponent';
const WelcomePage = () => { 
  return (
    <div className=" ">
      {/* Welkomstinhoud */}
      <div
        className="container mx-auto  bg-black p-16  text-white text-center"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="flex flex-col items-center ">
          <div className="relative inline-block">
            <div className="absolute top-0 left-0 z-0 w-full h-full bg-black opacity-50 transform -skew-x-12">
              {/* This div creates the brush stroke effect */}
            </div>

            <div className="relative z-10">
              <h1 className="text-4xl font-bold mb-4 ">
                Welkom bij TravelXPToday!
              </h1>
              <p className="text-lg font-semibold mb-8">
                Ontdek de schoonheid van de wereld, deel je avonturen en leer
                van andere reizigers.
              </p>
            </div>
          </div>

          <button
            className="bg-pink-500 drop-shadow-lg mt-4 text-white hover:bg-white hover:text-pink-500 text-xl font-semibold py-2 px-6 rounded-full transition duration-300 ease-in-out"
            
          >
            <Link to="/journey"
            data-testid="JourneyButton"> Ga verder naar reizen </Link>
          </button>
          
        </div>
      </div>

      <JourneycardsWelcompage />
    </div>
  );
}

export default WelcomePage;
