import { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';

import Monster from './Monster';
import Hero from './Hero';
import InfoModal from './InfoModal';
import RollModal from './RollModal';
import MonstersModal from './MonstersModal';
import QuickView from './QuickView';

import { slideLeft, slideRight } from 'utils/slideAnimations';
import { rollDie, getInitiative } from 'utils/diceRolls';
import { QUERY_ME, QUERY_USER_BATTLES } from 'utils/queries/userQueries';
import { QUERY_BATTLE } from 'utils/queries/battleQueries';
import fetchMonsterBySlug from 'hooks/fetchMonsterBySlug';

import {
	FaChevronLeft,
	FaChevronRight,
	FaChevronCircleLeft,
	FaChevronCircleRight,
} from 'react-icons/fa';
import 'App.scss';

const Battle = async () => {
	let params = useParams();
	const [sortedData, setSortedData] = useState([]);

	const getMonsters = ({ battle }) => {
		console.log('🃏 Battle', battle);

		const heroes = [...battle.heroes];
		console.log('🧙‍♂️ Heroes', heroes);

		const monsterSlugs = [...battle.monsters];
		const monsters = [];

		monsterSlugs.forEach((monster) => {
			const response = fetchMonsterBySlug(monster);
			console.log(data);
			// const { data } = await open5e.get(`/monsters/${monster}`);
			// monsters.push(data);
		});

		console.log('💀 Monsters', monsters);

		let newBattle = [].concat(monsters).concat(heroes);
		// Adds initiative
		newBattle = newBattle
			.map((creature) => ({
				...creature,
				initiative: getInitiative(creature),
			}))
			.sort((a, b) => (a.initiative < b.initiative ? 1 : -1));
		return newBattle;
	};

	const { loading, error, data } = useQuery(QUERY_ME);
	const { loading: battle_loading, data: battle_data } = useQuery(
		QUERY_BATTLE,
		{
			variables: { battleId: params.battleId },
			onCompleted: (data) => {
				const battle = getMonsters(data);
				setSortedData(battle);
			},
		}
	);
	const user = data?.me || [];
	const battle = { ...battle_data?.battle } || '';

	// const showData = () => {
	// 	console.log(sortedData);
	// };

	// if (!battle_loading) {
	// 	const slugs = battle.monsters;
	// 	console.log('monsters', slugs);
	// 	const monsters = [];

	// 	slugs.forEach(async (monster) => {
	// 		const { data } = await open5e.get(`/monsters/${monster}`);
	// 		monsters.push(data);
	// 	});

	// 	battle.monsters = monsters;
	// 	console.log('Battle after mod', battle);
	// }

	// Set sortedData from sorted and modified query
	// useEffect(() => {
	// 	if (!battle_loading && battle) {
	// 		const monsters = [];
	// 		battle.monsters.forEach(async (monster) => {
	// 			const { data } = await open5e.get(`/monsters/${monster}`);
	// 			monsters.push(data);
	// 		});

	// 		// current.monsters = [...current.monsters]
	// 		// Sort alphabetically and check for doubles
	// 		battle.monsters = monsters
	// 			.sort((a, b) => (a.name > b.name ? 1 : -1))
	// 			.map((monster, index) =>
	// 				battle.monsters.findIndex(
	// 					(current) => current.name === monster.name
	// 				) === index
	// 					? { ...monster, conditions: [] }
	// 					: {
	// 							...monster,
	// 							conditions: [],
	// 							name: `${monster.name} ${index + 1}`,
	// 					  }
	// 			);
	// 		// Put monsters and heroes into an array
	// 		let newBattle = [].concat(battle.monsters).concat(battle.heroes);
	// 		// Adds initiative
	// 		newBattle = newBattle
	// 			.map((creature) => ({
	// 				...creature,
	// 				initiative: getInitiative(creature),
	// 			}))
	// 			.sort((a, b) => (a.initiative < b.initiative ? 1 : -1));

	// 		setSortedData(newBattle);
	// 		console.log(sortedData);
	// 	}
	// }, []);

	// Variables to control battle statistics
	const [index, setIndex] = useState(0);
	const [round, setRound] = useState(1);
	const [turn, setTurn] = useState(1);
	const [info, setInfo] = useState({});

	// Modal
	const [showRollModal, setShowRollModal] = useState(false);
	const [showInfoModal, setShowInfoModal] = useState(false);
	const [showMonstersModal, setShowMonstersModal] = useState(false);
	const handleCloseRollModal = () => setShowRollModal(false);
	const handleCloseInfoModal = () => setShowInfoModal(false);
	const handleCloseMonstersModal = () => setShowMonstersModal(false);

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

	const handleHeroAttack = () => setShowMonstersModal(true);

	if (loading) return <div>Loading...</div>;
	if (!user?.username) return <h4>You need to be logged in to see this.</h4>;
	if (error) return <div>ERROR!</div>;

	const renderCards = (sortedData) => {
		if (sortedData !== null) {
			return sortedData.map((creature, n) => {
				let position =
					n > index
						? 'nextCard'
						: n === index
						? 'activeCard'
						: 'prevCard';

				if (creature.type !== 'hero') {
					return (
						<Monster
							key={creature.name}
							monster={creature}
							cardStyle={position}
							handleRollDice={handleRollDice}
							handleShowInfo={handleShowInfo}
							sortedData={sortedData}
							setSortedData={setSortedData}
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
			});
		}
		return null;
	};

	return (
		<div className="battle-container d-flex flex-column justify-content-center align-items-center container">
			{sortedData.length > 0 ? (
				<QuickView
					sortedData={sortedData}
					turn={turn}
					setTurn={setTurn}
					setIndex={setIndex}
				/>
			) : (
				<p>Nothing yet</p>
			)}
			<div className="battle-stats mt-2 d-flex">
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
				{/* <div className="card-container container d-flex justify-content-center">
					<div className="background-block"></div>
					{sortedData || sortedData[0].initiative
						? renderCards(sortedData)
						: null}
				</div> */}

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

			<MonstersModal
				showMonstersModal={showMonstersModal}
				handleCloseMonstersModal={handleCloseMonstersModal}
				sortedData={sortedData}
				setSortedData={setSortedData}
			/>
		</div>
	);
};

export default Battle;
