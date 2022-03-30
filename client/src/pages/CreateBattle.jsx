import React, { useState } from 'react';

import heroes from '../components/Hero/heroData';

const CreateBattle = () => {
	const [selectedHeroes, setSelectedHeroes] = useState([]);

	console.log(selectedHeroes);

	const handleSelect = (character_name) => {
		for (let i = 0; i < heroes.length; i++) {
			if (
				heroes[i].character_name === character_name &&
				!selectedHeroes.includes(heroes[i])
			) {
				setSelectedHeroes([...selectedHeroes, heroes[i]]);
			}
		}
	};

	return (
		<div className="container py-4">
			<h1 className="text-center">Create New Battle</h1>

			<h2 className="mt-5">Select Your Heroes</h2>
			<ul className="list-group">
				{heroes.map((hero) => (
					<li
						key={hero.character_name}
						className="list-group-item d-flex align-items-center justify-content-between"
						onClick={() => handleSelect(hero.character_name)}
					>
						<h3 className="m-0">
							{hero.character_name}{' '}
							<span>({hero.player_name})</span>
						</h3>

						<div>
							<p className="m-0">
								{hero.race} {hero.class} - Level {hero.level}
							</p>
						</div>
					</li>
				))}
			</ul>

			<button className="btn btn-primary mt-3 disabled">
				Add New Hero
			</button>

			<ul>
				{selectedHeroes.map((hero) => (
					<li key={hero.character_name}>{hero.character_name}</li>
				))}
			</ul>
		</div>
	);
};

export default CreateBattle;
