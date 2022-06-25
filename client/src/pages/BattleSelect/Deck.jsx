import { Link } from 'react-router-dom';

const Deck = ({ collection, handleDrop }) => {
	return (
		<Link to={`/collection/${collection._id}`}>
			<div
				className="m-2 card battle-deck d-flex justify-content-center"
				key={collection._id}
				onDrop={(e) => handleDrop(e, collection._id)}
				onDragOver={(e) => e.preventDefault()}
				style={{
					backgroundImage: collection.background_img
						? `url(${require('assets/images/card_backs/' +
								collection.background_img)})`
						: "url(require('assets/images/card_backs/back_1.jpg')",
					backgroundRepeat: 'no-repeat',
					backgroundSize: 'cover',
				}}
			>
				<h2 className="battle-deck-title text-center">
					{collection.name}
				</h2>
				<span className="battle-deck-card-number">
					{collection && collection.battles.length}
				</span>
				<div className="nested-deck"></div>
				<div className="double-nested-deck"></div>
			</div>
		</Link>
	);
};

export default Deck;
