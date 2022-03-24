import React from 'react';
import { BsShieldFill } from 'react-icons/bs';
import { BsHeartFill } from 'react-icons/bs';
import './hero.scss';

const HealthIcon = ({ hp }) => {
	return (
		<div className="icon-container m-2">
			<BsHeartFill className="hp-icon" />
			<h3 className="icon-value">{hp}</h3>
		</div>
	);
};

const ArmorClassIcon = ({ ac }) => {
	return (
		<div className="icon-container m-2">
			<BsShieldFill className="ac-icon" />
			<h3 className="icon-value">{ac}</h3>
		</div>
	);
};

const Hero = ({ hero, cardStyle }) => {
	// console.log(hero);
	return (
		<article className={`wrapper ${cardStyle}`}>
			<div className="hero-card m-3 d-flex flex-column justify-content-center align-items-center">
				<div className="hero-stats d-flex justify-content-between w-100">
					<ArmorClassIcon ac={hero.armor_class} />
					<HealthIcon hp={hero.hit_points} />
				</div>
				<h1 className="hero-name m-0">{hero.character_name}</h1>
				<h2 className="player-name">{hero.player_name}</h2>
				{/* INITIATIVE */}
				<div className="initiative-div d-flex justify-content-center align-items-center mb-2">
					{hero.initiative}
				</div>
			</div>
		</article>
	);
};

export default Hero;
