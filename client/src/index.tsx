// File for root element
import 'regenerator-runtime/runtime';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import io from 'socket.io-client';
import { CreateParty } from './views/CreateParty/CreateParty';
import { UserContextProvider } from './context';
import { SearchContextProvider } from './contexts/searchContext';
import App from './views/app';
import WatchParty from './views/watchParty/Room';
import Dashboard from './views/Dashboard';
// import Profile from './views/Profile';
import Search from './views/search/Search';
import Dm from './views/Dm/Dm';
import Archive from './views/Archive/Archive';
import Calendar from './views/Calendar';

const socket = io();

function RouteHandler() {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="" element={<Dashboard />} />
            <Route path="search" element={<Search socket={socket} />} />
            <Route path="calendar" element={<Calendar />} />
            <Route path="watchParty" element={<WatchParty socket={socket} />} />
            <Route path="createParty" element={<CreateParty />} />
            {/* <Route path="profile" element={<Profile />} /> */}
            <Route path="dm" element={<Dm socket={socket} room="" />} />
            <Route path="archive" element={<Archive />} />
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
  </UserContextProvider>
);
