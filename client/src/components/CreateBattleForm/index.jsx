import { Form, Container, Row, Col } from 'react-bootstrap';
import useFetchMonsters from '../../hooks/useFetchMonsters';
import heroes from '../Hero/heroData';
import { getXp } from '../../utils/basicRuleCalculations';

const CreateBattleForm = ({
	setBattleName,
	selectedHeroes,
	setSelectedHeroes,
	selectedMonsters,
	setSelectedMonsters,
}) => {
	// The data from the open5e API call
	const { monsterData, setMonsterData } = useFetchMonsters();

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

	return (
		<div className="m-4">
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
					<Col lg={6} md={7} xs={5} className="grid-header">
						{' '}
						Hero
					</Col>
					<Col md={3} xs={4} className="grid-header">
						Race/Class
					</Col>
					<Col md="auto" xs={1} className="grid-header">
						Level
					</Col>
					<Col md={1} xs="auto"></Col>
				</Row>
				{heroes.map((hero) => (
					<Row
						key={hero.character_name}
						className="creature-row mb-1 py-2 d-flex align-items-center"
					>
						<Col xl={6} lg={6} md={7} xs={5} className="border-end">
							<h3 className="m-0 row-title">
								{hero.character_name}{' '}
							</h3>
							<p className="m-0 row-subtitle">
								{hero.player_name}
							</p>
						</Col>
						<Col md={3} xs={4} className="border-end">
							<p className="m-0">
								{hero.race} {hero.class}
							</p>
						</Col>
						<Col lg={1} md="auto" xs={1}>
							<p className="m-0 text-center">{hero.level}</p>
						</Col>
						<Col xs="auto" className="ms-auto">
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
		</div>
	);
};

export default CreateBattleForm;
