// File for root element
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CreateParty } from './views/CreateParty';
import { UserContextProvider } from './context';

const { default: App } = require('./views/app.tsx');
const { default: Home } = require('./views/home.tsx');
const { default: WatchParty } = require('./views/watchParty/Room.tsx');
const { default: Dashboard } = require('./views/Dashboard.tsx');

ReactDOM.createRoot(document.getElementById('app')!).render(
	<UserContextProvider>
		<React.StrictMode>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<App />}>
						<Route path="" element={<Home />} />
						<Route path="home" element={<Home />} />
						<Route path="watchParty" element={<WatchParty />} />
						<Route path="createParty" element={<CreateParty />} />
						<Route path="profile" element={<div>Profile</div>} />
						<Route path="dashboard" element={<Dashboard />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</React.StrictMode>
	</UserContextProvider>,
);
