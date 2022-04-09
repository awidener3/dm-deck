import React, { useEffect, useState } from 'react';
import './monster.scss';
import Conditions from './Conditions';
import Circles from './Circles';
import Stats from './Stats';
import Traits from './Traits';
import Actions from './Actions';
import BaseStats from './BaseStats';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { GiConcentrationOrb } from 'react-icons/gi';
import AbilityScores from './AbilityScores';

const Monster = ({ monster, cardStyle, handleRollDice, handleShowInfo }) => {
	const [condition, setCondition] = useState(monster.conditions);
	const [isConcentrating, setIsConcentrating] = useState(false);

	useEffect(() => {
		setCondition(monster.conditions);
	}, [monster.conditions]);

	return (
		<article className={`wrapper ${cardStyle}`}>
			<div className="dmd-card m-3">
				<Conditions conditions={condition} />
				<Circles monster={monster} />

				{/* HEADER */}
				<div className="dmd-card-header mt-3">
					<h1 className="name">
						{monster.name}{' '}
						{isConcentrating === true ? (
							<GiConcentrationOrb
								size={'1.5rem'}
								title="concentrating"
							/>
						) : null}
					</h1>
				</div>

				<BaseStats monster={monster} />
				<AbilityScores monster={monster} />
				<Stats monster={monster} />
				<Traits monster={monster} />

				{/* ACTIONS */}
				<div className="dmd-card-row py-2 border-top">
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
						conditions={condition}
						setConditions={setCondition}
						isConcentrating={isConcentrating}
						setIsConcentrating={setIsConcentrating}
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
