// import React, { useEffect, useState } from 'react';
import './monster.scss';
import Conditions from './Conditions';
import Circles from './Circles';
import Stats from './Stats';
import Traits from './Traits';
import Actions from './Actions';
import BaseStats from './BaseStats';
import { AiOutlineInfoCircle } from 'react-icons/ai';
// import { GiConcentrationOrb } from 'react-icons/gi';
import AbilityScores from './AbilityScores';

const Monster = ({
	monster,
	cardStyle,
	handleRollDice,
	handleShowInfo,
	sortedData,
	setSortedData,
}) => {
	return (
		<article className={`wrapper ${cardStyle}`}>
			<div className="monster-card m-3">
				<Conditions
					monster={monster}
					sortedData={sortedData}
					setSortedData={setSortedData}
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
				{monster.special_abilities !== '' ? (
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
						sortedData={sortedData}
						setSortedData={setSortedData}
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