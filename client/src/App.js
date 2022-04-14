import React from 'react';
import Header from './components/Header';
// Added for router
import { Outlet, Link } from 'react-router-dom';

import './App.scss';

const App = () => {
	return (
		<div className="App">
			<Header />
			<p>v0.0.1</p>

			<Outlet />
		</div>
	);
};

export default App;
