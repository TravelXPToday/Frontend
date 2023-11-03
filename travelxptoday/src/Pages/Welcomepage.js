import React from "react";
import { Link } from "react-router-dom";

import bgImage from "../Assets/Image/Background.jpg";
import JourneycardsWelcompage from "../Components/JourneycardsWelcomepageComponent";
import Profile from "../Components/ProfileComponent";
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "../Components/LoginButtonComponent";

const WelcomePage = () => {
  const { isAuthenticated } = useAuth0();
  const { loginWithRedirect } = useAuth0();

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
                Welcom to TravelXPToday!
              </h1>
              <p className="text-lg font-semibold mb-8">
                Discover the beauty of the world, share your adventures and
                learn from other travelers.
              </p>
            </div>
          </div>

          {isAuthenticated ? (
            <>
              <button className="bg-pink-500 drop-shadow-lg mt-4 text-white hover:bg-white hover:text-pink-500 text-xl font-semibold py-2 px-6 rounded-full transition duration-300 ease-in-out">
                <Link to="/journey" data-testid="JourneyButton">
                  Continue to your journeys
                </Link>
              </button>
            </>
          ) : (
            <button
              onClick={() => loginWithRedirect()}
              className="bg-pink-500 drop-shadow-lg mt-4 text-white hover:bg-white hover:text-pink-500 text-xl font-semibold py-2 px-6 rounded-full transition duration-300 ease-in-out"
            >
              Login to continue to your journeys!
            </button>
          )}
        </div>
      </div>

      <JourneycardsWelcompage />
    </div>
  );
};

export default WelcomePage;
