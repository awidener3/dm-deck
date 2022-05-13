import { Form, Container, Row, Col } from 'react-bootstrap';
import races from '../assets/json/player_races.json';
import classes from '../assets/json/player_classes.json';

const CreateCharacter = () => {
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
		<div className="container py-4">
			<h1 className="text-center">Create Character</h1>

			<Form>
				<Form.Group className="my-2" controlId="character_name">
					<Form.Control
						type="text"
						className="form-control form-name-input"
						placeholder="Hero Name"
					></Form.Control>
				</Form.Group>

				<Form.Group className="my-2" controlId="player_name">
					<Form.Control
						type="text"
						className="form-control form-name-input"
						placeholder="Player Name"
					></Form.Control>
				</Form.Group>

				<Form.Group controlId="level">
					<Form.Label>Level</Form.Label>
					<Form.Control type="number" min={1} max={20}></Form.Control>
				</Form.Group>

				<Form.Group controlId="race">
					<Form.Label>Race</Form.Label>
					<Form.Select>{getPlayerRaces()}</Form.Select>
				</Form.Group>

				<Form.Group controlId="class">
					<Form.Label>Class</Form.Label>
					<Form.Select>{getPlayerClasses()}</Form.Select>
				</Form.Group>

				<Form.Group controlId="armor_class">
					<Form.Label>Armor Class</Form.Label>
					<Form.Control type="number" min={1} max={40}></Form.Control>
				</Form.Group>

				<Form.Group controlId="hit_points">
					<Form.Label>Hit Points</Form.Label>
					<Form.Control
						type="number"
						min={1}
						max={500}
					></Form.Control>
				</Form.Group>
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
