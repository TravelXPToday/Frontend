import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import AppJourney from './Pages/AppJourney';
import WelcomePage from './Pages/Welcomepage';
import NavBar from './Components/Navbar';
import { ThemeProvider } from "@material-tailwind/react";
ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider>
    <BrowserRouter>
    <main className='bg-gradient-to-b from-teal-700 to-blue-gray-900 '>
      <NavBar />
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/journey" element={<AppJourney />} />
      </Routes>
    </main>
    </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
