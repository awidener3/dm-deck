import { useEffect, useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
import { Form, Container } from 'react-bootstrap';
import { QUERY_USER_COLLECTIONS } from 'utils/queries';
import { QUERY_ME, QUERY_USER_BATTLES } from 'utils/queries/userQueries';
import { DELETE_BATTLE, ADD_BATTLE_TO_COLLECTION } from 'utils/mutations';
import { RiSwordFill, RiEditLine } from 'react-icons/ri';
import { FiTrash2 } from 'react-icons/fi';

import './battles.scss';

import Summary from './Summary';
import SummaryAccordion from './SummaryAccordion';

const BattleSelect = ({ background = 'back_1.jpg' }) => {
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

	const handleClickDeck = (id) => {
		console.log(collections.find((collection) => collection._id === id));
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

			{/* Corner Button */}
			<div className="d-flex justify-content-center create-btn-container">
				<Link to={'/create-battle'} className="create-btn">
					&#43;
				</Link>
			</div>

			<Container fluid="lg" className="d-flex">
				{/* Decks */}
				{collections.map((collection) => {
					return (
						<div
							className="m-2 card battle-deck d-flex justify-content-center"
							key={collection._id}
							onClick={() => handleClickDeck(collection._id)}
							onDrop={(e) => handleDrop(e, collection._id)}
							onDragOver={(e) => e.preventDefault()}
							style={{
								backgroundImage: collection.background_img
									? `url(${require('assets/images/' +
											collection.background_img)})`
									: "url(require('assets/images/back_1.jpg')",
								backgroundRepeat: 'no-repeat',
								backgroundSize: 'cover',
							}}
						>
							<h2 className="battle-deck-title text-center">
								{collection.name}
							</h2>
							<span className="battle-deck-card-number">
								{collection.battles.length}
							</span>
							<div className="nested-deck"></div>
							<div className="double-nested-deck"></div>
						</div>
					);
				})}
			</Container>

			<Container fluid="lg" className="d-flex flex-wrap">
				{/* Cards */}
				{battles ? (
					battles.map((battle) => {
						return (
							<div
								key={battle._id}
								className="p-2"
								draggable="true"
								onDragStart={(e) => startDrag(e, battle._id)}
							>
								<div className="card battle-card p-3">
									<h2 className="battle-card-title text-center">
										{battle.name}
									</h2>

									<hr />

									<div className="card-body">
										<Summary battle={battle} />

										{/* Initiative Roll */}
										<Form>
											<Form.Check
												type="switch"
												label="Auto-roll Initiative"
												defaultChecked={true}
											/>
										</Form>

										<SummaryAccordion battle={battle} />
									</div>

									{/* Buttons */}
									<div className="button-container mt-auto d-flex justify-content-center">
										<button
											className="btn btn-outline-danger m-1"
											title="Delete Battle"
											onClick={() =>
												handleDeleteBattle(battle)
											}
										>
											<FiTrash2 size={'1.5rem'} />
										</button>
										<Link
											className="btn btn-outline-secondary disabled m-1"
											title="Edit Card"
											to={`/battles/${battle._id}`}
										>
											<RiEditLine size={'1.5rem'} />
										</Link>
										<Link
											className="btn btn-outline-primary m-1"
											title="Start Battle"
											to={`/battles/${battle._id}`}
										>
											<RiSwordFill size={'1.5rem'} />
										</Link>
									</div>
								</div>
							</div>
						);
					})
				) : (
					<div>
						<h2 className="mx-auto">No battles yet!</h2>
					</div>
				)}
			</Container>
		</div>
	);
};

export default BattleSelect;
