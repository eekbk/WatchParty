// File for root element
import 'regenerator-runtime/runtime';
import React /* useContext */ from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route /* redirect */ } from 'react-router-dom';
import io from 'socket.io-client';
import { CreateParty } from './views/CreateParty/CreateParty';
import { UserContextProvider /* UserContext */ } from './context';
import { SearchContextProvider } from './contexts/searchContext';
import App from './views/app';
import WatchParty from './views/watchParty/Room';
import Dashboard from './views/Dashboard';
import Logout from './views/Logout';
import Search from './views/search/Search';
import Dm from './views/Dm/Dm';
import Archive from './views/Archive/Archive';

const socket = io();

function RouteHandler() {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="" element={<Dashboard />} />
            <Route path="logout" element={<Logout />} />
            <Route path="search" element={<Search />} />
            <Route path="watchParty" element={<WatchParty socket={socket} />} />
            <Route path="createParty" element={<CreateParty />} />
            <Route path="profile" element={<div>Profile</div>} />
            <Route path="dm" element={<Dm socket={socket} />} />
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
  </UserContextProvider>,
);
