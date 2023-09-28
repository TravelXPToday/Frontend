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
    <main className='bg-gradient-to-b from-teal-100/50 dark:from-teal-900 to-teal-700/50 dark:to-slate-900 '>
      <NavBar />
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/journey" element={<AppJourney />} />
      </Routes>
    </main>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
