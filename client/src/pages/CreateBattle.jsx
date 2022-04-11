import React, { useState } from 'react';

import heroes from '../components/Hero/heroData';
import monsters from '../components/Monster/monsterData';

import useFetchMonsters from '../hooks/useFetchMonsters';

const CreateBattle = () => {
	const [selectedHeroes, setSelectedHeroes] = useState([]);
	const { monsterData, setMonsterData } = useFetchMonsters();
	const [selectedMonsters, setSelectedMonsters] = useState([]);
	const [difficultyRating, setDifficultyRating] = useState('Easy');

	const handleHeroSelect = (character_name) => {
		heroes.forEach((hero) => {
			if (
				hero.character_name === character_name &&
				!selectedHeroes.includes(hero)
			)
				setSelectedHeroes([...selectedHeroes, hero]);
		});
	};

	// const handleMonsterSelect = (name) => {
	// 	console.log(name);
	// 	monsters.forEach((monster) => {
	// 		if (monster.name === name && !selectedMonsters.includes(monster))
	// 			setSelectedMonsters([...selectedMonsters, monster]);
	// 	});
	// 	console.log(selectedMonsters);
	// };

	return (
		<div className="container py-4">
			<h1 className="text-center">Create New Battle</h1>

			<h2 className="mt-5">Select Your Heroes</h2>
			<ul className="list-group">
				{heroes.map((hero) => (
					<li
						key={hero.character_name}
						className="list-group-item d-flex align-items-center justify-content-between"
						onClick={() => handleHeroSelect(hero.character_name)}
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

			<h2 className="mt-5">Select Your Monsters</h2>
			<input
				type="text"
				placeholder="Search for a monster"
				value={monsterData.slug}
				onChange={(e) =>
					setMonsterData({ ...monsterData, slug: e.target.value })
				}
			/>

			{monsterData.results.results &&
			monsterData.results.results.length > 0 ? (
				<ul>
					{monsterData.results.results.map((item) => (
						<li key={item.name}>{item.name}</li>
					))}
				</ul>
			) : null}

			<button className="btn btn-primary mt-3 disabled">
				Add Custom Monster
			</button>

			<hr />

			<div className="card text-center m-auto p-4 w-50">
				<p className="lead m-0">Difficulty Rating</p>
				{difficultyRating}
			</div>

			<div className="d-flex justify-content-around">
				<article className="card mt-4 me-2 p-3 w-100">
					<h2 className="text-center">Hero Roster</h2>
					<hr />
					<ul>
						{selectedHeroes.map((hero) => (
							<li key={hero.character_name}>
								{hero.character_name}
							</li>
						))}
					</ul>
				</article>

				<article className="card mt-4 ms-2 p-3 w-100">
					<h2 className="text-center">Monster Roster</h2>
					<hr />

					<ul>
						{selectedMonsters.map((monster) => (
							<li key={monster.name}>{monster.name}</li>
						))}
					</ul>
				</article>
			</div>
		</div>
	);
};

export default CreateBattle;
