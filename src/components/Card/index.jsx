import React from 'react';
import './card.scss';

import { RiHeartFill } from 'react-icons/ri';
import { RiShieldFill } from 'react-icons/ri';
import { FaArrowCircleRight } from 'react-icons/fa';

const Card = () => {
	return (
		<div className="dmd-card">
			{/* TOP RIGHT CIRCLES */}
			<div className="circle-container d-flex p-2">
				<div className="stat-circle cr-circle">
					<sup>1</sup>/<sub>4</sub>
				</div>
				<div className="stat-circle race-circle">H</div>
				<div className="stat-circle alignment-circle">NE</div>
			</div>

			{/* HEADER */}
			<div className="dmd-card-header">
				<h1 className="name">Gobbo</h1>
			</div>

			{/* STATS 1ST ROW */}
			<div className="dmd-card-row d-flex justify-content-between align-items-center pb-2 border-bottom">
				<div className="d-flex align-items-center">
					<RiHeartFill className="dmd-card-icon hp-icon me-1" />
					<p className="stat-title m-0">
						HP <span>7 (2d6)</span>
					</p>
				</div>
				<div className="d-flex align-items-center">
					<RiShieldFill className="dmd-card-icon ac-icon me-1" />
					<p className="stat-title m-0">
						AC <span>15</span>
					</p>
				</div>
				<div className="d-flex align-items-center">
					<FaArrowCircleRight className="dmd-card-icon speed-icon me-1" />
					<p className="stat-title m-0">
						SPD <span>30 ft.</span>
					</p>
				</div>
			</div>

			{/* STATS 2ND ROW */}
			<div className="dmd-card-row d-flex justify-content-between py-2 text-center border-bottom">
				<div>
					<p className="stat-title m-0">STR</p>
					<p className="stat-num m-0">8 (-1)</p>
				</div>
				<div>
					<p className="stat-title m-0">DEX</p>
					<p className="stat-num m-0">14 (+2)</p>
				</div>
				<div>
					<p className="stat-title m-0">CON</p>
					<p className="stat-num m-0">10 (+0)</p>
				</div>
				<div>
					<p className="stat-title m-0">INT</p>
					<p className="stat-num m-0">10 (+0)</p>
				</div>
				<div>
					<p className="stat-title m-0">WIS</p>
					<p className="stat-num m-0">8 (-1)</p>
				</div>
				<div>
					<p className="stat-title m-0">CHA</p>
					<p className="stat-num m-0">8 (-1)</p>
				</div>
			</div>

			{/* STATS 3RD ROW */}
			<div className="dmd-card-row d-flex flex-column py-2 border-bottom">
				<p className="stat-text m-0">
					<span className="stat-title">Skills</span> Stealth +6
				</p>
				<p className="stat-text m-0">
					<span className="stat-title">Senses</span> Darkvision 60ft.,
					Passive Perception 9
				</p>
				<p className="stat-text m-0">
					<span className="stat-title">Languages</span> Common, Goblin
				</p>
				<p className="stat-text m-0">
					<span className="stat-title">Proficiency Bonus</span> +2
				</p>
			</div>
		</div>
	);
};

export default Card;
