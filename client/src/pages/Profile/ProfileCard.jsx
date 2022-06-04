import { Button } from 'react-bootstrap';

// Icons
import { BsShieldFill, BsHeartFill } from 'react-icons/bs';

const Card = ({ creature, cardStyle }) => {
	console.log(cardStyle);
	console.log(creature);
	// Render AC icon with ac stat inside
	const ArmorClassIcon = ({ ac }) => {
		return (
			<div className="icon-container m-2">
				<BsShieldFill className="ac-icon" />
				<h3 className="icon-value">{ac}</h3>
			</div>
		);
	};

	// Render HP icon with hp stat inside
	const HealthIcon = ({ hp }) => {
		return (
			<div className="icon-container m-2">
				<BsHeartFill className="hp-icon" />
				<h3 className="icon-value">{hp}</h3>
			</div>
		);
	};

	if (cardStyle === 'hero') {
		return (
			<figure
				className={`${cardStyle} m-2 d-flex flex-column justify-content-center align-items-center`}
			>
				{/* AC + HP Icons */}
				<section className="hero-stats d-flex justify-content-between w-100">
					<ArmorClassIcon ac={creature.armor_class} />
					<HealthIcon hp={creature.hit_points} />
				</section>

				{/* PC Info */}
				<section className="text-center border-bottom">
					<h1 className="hero-name">{creature.character_name}</h1>
					<h2 className="player-name">{creature.player_name}</h2>
				</section>
				<div className="d-flex character-buttons p-2"></div>
			</figure>
		);
	} else if (cardStyle === 'monster') {
		return (
			<figure
				className={`${cardStyle} m-2 d-flex flex-column align-items-center`}
			>
				{/* Monster Info */}
				<section className="text-center border-bottom">
					<h1 className="monster-name">{creature.name}</h1>
				</section>
				<div className="d-flex character-buttons p-2"></div>
			</figure>
		);
	} else {
		return null;
	}
};

export default Card;
