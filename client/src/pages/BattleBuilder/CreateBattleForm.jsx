import { Form, Container, Row, Col } from 'react-bootstrap';
import useFetchMonsters from '../../hooks/useFetchMonsters';
import { getXp } from '../../utils/basicRuleCalculations';
import { Link } from 'react-router-dom';

import './battleBuilder.scss';

const CreateBattleForm = ({
	setBattleName,
	heroes,
	currentHeroes,
	handleSelectHero,
	handleSelectMonster,
	handleRemoveHero,
}) => {
	// The data from the open5e API call
	const { monsterData, setMonsterData } = useFetchMonsters();

	return (
		<div className="m-md-4 container">
			{/* battle name */}
			<Form className="battle-form">
				<Form.Group>
					<Form.Control
						type="text"
						className="form-control battle-name-input"
						placeholder="Name your battle..."
						maxLength={25}
						onChange={(e) => setBattleName(e.target.value.trim())}
					/>
					<Form.Text>25 characters max.</Form.Text>
				</Form.Group>
			</Form>

			{/* hero table */}
			<h2 className="mt-3">Heroes</h2>
			<Container className="creature-grid">
				<Row>
					<Col lg={6} md={7} xs={5} className="grid-header">
						{' '}
						Hero
					</Col>
					<Col md={3} s={4} xs={3} className="grid-header">
						Race/Class
					</Col>
					<Col md="auto" xs={1} className="grid-header">
						Level
					</Col>
					<Col md={1} xs="auto"></Col>
				</Row>
				{heroes.map((hero, index) => (
					<Row
						key={hero._id}
						className={
							currentHeroes.includes(hero)
								? 'creature-row mb-1 py-2 d-flex align-items-center selected'
								: 'creature-row mb-1 py-2 d-flex align-items-center'
						}
					>
						<Col xl={6} lg={6} md={7} xs={5} className="border-end">
							<h3 className="row-title">
								{hero.character_name}{' '}
							</h3>
							<p className="row-subtitle">{hero.player_name}</p>
						</Col>
						<Col md={3} s={4} xs={3} className="border-end">
							<p className="row-text">
								{hero.race} {hero.class}
							</p>
						</Col>
						<Col lg={1} md="auto" xs={1}>
							<p className="text-center row-text">{hero.level}</p>
						</Col>
						<Col xs="auto" className="ms-auto">
							{!currentHeroes.includes(hero) ? (
								<button
									type="button"
									className="btn btn-outline-secondary btn-sm m-0"
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
						</Col>
					</Row>
				))}

				<Row className="add-row mb-1 py-2 d-flex align-items-center text-center">
					<Link to={'/character-builder'}>+ Add New Hero</Link>
				</Row>
			</Container>

			{/* monsters */}
			<h2 className="mt-4">Monsters</h2>
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

			{monsterData.results?.results && (
				<Container className="mt-2 creature-grid">
					<Row>
						<Col
							lg={8}
							md={9}
							sm={8}
							xs={6}
							className="grid-header"
						>
							{' '}
							Monster
						</Col>
						<Col
							lg={1}
							md="auto"
							sm={1}
							xs={2}
							className="text-center grid-header"
						>
							CR
						</Col>
						<Col
							lg={1}
							md="auto"
							xs={1}
							className="text-center grid-header"
						>
							XP
						</Col>
						<Col xs="auto"></Col>
					</Row>

					{monsterData.results.results.map((monster) => (
						<Row
							key={monster.slug}
							className="creature-row mb-1 py-2 d-flex align-items-center"
						>
							<Col
								lg={8}
								md={9}
								sm={8}
								xs={6}
								className="border-end"
							>
								<div>
									<h3 className="row-title">
										{monster.name}{' '}
									</h3>
									<p className="row-subtitle">
										{monster.size} {monster.type}
									</p>
								</div>
							</Col>
							<Col
								lg={1}
								md="auto"
								sm={1}
								xs={2}
								className="border-end"
							>
								<p className="text-center row-text">
									{monster.challenge_rating}
								</p>
							</Col>
							<Col lg={1} md="auto" xs={1}>
								<p className="text-center row-text">
									{getXp(monster)}
								</p>
							</Col>
							<Col xs="auto" className="ms-auto pe-2">
								<button
									type="button"
									className="btn btn-outline-secondary btn-sm m-0"
									onClick={() => handleSelectMonster(monster)}
								>
									ADD
								</button>
							</Col>
						</Row>
					))}
				</Container>
			)}
		</div>
	);
};

export default CreateBattleForm;
