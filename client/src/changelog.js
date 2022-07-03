const changelog = {
	current_version: 'v0.1.5',
	version: [
		{
			name: 'v0.1.5',
			changes: [
				'🌙 Dark Mode Progress! A majority of the app components now utilizes dark mode!',
				'🏗 Builder Changes! Changing appearance of character and battle builder to work better on mobile devices and match other pages.',
				"🪵 'Log'-ging in updates! Added a few UI elements to help users identify issues when logging in or signing up.",
				'⭐️ Updated favicon! Previous favicon/icon was a bit smushed, so a cleaner one has been designed and implemented.',
				'🗺 Updated Navbar! Fixed error with mobile devices where users could not access links. A hamburger menu now appears to help our mobile users!',
				'📱 Mobile Layouts! Began work on changing layouts when using the app on mobile. Current changed views include: Battle Select',
			],
		},
		{
			name: 'v0.1.4',
			changes: [
				'🌙 Dark mode! My eyes were burning so I added a dark mode.',
				'💻 DB rework! Major flaws in the schemas for users, battles, and collections were fixed and transitioned to a much cleaner solution. Loading times may be slightly increased due to API calls.',
			],
		},
		{
			name: 'v0.1.3',
			changes: [
				'🧙‍♂️ Logging in! Added user login features, login, update, and delete capabilities. This will lead to user-specific custom characters and monsters, and a place to store all user-created encounters/decks',
				'🤺 Custom Characters! Create a card for each member in your campaign to be used in future battles and encounters.',
				'🎴 Decks! Your encounter cards can now be organized into "decks" or "collections". Wanting to prep for the encounters in your dungeon? Make a deck for the dungeon, and nest all encounters inside!',
			],
		},
		{
			name: 'v0.1.2',
			changes: [
				'🔍 Search Open5e API for monsters available in the 5th Edition SRD.',
				'🧮 Create custom battles with fetched monsters, which also calculates difficulty and earned XP.',
				'💾 Save custom battles to localStorage.',
				"🃏 Running battle renders easy-to-read cards that displays necessary information for DM's to run a battle.",
				'🎲 Automatically roll "to hit" and "damage" dice based on the monster.',
			],
		},
	],
	planned_features: [
		'Bug fixes and implementation of monsters with reactions, spells, legendary actions, etc.',
		'Add custom/homebrew monsters.',
	],
};

export default changelog;
