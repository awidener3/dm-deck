import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
import '../App.scss';

import CreateBattleSummary from '../components/CreateBattleSummary';
import CreateBattleForm from '../components/CreateBattleForm';

import heroes from '../components/Hero/heroData';

const CreateBattle = () => {
	// The selections that will be used in a battle
	const [battleName, setBattleName] = useState('');
	const [selectedHeroes, setSelectedHeroes] = useState([]);
	const [selectedMonsters, setSelectedMonsters] = useState([]);

	const { loading, error, data } = useQuery(QUERY_ME);
	const user = data?.me || data?.user || [];

	const handleRemoveMonster = (monster) => {
		const updatedArray = selectedMonsters.slice();
		let index = updatedArray.findIndex((item) => item === monster);
		updatedArray.splice(index, 1);

		setSelectedMonsters(updatedArray);
	};

	const handleRemoveHero = (hero) => {
		const updatedArray = selectedHeroes.slice();
		let index = updatedArray.findIndex((item) => item === hero);
		updatedArray.splice(index, 1);

		setSelectedHeroes(updatedArray);
	};

	const handleSelectMonster = (data) => {
		let updatedArray = [...selectedMonsters, data];
		setSelectedMonsters(updatedArray);
	};

	const handleSelectHero = (id) => {
		user.characters.forEach((hero) => {
			if (hero._id === id && !selectedHeroes.includes(hero))
				setSelectedHeroes([...selectedHeroes, hero]);
		});
	};

	if (loading) return <div>Loading...</div>;
	if (!user?.username) return <h4>You need to be logged in to see this.</h4>;
	if (error) return <div>ERROR!</div>;

	return (
		<div className="container-sm container-fluid py-4">
			<h1 className="text-center">Create New Battle</h1>

			<div className="d-flex flex-lg-row flex-md-column flex-column">
				<CreateBattleForm
					setBattleName={setBattleName}
					heroes={user.characters}
					currentHeroes={selectedHeroes}
					handleSelectMonster={handleSelectMonster}
					handleSelectHero={handleSelectHero}
					handleRemoveHero={handleRemoveHero}
				/>
				<CreateBattleSummary
					battleName={battleName}
					selectedHeroes={selectedHeroes}
					selectedMonsters={selectedMonsters}
					handleRemoveMonster={handleRemoveMonster}
					handleRemoveHero={handleRemoveHero}
				/>
			</div>
		</div>
	);
};

export default CreateBattle;
