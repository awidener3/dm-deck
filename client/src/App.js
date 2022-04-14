import React from 'react';
import Header from './components/Header';
// Added for router
import { Outlet, Link } from 'react-router-dom';

import './App.scss';

const App = () => {
	return (
		<div className="App">
			<Header />

			<Outlet />
		</div>
	);
};

export default App;
