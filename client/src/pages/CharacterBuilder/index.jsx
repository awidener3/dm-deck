import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import {
	Form,
	FormGroup,
	FormLabel,
	FormControl,
	FormSelect,
	Button,
} from 'react-bootstrap';
import {
	ADD_CHARACTER,
	UPDATE_CHARACTER,
} from 'utils/mutations/characterMutations';
import { QUERY_USER_CHARACTERS, QUERY_ME } from 'utils/queries/userQueries';

import races from 'assets/json/player_races.json';
import classes from 'assets/json/player_classes.json';
import './characterBuilder.scss';
import PageHeader from 'components/PageHeader';

const CharacterBuilder = () => {
	const navigate = useNavigate();
	const { state: character } = useLocation();

	// if rendered from "edit" button, use character in state
	const [values, setValues] = useState(
		!!character
			? {
					character_name: character.character_name || '',
					player_name: character.player_name || '',
					level: character.level || 0,
					race: character.race || '',
					class: character.class || '',
					armor_class: character.armor_class || 0,
					hit_points: character.hit_points || 0,
			  }
			: {
					character_name: '',
					player_name: '',
					level: '',
					race: '',
					class: '',
					armor_class: '',
					hit_points: '',
			  }
	);

	const { loading, error, data } = useQuery(QUERY_ME);
	const [updateCharacter] = useMutation(UPDATE_CHARACTER, {
		refetchQueries: [{ query: QUERY_USER_CHARACTERS }],
	});
	const [addCharacter, { error: character_error }] = useMutation(
		ADD_CHARACTER,
		{ refetchQueries: [{ query: QUERY_USER_CHARACTERS }] }
	);

	const user = data?.me || [];
	const handleChange = (e) => {
		const { name, value } = e.target;
		setValues({
			...values,
			[name]: value,
		});
	};

	const handleUpdateCharacter = async () => {
		try {
			await updateCharacter({
				variables: {
					characterId: character._id,
					characterName: values.character_name,
					playerName: values.player_name,
					level: parseInt(values.level),
					race: values.race,
					class: values.class,
					armorClass: parseInt(values.armor_class),
					hitPoints: parseInt(values.hit_points),
				},
			});
			console.log(`✅ Successfully updated ${values.character_name}!`);
			setValues({
				character_name: '',
				player_name: '',
				level: '',
				race: '',
				class: '',
				armor_class: '',
				hit_points: '',
			});
			navigate(-1);
		} catch (err) {
			console.error(err);
		}
	};

	const handleAddCharacter = async (e) => {
		e.preventDefault();
		try {
			await addCharacter({
				variables: {
					userId: user._id,
					character_name: values.character_name,
					player_name: values.player_name,
					level: parseInt(values.level),
					race: values.race,
					class: values.class,
					armor_class: parseInt(values.armor_class),
					hit_points: parseInt(values.hit_points),
				},
			});

			console.log(
				`✅ Successfully added ${values.character_name} to ${user.username}'s bag of holding!`
			);

			setValues({
				character_name: '',
				player_name: '',
				level: '',
				race: '',
				class: '',
				armor_class: '',
				hit_points: '',
			});

			navigate(-1);
		} catch (error) {
			console.error(error);
			console.error(character_error);
		}
	};

	const getPlayerRaces = () => {
		return races.map((race) => (
			<option key={race.name} value={race.name}>
				{race.name}
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

	if (loading) return <div>Loading...</div>;
	if (!user?.username) return <h4>You need to be logged in to see this.</h4>;
	if (error) return <div>ERROR!</div>;
	return (
		<div>
			<PageHeader
				image={`url(${require('assets/images/card_backs/back_9.jpg')})`}
				pageTitle={'Character Builder'}
			/>
			<Form
				onSubmit={(e) => e.preventDefault()}
				className="container d-flex flex-column"
			>
				<FormGroup className="my-2" controlId="character_name">
					<FormLabel>Character Name</FormLabel>
					<FormControl
						type="text"
						className="form-control form-name-input character-name-input"
						name="character_name"
						value={values.character_name}
						onChange={handleChange}
						placeholder="Arkhan"
						required
					></FormControl>
				</FormGroup>

				<FormGroup className="my-2" controlId="player_name">
					<FormLabel>Player Name</FormLabel>
					<FormControl
						type="text"
						className="form-control form-name-input player-name-input"
						name="player_name"
						value={values.player_name}
						onChange={handleChange}
						placeholder="Joe"
						required
					></FormControl>
				</FormGroup>

				<div className="d-flex justify-content-around text-center">
					<FormGroup controlId="level">
						<FormLabel>Level</FormLabel>
						<FormControl
							className="number-input"
							type="number"
							min={1}
							max={20}
							name="level"
							pattern="[0-9]*"
							inputMode="numeric"
							placeholder={1}
							value={values.level}
							onChange={(e) => {
								if (e.target.value.length > 2) return false;
								handleChange(e);
							}}
							required
						></FormControl>
					</FormGroup>

					<FormGroup
						controlId="armor_class"
						className="d-flex flex-column align-items-center"
					>
						<FormLabel>Armor Class</FormLabel>
						<FormControl
							className="number-input"
							type="number"
							min={1}
							max={40}
							maxLength={2}
							name="armor_class"
							pattern="[0-9]*"
							inputMode="numeric"
							placeholder={10}
							value={values.armor_class}
							onChange={(e) => {
								if (e.target.value.length > 2) return false;
								handleChange(e);
							}}
							required
						></FormControl>
					</FormGroup>

					<FormGroup controlId="hit_points">
						<FormLabel>Hit Points</FormLabel>
						<FormControl
							className="number-input"
							type="number"
							min={1}
							maxLength={3}
							name="hit_points"
							pattern="[0-9]*"
							inputMode="numeric"
							placeholder={10}
							value={values.hit_points}
							onChange={(e) => {
								if (e.target.value.length > 3) return false;
								handleChange(e);
							}}
							required
						></FormControl>
					</FormGroup>
				</div>

				<FormGroup controlId="race" className="mt-2">
					<FormLabel>Race</FormLabel>
					<FormSelect
						name="race"
						value={values.race}
						onChange={handleChange}
						className="form-select"
						required
					>
						<option value="" disabled>
							Select...
						</option>
						{getPlayerRaces()}
					</FormSelect>
				</FormGroup>

				<FormGroup controlId="class" className="mt-2">
					<FormLabel>Class</FormLabel>
					<FormSelect
						name="class"
						value={values.class}
						onChange={handleChange}
						className="form-select"
						required
					>
						<option value="" disabled>
							Select...
						</option>
						{getPlayerClasses()}
					</FormSelect>
				</FormGroup>

				{!!character ? (
					<Button
						className="mt-4 mx-auto create-character-btn"
						variant="success"
						type="button"
						onClick={handleUpdateCharacter}
					>
						Update Character
					</Button>
				) : (
					<Button
						className="mt-4 mx-auto create-character-btn"
						variant="success"
						type="button"
						onClick={handleAddCharacter}
					>
						Create Character
					</Button>
				)}
			</Form>
		</div>
	);
};

export default CharacterBuilder;
