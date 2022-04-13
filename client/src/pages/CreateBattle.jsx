import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Form, Container, Row, Col } from 'react-bootstrap';
import { getXp } from '../utils/basicRuleCalculations';

import '../App.scss';

import heroes from '../components/Hero/heroData';
import useFetchMonsters from '../hooks/useFetchMonsters';

const CreateBattle = () => {
	// The selections that will be used in a battle
	const [battleName, setBattleName] = useState('');
	const [selectedHeroes, setSelectedHeroes] = useState([]);
	const [selectedMonsters, setSelectedMonsters] = useState([]);
	// The data from the open5e API call
	const { monsterData, setMonsterData } = useFetchMonsters();

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

	const handleMonsterSelect = (data) => {
		let updatedArray = [...selectedMonsters, data];
		setSelectedMonsters(updatedArray);
	};

	const handleSave = () => {
		let existingBattles = JSON.parse(
			localStorage.getItem('dm-deck-battles')
		);

		if (existingBattles === null) existingBattles = [];

		let battleData = {
			name: battleName,
			heroes: selectedHeroes,
			monsters: selectedMonsters,
		};

		let updatedArray = [battleData, ...existingBattles];

		localStorage.setItem('dm-deck-battles', JSON.stringify(updatedArray));
	};

	return (
		<div className="container py-4">
			<h1 className="text-center">Create New Battle</h1>

			<Form className="battle-form">
				<Form.Group>
					<Form.Control
						type="text"
						className="form-control battle-name-input"
						placeholder="Name your battle"
						maxLength={20}
						onChange={(e) => setBattleName(e.target.value.trim())}
					/>
					<Form.Text>20 characters max.</Form.Text>
				</Form.Group>
			</Form>

			<h2 className="mt-3">Select Heroes</h2>
			<Container className="creature-grid">
				<Row>
					<Col md={8} xs={5} className="grid-header">
						{' '}
						Hero
					</Col>
					<Col md={2} xs={4} className="grid-header">
						Race/Class
					</Col>
					<Col md={1} xs={1} className="text-center grid-header">
						Level
					</Col>
					<Col md={1} xs="auto"></Col>
				</Row>
				{heroes.map((hero) => (
					<Row
						key={hero.character_name}
						className="creature-row mb-1 py-2 d-flex align-items-center"
					>
						<Col md={8} xs={5} className="border-end">
							<div>
								<h3 className="m-0 row-title">
									{hero.character_name}{' '}
								</h3>
								<p className="m-0 row-subtitle">
									{hero.player_name}
								</p>
							</div>
						</Col>
						<Col md={2} xs={4} className="border-end">
							<p className="m-0 me-2">
								{hero.race} {hero.class}
							</p>
						</Col>
						<Col md={1} xs={1}>
							<p className="m-0 text-center">{hero.level}</p>
						</Col>
						<Col md={1} xs="auto">
							<button
								type="button"
								className="btn btn-outline-secondary btn-sm m-0"
								onClick={() =>
									handleHeroSelect(hero.character_name)
								}
							>
								ADD
							</button>
						</Col>
					</Row>
				))}
			</Container>

			<button className="btn btn-primary mt-3 disabled">
				Add New Hero
			</button>

			{/* MONSTER SEARCH */}
			<h2 className="mt-4">Select Monsters</h2>
			<Form.Group>
				<Form.Control
					type="text"
					placeholder="Search for a monster"
					className="form-control monster-search-input"
					value={monsterData.slug}
					onChange={(e) =>
						setMonsterData({ ...monsterData, slug: e.target.value })
					}
				/>
				<Form.Text>
					Only shows 10 results. If your search does not return your
					monster, try being specific (i.e. Adult Green Dragon)
				</Form.Text>
			</Form.Group>

			{monsterData.results.results &&
			monsterData.results.results.length > 0 ? (
				<Container className="mt-2 creature-grid">
					<Row>
						<Col md={9} xs={8} className="grid-header">
							{' '}
							Monster
						</Col>
						<Col md={1} xs={1} className="text-center grid-header">
							CR
						</Col>
						<Col md={1} xs={1} className="text-center grid-header">
							XP
						</Col>
						<Col md={1} xs={1}></Col>
					</Row>

					{monsterData.results.results.map((monster) => (
						<Row
							key={monster.slug}
							className="creature-row mb-1 py-2 d-flex align-items-center"
						>
							<Col md={9} xs={8} className="border-end">
								<div>
									<h3 className="m-0 row-title">
										{monster.name}{' '}
									</h3>
									<p className="m-0 row-subtitle">
										{monster.size} {monster.type}
									</p>
								</div>
							</Col>
							<Col md={1} xs={1} className="border-end">
								<p className="m-0 text-center">
									{monster.challenge_rating}
								</p>
							</Col>
							<Col md={1} xs={1}>
								<p className="m-0 text-center">
									{getXp(monster)}
								</p>
							</Col>
							<Col md={1} xs="auto">
								<button
									type="button"
									className="btn btn-outline-secondary btn-sm m-0"
									onClick={() => handleMonsterSelect(monster)}
								>
									ADD
								</button>
							</Col>
						</Row>
					))}
				</Container>
			) : null}

			<button className="btn btn-primary mt-3 disabled">
				Add Custom Monster
			</button>

			<hr />

			{/* RESULTS AND SUMMARY */}

			<h2 className="text-center">{battleName || 'New Battle'}</h2>

			<div className="card text-center m-auto p-4 w-50">
				<p className="lead m-0">Difficulty Rating</p>
				{difficultyRating}
			</div>

			<div className="d-flex justify-content-around">
				<article className="card mt-4 me-2 p-3 w-100">
					<h2 className="text-center">Hero Roster</h2>
					<hr />
					<div>
						{selectedHeroes.map((hero) => (
							<div
								key={hero.character_name}
								className="roster-creature-name"
							>
								{hero.character_name}
							</div>
						))}
					</div>
				</article>

				<article className="card mt-4 ms-2 p-3 w-100">
					<h2 className="text-center">Monster Roster</h2>
					<hr />

					<div>
						{selectedMonsters.map((monster, index) => (
							<div key={index} className="roster-creature-name">
								{monster.name}
							</div>
						))}
					</div>
				</article>
			</div>
			<div className="container d-flex justify-content-center">
				<Link
					to="/battles"
					className="btn btn-primary mt-3"
					onClick={handleSave}
				>
					Save
				</Link>
			</div>
		</div>
	);
};

export default CreateBattle;
