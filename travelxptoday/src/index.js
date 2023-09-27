import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import AppJourney from './Pages/AppJourney';
import WelcomePage from './Pages/Welcomepage';
import NavBar from './Components/Navbar';
ReactDOM.render(
  <React.StrictMode>
    
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/journey" element={<AppJourney />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
