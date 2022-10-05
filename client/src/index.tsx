// File for root element
import React from "react";
import ReactDOM from "react-dom/client";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

const { default: App } = require('./app.tsx');
const { default: Home } = require('./home.tsx');
const { default: WatchParty } = require('./watchParty.tsx');


ReactDOM.createRoot(document.getElementById('app')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />}>
          <Route path='home' element={<Home />} />
          <Route path='watchParty' element={<WatchParty />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
