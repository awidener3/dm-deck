import {
	Form,
	FormGroup,
	FormText,
	FormControl,
	FormLabel,
	Container,
	Row,
	Col,
	Table,
} from 'react-bootstrap';
import { getXp } from '../../utils/basicRuleCalculations';
import { Link } from 'react-router-dom';

import './battleBuilder.scss';
import { useState } from 'react';

const CreateBattleForm = ({
	setBattleName,
	battleName,
	heroes,
	selectedHeroes,
	monsters,
	handleSelectHero,
	handleSelectMonster,
	handleRemoveHero,
}) => {
	const [monsterSearchInput, setMonsterSearchInput] = useState('');

	const handleMonsterSearchChange = (e) => {
		setMonsterSearchInput(e.target.value);
	};

	return (
		<div className="m-md-4 container">
			{/* Battle name */}
			<Form className="battle-form">
				<FormGroup>
					<FormLabel>Encounter Name</FormLabel>
					<FormControl
						type="text"
						className="form-control battle-name-input"
						placeholder="Name your encounter..."
						maxLength={25}
						value={battleName}
						onChange={(e) => setBattleName(e.target.value.trim())}
					/>
					<FormText>25 characters max.</FormText>
				</FormGroup>
			</Form>

			{/* Hero table */}
			<section className="hero-table-header">
				<FormLabel className="mt-2">Hero Select</FormLabel>
				<Link
					to={'/character-builder'}
					className="add-character-btn btn btn-success"
				>
					+ Create New Character
				</Link>
			</section>

			<HeroTable
				heroes={heroes}
				selectedHeroes={selectedHeroes}
				handleSelectHero={handleSelectHero}
				handleRemoveHero={handleRemoveHero}
			/>

			{/* Monsters */}
			<FormLabel className="mt-2">Monster Select</FormLabel>
			<FormGroup>
				<FormControl
					type="text"
					placeholder="Search for a monster"
					className="form-control monster-search-input"
					onChange={handleMonsterSearchChange}
					value={monsterSearchInput}
				/>
			</FormGroup>

			<MonsterTable
				monsters={monsters}
				monsterSearchInput={monsterSearchInput}
				handleSelectMonster={handleSelectMonster}
			/>
		</div>
	);
};

const HeroTable = ({
	heroes,
	selectedHeroes,
	handleSelectHero,
	handleRemoveHero,
}) => {
	return (
		<Table className="table heroes">
			<thead>
				<tr>
					<th>Name</th>
					<th>Player</th>
					<th>Race / Class</th>
					<th>Level</th>
					<th>Add</th>
				</tr>
			</thead>

			{/* Map through heroes and add a row to the table */}
			<tbody>
				{heroes.map((hero) => (
					<tr
						key={hero._id}
						className={
							selectedHeroes.some((h) => h._id === hero._id)
								? 'selected'
								: ''
						}
					>
						<td>{hero.character_name}</td>
						<td>{hero.player_name}</td>
						<td>
							{hero.race} / {hero.class}
						</td>
						<td>{hero.level}</td>
						<td xs="auto" className="ms-auto">
							{!selectedHeroes.some((h) => h._id === hero._id) ? (
								<button
									type="button"
									className="btn btn-outline-success btn-sm m-0"
									onClick={() => handleSelectHero(hero._id)}
								>
									ADD
								</button>
							) : (
								<button
									type="button"
									className="btn btn-outline-danger btn-sm m-0"
									onClick={() => handleRemoveHero(hero)}
								>
									DEL
								</button>
							)}
						</td>
					</tr>
				))}
			</tbody>
		</Table>
	);
};

const MonsterTable = ({
	monsters,
	monsterSearchInput,
	handleSelectMonster,
}) => {
	const filteredMonsters = monsters.filter((monster) => {
		if (monsterSearchInput === '') {
			return monster;
		} else {
			return monster.name
				.toLowerCase()
				.match(monsterSearchInput.toLowerCase());
		}
	});

	return (
		<Table className="table monsters">
			<thead>
				<tr>
					<th>Monster</th>
					<th>Size / Type</th>
					<th>Source</th>
					<th>CR</th>
					<th>XP</th>
					<th>Add</th>
				</tr>
			</thead>
			<tbody>
				{filteredMonsters.map((monster) => (
					<tr key={monster._id}>
						<td>{monster.name}</td>
						<td>
							{monster.size} / {monster.type}{' '}
							{monster.subtype && `(${monster.subtype})`}
						</td>
						<td>{monster.source}</td>
						<td>{monster.challenge_rating}</td>
						<td>{getXp(monster)}</td>
						<td>
							<button
								type="button"
								className="btn btn-outline-success btn-sm m-0"
								onClick={() => handleSelectMonster(monster)}
							>
								ADD
							</button>
						</td>
					</tr>
				))}
			</tbody>
		</Table>
	);
};

export default CreateBattleForm;
