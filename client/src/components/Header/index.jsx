import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
	return (
		<div>
			<nav className="navbar navbar-expand bg-dark text-light">
				<div className="container">
					<h1 className="navbar-brand">DM Deck</h1>
					<ul className="navbar-nav">
						<Link to="/home" className="nav-link m-2">
							Home
						</Link>
						<Link to="/battles" className="nav-link m-2">
							Battle
						</Link>
						<Link to="/create-battle" className="nav-link m-2">
							Create
						</Link>
					</ul>
				</div>
			</nav>
		</div>
	);
};

export default Header;
