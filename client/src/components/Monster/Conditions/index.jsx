const Conditions = ({ conditions }) => {
	if (conditions.includes('invisible')) {
	}
	return (
		<div className="condition-container d-flex flex-wrap">
			{conditions.includes('invisible') ? (
				<div
					className="condition invis"
					title="An invisible creature is impossible to see without the aid of magic or a Special sense. For the Purpose of Hiding, the creature is heavily obscured. The creature's Location can be detected by any noise it makes or any tracks it leaves."
				>
					Invisible
				</div>
			) : null}
			{/* 
			<div
				className="condition unconcious"
				title="An unconcious creature is incapacitated, can't move or speak, and is unaware of its surroundings. The creature drops whatever it's holding and falls prone. The creature automatically fails Strength and Dexterity Saving Throws. Attack rolls against the creature have advantage. Any Attack that hits the creature is a critical hit if the attacker is within 5 feet of the creature."
			>
				Unconcious
			</div>
			<div
				className="condition blind"
				title="A blinded creature can't see and automatically fails any ability check that requires sight. Attack rolls against the creature have advantage, and the creature's Attack rolls have disadvantage"
			>
				Blinded
			</div>
			<div
				className="condition invis"
				title="An invisible creature is impossible to see without the aid of magic or a Special sense. For the Purpose of Hiding, the creature is heavily obscured. The creature's Location can be detected by any noise it makes or any tracks it leaves."
			>
				Invisible
			</div>
			<div
				className="condition deaf"
				title="A deafened creature can't hear and automatically fails any ability check that requires hearing."
			>
				Deafened
			</div>
			<div
				className="condition petrify"
				title="A petrified creature is transformed, along with any nonmagical object it is wearing or carrying, into a solid inanimate substance (usually stone). Its weight increases by a factor of ten, and it ceases aging. The creature is incapacitated, can't move or speak, and is unaware of its surroundings. Attack rolls against the creature have advantage. The creature automatically fails Strength and Dexterity Saving Throws. The creature has Resistance to all damage. The creature is immune to poison and disease, although a poison or disease already in its system is suspended, not neutralized."
			>
				Petrified
			</div>
			<div
				className="condition poison"
				title="A poisoned creature has disadvantaged on Attack rolls and Ability Checks."
			>
				Poisoned
			</div>
			<div
				className="condition restrain"
				title="A restrained creature's speed becomes 0, and it can't benefit from any bonus to its speed. Attack rolls against the creature have advantage, and the creature's Attack rolls have disadvantage. The creature has disadvantage on Dexterity Saving Throws."
			>
				Restrained
			</div>
			<div className="condition hex">Hexed</div>
			<div className="condition hex">Fairy Fire</div>
			<div
				className="condition charm"
				title="A charmed creature can't Attack the charmer or target the charmer with harmful Abilities or magical Effects. The charmer has advantage on any ability check to interact socially with the creature."
			>
				Charmed
			</div>
			<div
				className="condition fright"
				title="A frightened creature has disadvantage on Ability Checks and Attack rolls with the source of its fear is within Line of Sight. The creature can't willingly move closer to the source of its fear."
			>
				Frightened
			</div>
			<div
				className="condition paralyze"
				title="A paralyzed creature is incapacitated and can't move or speak. The creature automatically fails Strength and Dexterity Saving Throws. Attacks rolls against the creature have advantage. Any Attack that hits the creature is a critical hit if the attacker is within 5 feet of the creature."
			>
				Paralyzed
			</div>
			<div
				className="condition prone"
				title="A prone creature's only Movement option is to crawl, unless it stands up and thereby ends the condition. The creature has disadvantage on Attack rolls. An Attack roll against the creature has advantage if the attacker is within 5 feet of the creature. Otherwise, the Attack roll has disadvantage."
			>
				Prone
			</div>
			<div
				className="condition grapple"
				title="A grappled creature's speed becomes 0, and it can't benefit from any bonus to its speed. THe condition ends if the Grappler is incapacitated. The condition also ends if an Effect removes the grappled creature from the reach of the Grappler or Grappling Effect, such as when a creature is hurled away by the Thunderwave spell."
			>
				Grappled
			</div>
			<div
				className="condition incapacitate"
				title="An incapacitated creature can't take Actions or Reactions."
			>
				Incapacitated
			</div>
			<div
				className="condition stun"
				title="A stunned creature is incapacitated, can't move, and can speak only falteringly. The creature automatically fails Strength and Dexterity Saving Throws. Attack rolls against the creature have advantage."
			>
				Stunned
			</div>
       */}
		</div>
	);
};

export default Conditions;
