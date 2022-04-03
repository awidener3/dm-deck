import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';

import { rollDie } from '../utils/diceRolls';

import Monster from '../components/Monster';
import Hero from '../components/Hero';

// Dummy data
import monsters from '../components/Monster/monsterData';
import heroes from '../components/Hero/heroData';

import {
	FaChevronLeft,
	FaChevronRight,
	FaChevronCircleLeft,
	FaChevronCircleRight,
	FaDiceD20,
} from 'react-icons/fa';

import { GiBookCover } from 'react-icons/gi';

import '../App.scss';

const Battle = () => {
	// Bring in monster and hero data
	const [monsterData, setMonsterData] = useState(monsters);
	const [heroData, setHeroData] = useState(heroes);

	// Put heroes and monsters into one array to be sorted and assigned initiative
	const sortedData = [].concat(monsterData).concat(heroData);

	// Variables to control battle statistics
	const [index, setIndex] = useState(0);
	const [round, setRound] = useState(1);
	const [turn, setTurn] = useState(1);

	const [info, setInfo] = useState({});

	// Modal
	const [rollModifier, setRollModifier] = useState(0);
	const [d20, setD20] = useState(0);
	const [showRollModal, setShowRollModal] = useState(false);
	const handleCloseRollModal = () => setShowRollModal(false);
	const handleShowRollModal = () => setShowRollModal(true);

	const [showInfoModal, setShowInfoModal] = useState(false);
	const handleCloseInfoModal = () => setShowInfoModal(false);
	const handleShowInfoModal = () => setShowInfoModal(true);

	// Add initiative on load
	useEffect(() => {
		addInitiative();
	}, []);

	// Handles sliding animation (left)
	const slideLeft = () => {
		// Previous turn
		if (index - 1 >= 0) {
			setTurn(turn - 1);
			setIndex(index - 1);
		}

		// Previous round
		if (index === 0 && round !== 1) {
			setIndex(sortedData.length - 1);
			setTurn(sortedData.length);
			setRound(round - 1);
		}
	};

	// Handles sliding animation (right)
	const slideRight = () => {
		// Next turn
		if (index + 1 <= sortedData.length - 1) {
			setTurn(turn + 1);
			setIndex(index + 1);
		}

		// Next round
		if (index === sortedData.length - 1) {
			setIndex(0);
			setTurn(1);
			setRound(round + 1);
		}
	};

	// Helper function that rolls initiatve for each character/monster in array
	const getInitiative = (obj) => {
		if (obj.type === 'monster') {
			return (
				Math.floor(Math.random() * 20 + 1) +
				Math.floor((obj.ability_scores.dexterity - 10) / 2)
			);
		} else {
			return Math.floor(Math.random() * 20 + 1);
		}
	};

	// Adds initiative to character/monster
	const addInitiative = () => {
		const monsters = monsterData.map((monster) => ({
			...monster,
			initiative: getInitiative(monster),
		}));
		setMonsterData(monsters);

		const heroes = heroData.map((hero) => ({
			...hero,
			initiative: getInitiative(hero),
		}));
		setHeroData(heroes);
	};

	const handleRollToHit = (modifier) => {
		setRollModifier(modifier);
		setD20(rollDie(20));
		handleShowRollModal();
	};

	const handleShowInfo = (action) => {
		setInfo(action);
		handleShowInfoModal();
	};

	// Renders cards with initiative sorting and sliding animation classes
	const renderCards = () => {
		return sortedData
			.sort((a, b) => (a.initiative < b.initiative ? 1 : -1))
			.map((creature, n) => {
				let position =
					n > index
						? 'nextCard'
						: n === index
						? 'activeCard'
						: 'prevCard';

				if (creature.type === 'monster') {
					return (
						<Monster
							key={creature.name}
							monster={creature}
							cardStyle={position}
							handleRollToHit={handleRollToHit}
							handleShowInfo={handleShowInfo}
						/>
					);
				} else if (creature.type === 'hero') {
					return (
						<Hero
							key={creature.player_name}
							hero={creature}
							cardStyle={position}
						/>
					);
				}

				return null;
			});
	};

	return (
		<div className="battle-container p-4 d-flex flex-column justify-content-center align-items-center container">
			<h1>Example Battle</h1>
			<div className="battle-stats d-flex">
				<h4 className="battle-stat m-2">Round: {round}</h4>
				<h4 className="battle-stat m-2">
					Turn: {turn}/{sortedData.length}
				</h4>
			</div>

			<div className="d-flex align-items-center">
				{/* Render left Chevron */}
				{round === 1 && turn === 1 ? null : turn === 1 ? (
					<FaChevronCircleLeft
						onClick={slideLeft}
						className="battle-chevron left-chevron"
					/>
				) : (
					<FaChevronLeft
						onClick={slideLeft}
						className="battle-chevron left-chevron"
					/>
				)}

				{/* Cards */}
				<div className="card-container container d-flex justify-content-center">
					<div className="background-block"></div>
					{/* //! TESTING */}
					{/* <Monster monster={monsters[4]} /> */}

					{/* //! UNCOMMENT */}
					{monsterData[0].initiative ? renderCards() : null}
				</div>

				{/* Render right Chevron */}
				{turn === sortedData.length ? (
					<FaChevronCircleRight
						onClick={slideRight}
						className="battle-chevron right-chevron"
					/>
				) : (
					<FaChevronRight
						onClick={slideRight}
						className="battle-chevron right-chevron"
					/>
				)}
			</div>

			{/* Roll Modal */}
			<Modal
				size="sm"
				show={showRollModal}
				onHide={handleCloseRollModal}
				centered
			>
				<Modal.Header closeButton>
					<FaDiceD20 size="2rem" />
				</Modal.Header>
				<div className="d-flex flex-column justify-content-center text-center">
					<Modal.Title className="display-5">
						{d20 + rollModifier}
					</Modal.Title>
					<Modal.Body>
						{d20} + {rollModifier}
					</Modal.Body>
				</div>
			</Modal>

			{/* Info Modal */}
			<Modal
				size="sm"
				show={showInfoModal}
				onHide={handleCloseInfoModal}
				centered
			>
				<Modal.Header closeButton>
					<GiBookCover size="2rem" />
				</Modal.Header>
				<div className="d-flex flex-column justify-content-center">
					<Modal.Title className="display-5 text-center">
						{info.weapon}
					</Modal.Title>
					<Modal.Body>
						<p>{info.action_text}</p>
					</Modal.Body>
				</div>
			</Modal>
		</div>
	);
};

export default Battle;
