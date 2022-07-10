// import { useEffect, useState } from 'react';
import './monster.scss';
import Conditions from './Conditions';
import Circles from './Circles';
import Stats from './Stats';
import Traits from './Traits';
import Actions from './Actions';
import BaseStats from './BaseStats';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { FaSkull } from 'react-icons/fa';
// import { GiConcentrationOrb } from 'react-icons/gi';
import AbilityScores from './AbilityScores';
import { Button } from 'react-bootstrap';

const Monster = ({
	monster,
	cardStyle,
	handleRollDice,
	handleShowInfo,
	handleSetHp,
	battleOrder,
	setbattleOrder,
	handlePointerEvent,
}) => {
	return (
		<article className={`wrapper ${cardStyle}`}>
			<div
				className={
					monster.hit_points === 0
						? 'card monster-card m-3 dead'
						: 'card monster-card m-3'
				}
				onMouseDown={handlePointerEvent}
				onTouchStart={handlePointerEvent}
			>
				{monster.hit_points === 0 && (
					<div className="dead-screen">
						<FaSkull className="dead-icon" />
						<Button
							variant="outline"
							className="card-btn reset-dead"
							onClick={() => handleSetHp(monster, 1)}
						>
							Revive
						</Button>
					</div>
				)}
				<Conditions
					monster={monster}
					battleOrder={battleOrder}
					setbattleOrder={setbattleOrder}
				/>
				<Circles monster={monster} />

				{/* HEADER */}
				<div className="monster-card-header mt-3">
					<h1 className="name">
						{monster.name}{' '}
						{/* {isConcentrating === true ? (
							<GiConcentrationOrb
								size={'1.5rem'}
								title="concentrating"
							/>
						) : null} */}
					</h1>
				</div>

				<BaseStats monster={monster} />
				<AbilityScores monster={monster} />
				<Stats monster={monster} />
				{monster.special_abilities[0].name !== null ? (
					<Traits monster={monster} />
				) : null}

				{/* ACTIONS */}
				<div className="dmd-card-row py-2">
					<h2 className="actions-header">
						Actions{' '}
						<AiOutlineInfoCircle
							onClick={() => {
								handleShowInfo(monster);
							}}
						/>
					</h2>
					<Actions
						monster={monster}
						handleRollDice={handleRollDice}
						battleOrder={battleOrder}
						setbattleOrder={setbattleOrder}
					/>
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
