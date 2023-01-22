import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import Card from './Card';
import PageHeader from 'components/PageHeader';
import { QUERY_COLLECTION } from 'utils/queries/battleQueries';
import {
	DELETE_COLLECTION,
	REMOVE_BATTLE_FROM_COLLECTION,
} from 'utils/mutations/battleMutations';
import Loading from 'components/Loading';

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

	/**
	 * Removes a battle from a collection
	 * @function handleRemoveFromCollection
	 * @param {Object} battle Battle being deleted
	 */
	const handleRemoveFromCollection = async (battle) => {
		try {
			await removeBattleFromCollection({
				variables: {
					battleId: battle._id,
					collectionId: collection._id,
				},
			});
			refetch();
		} catch (e) {
			console.error(e);
		}
	};

	/**
	 * Deletes a collection
	 * @function handleDeleteCollection
	 */
	const handleDeleteCollection = async () => {
		try {
			await deleteCollection({
				variables: { collectionId: collection._id },
			});
			window.location.assign('/battle-select');
		} catch (e) {
			console.error(e);
		}
	};

	if (loading) return <Loading />;

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
				<Link to={'/battle-select'} className="btn btn-secondary me-2">
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
