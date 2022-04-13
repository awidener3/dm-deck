import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import './header.scss';

const Header = () => {
	const [pathname, setPathname] = useState(window.location.pathname);
	return (
		<div>
			<nav className="navbar navbar-expand custom-navbar">
				<div className="container-fluid">
					<Link to="/home">
						<h1 className="navbar-brand logo-text">
							DM <span className="logo-subtext">Deck</span>
						</h1>
					</Link>
					<ul className="navbar-nav">
						<Link
							to="/home"
							onClick={() => setPathname('/home')}
							className={
								pathname === '/home'
									? 'nav-link custom-nav-link m-2 active'
									: 'nav-link custom-nav-link m-2'
							}
						>
							Home
						</Link>
						<Link
							to="/battles"
							onClick={() => setPathname('/battles')}
							className={
								pathname === '/battles'
									? 'nav-link custom-nav-link m-2 active'
									: 'nav-link custom-nav-link m-2'
							}
						>
							Battle
						</Link>
						<Link
							to="/create-battle"
							onClick={() => setPathname('/create-battle')}
							className={
								pathname === '/create-battle'
									? 'nav-link custom-nav-link m-2 active'
									: 'nav-link custom-nav-link m-2'
							}
						>
							Create
						</Link>
					</ul>
				</div>
			</nav>
		</div>
	);
};

export default Header;
