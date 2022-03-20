import React from 'react';
import './card.scss';

import { RiHeartFill } from 'react-icons/ri';
import { RiShieldFill } from 'react-icons/ri';
import { FaArrowCircleRight } from 'react-icons/fa';
import { GiMineExplosion } from 'react-icons/gi';
import { GiPointySword } from 'react-icons/gi';
import { GiPocketBow } from 'react-icons/gi';
import { GiBattleAxe } from 'react-icons/gi';

import monsters from './cardData';

const Card = () => {
	console.log(monsters[0]);
	return (
		<div className="dmd-card">
			{/* TOP RIGHT CIRCLES */}
			<div className="circle-container d-flex p-2">
				<div className="stat-circle cr-circle">
					{monsters[0].challenge_rating}
				</div>
				<div className="stat-circle race-circle">
					{monsters[0].race_short}
				</div>
				<div className="stat-circle alignment-circle">
					{monsters[0].alignment_short}
				</div>
			</div>

			{/* HEADER */}
			<div className="dmd-card-header">
				<h1 className="name">{monsters[0].name}</h1>
			</div>

			{/* BASE STATS */}
			<div className="dmd-card-row d-flex justify-content-between align-items-center pb-2 border-bottom">
				<div className="d-flex align-items-center">
					<RiHeartFill className="dmd-card-icon hp-icon me-1" />
					<p className="stat-title m-0">
						HP{' '}
						<span>
							{monsters[0].hitpoints} ({monsters[0].hitpoint_dice}
							)
						</span>
					</p>
				</div>
				<div className="d-flex align-items-center">
					<RiShieldFill className="dmd-card-icon ac-icon me-1" />
					<p className="stat-title m-0">
						AC <span>{monsters[0].armor_class}</span>
					</p>
				</div>
				<div className="d-flex align-items-center">
					<FaArrowCircleRight className="dmd-card-icon speed-icon me-1" />
					<p className="stat-title m-0">
						SPD <span>{monsters[0].speed} ft.</span>
					</p>
				</div>
			</div>

			{/* ABILITY SCORES */}
			<div className="dmd-card-row d-flex justify-content-between py-2 text-center border-bottom">
				<div>
					<p className="stat-title m-0">STR</p>
					<p className="stat-num m-0">
						{monsters[0].ability_scores.strength} (
						{Math.floor(
							(monsters[0].ability_scores.strength - 10) / 2
						)}
						)
					</p>
				</div>
				<div>
					<p className="stat-title m-0">DEX</p>
					<p className="stat-num m-0">
						{monsters[0].ability_scores.dexterity} (
						{Math.floor(
							(monsters[0].ability_scores.dexterity - 10) / 2
						)}
						)
					</p>
				</div>
				<div>
					<p className="stat-title m-0">CON</p>
					<p className="stat-num m-0">
						{monsters[0].ability_scores.constitution} (
						{Math.floor(
							(monsters[0].ability_scores.constitution - 10) / 2
						)}
						)
					</p>
				</div>
				<div>
					<p className="stat-title m-0">INT</p>
					<p className="stat-num m-0">
						{monsters[0].ability_scores.intelligence} (
						{Math.floor(
							(monsters[0].ability_scores.intelligence - 10) / 2
						)}
						)
					</p>
				</div>
				<div>
					<p className="stat-title m-0">WIS</p>
					<p className="stat-num m-0">
						{monsters[0].ability_scores.wisdom} (
						{Math.floor(
							(monsters[0].ability_scores.wisdom - 10) / 2
						)}
						)
					</p>
				</div>
				<div>
					<p className="stat-title m-0">CHA</p>
					<p className="stat-num m-0">
						{monsters[0].ability_scores.charisma} (
						{Math.floor(
							(monsters[0].ability_scores.charisma - 10) / 2
						)}
						)
					</p>
				</div>
			</div>

			{/* EXTRA STATS */}
			<div className="dmd-card-row d-flex flex-column py-2 border-bottom">
				<p className="stat-text m-0">
					<span className="stat-title">Skills</span>{' '}
					{monsters[0].skills[0]}
				</p>
				<p className="stat-text m-0">
					<span className="stat-title">Senses</span>
					{monsters[0].senses[0]}, {monsters[0].senses[1]}
				</p>
				<p className="stat-text m-0">
					<span className="stat-title">Languages</span>{' '}
					{monsters[0].languages[0]}, {monsters[0].languages[1]}
				</p>
				<p className="stat-text m-0">
					<span className="stat-title">Proficiency Bonus</span> +
					{monsters[0].proficiency_bonus}
				</p>
			</div>

			{/* SPECIAL TRAITS */}
			<div className="dmd-card-row py-2 border-bottom">
				<p className="ability-text m-0">
					<span className="ability-title">
						{monsters[0].special_traits[0].title}.
					</span>{' '}
					{monsters[0].special_traits[0].description}
				</p>
			</div>

			{/* ACTIONS */}
			<div className="dmd-card-row py-2">
				<h2 className="actions-header">Actions</h2>
				{/* Action 1 */}
				<div className="d-flex justify-content-between align-items-center mb-1">
					<p className="action-title m-0">
						<GiBattleAxe /> {monsters[0].actions[0].weapon}
					</p>
					<div>
						<button
							id="toHitBtn"
							className="action-btn btn btn-outline-secondary btn-sm ms-1"
						>
							<GiPointySword /> +
							{monsters[0].actions[0].hit_modifier}
						</button>
						<button
							id="getDamageBtn"
							className="action-btn btn btn-outline-secondary btn-sm ms-1"
						>
							<GiMineExplosion />{' '}
							{monsters[0].actions[0].damage_dice}
						</button>
					</div>
				</div>
				{/* Action 2 */}
				<div className="d-flex justify-content-between align-items-center mb-1">
					<p className="action-title m-0">
						<GiPocketBow className="ranged-icon me-1" />
						{monsters[0].actions[1].weapon}
					</p>
					<div>
						<button
							id="toHitBtn"
							className="action-btn btn btn-outline-secondary btn-sm ms-1"
						>
							<GiPointySword /> +
							{monsters[0].actions[1].hit_modifier}
						</button>
						<button
							id="getDamageBtn"
							className="action-btn btn btn-outline-secondary btn-sm ms-1"
						>
							<GiMineExplosion />{' '}
							{monsters[0].actions[1].damage_dice}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Card;
