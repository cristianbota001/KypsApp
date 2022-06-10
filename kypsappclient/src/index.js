import React from 'react';
import ReactDOM from 'react-dom/client';
import ResponsiveRouterIndex from './Pages/Index/ResponsiveRouterIndex';
import ResponsiveRouterHome from './Pages/Home/ResponsiveRouterHome';
import {Route, Routes, BrowserRouter} from "react-router-dom"
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducers from './Reducers';

const store = createStore(rootReducers)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<ResponsiveRouterIndex/>} />
        <Route exact path="/home" element={<ResponsiveRouterHome/>} />
      </Routes>
    </BrowserRouter>
  </Provider>
);
