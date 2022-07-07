import { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';

import Monster from './Monster';
import Hero from './Hero';
import InfoModal from './InfoModal';
import RollModal from './RollModal';
import MonstersModal from './MonstersModal';
import InitiativeModal from './InitiativeModal';
import QuickView from './QuickView';

import { slideLeft, slideRight } from 'utils/slideAnimations';
import { rollDie, getInitiative } from 'utils/diceRolls';
import { QUERY_BATTLE } from 'utils/queries/battleQueries';

import {
	FaChevronLeft,
	FaChevronRight,
	FaChevronCircleLeft,
	FaChevronCircleRight,
} from 'react-icons/fa';
import 'App.scss';
import './battle.scss';

const Battle = () => {
	const [battleOrder, setbattleOrder] = useState(null);
	const [battle, setBattle] = useState({});

	let { battleId } = useParams();
	const { loading, error, data } = useQuery(QUERY_BATTLE, {
		variables: { battleId },
		onCompleted: () => setBattle(data?.battle),
	});

	// Variables to control battle statistics
	const [index, setIndex] = useState(0);
	const [round, setRound] = useState(1);
	const [turn, setTurn] = useState(1);
	const [info, setInfo] = useState({});

	// Modal
	const [showRollModal, setShowRollModal] = useState(false);
	const [showInfoModal, setShowInfoModal] = useState(false);
	const [showMonstersModal, setShowMonstersModal] = useState(false);
	const [showInitiativeModal, setShowInitiativeModal] = useState(true);
	const handleCloseRollModal = () => setShowRollModal(false);
	const handleCloseInfoModal = () => setShowInfoModal(false);
	const handleCloseMonstersModal = () => setShowMonstersModal(false);
	const handleCloseInitiativeModal = () => setShowInitiativeModal(false);

	// Dice rolls
	const [rollModifier, setRollModifier] = useState(0);
	const [die, setDie] = useState(0);

	const handleRollDice = (sides, num, bonus = 0) => {
		let diceRoll = 0;
		for (let i = 0; i < num; i++) {
			diceRoll += rollDie(sides);
		}
		setRollModifier(bonus);
		setDie(diceRoll);
		setShowRollModal(true);
	};

	const handleShowInfo = (monster) => {
		setInfo(monster);
		setShowInfoModal(true);
	};

	const handleSetHp = (monster, value) => {
		const updatedArray = battleOrder.slice();
		updatedArray.forEach((item) => {
			if (item.name === monster.name) {
				item.hit_points = value;
			}
		});
		setbattleOrder([...updatedArray]);
	};

	const handleHeroAttack = () => setShowMonstersModal(true);

	if (loading) return <div>Loading...</div>;
	if (error) return <div>ERROR!</div>;

	const renderCards = (battleOrder) => {
		return battleOrder.map((creature, i) => {
			let position =
				i > index
					? 'nextCard'
					: i === index
					? 'activeCard'
					: 'prevCard';
			if (creature.type !== 'hero') {
				return (
					<Monster
						key={`${creature.name} ${i}`}
						monster={creature}
						battleOrder={battleOrder}
						cardStyle={position}
						handleRollDice={handleRollDice}
						handleShowInfo={handleShowInfo}
						handleSetHp={handleSetHp}
						setbattleOrder={setbattleOrder}
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
		<div className="battle-container d-flex flex-column justify-content-center align-items-center">
			{battleOrder && (
				<>
					<QuickView
						battleOrder={battleOrder}
						turn={turn}
						setTurn={setTurn}
						setIndex={setIndex}
					/>
					<div className="battle-stats mt-2 d-flex">
						<h4 className="battle-stat mx-2">Round: {round}</h4>
						<h4 className="battle-stat mx-2">
							Turn: {turn}/{battleOrder.length}
						</h4>
					</div>
				</>
			)}

			<div className="d-flex align-items-center">
				{/* Render left Chevron */}
				{round === 1 && turn === 1 ? null : turn === 1 ? (
					<FaChevronCircleLeft
						onClick={() =>
							slideLeft(
								index,
								turn,
								round,
								battleOrder,
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
								battleOrder,
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
					{battleOrder && renderCards(battleOrder)}
				</div>

				{/* Render right Chevron */}
				{battleOrder && turn === battleOrder.length ? (
					<FaChevronCircleRight
						onClick={() =>
							slideRight(
								index,
								turn,
								round,
								battleOrder,
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
								battleOrder,
								setRound,
								setTurn,
								setIndex
							)
						}
						className="battle-chevron right-chevron"
					/>
				)}
			</div>

			{battle && (
				<InitiativeModal
					showInitiativeModal={showInitiativeModal}
					handleCloseInitiativeModal={handleCloseInitiativeModal}
					battle={!loading && battle}
					setBattle={setBattle}
					setbattleOrder={setbattleOrder}
				/>
			)}

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

			<MonstersModal
				showMonstersModal={showMonstersModal}
				handleCloseMonstersModal={handleCloseMonstersModal}
				battleOrder={battleOrder}
				setbattleOrder={setbattleOrder}
			/>
		</div>
	);
};

export default Battle;
