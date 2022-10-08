// File for root element
import React /* useContext */ from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route /* redirect */ } from 'react-router-dom';
import { CreateParty } from './views/CreateParty';
import { UserContextProvider /* UserContext */ } from './context';
import { SearchContextProvider } from './contexts/searchContext';

const { default: App } = require('./views/app.tsx');
const { default: Home } = require('./views/home.tsx');
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
						<Route path="" element={<Home />} />
						<Route path="home" element={<Home />} />
						<Route path="logout" element={<Logout />} />
						<Route path="search" element={<Search />} />
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
						<Route
  loader={null /* () => !user ? redirect('/') : null */}
  path="createParty"
  element={<CreateParty />}
						/>
						<Route path="profile" element={<div>Profile</div>} />
						<Route path="dashboard" element={<Dashboard />} />
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
