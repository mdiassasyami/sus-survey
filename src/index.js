import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Identitas from './pages/Identitas';
import Survey from './pages/Survey';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Identitas />} />
      <Route path="/survey" element={<Survey />} />
    </Routes>
  </BrowserRouter>
);
