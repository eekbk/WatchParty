// File for root element
import React /* useContext */ from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route /* redirect */ } from 'react-router-dom';
import io from 'socket.io-client';
import { CreateParty } from './views/CreateParty/CreateParty';
import { UserContextProvider /* UserContext */ } from './context';
import { SearchContextProvider } from './contexts/searchContext';

const { default: App } = require('./views/app.tsx');
const { default: WatchParty } = require('./views/watchParty/Room.tsx');
const { default: Dashboard } = require('./views/Dashboard.tsx');
const { default: Calendar } = require('./views/Calendar.tsx');
const { default: Search } = require('./views/search/Search.tsx');
const { default: Dm } = require('./views/Dm/Dm.tsx');
const { default: ScrollDash } = require('./views/ScrollDash.tsx');

const socket = io();

function RouteHandler() {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="" element={<Dashboard />} />
            <Route path="search" element={<Search />} />
            <Route path="calendar" element={<Calendar />} />
            <Route path="scrollDash" element={<ScrollDash />} />
            <Route path="watchParty" element={<WatchParty socket={socket} />} />
            <Route path="createParty" element={<CreateParty />} />
            <Route path="profile" element={<div>Profile</div>} />
            <Route path="dm" element={<Dm socket={socket} />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  );
}

ReactDOM.createRoot(document.getElementById('app')!).render(
  <UserContextProvider>
    <SearchContextProvider>
      <RouteHandler />
    </SearchContextProvider>
  </UserContextProvider>,
);
