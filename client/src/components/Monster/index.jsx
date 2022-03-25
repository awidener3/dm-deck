import React from 'react';
import './monster.scss';

// Icons
import { RiHeartFill, RiShieldFill } from 'react-icons/ri';
import { FaArrowCircleRight } from 'react-icons/fa';
import {
	GiMineExplosion,
	GiPointySword,
	GiPocketBow,
	GiBattleAxe,
} from 'react-icons/gi';

const Monster = ({ monster, cardStyle }) => {
	const rollToHit = (modifier) => {
		console.log(Math.floor(Math.random() * 20) + 1 + modifier);
	};

	const rollDamage = ({ damage_die, damage_die_num, damage_modifier }) => {
		console.log(
			Math.floor(Math.random() * damage_die) * damage_die_num +
				damage_modifier
		);
	};

	return (
		<article className={`wrapper ${cardStyle}`}>
			<div className="dmd-card m-3">
				{/* TOP RIGHT CIRCLES */}
				<div className="circle-container d-flex p-2">
					<div className="stat-circle cr-circle">
						{monster.challenge_rating}
					</div>
					<div className="stat-circle race-circle">
						{monster.race_short}
					</div>
					<div className="stat-circle alignment-circle">
						{monster.alignment_short}
					</div>
				</div>

				{/* HEADER */}
				<div className="dmd-card-header">
					<h1 className="name">{monster.name}</h1>
				</div>

				{/* BASE STATS */}
				<div className="dmd-card-row d-flex justify-content-between align-items-center pb-2 border-bottom">
					<div className="d-flex align-items-center">
						<RiHeartFill className="dmd-card-icon hp-icon me-1" />
						<p className="stat-title m-0">
							HP{' '}
							<span>
								{monster.hitpoints} ({monster.hitpoint_dice})
							</span>
						</p>
					</div>
					<div className="d-flex align-items-center">
						<RiShieldFill className="dmd-card-icon ac-icon me-1" />
						<p className="stat-title m-0">
							AC <span>{monster.armor_class}</span>
						</p>
					</div>
					<div className="d-flex align-items-center">
						<FaArrowCircleRight className="dmd-card-icon speed-icon me-1" />
						<p className="stat-title m-0">
							SPD <span>{monster.speed} ft.</span>
						</p>
					</div>
				</div>

				{/* ABILITY SCORES */}
				<div className="dmd-card-row d-flex justify-content-between py-2 text-center border-bottom">
					<div>
						<p className="stat-title m-0">STR</p>
						<p className="stat-num m-0">
							{monster.ability_scores.strength} (
							{Math.floor(
								(monster.ability_scores.strength - 10) / 2
							)}
							)
						</p>
					</div>
					<div>
						<p className="stat-title m-0">DEX</p>
						<p className="stat-num m-0">
							{monster.ability_scores.dexterity} (
							{Math.floor(
								(monster.ability_scores.dexterity - 10) / 2
							)}
							)
						</p>
					</div>
					<div>
						<p className="stat-title m-0">CON</p>
						<p className="stat-num m-0">
							{monster.ability_scores.constitution} (
							{Math.floor(
								(monster.ability_scores.constitution - 10) / 2
							)}
							)
						</p>
					</div>
					<div>
						<p className="stat-title m-0">INT</p>
						<p className="stat-num m-0">
							{monster.ability_scores.intelligence} (
							{Math.floor(
								(monster.ability_scores.intelligence - 10) / 2
							)}
							)
						</p>
					</div>
					<div>
						<p className="stat-title m-0">WIS</p>
						<p className="stat-num m-0">
							{monster.ability_scores.wisdom} (
							{Math.floor(
								(monster.ability_scores.wisdom - 10) / 2
							)}
							)
						</p>
					</div>
					<div>
						<p className="stat-title m-0">CHA</p>
						<p className="stat-num m-0">
							{monster.ability_scores.charisma} (
							{Math.floor(
								(monster.ability_scores.charisma - 10) / 2
							)}
							)
						</p>
					</div>
				</div>

				{/* EXTRA STATS */}
				<div className="dmd-card-row d-flex flex-column py-2 border-bottom">
					{/* Skills */}
					{monster.skills ? (
						<div className="d-flex">
							<span className="stat-title">Skills </span>{' '}
							{monster.skills.map((skill) => (
								<p className="stat-text my-0 ms-1" key={skill}>
									{' '}
									{skill}
								</p>
							))}
						</div>
					) : null}
					{/* Senses */}
					<p className="stat-text m-0">
						<span className="stat-title">Senses</span>{' '}
						{monster.senses[0]}, {monster.senses[1]}
					</p>
					{/* Languages */}
					<p className="stat-text m-0">
						<span className="stat-title">Languages</span>{' '}
						{monster.languages[0]}, {monster.languages[1]}
					</p>
					{/* Proficiency */}
					<p className="stat-text m-0">
						<span className="stat-title">Proficiency Bonus</span> +
						{monster.proficiency_bonus}
					</p>
				</div>

				{/* SPECIAL TRAITS */}
				{monster.special_traits ? (
					<div className="dmd-card-row py-2 border-bottom">
						<p className="ability-text m-0">
							<span className="ability-title">
								{monster.special_traits[0].title}.
							</span>{' '}
							{monster.special_traits[0].description}
						</p>
					</div>
				) : null}

				{/* ACTIONS */}
				<div className="dmd-card-row py-2">
					<h2 className="actions-header">Actions</h2>

					{monster.actions.map((action) => (
						<div
							key={action.weapon}
							className="d-flex justify-content-between align-items-center mb-1"
						>
							<p className="action-title m-0">
								{action.action_type === 'melee' ? (
									<GiBattleAxe />
								) : (
									<GiPocketBow className="ranged-icon me-1" />
								)}{' '}
								{action.weapon}
							</p>
							<div>
								<button
									id="toHitBtn"
									className="action-btn btn btn-outline-secondary btn-sm ms-1"
									onClick={() =>
										rollToHit(action.hit_modifier)
									}
								>
									<GiPointySword /> +{action.hit_modifier}
								</button>
								<button
									id="getDamageBtn"
									className="action-btn btn btn-outline-secondary btn-sm ms-1"
									onClick={() => rollDamage(action)}
								>
									<GiMineExplosion />{' '}
									{action.damage_dice_text}
								</button>
							</div>
						</div>
					))}
				</div>
				{/* INITIATIVE */}
				<div className="initiative-div d-flex justify-content-center align-items-center mb-2">
					{monster.initiative}
				</div>
			</div>
		</article>
	);
};

export default Monster;
