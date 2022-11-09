import 'regenerator-runtime/runtime';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import io from 'socket.io-client';
import { CreateParty } from './views/CreateParty/CreateParty';
import { UserContextProvider } from './context';
import { VoiceContextProvider } from './contexts/voiceContext';
import App from './views/app';
import WatchParty from './views/watchParty/Room';
import { Dashboard } from './views/Dashboard/Dashboard';
import Dm from './views/Dm/Dm';
import Archive from './views/Archive/Archive';
import Search from './views/search/Search';
// import { Profile } from './views/Profile';

const socket = io();

function RouteHandler() {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="" element={<Dashboard />} />
            <Route path="watchParty" element={<WatchParty socket={socket} />} />
            <Route path="createParty" element={<CreateParty />} />
            {/* <Route path="profile" element={<Profile />} /> */}
            <Route path="dm" element={<Dm socket={socket} room="" />} />
            <Route path="archive" element={<Archive />} />
            <Route path="search/:q" element={<Search socket={socket} />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  );
}

ReactDOM.createRoot(document.getElementById('app')).render(
  <UserContextProvider>
    <VoiceContextProvider>
      <RouteHandler />
    </VoiceContextProvider>
  </UserContextProvider>
);
