import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import AppJourney from './Pages/AppJourney';
import WelcomePage from './Pages/Welcomepage';
import NavBar from './Components/NavbarComponent';
import { ThemeProvider } from "@material-tailwind/react";
import DailyMomentsPage from './Pages/DailyMomentsPage';
// import TravelerPage from './Pages/TravelerPage';
  ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider>
    <BrowserRouter>
    <main className='bg-gradient-to-b from-teal-900 to-blue-gray-900 '>
      <NavBar />
      <Routes>
        <Route path="/welcomepage" element={<WelcomePage />} />
        <Route path="/journey" element={<AppJourney />} />
        <Route path="/journey/:id" element={<DailyMomentsPage/>} />
        {/* <Route path='/traveler' element={<TravelerPage/>} /> */}
      </Routes>
    </main>
    </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
