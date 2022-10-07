// File for root element
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CreateParty } from './views/CreateParty';

const { default: App } = require('./views/app.tsx');
const { default: Home } = require('./views/home.tsx');
const { default: WatchParty } = require('./views/watchParty/Room.tsx');
const { default: Dashboard } = require('./views/Dashboard.tsx');

ReactDOM.createRoot(document.getElementById('app')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="" element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route
            path="watchParty"
            element={(
              <WatchParty
                videos={[
								  {
								    url: 'https://www.youtube.com/watch?v=IGQBtbKSVhY',
								    snippet: {
								      title: 'Peace',
								      description: 'A place to relax and chill',
								    },
								  },
								  {
								    url: 'https://www.youtube.com/watch?v=LrpyWWgmRno',
								    snippet: {
								      title: 'AHAHAHAHA',
								      description: 'A place to relax and chill',
								    },
								  },
                ]}
              />
     )}
          />
          <Route path="createParty" element={<CreateParty />} />
          <Route path="profile" element={<div>Profile</div>} />
          <Route path="dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);
