import React from 'react';
import ReactDOM from 'react-dom/client';
import ResponsiveRouterIndex from './Pages/Index/ResponsiveRouterIndex';
import ResponsiveRouterHome from './Pages/Home/ResponsiveRouterHome';
import {Route, Routes, BrowserRouter} from "react-router-dom"


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route exact path="/" element={<ResponsiveRouterIndex/>} />
      <Route exact path="/home" element={<ResponsiveRouterHome/>} />
    </Routes>
  </BrowserRouter>
);
