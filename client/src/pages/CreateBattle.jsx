import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
import { ADD_BATTLE } from '../utils/mutations';
import '../App.scss';

import CreateBattleSummary from '../components/CreateBattleSummary';
import CreateBattleForm from '../components/CreateBattleForm';

const CreateBattle = () => {
	// The selections that will be used in a battle
	const [battleName, setBattleName] = useState('');
	const [selectedHeroes, setSelectedHeroes] = useState([]);
	const [selectedMonsters, setSelectedMonsters] = useState([]);

	const { loading, error, data } = useQuery(QUERY_ME);
	const user = data?.me || data?.user || [];

	const [addBattle, { mutationData, mutationError }] =
		useMutation(ADD_BATTLE);

	const handleSave = async () => {
		// Save to database
		try {
			const mutationResponse = await addBattle({
				variables: {
					name: battleName || 'New Battle',
					heroes: selectedHeroes,
					monsters: selectedMonsters,
				},
			});
			console.log('✅ Battle successfully added!');
			console.log('🚀', mutationResponse);
		} catch (error) {
			console.log(
				'💥 Battle was not created, double check input vs. what is expected by Apollo:',
				{
					name: battleName,
					heroes: selectedHeroes,
					monsters: selectedMonsters,
				}
			);
			console.error(mutationError);
		}
	};

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

	// User validation
	if (loading) return <div>Loading...</div>; // TODO: Make a super cool loading screen for this...?
	if (!user?.username) return <h4>You need to be logged in to see this.</h4>; // TODO: Make a "please login" component for this
	if (error) return <div>ERROR!</div>; // TODO: Make an "error" component for this

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
					handleSave={handleSave}
				/>
			</div>
		</div>
	);
};

export default CreateBattle;
