import React from 'react';
import QuickLinks from '../components/QuickLinks';

const Home = () => {
	return (
		<div>
			<div className="splash-screen d-flex justify-content-center align-items-center">
				<h1 className="navbar-brand splash-logo-text">
					DM<span className="splash-logo-subtext">Deck</span>
				</h1>
			</div>
			<div className="p-4 d-flex flex-column justify-content-center align-items-center container">
				<h1>Welcome to DM Deck! 🧙‍♂️</h1>
				<p>
					This app allows you, the dungeon master, to track your epic
					D&D Battles in a Trading Card Game style, like Pokemon or
					Magic! Create encounters on the fly, or prepare ahead of
					time by saving your battles!
				</p>

				<QuickLinks />

				<h2>Changelog</h2>
				<br />
				<h3>v0.1.3</h3>
				<ul>
					<li>
						🧙‍♂️ Logging in! Added user login features, login, update,
						and delete capabilities. This will lead to user-specific
						custom characters and monsters, and a place to store all
						user-created encounters/decks
					</li>
					<li>
						🤺 Custom Characters! Create a card for each member in
						your campaign to be used in future battles and
						encounters.
					</li>
				</ul>
				<h3>v0.1.2</h3>
				<ul>
					<li>
						🔍 Search Open5e API for monsters available in the 5th
						Edition SRD.
					</li>
					<li>
						🧮 Create custom battles with fetched monsters, which
						also calculates difficulty and earned XP.
					</li>
					<li>💾 Save custom battles to localStorage.</li>
					<li>
						🃏 Running battle renders easy-to-read cards that
						displays necessary information for DM's to run a battle.
					</li>
					<li>
						🎲 Automatically roll "to hit" and "damage" dice based
						on the monster.
					</li>
				</ul>

				<h2>Planned/In-Progress Features</h2>
				<ul>
					<li>
						Bug fixes and implementation of monsters with reactions,
						spells, legendary actions, etc.
					</li>
					<li>Add custom/homebrew monsters.</li>
					<li>Add custom PC's to be used in battles</li>
				</ul>
			</div>
		</div>
	);
};

export default Home;
