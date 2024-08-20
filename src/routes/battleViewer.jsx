import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import sampleBattles from '../../data/sample_data/sample_battles.json';
import srdMonsters from '../../data/srd_monsters.json';

export default function BattleViewer() {
	let { battleId } = useParams();
	const [battle, setBattle] = useState([]);
	const [enemies, setEnemies] = useState([]);
	const [index, setIndex] = useState(0);

	useEffect(() => {
		// get data
		const data = sampleBattles.find((battle) => battle.id === battleId);

		if (data) {
			setBattle(data);

			if (data.enemies.length) {
				const enemies = [];

				for (const enemy of data.enemies) {
					const enemyData = srdMonsters.monsters.find(
						(data) => data.id === enemy.id
					);
					if (enemyData) {
						const copy = JSON.parse(JSON.stringify(enemyData));
						copy.current_hit_points = enemy.current_hit_points;

						enemies.push(copy);
					}
				}

				if (enemies.length) {
					setEnemies(enemies);
				}
			}
		}
	}, [setBattle, setEnemies]);

	const handleChangeCard = (amount) => {
		let newIndex = index + amount;
		if (newIndex < 0) {
			newIndex = enemies.length - 1;
		}

		if (newIndex === enemies.length) {
			newIndex = 0;
		}

		setIndex(newIndex);
	};

	return (
		<>
			<p>Battle viewer stuff goes here, this is "{battle.title}"</p>

			<p>
				{index + 1} / {enemies.length}
			</p>

			<section id="cardContent">
				{enemies.length && <Card data={enemies[index]} />}
			</section>

			<menu id="cardNavigation">
				<li>
					<button onClick={() => handleChangeCard(-1)}>Back</button>
				</li>
				<li>
					<button onClick={() => handleChangeCard(1)}>Next</button>
				</li>
			</menu>
		</>
	);
}

function Card({ data }) {
	const [cardData, setCardData] = useState(data);

	useEffect(() => {
		setCardData(data);
	}, [data, setCardData]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setCardData({ ...cardData, [name]: value });
	};

	const getModifier = (value) => {
		return `(${Math.floor((value - 10) / 2) > 0 ? '+' : ''}${Math.floor(
			(value - 10) / 2
		)})`;
	};

	const getDamageBonus = (value) => {
		if (value >= 0) {
			return `+ ${value.toString()}`;
		} else {
			const numWithoutMinus = value.toString().slice(1);
			return `- ${numWithoutMinus}`;
		}
	};
	console.log(cardData);

	return (
		<>
			<article className="card">
				<header className="card-header">
					<span className="card-armor-class">{cardData.armor_class}</span>
					<h4>{data.name}</h4>
					<span className="card-hit-points">
						<input
							type="number"
							name="current_hit_points"
							id="current_hit_points"
							onChange={handleChange}
							min={0}
							value={cardData.current_hit_points}
						/>
					</span>
				</header>

				<section className="card-section">
					<dl className="card-stats">
						<div>
							<dt>STR</dt>
							<dd>
								{cardData.strength} {getModifier(cardData.strength)}
							</dd>
						</div>
						<div>
							<dt>DEX</dt>
							<dd>
								{cardData.dexterity} {getModifier(cardData.dexterity)}
							</dd>
						</div>
						<div>
							<dt>CON</dt>
							<dd>
								{cardData.constitution} {getModifier(cardData.constitution)}
							</dd>
						</div>
						<div>
							<dt>INT</dt>
							<dd>
								{cardData.intelligence} {getModifier(cardData.intelligence)}
							</dd>
						</div>
						<div>
							<dt>WIS</dt>
							<dd>
								{cardData.wisdom} {getModifier(cardData.wisdom)}
							</dd>
						</div>
						<div>
							<dt>CHA</dt>
							<dd>
								{cardData.charisma} {getModifier(cardData.charisma)}
							</dd>
						</div>
					</dl>
				</section>

				<section className="card-section">
					<ul>
						{cardData.actions.map((action) => (
							<li key={action.name} className="card-action">
								{action.name}{' '}
								<menu>
									<li>
										<button>
											{getDamageBonus(action.attack_bonus)} to hit
										</button>
									</li>
									<li>
										<button>
											{action.damage_dice} {getDamageBonus(action.damage_bonus)}
										</button>
									</li>
								</menu>
							</li>
						))}
					</ul>
				</section>
			</article>
		</>
	);
}
