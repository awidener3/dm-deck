import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Home from '../../pages/Home';
import Battle from '../../pages/Battle';
import CreateBattle from '../../pages/CreateBattle';

const Header = () => {
	return (
		<div>
			<nav className="navbar navbar-expand bg-dark text-light">
				<div className="container">
					<h1 className="navbar-brand">🐲 DM Deck</h1>
					<ul className="navbar-nav">
						<Link to="/" className="nav-link m-2">
							Home
						</Link>
						<Link to="/battle" className="nav-link m-2">
							Battle
						</Link>
						<Link to="/create-battle" className="nav-link m-2">
							Create
						</Link>
					</ul>
				</div>
			</nav>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/battle" element={<Battle />} />
				<Route path="/create-battle" element={<CreateBattle />} />
			</Routes>
		</div>
	);
};

export default Header;
