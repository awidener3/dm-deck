import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import {
	QUERY_ME,
	QUERY_USER_CHARACTERS,
	QUERY_USER_BATTLES,
} from 'utils/queries/userQueries';
import { ADD_BATTLE, UPDATE_BATTLE } from 'utils/mutations/battleMutations';
import { QUERY_BATTLE } from 'utils/queries/battleQueries';

import CreateBattleSummary from './CreateBattleSummary';
import CreateBattleForm from './CreateBattleForm';
import PageHeader from 'components/PageHeader';

/**
 * @route /battle-builder
 */
const BattleBuilder = () => {
	let { battleId } = useParams();

	// State
	const [battleName, setBattleName] = useState('');
	const [selectedHeroes, setSelectedHeroes] = useState([]);
	const [selectedMonsters, setSelectedMonsters] = useState([]);

	const { loading: battle_loading, error: query_battle_error } = useQuery(
		QUERY_BATTLE,
		{
			variables: { battleId },
			skip: !battleId, // skip if there is no battleId
			onCompleted: (data) => {
				setSelectedHeroes(data.battle.heroes);
				setSelectedMonsters(data.battle.monsters);
				setBattleName(data.battle.name);
			},
		}
	);

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
	const [addBattle] = useMutation(ADD_BATTLE, {
		refetchQueries: [{ query: QUERY_USER_BATTLES }, 'UserBattles'],
	});

	const [updateBattle] = useMutation(UPDATE_BATTLE, {
		refetchQueries: [{ query: QUERY_USER_BATTLES }, 'UserBattles'],
	});

	/**
	 * Saves a battle to the db
	 * @function handleSave
	 */
	const handleSave = async () => {
		try {
			const heroes = selectedHeroes.map((hero) => hero._id);
			const monsters = selectedMonsters.map((monster) => monster.slug);

			let mutationResponse;

			if (battleId) {
				mutationResponse = await updateBattle({
					variables: {
						battleId: battleId,
						name: battleName || 'New Battle',
						userId: user._id,
						heroes: heroes,
						monster_slugs: monsters,
					},
				});
			} else {
				mutationResponse = await addBattle({
					variables: {
						name: battleName || 'New Battle',
						userId: user._id,
						heroes: heroes,
						monster_slugs: monsters,
					},
				});
			}
			console.log('🚀', mutationResponse.data);
			console.log('✅ Battle successfully added!');
		} catch (error) {
			console.warn('💥 Battle was not created...', {
				name: battleName,
				heroes: selectedHeroes,
				monster_slugs: selectedMonsters,
			});
			console.log('ERROR:', error);
		}
	};

	// todo: handleRemoveMonster & handleRemoveHero can be refactored into one function
	/**
	 * Removes a monster from the selectedMonsters array
	 * @function handleRemoveMonster
	 * @param {Object} monster Monster object
	 */
	const handleRemoveMonster = (monster) => {
		const updatedArray = selectedMonsters.slice();

		// Find index of monster being removed
		const index = updatedArray.findIndex((item) => item === monster);

		// Splice from array
		updatedArray.splice(index, 1);

		// Updated selectedMonsters variable
		setSelectedMonsters(updatedArray);
	};

	/**
	 * Removes a hero from the selectedHeroes array
	 * @param {Object} hero Hero object
	 */
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
	if (user_loading || characters_loading || battle_loading)
		return <div>Loading...</div>;
	if (!user?.username) return <h4>You need to be logged in to see this.</h4>;
	if (user_error || characters_error || query_battle_error)
		return <div>ERROR!</div>;

	return (
		<div>
			<PageHeader
				image={`url(${require('assets/images/card_backs/back_4.jpg')})`}
				pageTitle={'Battle Builder'}
			/>

			<div className="container d-flex flex-lg-row flex-md-column flex-column py-3">
				<CreateBattleForm
					setBattleName={setBattleName}
					battleName={battleName}
					heroes={characters}
					selectedHeroes={selectedHeroes}
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

export default BattleBuilder;
