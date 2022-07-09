import { useState } from 'react';
import { useQuery, useMutation, NetworkStatus } from '@apollo/client';
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
import Loading from 'components/Loading';
import NotAuthorized from 'components/NotAuthorized';

const BattleSelect = () => {
	const [showCollectionModal, setShowCollectionModal] = useState(false);
	const handleCloseCollectionModal = () => setShowCollectionModal(false);

	// Add a battle
	const [addBattleToCollection, { error: mutation_error }] = useMutation(
		ADD_BATTLE_TO_COLLECTION,
		{
			refetchQueries: [
				{ query: QUERY_USER_COLLECTIONS },
				'UserCollections',
			],
		}
	);

	// Delete a battle
	const [deleteBattle] = useMutation(DELETE_BATTLE, {
		refetchQueries: [
			{ query: QUERY_USER_BATTLES },
			'UserBattles',
			{ query: QUERY_USER_COLLECTIONS },
			'UserCollections',
		],
	});

	// Get user data
	const {
		loading: user_loading,
		error: user_error,
		data: user_data,
	} = useQuery(QUERY_ME);

	// Get collection data
	const { data: colls_data } = useQuery(QUERY_USER_COLLECTIONS);

	// Get battle data
	const {
		data: battles_data,
		loading: battles_loading,
		networkStatus,
	} = useQuery(QUERY_USER_BATTLES, {
		notifyOnNetworkStatusChange: true,
	});

	const user = user_data?.me || [];
	const collections = colls_data?.userCollections || [];
	const battles = battles_data?.userBattles || [];

	const handleDeleteBattle = async (selectedBattle) => {
		const battleId = selectedBattle._id;
		try {
			const { data } = await deleteBattle({
				variables: { battleId },
			});
			console.log('✅ Battle successfully deleted!\n', data);
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
		const battleId = e.dataTransfer.getData('id');
		try {
			const mutationResponse = await addBattleToCollection({
				variables: {
					battleId,
					collectionId,
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

	if (networkStatus === NetworkStatus.refetch)
		return <h3 className="text-center p-4">📮 Refetching!</h3>;
	if (user_loading || battles_loading) return <Loading />;
	if (!user?.username) return <NotAuthorized />;
	if (user_error)
		return (
			<div className="text-center p-4">
				<h3>❌ Error!</h3>
				<pre>{user_error}</pre>
			</div>
		);

	return (
		<>
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
			<Container className="mt-3 pb-5 d-flex flex-column justify-content-center">
				<h2 className="text-center">Battles</h2>

				<div className="d-flex flex-wrap justify-content-around justify-content-md-start my-3">
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
		</>
	);
};

export default BattleSelect;
