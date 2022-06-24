const HomeChangelog = () => {
	return (
		<section>
			<h2>Changelog</h2>
			<h3>v0.1.4</h3>
			<ul>
				<li>
					🌙 Dark mode! My eyes were burning so I added a dark mode.
				</li>
				<li>
					💻 DB rework! Major flaws in the schemas for users, battles,
					and collections were fixed and transitioned to a much
					cleaner solution. Loading times may be slightly increased
					due to API calls.
				</li>
			</ul>
			<h3>v0.1.3</h3>
			<ul>
				<li>
					🧙‍♂️ Logging in! Added user login features, login, update, and
					delete capabilities. This will lead to user-specific custom
					characters and monsters, and a place to store all
					user-created encounters/decks
				</li>
				<li>
					🤺 Custom Characters! Create a card for each member in your
					campaign to be used in future battles and encounters.
				</li>
				<li>
					🎴 Decks! Your encounter cards can now be organized into
					"decks" or "collections". Wanting to prep for the encounters
					in your dungeon? Make a deck for the dungeon, and nest all
					encounters inside!
				</li>
			</ul>
			<h3>v0.1.2</h3>
			<ul>
				<li>
					🔍 Search Open5e API for monsters available in the 5th
					Edition SRD.
				</li>
				<li>
					🧮 Create custom battles with fetched monsters, which also
					calculates difficulty and earned XP.
				</li>
				<li>💾 Save custom battles to localStorage.</li>
				<li>
					🃏 Running battle renders easy-to-read cards that displays
					necessary information for DM's to run a battle.
				</li>
				<li>
					🎲 Automatically roll "to hit" and "damage" dice based on
					the monster.
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
		</section>
	);
};

export default HomeChangelog;
