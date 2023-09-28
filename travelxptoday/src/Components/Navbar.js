import React, { useState } from 'react';
import { Link } from "react-router-dom";
import ImageLogo from '../Assets/Image/Logo.jfif';
const NavBar = () => {
    const [isOpen, setIsOpen] = useState(false);
  
    return (
        <nav className="py-4 shadow-md border-b-4 bg-slate-900 border-teal-600 sticky top-0 z-20">
                <div className="container mx-auto flex justify-between items-center">
                <div className='flex justify-between items-center'>          
                    <img src={ImageLogo} alt="logo" className="h-16 w-16 rounded-full object-fill" /> 
                    <a href="/" className="text-2xl font-semibold text-pink-500 hover:border-b-2 hover:border-pink-500">TravelXPToday</a>
                </div>
                <ul className="md:flex hidden space-x-4 mr- ">
                    <li><Link to="/journey" className="text-teal-200 focus:text-white focus:rounded-full focus:bg-pink-500 hover:bg-pink-500 hover:text-white text-s font-semibold py-2 px-6 rounded-full transition duration-300 ease-in-out hover:drop-shadow-lg">Journeys</Link></li>
                    <li><Link to="/"  className="text-teal-200 focus:text-white focus:rounded-full focus:bg-pink-500 hover:bg-pink-500 hover:text-white text-s font-semibold py-2 px-6 rounded-full transition duration-300 ease-in-out hover:drop-shadow-lg">Blog</Link></li>
                    <li><Link to="/"  className="text-teal-200 focus:text-white focus:rounded-full focus:bg-pink-500 hover:bg-pink-500 hover:text-white text-s font-semibold py-2 px-2 rounded-full transition duration-300 ease-in-out hover:drop-shadow-lg mr-10">Contact</Link></li>
                </ul>
                {/* Burger Menu */}
                <div className="md:hidden block py-4 px-6">
                    
                    <button onClick={() => setIsOpen(!isOpen)} className="focus:outline-none mr-5">
                    <div className={`w-6 h-0.5  mb-1.5 bg-pink-500 transform transition-transform duration-200 ${isOpen ? "rotate-45 translate-y-2" : ""}`}></div>
                    <div className={`w-6 h-0.5  mb-1.5 bg-pink-500 transform transition-opacity duration-300 ${isOpen ? "opacity-0" : ""}`}></div>
                    <div className={`w-6 h-0.5  transform bg-pink-500 transition-transform duration-500 ${isOpen ? "-rotate-45 translate-y-[-10px]" : ""}`}></div>

                    </button>
                    

                    {isOpen && (
                    <div className="absolute top-9 left-0 w-full mt-16 bg-white shadow-lg rounded-md p-4 z-10">
                        <ul className="space-y-2">
                        <li>
                            <Link to="/journey" className="text-teal-600  focus:text-white focus:rounded-full focus:bg-pink-500 hover:bg-pink-500 hover:text-white text-sm font-semibold py-2 px-4 rounded-full transition duration-300 ease-in-out">
                            Journeys
                            </Link>
                        </li>
                        <li>
                            <Link to="#" className="text-teal-600 hover:bg-pink-500  focus:text-white focus:rounded-full focus:bg-pink-500 hover:text-white text-sm font-semibold py-2 px-4 rounded-full transition duration-300 ease-in-out">
                            Blog
                            </Link>
                        </li>
                        <li>
                            <Link to="#" className="text-teal-600 hover:bg-pink-500  focus:text-white focus:rounded-full focus:bg-pink-500 hover:text-white text-sm font-semibold py-2 px-4 rounded-full transition duration-300 ease-in-out">
                            Contact
                            </Link>
                        </li>
                        </ul>
                    </div>
                    )}

                </div>
                </div>
            </nav>
    )
}
export default NavBar;