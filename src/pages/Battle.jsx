import React, { useEffect, useState } from 'react';

import Card from '../components/Card';
import Hero from '../components/Hero';

import monsters from '../components/Card/cardData';
import heroes from '../components/Hero/heroData';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import '../App.scss';

const Battle = () => {
	const [monsterData, setMonsterData] = useState(monsters);
	const [heroData, setHeroData] = useState(heroes);
	const [index, setIndex] = useState(0);
	const [round, setRound] = useState(1);
	const [turn, setTurn] = useState(1);

	const sortedData = [].concat(monsterData).concat(heroData);

	useEffect(() => {
		addInitiative();
	}, []);

	const slideLeft = () => {
		// Previous turn
		if (index - 1 >= 0) {
			setTurn(turn - 1);
			setIndex(index - 1);
		}
	};

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
						<Card
							key={creature.name}
							monster={creature}
							cardStyle={position}
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
		<div className="p-4 d-flex flex-column justify-content-center align-items-center container">
			<h1>Example Battle</h1>
			<div className="battle-stats d-flex border">
				<p className="battle-stat m-2">Round: {round}</p>
				<p className="battle-stat m-2">Turn: {turn}</p>
			</div>

			<div className="d-flex align-items-center">
				<FaChevronLeft onClick={slideLeft} className="battle-chevron" />

				<div className="card-container container d-flex justify-content-center">
					<div className="background-block"></div>
					{monsterData[0].initiative ? renderCards() : null}
				</div>

				<FaChevronRight
					onClick={slideRight}
					className="battle-chevron"
				/>
			</div>
		</div>
	);
};

export default Battle;
