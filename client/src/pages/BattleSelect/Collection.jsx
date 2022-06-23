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
		<div className="container py-4">
			<h1 className="text-center">{collection.name}</h1>
			<div className="d-flex flex-wrap justify-content-center">
				{collection &&
					collection.battles.map((battle) => {
						return <Card key={battle._id} battle={battle} />;
					})}
			</div>
			<Link to={'/battles'} className="btn btn-primary">
				Back
			</Link>
		</div>
	);
};

export default Collection;
