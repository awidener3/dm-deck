import React, { useEffect, useState } from 'react';

import Card from '../components/Card';
import Hero from '../components/Hero';

import monsters from '../components/Card/cardData';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import '../App.scss';

const Battle = () => {
	const [monsterData, setMonsterData] = useState(monsters);
	const [index, setIndex] = useState(0);

	useEffect(() => {
		addInitiative();
	}, []);

	const slideLeft = () => {
		if (index - 1 >= 0) {
			setIndex(index - 1);
		}
	};

	const slideRight = () => {
		console.log(index, monsters.length);
		if (index + 1 <= monsters.length - 1) {
			setIndex(index + 1);
		}

		if (index === monsters.length - 1) {
			setIndex(0);
		}
	};

	const getInitiative = (monster) => {
		return (
			Math.floor(Math.random() * 20 + 1) +
			Math.floor((monster.ability_scores.dexterity - 10) / 2)
		);
	};

	const addInitiative = () => {
		const monsters = monsterData.map((monster) => ({
			...monster,
			initiative: getInitiative(monster),
		}));
		setMonsterData(monsters);
	};

	const renderCards = () => {
		const sortedData = [].concat(monsterData);
		return sortedData
			.sort((a, b) => (a.initiative < b.initiative ? 1 : -1))
			.map((monster, n) => {
				let position =
					n > index
						? 'nextCard'
						: n === index
						? 'activeCard'
						: 'prevCard';
				return (
					<Card
						key={monster.name}
						monster={monster}
						cardStyle={position}
					/>
				);
			});
	};

	return (
		<div className="p-4 d-flex flex-column justify-content-center align-items-center container">
			<h1>Example Battle</h1>

			{/* <Hero /> */}
			<FaChevronLeft onClick={slideLeft} className="leftBtn" />
			<FaChevronRight onClick={slideRight} className="rightBtn" />

			<div className="card-container container d-flex justify-content-center">
				<div className="background-block"></div>
				{monsterData[0].initiative ? renderCards() : null}
			</div>
		</div>
	);
};

export default Battle;
