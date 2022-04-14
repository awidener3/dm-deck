import React, { useState } from 'react';
import '../App.scss';

import CreateBattleSummary from '../components/CreateBattleSummary';
import CreateBattleForm from '../components/CreateBattleForm';

import heroes from '../components/Hero/heroData';

const CreateBattle = () => {
	// The selections that will be used in a battle
	const [battleName, setBattleName] = useState('');
	const [selectedHeroes, setSelectedHeroes] = useState([]);
	const [selectedMonsters, setSelectedMonsters] = useState([]);

	const handleRemoveMonster = (index) => {
		const updatedArray = selectedMonsters.slice();
		updatedArray.splice(index, 1);

		setSelectedMonsters(updatedArray);
	};

	const handleRemoveHero = (index) => {
		const updatedArray = selectedHeroes.slice();
		updatedArray.splice(index, 1);

		setSelectedHeroes(updatedArray);
	};

	const handleSelectMonster = (data) => {
		let updatedArray = [...selectedMonsters, data];
		setSelectedMonsters(updatedArray);
	};

	const handleSelectHero = (character_name) => {
		heroes.forEach((hero) => {
			if (
				hero.character_name === character_name &&
				!selectedHeroes.includes(hero)
			)
				setSelectedHeroes([...selectedHeroes, hero]);
		});
	};

	return (
		<div className="container py-4">
			<h1 className="text-center">Create New Battle</h1>

			<div className="d-flex flex-lg-row flex-md-column flex-column">
				<CreateBattleForm
					setBattleName={setBattleName}
					heroes={heroes}
					currentHeroes={selectedHeroes}
					handleSelectMonster={handleSelectMonster}
					handleSelectHero={handleSelectHero}
				/>
				<CreateBattleSummary
					battleName={battleName}
					selectedHeroes={selectedHeroes}
					selectedMonsters={selectedMonsters}
					handleRemoveMonster={handleRemoveMonster}
					handleRemoveHero={handleRemoveHero}
				/>
			</div>
			<button
				onClick={() => console.log(selectedHeroes, selectedMonsters)}
			>
				Show arrays
			</button>
		</div>
	);
};

export default CreateBattle;
