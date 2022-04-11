const Conditions = ({ monster, sortedData, setSortedData }) => {
	const handleRemoveCondition = (conditionName) => {
		let newConditions = monster.conditions.filter(
			(condition) => condition !== conditionName
		);
		let updatedArray = sortedData.map((creature) => {
			if (creature.name === monster.name) {
				return {
					...monster,
					conditions: [...newConditions],
				};
			}
			return creature;
		});
		setSortedData([...updatedArray]);
	};

	return (
		<div className="condition-container d-flex flex-wrap">
			{/* Invisible */}
			{monster.conditions.includes('invisible') ? (
				<div
					className="condition invis"
					onClick={() => handleRemoveCondition('invisible')}
					title="An invisible creature is impossible to see without the aid of magic or a Special sense. For the Purpose of Hiding, the creature is heavily obscured. The creature's Location can be detected by any noise it makes or any tracks it leaves."
				>
					Invisible
				</div>
			) : null}
			{/* Blind */}
			{monster.conditions.includes('blind') ? (
				<div
					className="condition blind"
					onClick={() => handleRemoveCondition('blind')}
					title="A blinded creature can't see and automatically fails any ability check that requires sight. Attack rolls against the creature have advantage, and the creature's Attack rolls have disadvantage"
				>
					Blinded
				</div>
			) : null}
			{/* Deaf */}
			{monster.conditions.includes('deafened') ? (
				<div
					className="condition deaf"
					onClick={() => handleRemoveCondition('deaf')}
					title="A deafened creature can't hear and automatically fails any ability check that requires hearing."
				>
					Deafened
				</div>
			) : null}
			{/* Petrified */}
			{monster.conditions.includes('petrified') ? (
				<div
					className="condition petrify"
					onClick={() => handleRemoveCondition('petrified')}
					title="A petrified creature is transformed, along with any nonmagical object it is wearing or carrying, into a solid inanimate substance (usually stone). Its weight increases by a factor of ten, and it ceases aging. The creature is incapacitated, can't move or speak, and is unaware of its surroundings. Attack rolls against the creature have advantage. The creature automatically fails Strength and Dexterity Saving Throws. The creature has Resistance to all damage. The creature is immune to poison and disease, although a poison or disease already in its system is suspended, not neutralized."
				>
					Petrified
				</div>
			) : null}
			{/* Poisoned */}
			{monster.conditions.includes('poisoned') ? (
				<div
					className="condition poison"
					onClick={() => handleRemoveCondition('poisoned')}
					title="A poisoned creature has disadvantaged on Attack rolls and Ability Checks."
				>
					Poisoned
				</div>
			) : null}
			{/* Unconcious */}
			{monster.conditions.includes('unconscious') ? (
				<div
					className="condition unconscious"
					onClick={() => handleRemoveCondition('unconscious')}
					title="An unconcious creature is incapacitated, can't move or speak, and is unaware of its surroundings. The creature drops whatever it's holding and falls prone. The creature automatically fails Strength and Dexterity Saving Throws. Attack rolls against the creature have advantage. Any Attack that hits the creature is a critical hit if the attacker is within 5 feet of the creature."
				>
					Unconcious
				</div>
			) : null}
			{/* Restrained */}
			{monster.conditions.includes('restrained') ? (
				<div
					className="condition restrain"
					onClick={() => handleRemoveCondition('restrained')}
					title="A restrained creature's speed becomes 0, and it can't benefit from any bonus to its speed. Attack rolls against the creature have advantage, and the creature's Attack rolls have disadvantage. The creature has disadvantage on Dexterity Saving Throws."
				>
					Restrained
				</div>
			) : null}
			{/* Charmed */}
			{monster.conditions.includes('charmed') ? (
				<div
					className="condition charm"
					onClick={() => handleRemoveCondition('charmed')}
					title="A charmed creature can't Attack the charmer or target the charmer with harmful Abilities or magical Effects. The charmer has advantage on any ability check to interact socially with the creature."
				>
					Charmed
				</div>
			) : null}
			{/* Frightened */}
			{monster.conditions.includes('frightened') ? (
				<div
					className="condition fright"
					onClick={() => handleRemoveCondition('frightened')}
					title="A frightened creature has disadvantage on Ability Checks and Attack rolls with the source of its fear is within Line of Sight. The creature can't willingly move closer to the source of its fear."
				>
					Frightened
				</div>
			) : null}
			{/* Paralyzed */}
			{monster.conditions.includes('paralyzed') ? (
				<div
					className="condition paralyze"
					onClick={() => handleRemoveCondition('paralyzed')}
					title="A paralyzed creature is incapacitated and can't move or speak. The creature automatically fails Strength and Dexterity Saving Throws. Attacks rolls against the creature have advantage. Any Attack that hits the creature is a critical hit if the attacker is within 5 feet of the creature."
				>
					Paralyzed
				</div>
			) : null}
			{/* Prone */}
			{monster.conditions.includes('prone') ? (
				<div
					className="condition prone"
					onClick={() => handleRemoveCondition('prone')}
					title="A prone creature's only Movement option is to crawl, unless it stands up and thereby ends the condition. The creature has disadvantage on Attack rolls. An Attack roll against the creature has advantage if the attacker is within 5 feet of the creature. Otherwise, the Attack roll has disadvantage."
				>
					Prone
				</div>
			) : null}
			{/* Grappled */}
			{monster.conditions.includes('grappled') ? (
				<div
					className="condition grapple"
					onClick={() => handleRemoveCondition('grappled')}
					title="A grappled creature's speed becomes 0, and it can't benefit from any bonus to its speed. THe condition ends if the Grappler is incapacitated. The condition also ends if an Effect removes the grappled creature from the reach of the Grappler or Grappling Effect, such as when a creature is hurled away by the Thunderwave spell."
				>
					Grappled
				</div>
			) : null}
			{/* Incapacitated */}
			{monster.conditions.includes('incapacitated') ? (
				<div
					className="condition incapacitate"
					onClick={() => handleRemoveCondition('incapacitated')}
					title="An incapacitated creature can't take Actions or Reactions."
				>
					Incapacitated
				</div>
			) : null}
			{/* Stunned */}
			{monster.conditions.includes('stunned') ? (
				<div
					className="condition stun"
					onClick={() => handleRemoveCondition('stunned')}
					title="A stunned creature is incapacitated, can't move, and can speak only falteringly. The creature automatically fails Strength and Dexterity Saving Throws. Attack rolls against the creature have advantage."
				>
					Stunned
				</div>
			) : null}
		</div>
	);
};

export default Conditions;
