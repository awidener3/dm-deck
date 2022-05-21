import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import races from '../assets/json/player_races.json';
import classes from '../assets/json/player_classes.json';
import { useMutation } from '@apollo/client';
import { ADD_CHARACTER } from '../utils/mutations';

import '../assets/styles/createCharacter.scss';

const CreateCharacter = () => {
	const [values, setValues] = useState({
		character_name: '',
		player_name: '',
		level: 1,
		race: '',
		class: '',
		armor_class: 0,
		hit_points: 0,
	});

	const [addCharacter, { error }] = useMutation(ADD_CHARACTER);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setValues({
			...values,
			[name]: value,
		});
	};

	const handleFormSubmit = async (e) => {
		e.preventDefault();
		try {
			await addCharacter({
				variables: {
					character_name: values.character_name,
					player_name: values.player_name,
					level: parseInt(values.level),
					race: values.race,
					class: values.class,
					armor_class: parseInt(values.armor_class),
					hit_points: parseInt(values.hit_points),
				},
			});
			setValues({
				character_name: '',
				player_name: '',
				level: 1,
				race: '',
				class: '',
				armor_class: 0,
				hit_points: 0,
			});
		} catch (error) {
			console.error(error);
		}
	};

	const getPlayerRaces = () => {
		return races.map((race) => (
			<option key={race.name} value={race.name}>
				{race.name} ({race.source})
			</option>
		));
	};

	const getPlayerClasses = () => {
		return classes.map((item) => (
			<option key={item.class} value={item.class}>
				{item.class}
			</option>
		));
	};

	return (
		<div className="container p-4 w-70">
			<h1 className="text-center">Create Character</h1>

			<Form onSubmit={handleFormSubmit}>
				<Form.Group className="my-2" controlId="character_name">
					<Form.Label>Hero Name</Form.Label>
					<Form.Control
						type="text"
						className="form-control form-name-input character-name-input"
						name="character_name"
						value={values.character_name}
						onChange={handleChange}
						placeholder="Hero Name"
					></Form.Control>
				</Form.Group>

				<Form.Group className="my-2" controlId="player_name">
					<Form.Label>Player Name</Form.Label>
					<Form.Control
						type="text"
						className="form-control form-name-input player-name-input"
						name="player_name"
						value={values.player_name}
						onChange={handleChange}
						placeholder="Player Name"
					></Form.Control>
				</Form.Group>

				<div className="d-flex justify-content-around text-center">
					<Form.Group controlId="level">
						<Form.Label>Level</Form.Label>
						<Form.Control
							className="number-input"
							type="number"
							min={1}
							max={20}
							name="level"
							value={values.level}
							onChange={handleChange}
						></Form.Control>
					</Form.Group>

					<Form.Group
						controlId="armor_class"
						className="d-flex flex-column align-items-center"
					>
						<Form.Label>Armor Class</Form.Label>
						<Form.Control
							className="number-input"
							type="number"
							min={1}
							max={40}
							name="armor_class"
							value={values.armor_class}
							onChange={handleChange}
						></Form.Control>
					</Form.Group>

					<Form.Group controlId="hit_points">
						<Form.Label>Hit Points</Form.Label>
						<Form.Control
							className="number-input"
							type="number"
							min={1}
							max={500}
							name="hit_points"
							value={values.hit_points}
							onChange={handleChange}
						></Form.Control>
					</Form.Group>
				</div>

				<Form.Group controlId="race">
					<Form.Label>Race</Form.Label>
					<Form.Select
						name="race"
						value={values.race}
						onChange={handleChange}
						className="form-select"
					>
						<option value="" disabled>
							Select
						</option>
						{getPlayerRaces()}
					</Form.Select>
				</Form.Group>

				<Form.Group controlId="class">
					<Form.Label>Class</Form.Label>
					<Form.Select
						name="class"
						value={values.class}
						onChange={handleChange}
						className="form-select"
					>
						<option value="" disabled>
							Select
						</option>
						{getPlayerClasses()}
					</Form.Select>
				</Form.Group>

				<Button className="mt-2" variant="primary" type="submit">
					Create!
				</Button>
			</Form>
		</div>
	);
};

export default CreateCharacter;

/*
  Needed Props:
  character_name
  player_name
  level
  race
  class
  armor_class
  hit_points
*/
