import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import { QUERY_COLLECTION } from 'utils/queries/battleQueries';
import Card from './Card';
import PageHeader from 'components/PageHeader';
import { useEffect } from 'react';
import {
	DELETE_COLLECTION,
	REMOVE_BATTLE_FROM_COLLECTION,
} from 'utils/mutations';

const Collection = () => {
	let { collectionId } = useParams();
	const { loading, data, refetch } = useQuery(QUERY_COLLECTION, {
		variables: { collectionId: collectionId },
	});

	const [deleteCollection] = useMutation(DELETE_COLLECTION);
	const [removeBattleFromCollection] = useMutation(
		REMOVE_BATTLE_FROM_COLLECTION
	);

	const collection = data?.collection || {};

	useEffect(() => {
		refetch();
	}, []);

	const handleRemoveFromCollection = async (battle) => {
		console.log(battle._id);
		try {
			const { data } = await removeBattleFromCollection({
				variables: {
					battleId: battle._id,
					collectionId: collection._id,
				},
			});
			console.log('✅ Success!', data);
			refetch();
		} catch (e) {
			console.log('Error removing battle from collection');
			console.log(e);
		}
	};

	const handleDeleteCollection = async () => {
		try {
			const { data } = await deleteCollection({
				variables: { collectionId: collection._id },
			});
			console.log('✅ Success!', data);
			window.location.assign('/battles');
		} catch (e) {
			console.log('Error deleting collection');
			console.error(e);
		}
	};

	if (loading) return <p>Loading</p>;

	return (
		<>
			<PageHeader
				image={
					collection.background_img
						? `url(${require('assets/images/card_backs/' +
								collection.background_img)})`
						: `url(${require('assets/images/card_backs/back_1.jpg')})`
				}
				pageTitle={collection.name}
			/>
			<div className="d-flex flex-wrap justify-content-center mt-3">
				{collection &&
					collection.battles.map((battle) => {
						return (
							<Card
								key={battle._id}
								battle={battle}
								draggable={false}
								handleDeleteBattle={handleRemoveFromCollection}
							/>
						);
					})}
			</div>
			<div className="d-flex justify-content-center mt-3">
				<Link to={'/battles'} className="btn btn-secondary me-2">
					Back
				</Link>
				<button
					className="btn btn-danger"
					onClick={handleDeleteCollection}
				>
					Delete
				</button>
			</div>
		</>
	);
};

export default Collection;
