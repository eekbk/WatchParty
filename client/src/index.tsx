// File for root element
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const { default: App } = require('./views/app.tsx');
const { default: Home } = require('./views/home.tsx');
const { default: WatchParty } = require('./views/watchParty/Room.tsx');
const { default: Profile } = require('./views/watchParty/Profile.tsx');

ReactDOM.createRoot(document.getElementById('app')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="home" element={<Home />} />
          <Route path="watchParty" element={<WatchParty />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);
