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
	GiTwirlCenter,
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

	// Returns a <p> tag with ability score and calculated modifier
	const AbilityScore = ({ monster, ability, short }) => {
		let score = monster.ability_scores[`${ability}`];
		let modifier = Math.floor((score - 10) / 2);
		return (
			<div>
				<p className="stat-title m-0">{short}</p>
				<p className="stat-num m-0">
					{score} {modifier >= 0 ? `(+${modifier})` : `(${modifier})`}
				</p>
			</div>
		);
	};

	const renderAbilityScores = (monster) => {
		let abilityScores = [];
		let shortName = [
			['strength', 'STR'],
			['dexterity', 'DEX'],
			['constitution', 'CON'],
			['intelligence', 'INT'],
			['wisdom', 'WIS'],
			['charisma', 'CHA'],
		];
		for (let ability in monster.ability_scores) {
			let shortIndex = shortName.findIndex(
				(stat) => stat.indexOf(ability) !== -1
			);

			abilityScores.push(
				<AbilityScore
					key={ability}
					monster={monster}
					ability={ability}
					short={shortName[shortIndex][1]}
				/>
			);
		}
		return <>{abilityScores}</>;
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
						<p
							title={`Walking: ${
								monster.speed.walking
							} ft., Flying: ${monster.speed.flying}, Swimming: ${
								monster.speed.swimming ||
								monster.speed.walking / 2
							} ft.`}
							className="stat-title m-0"
						>
							SPD <span>{monster.speed.walking} ft.</span>
						</p>
					</div>
				</div>

				{/* ABILITY SCORES */}
				<div className="dmd-card-row d-flex justify-content-between py-2 text-center border-bottom">
					{renderAbilityScores(monster)}

					{/* <div>
						<p className="stat-title m-0">STR</p>
						<AbilityScore monster={monster} ability={'strength'} />
					</div>
					<div>
						<p className="stat-title m-0">DEX</p>
						<AbilityScore monster={monster} ability={'dexterity'} />
					</div>
					<div>
						<p className="stat-title m-0">CON</p>
						<AbilityScore
							monster={monster}
							ability={'constitution'}
						/>
					</div>
					<div>
						<p className="stat-title m-0">INT</p>
						<AbilityScore
							monster={monster}
							ability={'intelligence'}
						/>
					</div>
					<div>
						<p className="stat-title m-0">WIS</p>
						<AbilityScore monster={monster} ability={'wisdom'} />
					</div>
					<div>
						<p className="stat-title m-0">CHA</p>
						<AbilityScore monster={monster} ability={'charisma'} />
					</div> */}
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
								) : action.action_type === 'ranged' ? (
									<GiPocketBow className="ranged-icon me-1" />
								) : (
									<GiTwirlCenter />
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
