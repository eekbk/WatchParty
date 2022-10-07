// File for root element
import React /* useContext */ from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route /* redirect */ } from 'react-router-dom';
import { CreateParty } from './views/CreateParty';
import { UserContextProvider /* UserContext */ } from './context';

const { default: App } = require('./views/app.tsx');
const { default: Home } = require('./views/home.tsx');
const { default: WatchParty } = require('./views/watchParty/Room.tsx');
const { default: Dashboard } = require('./views/Dashboard.tsx');

function RouteHandler() {
  // const {user} = useContext(UserContext);
  return (
		<React.StrictMode>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<App />}>
						<Route path="" element={<Home />} />
						<Route path="home" element={<Home />} />
						<Route path="watchParty" element={<WatchParty />} />
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
		<RouteHandler />
	</UserContextProvider>,
);
