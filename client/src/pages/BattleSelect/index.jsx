import { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import {
	QUERY_ME,
	QUERY_USER_BATTLES,
	QUERY_USER_COLLECTIONS,
} from 'utils/queries/userQueries';
import { DELETE_BATTLE, ADD_BATTLE_TO_COLLECTION } from 'utils/mutations';

import './battleSelect.scss';
import Deck from './Deck';
import Card from './Card';
import NewCollectionModal from './NewCollectionModal';

const BattleSelect = () => {
	const [showCollectionModal, setShowCollectionModal] = useState(false);
	const handleCloseCollectionModal = () => setShowCollectionModal(false);

	const [addBattleToCollection, { error: mutation_error }] = useMutation(
		ADD_BATTLE_TO_COLLECTION,
		{
			refetchQueries: [
				{ query: QUERY_USER_COLLECTIONS },
				'UserCollections',
			],
		}
	);
	const [deleteBattle] = useMutation(DELETE_BATTLE, {
		refetchQueries: [
			{ query: QUERY_USER_BATTLES },
			'UserBattles',
			{ query: QUERY_USER_COLLECTIONS },
			'UserCollections',
		],
	});

	const {
		loading: user_loading,
		error: user_error,
		data: user_data,
	} = useQuery(QUERY_ME);
	const { data: colls_data } = useQuery(QUERY_USER_COLLECTIONS);
	const { data: battles_data, loading: battles_loading } =
		useQuery(QUERY_USER_BATTLES);

	const user = user_data?.me || [];
	const collections = colls_data?.userCollections || [];
	const battles = battles_data?.userBattles || [];

	const handleDeleteBattle = async (selectedBattle) => {
		const id = selectedBattle._id;
		try {
			const { data } = await deleteBattle({
				variables: { battleId: id },
			});
			console.log('✅ Success!', data);
		} catch (e) {
			console.log('🚮 Error deleting battle');
			console.error(e);
		}
	};

	// Grabs id of a battle card to be used when dropped
	const startDrag = (e, id) => {
		e.dataTransfer.setData('id', id);
	};

	// Calls mutation to add battle to collection
	const handleDrop = async (e, collectionId) => {
		e.preventDefault();
		let data = e.dataTransfer.getData('id');
		console.log('card id is: ', data);
		console.log('collection id is: ', collectionId);
		try {
			const mutationResponse = await addBattleToCollection({
				variables: {
					battleId: data,
					collectionId: collectionId,
				},
			});
			console.log('✅ Battle successfully added to Collection!');
			console.log('🚀', mutationResponse.data);
			console.log('🚀', collections);
		} catch (error) {
			console.log('💥 Battle was not added to Collection.');
			console.error(mutation_error);
		}
	};

	if (user_loading || battles_loading) return <div>Loading...</div>;
	if (!user?.username) return <h4>You need to be logged in to see this.</h4>;
	if (user_error) return <div>ERROR!</div>;

	return (
		<div className="py-4">
			<h1 className="text-center">Select a Saved Battle</h1>

			{/* Decks */}
			<div className="container-fluid container-lg d-flex deck-container">
				{collections &&
					collections.map((collection) => {
						return (
							<Deck
								key={collection._id}
								collection={collection}
								handleDrop={handleDrop}
							/>
						);
					})}

				{/* Add new collection button */}
				<figure
					className="add-deck m-2"
					onClick={() => setShowCollectionModal(true)}
				>
					<div className="plus-button h-100 d-flex justify-content-center align-items-center">
						+
					</div>
				</figure>
			</div>

			{/* Cards */}
			<Container
				fluid="lg"
				className="d-flex flex-wrap justify-content-center"
			>
				{battles &&
					battles.map((battle) => {
						return (
							<Card
								key={battle._id}
								battle={battle}
								startDrag={startDrag}
								handleDeleteBattle={handleDeleteBattle}
								draggable={true}
							/>
						);
					})}
			</Container>

			{/* Corner Button */}
			<div className="d-flex justify-content-center create-btn-container">
				<Link to={'/create-battle'} className="create-btn">
					&#43;
				</Link>
			</div>
			<NewCollectionModal
				showModal={showCollectionModal}
				handleHide={handleCloseCollectionModal}
				userId={user._id}
			/>
		</div>
	);
};

export default BattleSelect;
