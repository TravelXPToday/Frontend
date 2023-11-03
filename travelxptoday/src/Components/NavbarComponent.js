import React, { useState } from 'react';
import { Link } from "react-router-dom";
import ImageLogo from '../Assets/Image/Logo.jfif';
import { Cursor, useTypewriter } from "react-simple-typewriter";
import LoginButton from './LoginButtonComponent';
import { useAuth0 } from "@auth0/auth0-react";
import AvatarMenu from './AvatarComponent';
const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, user } = useAuth0();
  const handleLinkClick = () => {
    setIsOpen(false);
  };

  const [text] = useTypewriter({
    words: (isAuthenticated ? [`Welcome ${user.name}!`, `Where is ${user.name} going today?`, `${user.name}, TRAVELLL!!`, "“To Travel is to Live.”"] : 
    ["TravelXPToday", "Where are you going today?", "TravelXPToday", "Adventure!!", "TravelXPToday", "“To Travel is to Live.”"]),

    loop: true,
    delaySpeed: 2000,
  });
  return (
    <nav className="py-4 shadow-md border-b-4 bg-slate-900 border-teal-600 sticky top-0 z-20">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex justify-between items-center">
          <Link to="/" data-testid="ImageToWelcomePage">
            <img
              src={ImageLogo}
              alt="logo"
              className="h-16 w-16 rounded-full object-fill"
            />
          </Link>
          <Link
            to="/"
            data-testid="TypeWriterButtonToWelcomePage"
            className="ml-4 text-2xl font-semibold text-pink-500 hover:border-b-2 hover:border-pink-500"
          >
            {text}
          </Link>
          <Cursor className="font-bold" cursorColor="#e91e63" />
        </div>
        <ul className="md:flex  space-x-4 flex flex-row justify-center align-middle justify-items-center">
          {isAuthenticated ? (
            <>
              <li className="md:flex hidden" >
                <Link
                  to="/journey"
                  className="text-teal-200 focus:text-white focus:rounded-full focus:bg-pink-500 hover:bg-pink-500 hover:text-white text-s font-semibold px-6 rounded-full transition duration-300 ease-in-out hover:drop-shadow-lg"
                  data-testid="JourneyLi"
                >
                  Journeys
                </Link>
              </li>
              <li className="md:flex hidden">
                <AvatarMenu />
              </li>
            </>
          ) : (
            <li className="md:flex hidden">
              <LoginButton />
            </li>
          )}
        </ul>

        <div className="md:hidden block py-4 px-6">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="focus:outline-none mr-5"
            data-testid="HamburgerButton"
          >
            <div
              className={`w-6 h-0.5  mb-1.5 bg-pink-500 transform transition-transform duration-200 ${isOpen ? "rotate-45 translate-y-2" : ""
                }`}
            ></div>
            <div
              className={`w-6 h-0.5  mb-1.5 bg-pink-500 transform transition-opacity duration-300 ${isOpen ? "opacity-0" : ""
                }`}
            ></div>
            <div
              className={`w-6 h-0.5  transform bg-pink-500 transition-transform duration-500 ${isOpen ? "-rotate-45 translate-y-[-10px]" : ""
                }`}
            ></div>
          </button>

          {isOpen && (
            <div className="absolute top-9 left-0 w-full mt-16 bg-white shadow-lg rounded-md p-4 z-10">
              <ul className="space-y-2 ">
                {isAuthenticated ? (
                  <>
                    <li>
                      <Link
                        to="/journey"
                        data-testid="HamburgerToJourneyButton"
                        onClick={handleLinkClick}
                        className="text-teal-600 focus:text-white focus:rounded-full focus:bg-pink-500 hover:bg-pink-500 hover:text-white text-sm font-semibold py-2 px-4 rounded-full transition duration-300 ease-in-out"
                      >
                        Journeys
                      </Link>
                    </li>
                    <li className=' ml-3' >
                      <AvatarMenu />
                    </li>
                    
                  </>
                ) : (
                  <ul className="space-y-2">

                    <li>
                      <LoginButton />
                    </li>
                  </ul>
                )}
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
export default NavBar;