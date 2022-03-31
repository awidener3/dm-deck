const monsters = [
	{
		type: 'monster',
		name: 'Goblin',
		size: 'small',
		race: 'humanoid',
		race_short: 'Hu',
		alignment: 'neutral evil',
		alignment_short: 'NE',
		challenge_rating: 1 / 4,
		experience: 50,
		hitpoints: 7,
		hitpoint_dice: '2d6',
		armor_class: 15,
		armor_type: 'Leather Armor, Shield',
		speed: {
			walking: 30,
			flying: null,
			swimming: null,
		},
		ability_scores: {
			strength: 8,
			dexterity: 14,
			constitution: 10,
			intelligence: 10,
			wisdom: 8,
			charisma: 8,
		},
		skills: ['stealth +6'],
		senses: ['Darkvision 60ft.', 'Passive Perception 9'],
		languages: ['Common', 'Goblin'],
		proficiency_bonus: 2,
		special_traits: [
			{
				title: 'Nimble Escape',
				description:
					'The goblin can take the Disengage or Hide action as a bonus action on each of its turns.',
			},
		],
		actions: [
			{
				weapon: 'Scimitar',
				action_type: 'melee',
				hit_modifier: 4,
				reach: 5,
				range: null,
				num_targets: 1,
				damage_average: 5,
				damage_dice_text: '1d6+2',
				damage_die: 6,
				damage_die_num: 1,
				damage_modifier: 2,
				damage_type: 'slashing',
			},
			{
				weapon: 'Shortbow',
				action_type: 'ranged',
				hit_modifier: 4,
				reach: null,
				range: '80/320 ft.',
				num_targets: 1,
				damage_average: 5,
				damage_dice_text: '1d6+2',
				damage_die: 6,
				damage_die_num: 1,
				damage_modifier: 2,
				damage_type: 'piercing',
			},
		],
	},
	{
		type: 'monster',
		name: 'Hobgoblin',
		size: 'medium',
		race: 'humanoid',
		race_short: 'Hu',
		alignment: 'lawful evil',
		alignment_short: 'LE',
		challenge_rating: 1 / 2,
		experience: 100,
		hitpoints: 11,
		hitpoint_dice: '2d8+2',
		armor_class: 18,
		armor_type: 'Chain Mail, Shield',
		speed: {
			walking: 30,
			flying: null,
			swimming: null,
		},
		ability_scores: {
			strength: 13,
			dexterity: 12,
			constitution: 12,
			intelligence: 10,
			wisdom: 10,
			charisma: 9,
		},
		skills: null,
		senses: ['Darkvision 60ft.', 'Passive Perception 10'],
		languages: ['Common', 'Goblin'],
		proficiency_bonus: 2,
		special_traits: [
			{
				title: 'Martial Advantage',
				description:
					"Once per turn, the hobgoblin can deal an extra 7 (2d6) damage to a creature it hits with a weapon attack if that creature is within 5 feet of an ally of the hobgoblin that isn't incapacitated.",
			},
		],
		actions: [
			{
				weapon: 'Longsword',
				action_type: 'melee',
				hit_modifier: 3,
				reach: 5,
				range: null,
				num_targets: 1,
				damage_average: 5,
				damage_dice_text: '1d8+1',
				damage_die: 8,
				damage_die_num: 1,
				damage_modifier: 1,
				damage_type: 'slashing',
			},
			{
				weapon: 'Longbow',
				action_type: 'ranged',
				hit_modifier: 3,
				reach: null,
				range: '150/600 ft.',
				num_targets: 1,
				damage_average: 5,
				damage_dice_text: '1d8+1',
				damage_die: 8,
				damage_die_num: 1,
				damage_modifier: 1,
				damage_type: 'piercing',
			},
		],
	},
	{
		type: 'monster',
		name: 'Ogre',
		size: 'large',
		race: 'giant',
		race_short: 'Gi',
		alignment: 'chaotic evil',
		alignment_short: 'CE',
		challenge_rating: 2,
		experience: 450,
		hitpoints: 59,
		hitpoint_dice: '7d10+21',
		armor_class: 11,
		armor_type: 'Hide Armor',
		speed: {
			walking: 40,
			flying: null,
			swimming: null,
		},
		ability_scores: {
			strength: 19,
			dexterity: 8,
			constitution: 16,
			intelligence: 5,
			wisdom: 7,
			charisma: 7,
		},
		skills: null,
		senses: ['Darkvision 60ft.', 'Passive Perception 8'],
		languages: ['Common', 'Giant'],
		proficiency_bonus: 2,
		special_traits: null,
		actions: [
			{
				weapon: 'Greatclub',
				action_type: 'melee',
				hit_modifier: 6,
				reach: 5,
				range: null,
				num_targets: 1,
				damage_average: 13,
				damage_dice_text: '2d8+4',
				damage_die: 8,
				damage_die_num: 2,
				damage_modifier: 4,
				damage_type: 'bludgeoning',
			},
			{
				weapon: 'Javelin',
				action_type: 'melee/ranged',
				hit_modifier: 6,
				reach: 5,
				range: '30/120 ft.',
				num_targets: 1,
				damage_average: 11,
				damage_dice_text: '2d6+4',
				damage_die: 6,
				damage_die_num: 2,
				damage_modifier: 4,
				damage_type: 'piercing',
			},
		],
	},
	{
		type: 'monster',
		name: 'Bat',
		size: 'tiny',
		race: 'beast',
		race_short: 'Be',
		alignment: 'unaligned',
		alignment_short: 'Ua',
		challenge_rating: 0,
		experience: 10,
		hitpoints: 1,
		hitpoint_dice: '1d4-1',
		armor_class: 12,
		armor_type: null,
		speed: {
			walking: 5,
			flying: 30,
			swimming: null,
		},
		ability_scores: {
			strength: 2,
			dexterity: 15,
			constitution: 8,
			intelligence: 2,
			wisdom: 12,
			charisma: 4,
		},
		skills: null,
		senses: ['Blindsight 60ft.', 'Passive Perception 11'],
		languages: [null],
		proficiency_bonus: 0,
		special_traits: [
			{
				title: 'Echolocation',
				description: 'While it can\t hear, the bat has no blindsight',
			},
			{
				title: 'Keen Hearing',
				description:
					'The bat has advantage on Wisdom (Perception) checks that rely on hearing.',
			},
		],
		actions: [
			{
				weapon: 'Bite',
				action_type: 'melee',
				hit_modifier: 0,
				reach: 5,
				range: null,
				num_targets: 1,
				damage_average: 1,
				damage_dice_text: 1,
				damage_die: 1,
				damage_die_num: 1,
				damage_modifier: 1,
				damage_type: 'piercing',
			},
		],
	},
	{
		type: 'monster',
		name: 'Imp',
		size: 'tiny',
		race: 'fiend',
		race_short: 'Fi',
		alignment: 'lawful evil',
		alignment_short: 'LE',
		challenge_rating: 1,
		experience: 200,
		hitpoints: 10,
		hitpoint_dice: '3d4+3',
		armor_class: 13,
		armor_type: null,
		speed: {
			walking: 20,
			flying: 40,
			swimming: null,
		},
		ability_scores: {
			strength: 6,
			dexterity: 17,
			constitution: 13,
			intelligence: 11,
			wisdom: 12,
			charisma: 14,
		},
		skills: ['Deception +4', 'Insight +3', 'Persuasion +4', 'Stealth +5'],
		damage_resistances: [
			'cold',
			"bludgeoning, piercing, and slashing from nonmagical weapons that aren't silvered",
		],
		damage_immunities: ['fire', 'poison'],
		condition_immunities: ['poisoned'],
		senses: ['darkvision 120ft.', 'passive Perception 11'],
		languages: ['Infernal', 'Common'],
		proficiency_bonus: 0,
		special_traits: [
			{
				title: 'Shapechanger',
				description:
					'The imp can use its action to polymorph into the beast form of a rat, a raven, or a spider, or into its devil form. Its statistics are the same in each form, except for the speed changes noted. Any equipment it is wearing or carrying is not transformed. It reverts to its devil form if it dies.',
			},
			{
				title: "Devil's Sight",
				description:
					"Magical darkness doesn't impede the imp's darkvision.",
			},
			{
				title: 'Magic Resistance',
				description:
					'The imp has advantage on saving throws against spells and other magical effects.',
			},
		],
		actions: [
			{
				weapon: 'Sting',
				action_type: 'melee',
				hit_modifier: 5,
				reach: 5,
				range: null,
				num_targets: 1,
				damage_average: 5,
				damage_dice_text: '1d4+3',
				damage_die: 4,
				damage_die_num: 1,
				damage_modifier: 3,
				damage_type: 'piercing',
				has_effect: true,
				saving_throw: {
					text: 'the target must make a DC 11 Constitution saving throw, taking 10 (3d6) poison damage on a failed save, or half as much damage on a succesful one.',
					dc: 11,
					ability: 'constitution',
					damage_average: 10,
					die: 6,
					die_num: 3,
					modifier: 0,
					damage_type: 'poison',
				},
			},
			{
				weapon: 'Invisibility',
				action_type: 'effect',
				effect_text:
					'The imp magically turns invisible until it attacks or until its concentration ends (as if concentrating on a spell). Any equipment the imp wears or carries is invisible with it.',
				concention: true,
				status: 'invisible',
			},
		],
	},
];

export default monsters;
