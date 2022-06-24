import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_COLLECTION } from 'utils/queries/battleQueries';
import Card from './Card';

const Collection = () => {
	let { collectionId } = useParams();
	const { loading, data } = useQuery(QUERY_COLLECTION, {
		variables: { collectionId: collectionId },
	});

	const collection = data?.collection || {};

	if (loading) return <p>Loading</p>;

	return (
		<div className="collection-container">
			<div
				className="collection-header"
				style={{
					backgroundImage: collection.background_img
						? `url(${require('assets/images/' +
								collection.background_img)})`
						: "url(require('assets/images/back_1.jpg')",
					backgroundRepeat: 'no-repeat',
					backgroundSize: 'cover',
				}}
			>
				<h1 className="text-center">{collection.name}</h1>
				<div className="fade"></div>
			</div>
			<div className="d-flex flex-wrap justify-content-center">
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
			<Link to={'/battles'} className="btn btn-primary">
				Back
			</Link>
		</div>
	);
};

export default Collection;
