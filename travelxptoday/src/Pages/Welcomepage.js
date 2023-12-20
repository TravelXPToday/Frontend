import  { useEffect ,useState} from 'react';
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import bgImage from '../Assets/Image/Background.jpg';
import JourneycardsWelcompage from '../Components/JourneycardsWelcomepageComponent';
import { API_BASE_URL } from '../Config';
const WelcomePage = () => { 
  document.title = "Welcome to TravelXPToday!";
  const { user, isAuthenticated,loginWithRedirect } = useAuth0();


  useEffect(() => {
    if (isAuthenticated) {
      const abortController = new AbortController();
      const signal = abortController.signal;
  
      const fetchData = async () => {
        try {
          const response = await fetch(`${API_BASE_URL}/traveler/all`, { signal });
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          const data = await response.json();
  
          const userIsInDatabase = checkUserInDatabase(data, user);
          // console.log(userIsInDatabase ? "user is in database" : "user is not in database");
  
          if (!userIsInDatabase) {
            await addUserToDatabase(user);
          }
        } catch (error) {
          if (error.name !== 'AbortError') {
            console.error("Fetching error: ", error);
          }
        }
      };
  
      fetchData();
  
      return () => {
        abortController.abort(); // Clean up the fetch call if the component unmounts
      };
    }
  }, [isAuthenticated, user]); 

  const checkUserInDatabase = (data, user) => {
    const userEmailLower = user.email.toLowerCase().trim();
    return data.some(traveler => 
      traveler.Email.toLowerCase().trim() === userEmailLower && traveler.ID === user.sub
    ); 
  };

  const addUserToDatabase = async (user) => {
    try {
      const response = await fetch(`${API_BASE_URL}/traveler`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Email: user.email,
          Username: user.nickname,
          ID: user.sub
        })
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const result = await response.json();
      console.log("User added to database:", result);
    } catch (error) {
      console.error("Error adding user to database:", error);
    }
  };

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
