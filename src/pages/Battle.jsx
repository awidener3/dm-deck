import React, { useEffect, useState } from 'react';
import Card from '../components/Card';
import Hero from '../components/Hero';
import monsters from '../components/Card/cardData';

const Battle = () => {
	const [monsterData, setMonsterData] = useState(monsters);

	useEffect(() => {
		addInitiative();
	}, []);

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
			.map((monster, index) => <Card key={index} monster={monster} />);
	};

	return (
		<div className="p-4 d-flex flex-column justify-content-center align-items-center container">
			<h1>Example Battle</h1>

			<Hero />

			<div className="card-container">
				{monsterData[0].initiative ? renderCards() : null}
			</div>
		</div>
	);
};

export default Battle;
