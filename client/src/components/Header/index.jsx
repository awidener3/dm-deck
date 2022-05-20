import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Auth from '../../utils/auth';

import './header.scss';

const Header = () => {
	const [pathname, setPathname] = useState(window.location.pathname || '');
	return (
		<div>
			<p className="m-0 version-text">v0.0.2</p>
			<nav className="navbar navbar-expand custom-navbar">
				<div className="container-fluid">
					<Link to="/" onClick={() => setPathname('/')}>
						<h1 className="navbar-brand logo-text">
							DM<span className="logo-subtext">Deck</span>
						</h1>
					</Link>
					<ul className="navbar-nav">
						<Link
							to="/"
							onClick={() => setPathname('/')}
							className={
								pathname === '/'
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

						{Auth.loggedIn() ? (
							<Link
								to="/me"
								onClick={() => setPathname('/profile')}
								className={
									pathname === '/profile'
										? 'nav-link custom-nav-link m-2 active'
										: 'nav-link custom-nav-link m-2'
								}
							>
								Profile
							</Link>
						) : null}

						{Auth.loggedIn() ? (
							<Link
								to="/login"
								onClick={() => {
									Auth.logout();
									setPathname('/login');
								}}
								className={'nav-link custom-nav-link m-2'}
							>
								Logout
							</Link>
						) : (
							<Link
								to="/login"
								onClick={() => setPathname('/login')}
								className={
									pathname === '/login'
										? 'nav-link custom-nav-link m-2 active'
										: 'nav-link custom-nav-link m-2'
								}
							>
								Login
							</Link>
						)}
						{/* <Link
							to="/login"
							onClick={() => setPathname('/login')}
							className={
								pathname === '/login'
									? 'nav-link custom-nav-link m-2 active'
									: 'nav-link custom-nav-link m-2'
							}
						>
							Login
						</Link> */}
						<Link
							to="/legal"
							onClick={() => setPathname('/legal')}
							className={
								pathname === '/legal'
									? 'nav-link custom-nav-link m-2 active'
									: 'nav-link custom-nav-link m-2'
							}
						>
							Legal
						</Link>
					</ul>
				</div>
			</nav>
		</div>
	);
};

export default Header;
