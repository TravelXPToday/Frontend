import React from 'react';
import {Link} from "react-router-dom";

const WelcomePage = () => {
  return (
    <div className="bg-blue-500 h-screen">
      {/* Navigatiebalk */}
      <nav className="bg-white py-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <a href="/" className="text-2xl font-semibold text-blue-500">TravelXPToday</a>
          <ul className="flex space-x-4">
            <li><a href="#" className="text-gray-600 hover:text-gray-800">Home</a></li>
            <li><a href="#" className="text-gray-600 hover:text-gray-800">Bestemmingen</a></li>
            <li><a href="#" className="text-gray-600 hover:text-gray-800">Blog</a></li>
            <li><a href="#" className="text-gray-600 hover:text-gray-800">Contact</a></li>
          </ul>
        </div>
      </nav>

      {/* Welkomstinhoud */}
      <div className="container mx-auto p-16 text-white text-center">
        <h1 className="text-4xl font-semibold mb-4">Welkom bij TravelXPToday!</h1>
        <p className="text-lg mb-8">Ontdek de schoonheid van de wereld, deel je avonturen en leer van andere reizigers.</p>
        <button className="bg-white text-blue-500 hover:bg-blue-400 text-xl font-semibold py-2 px-6 rounded-full transition duration-300 ease-in-out">
          <Link to="/journey"> Ga verder naar reizen </Link>
        </button>
      </div>

      {/* Populaire bestemmingen */}
      <section className="bg-white py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-2xl font-semibold mb-8">Populaire Bestemmingen</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 ">
            <div className="bg-blue-100 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">Parijs, Frankrijk</h3>
              <img
                src="https://www.zininfrankrijk.nl/wp-content/uploads/2019/03/Parijs-%C3%8Ele-de-France-shutterstock_710380270-660x330.jpg" // Voeg de URL naar de afbeelding van Parijs toe
                alt="Parijs, Frankrijk"
                className="w-full rounded-lg mb-4 object-fill h-48 w-96 m-auto"
              />
              <p>Ontdek de romantiek van de stad van de liefde.</p>
            </div>
            <div className="bg-blue-100 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">Bali, Indonesië</h3>
              <img
                src="https://balidave.com/wp-content/uploads/2022/11/best-hotel-bali.jpeg" // Voeg de URL naar de afbeelding van Bali toe
                alt="Bali, Indonesië"
                className="w-full rounded-lg mb-4 object-fill h-48 w-96 m-auto"
              />
              <p>Verlies jezelf in de prachtige stranden en cultuur van Bali.</p>
            </div>
            <div className="bg-blue-100 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">Kaapstad, Zuid-Afrika</h3>
              <img
                src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/14/10/2e/1e/cape-town.jpg?w=700&h=-1&s=1" // Voeg de URL naar de afbeelding van Kaapstad toe
                alt="Kaapstad, Zuid-Afrika"
                className="w-full rounded-lg mb-4 object-fill h-48 w-96 m-auto"
              />
              <p>Ervaar de adembenemende landschappen van Kaapstad.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default WelcomePage;
