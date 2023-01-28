import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import { QUERY_ME, QUERY_USER_BATTLES } from 'utils/queries/userQueries';
import { GET_BATTLE_BUILDER_DATA } from 'utils/queries/battleBuilderQueries';
import { ADD_BATTLE, UPDATE_BATTLE } from 'utils/mutations/battleMutations';
import { QUERY_BATTLE } from 'utils/queries/battleQueries';

import CreateBattleSummary from './CreateBattleSummary';
import CreateBattleForm from './CreateBattleForm';
import PageHeader from 'components/PageHeader';
import Loading from 'components/Loading';

/**
 * Main view for the "Battle Builder"
 *
 * todo: currently, updating a battle has some bugs with monsters - most likely having to do with _id's?
 */
const BattleBuilder = () => {
	let { battleId } = useParams();

	// State
	const [battleName, setBattleName] = useState('');
	const [selectedHeroes, setSelectedHeroes] = useState([]);
	const [selectedMonsters, setSelectedMonsters] = useState([]);
	const [selectedNpcs, setSelectedNpcs] = useState([]);

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

	const { loading, error, data } = useQuery(GET_BATTLE_BUILDER_DATA);

	// Database queries
	const {
		loading: user_loading,
		error: user_error,
		data: user_data,
	} = useQuery(QUERY_ME);

	// Query Results
	const user = user_data?.me || user_data?.user || [];

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
			const monsters = selectedMonsters.map((monster) => monster._id);
			const npcs = selectedNpcs.map((npc) => npc._id);

			let mutationResponse;

			if (battleId) {
				mutationResponse = await updateBattle({
					variables: {
						battleId: battleId,
						name: battleName || 'New Battle',
						userId: user._id,
						heroes: heroes,
						npcs: npcs,
						monsters: monsters,
					},
				});
			} else {
				mutationResponse = await addBattle({
					variables: {
						name: battleName || 'New Battle',
						userId: user._id,
						heroes: heroes,
						npcs: npcs,
						monsters: monsters,
					},
				});
			}
			console.log('🚀', mutationResponse.data);
			console.log('✅ Battle successfully added!');
		} catch (error) {
			console.warn('💥 Battle was not created...', {
				name: battleName,
				heroes: selectedHeroes,
				npcs: selectedNpcs,
				monsters: selectedMonsters,
			});
			console.log(error);
		}
	};

	const handleRemoveMonster = (monster) => {
		const updatedArray = selectedMonsters.slice();

		// Find index of monster being removed
		const index = updatedArray.findIndex((item) => item === monster);

		// Splice from array
		updatedArray.splice(index, 1);

		// Updated selectedMonsters variable
		setSelectedMonsters(updatedArray);
	};

	const handleRemoveNpc = (npc) => {
		const updatedArray = selectedNpcs.slice();

		// Find index of monster being removed
		const index = updatedArray.findIndex((item) => item === npc);

		// Splice from array
		updatedArray.splice(index, 1);

		// Updated selectedMonsters variable
		setSelectedNpcs(updatedArray);
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
		data.userCharacters.forEach((hero) => {
			if (hero._id === id && !selectedHeroes.includes(hero))
				setSelectedHeroes([...selectedHeroes, hero]);
		});
	};

	const handleSelectNpc = (data) => {
		let updatedArray = [...selectedNpcs, data];
		setSelectedNpcs(updatedArray);
	};

	// User validation
	if (loading || user_loading || battle_loading) return <Loading />;
	if (!user?.username) return <h4>You need to be logged in to see this.</h4>;
	if (user_error || error || query_battle_error) {
		console.log(user_error);
		console.log(error);
		console.log(query_battle_error);
		return <div>ERROR!</div>;
	}

	return (
		<div>
			<PageHeader
				image={`url(${require('assets/images/card_backs/back_4.jpg')})`}
				pageTitle={'Battle Builder'}
			/>
			<section className="container d-flex flex-column py-3">
				<CreateBattleForm
					setBattleName={setBattleName}
					battleName={battleName}
					heroes={data.userCharacters}
					selectedHeroes={selectedHeroes}
					monsters={data.monsters}
					handleSelectMonster={handleSelectMonster}
					handleSelectHero={handleSelectHero}
					handleSelectNpc={handleSelectNpc}
					handleRemoveHero={handleRemoveHero}
				/>

				<CreateBattleSummary
					battleName={battleName}
					selectedHeroes={selectedHeroes}
					selectedMonsters={selectedMonsters}
					selectedNpcs={selectedNpcs}
					handleRemoveMonster={handleRemoveMonster}
					handleRemoveHero={handleRemoveHero}
					handleRemoveNpc={handleRemoveNpc}
					handleSave={handleSave}
				/>
			</section>
		</div>
	);
};

export default BattleBuilder;
