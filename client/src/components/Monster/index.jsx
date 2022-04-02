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

const Monster = ({ monster, cardStyle, handleRollToHit }) => {
	// Temporary damage functionality in console
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

	// Returns a <div> with the title of the stat and a description
	const Stat = ({ title, property, connector = ', ' }) => {
		return (
			<div className="d-flex flex-wrap">
				<p className="stat-text my-0">
					<span className="stat-title">{title}</span>{' '}
					{monster[property].join(connector)}
				</p>
			</div>
		);
	};

	// Returns a <div> with any abilities a monster may have
	const Trait = ({ title, description }) => {
		return (
			<div className="dmd-card-row py-1">
				<p className="ability-text m-0">
					<span className="ability-title">{title}.</span>{' '}
					{description}
				</p>
			</div>
		);
	};

	// Handles all stats within a monsters object
	const renderStats = (monster) => {
		return (
			<>
				{monster.skills ? (
					<Stat title={'Skills'} property={'skills'} />
				) : null}
				{monster.damage_resistances ? (
					<Stat
						title={'Damage Resistances'}
						property={'damage_resistances'}
						connector={'; '}
					/>
				) : null}
				{monster.damage_immunities ? (
					<Stat
						title={'Damage Immunities'}
						property={'damage_immunities'}
					/>
				) : null}
				{monster.condition_immunities ? (
					<Stat
						title={'Condition Immunities'}
						property={'condition_immunities'}
					/>
				) : null}
				{monster.senses ? (
					<Stat title={'Senses'} property={'senses'} />
				) : null}
				{monster.languages ? (
					<Stat title={'Languages'} property={'languages'} />
				) : null}
				{monster.proficiency_bones > 0 ? (
					<p className="stat-text m-0">
						<span className="stat-title">Proficiency Bonus</span> +
						{monster.proficiency_bonus}
					</p>
				) : null}
			</>
		);
	};

	// Renders all ability scores
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
					<div
						className="stat-circle cr-circle"
						title={`Challenge Rating: ${monster.challenge_rating}`}
					>
						{monster.challenge_rating}
					</div>
					<div
						className="stat-circle race-circle"
						title={monster.race}
					>
						{monster.race_short}
					</div>
					<div
						className="stat-circle alignment-circle"
						title={monster.alignment}
					>
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
				</div>
				{/* STATS */}
				<div className="dmd-card-row dmd-card-stats my-1">
					{renderStats(monster)}
				</div>
				<hr />
				{/* SPECIAL TRAITS */}
				<div className="dmd-card-traits my-1">
					{monster.special_traits
						? monster.special_traits.map(
								({ title, description }) => (
									<Trait
										key={title}
										title={title}
										description={description}
									/>
								)
						  )
						: null}
				</div>
				{/* ACTIONS */}
				<div className="dmd-card-row py-2 border-top">
					<h2 className="actions-header">Actions</h2>

					{monster.actions.map((action) => (
						<div
							key={action.weapon}
							className="d-flex justify-content-between align-items-center mb-2"
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
								{action.action_type === 'melee' ||
								action.action_type === 'ranged' ? (
									<>
										<button
											id="toHitBtn"
											className="action-btn btn btn-outline-secondary btn-sm ms-1"
											onClick={() => {
												handleRollToHit(
													action.hit_modifier
												);
											}}
										>
											<GiPointySword /> +
											{action.hit_modifier}
										</button>
										<button
											id="getDamageBtn"
											className="action-btn btn btn-outline-secondary btn-sm ms-1"
											onClick={() => rollDamage(action)}
										>
											<GiMineExplosion />{' '}
											{action.damage_dice_text}
										</button>
									</>
								) : (
									<button
										id="addEffectBtn"
										className="action-btn btn btn-outline-secondary btn-sm ms-1"
										onClick={() =>
											handleRollToHit(action.hit_modifier)
										}
									>
										<GiTwirlCenter /> Add Effect
									</button>
								)}
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
