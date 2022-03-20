import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
// import Card from './components/Card';
import Home from './pages/Home';
import Battle from './pages/Battle';
import CreateBattle from './pages/CreateBattle';
import './App.scss';

const App = () => {
	return (
		<div className="App">
			<h1>Welcome to React Router!</h1>
			<Link to="/dm-deck">
				<button type="button" className="btn btn-primary m-2">
					Home
				</button>
			</Link>
			<Link to="/dm-deck/battle">
				<button type="button" className="btn btn-primary m-2">
					Battle
				</button>
			</Link>
			<Link to="/dm-deck/create-battle">
				<button type="button" className="btn btn-primary m-2">
					Create Battle
				</button>
			</Link>
			<Routes>
				<Route path="/dm-deck" element={<Home />} />
				<Route path="/dm-deck/battle" element={<Battle />} />
				<Route
					path="/dm-deck/create-battle"
					element={<CreateBattle />}
				/>
			</Routes>
		</div>
	);
};

export default App;
