import React from 'react';
import HomeLinks from './Links';
import HomeChangelog from './Changelog';
import './home.scss';

const Home = () => {
	return (
		<div>
			{/* Splash Screen */}
			<figure className="splash-screen d-flex justify-content-center align-items-center">
				<h1 className="splash-logo-text">
					DM
					<span className="splash-logo-subtext">Deck</span>
				</h1>
			</figure>

			<div className="p-4 d-flex flex-column justify-content-center align-items-center container">
				{/* Introduction Text */}
				<h1>Welcome to DM Deck!</h1>
				<p className="m-0">
					This app allows you, the dungeon master, to track your epic
					D&D Battles in a Trading Card Game style, like Pokemon or
					Magic! Create encounters on the fly, or prepare ahead of
					time by saving your battles!
				</p>

				{/* Decorated Links */}
				<HomeLinks />

				{/* Changelog */}
				<HomeChangelog />
			</div>
		</div>
	);
};

export default Home;
