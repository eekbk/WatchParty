// File for root element
import React /* useContext */ from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route /* redirect */ } from 'react-router-dom';
import { CreateParty } from './views/CreateParty/CreateParty';
import { UserContextProvider /* UserContext */ } from './context';
import { SearchContextProvider } from './contexts/searchContext';

const { default: App } = require('./views/app.tsx');
const { default: WatchParty } = require('./views/watchParty/Room.tsx');
const { default: Dashboard } = require('./views/Dashboard.tsx');
const { default: Logout } = require('./views/Logout.tsx');
const { default: Search } = require('./views/search/Search.tsx');

function RouteHandler() {
  // const {user} = useContext(UserContext);
  return (
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="" element={<Dashboard />} />
            <Route path="logout" element={<Logout />} />
            <Route path="search" element={<Search />} />
            <Route path="watchParty" element={<WatchParty />} />
            <Route path="createParty" element={<CreateParty />} />
            <Route path="profile" element={<div>Profile</div>} />
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
