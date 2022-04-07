import React, { useEffect, useState } from 'react';
import { rollDie } from '../utils/diceRolls';

import Monster from '../components/Monster';
import Hero from '../components/Hero';
import InfoModal from '../components/InfoModal';
import RollModal from '../components/RollModal';
import { addInitiative } from '../utils/diceRolls';
import { slideLeft, slideRight } from '../utils/slideAnimations';

// Dummy data
import monsters from '../components/Monster/monsterData';
import heroes from '../components/Hero/heroData';

import {
	FaChevronLeft,
	FaChevronRight,
	FaChevronCircleLeft,
	FaChevronCircleRight,
} from 'react-icons/fa';

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
	const [showRollModal, setShowRollModal] = useState(false);
	const [showInfoModal, setShowInfoModal] = useState(false);
	const [rollModifier, setRollModifier] = useState(0);
	const [die, setDie] = useState(0);

	const handleCloseRollModal = () => setShowRollModal(false);
	const handleShowRollModal = () => setShowRollModal(true);
	const handleCloseInfoModal = () => setShowInfoModal(false);
	const handleShowInfoModal = () => setShowInfoModal(true);

	// Add initiative on load
	useEffect(() => {
		addInitiative(monsterData, heroData, setMonsterData, setHeroData);
	}, []);

	const handleRollDice = (die, dieNum, modifier) => {
		setRollModifier(modifier);
		setDie(rollDie(die) * dieNum);
		handleShowRollModal();
	};

	const handleShowInfo = (monster) => {
		setInfo(monster);
		handleShowInfoModal();
	};

	const handleHeroAttack = () => {
		console.log('attack da monster!');
		console.log(monsterData);
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
							handleRollDice={handleRollDice}
							handleShowInfo={handleShowInfo}
						/>
					);
				} else if (creature.type === 'hero') {
					return (
						<Hero
							key={creature.player_name}
							hero={creature}
							cardStyle={position}
							handleHeroAttack={handleHeroAttack}
						/>
					);
				}

				return null;
			});
	};

	return (
		<div className="battle-container p-3 d-flex flex-column justify-content-center align-items-center container">
			<div className="battle-stats d-flex">
				<h4 className="battle-stat mx-2">Round: {round}</h4>
				<h4 className="battle-stat mx-2">
					Turn: {turn}/{sortedData.length}
				</h4>
			</div>

			<div className="d-flex align-items-center">
				{/* Render left Chevron */}
				{round === 1 && turn === 1 ? null : turn === 1 ? (
					<FaChevronCircleLeft
						onClick={() =>
							slideLeft(
								index,
								turn,
								round,
								sortedData,
								setRound,
								setTurn,
								setIndex
							)
						}
						className="battle-chevron left-chevron"
					/>
				) : (
					<FaChevronLeft
						onClick={() =>
							slideLeft(
								index,
								turn,
								round,
								sortedData,
								setRound,
								setTurn,
								setIndex
							)
						}
						className="battle-chevron left-chevron"
					/>
				)}

				{/* Cards */}
				<div className="card-container container d-flex justify-content-center">
					<div className="background-block"></div>
					{monsterData[0].initiative ? renderCards() : null}
				</div>

				{/* Render right Chevron */}
				{turn === sortedData.length ? (
					<FaChevronCircleRight
						onClick={() =>
							slideRight(
								index,
								turn,
								round,
								sortedData,
								setRound,
								setTurn,
								setIndex
							)
						}
						className="battle-chevron right-chevron"
					/>
				) : (
					<FaChevronRight
						onClick={() =>
							slideRight(
								index,
								turn,
								round,
								sortedData,
								setRound,
								setTurn,
								setIndex
							)
						}
						className="battle-chevron right-chevron"
					/>
				)}
			</div>

			<RollModal
				showRollModal={showRollModal}
				handleCloseRollModal={handleCloseRollModal}
				die={die}
				rollModifier={rollModifier}
			/>

			<InfoModal
				info={info}
				showInfoModal={showInfoModal}
				handleCloseInfoModal={handleCloseInfoModal}
			/>
		</div>
	);
};

export default Battle;
