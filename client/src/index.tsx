// File for root element
import 'regenerator-runtime/runtime';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import io from 'socket.io-client';
import { CreateParty } from './views/CreateParty/CreateParty';
import { UserContextProvider } from './context';
import { SearchContextProvider } from './contexts/searchContext';
import { VoiceContextProvider } from './contexts/voiceContext';
import App from './views/app';
import WatchParty from './views/watchParty/Room';
import Dashboard from './views/Dashboard';
// import Profile from './views/Profile';
// import SearchTemp from './views/search/SearchTemp';
import Dm from './views/Dm/Dm';
import Archive from './views/Archive/Archive';
import Calendar from './views/Calendar';
import Search from './views/search/NewSearch';
// import PartiesResults from './views/moreResults/PartiesResults';
// import UsersResults from './views/moreResults/UsersResults';
// import VideosResults from './views/moreResults/VideosResults';

const socket = io();

function RouteHandler() {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="" element={<Dashboard />} />
            {/* <Route path="search" element={<Search socket={socket} />} /> */}
            <Route path="calendar" element={<Calendar />} />
            <Route path="watchParty" element={<WatchParty socket={socket} />} />
            <Route path="createParty" element={<CreateParty />} />
            {/* <Route path="profile" element={<Profile />} /> */}
            <Route path="dm" element={<Dm socket={socket} room="" />} />
            <Route path="archive" element={<Archive />} />
            <Route path="search">
              <Route path=":q" element={<Search socket={socket} />} />
            </Route>
            {/* <Route path="results/parties" element={<PartiesResults/>} />
            <Route path="results/users" element={<UsersResults socket={socket} />} />
            <Route path="results/videos" element={<VideosResults/>} /> */}
            {/* <Route path="*" element={<App/>} /> */}
          </Route>
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  );
}

ReactDOM.createRoot(document.getElementById('app')!).render(
  <UserContextProvider>
    <VoiceContextProvider>
      <SearchContextProvider>
        <RouteHandler />
      </SearchContextProvider>
    </VoiceContextProvider>
  </UserContextProvider>
);
