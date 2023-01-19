# Changelog

## v0.1.7
* Added ability to edit or delete your created characters.
* Added ability to delete your account.

## v0.1.6
* Various bug fixes across the app.
* Added ability for users to set initiative before starting a battle, or allow the app to roll initiative automatically.
* There is now visual feedback when a monsters HP reaches 0.
* Adjusted monster modal layout.

## v0.1.5
* A majority of the app components now utilizes dark mode.
* Changing appearance of character and battle builder to work better on mobile devices and match other pages.
* Added a few UI elements to help users identify issues when logging in or signing up.
* Previous favicon/icon was a bit smushed, so a cleaner one has been designed and implemented.
* Fixed error with mobile devices where users could not access links. A hamburger menu now appears to help our mobile users!
* Began work on changing layouts when using the app on mobile.
  
## v0.1.4
* My eyes were burning so I added a dark mode.
* Major flaws in the schemas for users, battles, and collections were fixed and transitioned to a much cleaner solution. Loading times may be slightly increased due to API calls.
  
## v0.1.3
* Added user login features, login, update, and delete capabilities. This will lead to user-specific custom characters and monsters, and a place to store all user-created encounters/decks
* Create a card for each member in your campaign to be used in future battles and encounters.
* Your encounter cards can now be organized into "decks" or "collections". Wanting to prep for the encounters in your dungeon? Make a deck for the dungeon, and nest all encounters inside!

## v0.1.2
* Search Open5e API for monsters available in the 5th Edition SRD.
* Create custom battles with fetched monsters, which also calculates difficulty and earned XP.
* Save custom battles to localStorage.
* Running battle renders easy-to-read cards that displays necessary information for DM's to run a battle.
* Automatically roll "to hit" and "damage" dice based on the monster.