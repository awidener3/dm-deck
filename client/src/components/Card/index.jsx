import React from 'react';
import { Button } from 'react-bootstrap';
import './card.scss';
import '../Hero/hero.scss';

// Icons
import { BsShieldFill, BsHeartFill } from 'react-icons/bs';

const Card = ({ creature, cardStyle }) => {
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
	return (
		<div className={`${cardStyle}`}>
			<div className="dmd-card m-3 d-flex flex-column justify-content-center align-items-center">
				{/* AC + HP Icons */}
				<div className="hero-stats d-flex justify-content-between w-100">
					<ArmorClassIcon ac={creature.armor_class} />
					<HealthIcon hp={creature.hit_points} />
				</div>

				{/* PC INFO */}
				<div className="container text-center pb-2 border-bottom">
					<h1 className="hero-name m-0">{creature.character_name}</h1>
					<h2 className="player-name">{creature.player_name}</h2>
				</div>
				<div className="d-flex character-buttons p-2">
					<Button className="m-2" variant="outline-secondary">
						Edit
					</Button>
					<Button className="m-2" variant="outline-danger">
						Delete
					</Button>
				</div>
			</div>
		</div>
	);
};

export default Card;
