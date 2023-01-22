<p align="center">
  <img src="https://user-images.githubusercontent.com/70721378/175779268-1660eb59-bc3c-4127-97e3-bb28673442c4.png">  
</p>

![GitHub release (latest by date including pre-releases)](https://img.shields.io/github/v/release/awidener3/dm-deck?include_prereleases)
![GitHub issues](https://img.shields.io/github/issues/awidener3/dm-deck)
![GitHub last commit](https://img.shields.io/github/last-commit/awidener3/dm-deck)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/awidener3/dm-deck)


## Planning 

View the [Project Board](https://github.com/awidener3/dm-deck/projects/2) here! Currently the project is being maintained and developed solo.

## Stack

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![Bootstrap](https://img.shields.io/badge/bootstrap-%23563D7C.svg?style=for-the-badge&logo=bootstrap&logoColor=white)
![SASS](https://img.shields.io/badge/SASS-hotpink.svg?style=for-the-badge&logo=SASS&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![Heroku](https://img.shields.io/badge/heroku-%23430098.svg?style=for-the-badge&logo=heroku&logoColor=white)
![GraphQL](https://img.shields.io/badge/-GraphQL-E10098?style=for-the-badge&logo=graphql&logoColor=white)

## Summary

DM Deck is a TTRPG Tool, utilizing the Open Gaming License Version 1.0a (OGL 1.0a), that allows dungeon/game masters to run encounters and battles with an easy-to-use card system. The idea sparked from card games such as Pokémon, Magic: The Gathering, and Yu-Gi-Oh, to make the most important information available in the space of a card.

The project is heavily inspired by tools such as D&D Beyond, although it attempts to create a "battle experience" that I have not been able to find on other platforms.

This project was also a personal venture by me to learn MERN concepts that I missed while self-learning and completing my coding education. I didn't fully grasp React and GraphQL, so what better way to learn than to build something! This has definitely grown much larger than I anticipated, but I am happy with the progress I've made and am excited to continue developing it.

## Preview

### Mobile

|                                                             Home                                                             |                                                           Battle                                                           |                                                           Battle Builder                                                           |                                                          Character Builder                                                           |
| :--------------------------------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------------------------------: |
| ![homepage lightmode](https://user-images.githubusercontent.com/70721378/177043301-762480ab-4d86-4222-b948-888830baff38.png) | ![battle lightmode](https://user-images.githubusercontent.com/70721378/177043386-6d4c9a89-92d9-4ea0-9922-a3621db85487.png) | ![battle builder lightmode](https://user-images.githubusercontent.com/70721378/177043401-59c2e6cf-ed4a-4503-83d6-8f980dfcac13.png) | ![character builder darkmode](https://user-images.githubusercontent.com/70721378/177043442-ddcbaee7-9f36-4a85-b0d5-6deaa1303073.png) |
| ![homepage darkmode](https://user-images.githubusercontent.com/70721378/177043333-013d6caa-8983-48d1-830a-2ace221f19c8.png)  | ![battle darkmode](https://user-images.githubusercontent.com/70721378/177043359-b0d0297d-88dd-49a1-838e-054486269ee9.png)  | ![battle builder darkmode](https://user-images.githubusercontent.com/70721378/177043415-ec82e611-8334-43ec-8ffa-1b6e2dd4c30d.png)  | ![character builder darkmode](https://user-images.githubusercontent.com/70721378/177043435-af51d3f9-a8e0-463f-b27e-4622b73ee34b.png) |

### Desktop

Desktop mode is currently in development, screenshots will be available upon a future release!

## Installation

Prior to installation, you will need [Node.js](https://nodejs.org/en/) installed on your machine. 

You will also need [MongoDB](https://www.mongodb.com/). A MongoDB GUI such as [Mongo Compass](https://www.mongodb.com/products/compass) is helpful to visualize data. 

This project also utilizes [Apollo](https://www.apollographql.com/) to test routes and make sample queries and mutations..

Fork the repo to your personal account, then clone onto your machine with `git clone`.

Install all dependencies from the root directory: 
```
npm run install
```

To seed the database with [SRD](https://dnd.wizards.com/resources/systems-reference-document) monsters, run the following command:
```
npm run seed
```

Run the application from the root directory:
```
npm run develop
```

## Development
See [Changelog](CHANGELOG.md) for recent changes.