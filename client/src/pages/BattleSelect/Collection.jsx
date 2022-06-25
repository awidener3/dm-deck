import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import { QUERY_COLLECTION } from 'utils/queries/battleQueries';
import Card from './Card';
import PageHeader from 'components/PageHeader';
import { useEffect } from 'react';
import { DELETE_COLLECTION } from 'utils/mutations';
import { Redirect } from 'react-router-dom';

const Collection = () => {
	let { collectionId } = useParams();
	const { loading, data, refetch } = useQuery(QUERY_COLLECTION, {
		variables: { collectionId: collectionId },
	});

	const [deleteCollection] = useMutation(DELETE_COLLECTION);

	const collection = data?.collection || {};

	useEffect(() => {
		refetch();
	}, []);

	const handleDeleteCollection = async () => {
		try {
			console.log('collection id', collection);
			const { data } = await deleteCollection({
				variables: { collectionId: collection._id },
			});
			console.log('✅ Success!', data);
			window.location.assign('/battles');
		} catch (e) {
			console.log('Error deleting collection');
			console.error('e');
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
