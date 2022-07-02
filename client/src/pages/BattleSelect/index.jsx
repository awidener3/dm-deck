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
import PageHeader from 'components/PageHeader';
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
			console.log('✅ Success!\n', data);
		} catch (e) {
			console.error('💥 Error deleting battle\n', e);
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
		try {
			const mutationResponse = await addBattleToCollection({
				variables: {
					battleId: data,
					collectionId: collectionId,
				},
			});
			console.log(
				'✅ Battle successfully added to Collection! \n',
				mutationResponse
			);
		} catch (error) {
			console.error(
				'💥 Battle was not added to Collection! \n',
				mutation_error
			);
		}
	};

	if (user_loading || battles_loading) return <div>Loading...</div>;
	if (!user?.username) return <h4>You need to be logged in to see this.</h4>;
	if (user_error) return <div>ERROR!</div>;

	return (
		<div>
			<PageHeader
				image={`url(${require('assets/images/card_backs/back_7.jpg')})`}
				pageTitle={'Saved Battles'}
			/>

			{/* Decks */}
			<section className="container-fluid deck-drawer">
				<h2 className="text-center">Deck Drawer</h2>

				<div className="deck-container">
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
			</section>

			{/* Cards */}
			<Container className="mt-3 d-flex flex-column justify-content-center">
				<h2 className="text-center">Battles</h2>

				<div className="d-flex flex-wrap justify-content-center justify-content-md-start my-3">
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
				</div>
			</Container>

			{/* Corner Button */}
			<div className="d-flex justify-content-center create-btn-container">
				<Link to={'/battle-builder'} className="create-btn">
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
