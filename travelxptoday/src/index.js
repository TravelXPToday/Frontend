import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import AppJourney from './Pages/AppJourney';
import WelcomePage from './Pages/Welcomepage';
import ProfilePage from './Pages/ProfilePage';
import NavBar from './Components/NavbarComponent';
import { ThemeProvider } from "@material-tailwind/react";
import DailyMomentsPage from './Pages/DailyMomentsPage';
import { Auth0Provider } from "@auth0/auth0-react";
// import TravelerPage from './Pages/TravelerPage';
  
ReactDOM.render(
    
    <Auth0Provider
      domain="dev-ie13exvycq67h1fb.us.auth0.com"
      clientId="wxGMKUhjLSfFmVdR0CrFvMfC1S6U0Pr0"
      authorizationParams={{
        redirect_uri: "http://localhost:3000/",
      }}
    >
      <React.StrictMode>
        <ThemeProvider>
          <BrowserRouter>
            <main className="bg-gradient-to-b from-teal-900 to-blue-gray-900 ">
              <NavBar />
              <Routes>
                <Route path="/" element={<WelcomePage />} />
                <Route path="/journey" element={<AppJourney />} />
                <Route path="/journey/:id" element={<DailyMomentsPage />} />
                <Route path='/profile' element={<ProfilePage/>} />
                {/* <Route path='/traveler' element={<TravelerPage/>} /> */}
              </Routes>
            </main>
          </BrowserRouter>
        </ThemeProvider>
      </React.StrictMode>
    </Auth0Provider>,
    document.getElementById("root")
  );

reportWebVitals();
