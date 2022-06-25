import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import {
	QUERY_ME,
	QUERY_USER_CHARACTERS,
	QUERY_USER_BATTLES,
} from '../utils/queries';
import { ADD_BATTLE } from '../utils/mutations';
import '../App.scss';

import CreateBattleSummary from '../components/CreateBattleSummary';
import CreateBattleForm from '../components/CreateBattleForm';

const CreateBattle = () => {
	// State
	const [battleName, setBattleName] = useState('');
	const [selectedHeroes, setSelectedHeroes] = useState([]);
	const [selectedMonsters, setSelectedMonsters] = useState([]);

	// Database queries
	const {
		loading: user_loading,
		error: user_error,
		data: user_data,
	} = useQuery(QUERY_ME);
	const {
		loading: characters_loading,
		error: characters_error,
		data: characters_data,
	} = useQuery(QUERY_USER_CHARACTERS);
	// Query Results
	const user = user_data?.me || user_data?.user || [];
	const characters = characters_data?.userCharacters || [];

	// Database mutations
	const [addBattle, { error: battle_error }] = useMutation(ADD_BATTLE, {
		refetchQueries: [{ query: QUERY_USER_BATTLES }, 'UserBattles'],
	});

	const handleSave = async () => {
		try {
			const heroes = selectedHeroes.map((hero) => hero._id);
			const monsters = selectedMonsters.map((monster) => monster.slug);
			const mutationResponse = await addBattle({
				variables: {
					name: battleName || 'New Battle',
					userId: user._id,
					heroes: heroes,
					monster_slugs: monsters,
				},
			});
			console.log('🚀', mutationResponse.data);
			console.log('✅ Battle successfully added!');
		} catch (error) {
			console.warn('💥 Battle was not created...', {
				name: battleName,
				heroes: selectedHeroes,
				monster_slugs: selectedMonsters,
			});
			console.error(battle_error);
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
		characters.forEach((hero) => {
			if (hero._id === id && !selectedHeroes.includes(hero))
				setSelectedHeroes([...selectedHeroes, hero]);
		});
	};

	// User validation
	if (user_loading || characters_loading) return <div>Loading...</div>;
	if (!user?.username) return <h4>You need to be logged in to see this.</h4>;
	if (user_error || characters_error) return <div>ERROR!</div>;

	return (
		<div className="container-sm container-fluid py-4">
			<h1 className="text-center">Create New Battle</h1>

			<div className="d-flex flex-lg-row flex-md-column flex-column">
				<CreateBattleForm
					setBattleName={setBattleName}
					heroes={characters}
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
