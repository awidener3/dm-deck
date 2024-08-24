import { Link } from 'react-router-dom';
// Icons
import { BsShieldFill, BsHeartFill } from 'react-icons/bs';
import { FiTrash2 } from 'react-icons/fi';
import { RiEditLine } from 'react-icons/ri';

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

const Card = ({ creature, cardStyle, setShowWarningModal, setSelected }) => {
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
				<section className="mt-auto text-center">
					<h1 className="hero-name">{creature.character_name}</h1>
					<h2 className="player-name border-bottom pb-2">
						{creature.player_name}
					</h2>
					<p className="character-details m-0">
						{creature.race} {creature.class} ({creature.level})
					</p>
				</section>

				{/* Buttons */}
				<section className="d-flex mt-auto justify-content-between">
					<button
						className="card-btn btn btn-outline-danger m-1"
						title="Delete character"
						onClick={() => {
							setSelected(creature);
							setShowWarningModal(true);
						}}
					>
						<FiTrash2 size={20} />
					</button>
					<Link
						className="card-btn btn btn-outline-secondary m-1"
						title="Edit character"
						to={'/character-builder'}
						state={creature} // send creature data to form
					>
						<RiEditLine size={20} />
					</Link>
				</section>
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
