import { useState } from 'react';
import {
	Form,
	FloatingLabel,
	InputGroup,
	Row,
	Col,
	Alert,
} from 'react-bootstrap';
import { RiHeartFill, RiShieldFill } from 'react-icons/ri';
import { FaArrowCircleRight } from 'react-icons/fa';
import './monsterBuilder.scss';

const MonsterBuilder = () => {
	const [values, setValues] = useState({
		name: '',
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setValues({
			...values,
			[name]: value,
		});
	};

	return (
		<section className="container p-4 w-70">
			<Alert variant="danger">
				<Alert.Heading className="my-2 text-center">
					🚧 UNDER CONSTRUCTION 🚧
				</Alert.Heading>
				<p className="text-center m-0">
					The kobolds are still working here, updates coming soon!
				</p>
			</Alert>

			<section className="create-monster-card p-4 w-70">
				<h1 className="text-center">Create Monster</h1>

				<Form>
					<FloatingLabel label="Name">
						<Form.Control
							size="lg"
							type="text"
							name="name"
							value={values.name}
							onChange={handleChange}
							placeholder="Enter Monster Name"
						/>
					</FloatingLabel>

					<Row className="my-2">
						<Col>
							<FloatingLabel label="Size">
								<Form.Control type="text" placeholder="Size" />
							</FloatingLabel>
						</Col>
						<Col>
							<FloatingLabel label="Type">
								<Form.Control type="text" placeholder="Type" />
							</FloatingLabel>
						</Col>
						<Col>
							<FloatingLabel label="(Subtype)">
								<Form.Control
									type="text"
									placeholder="(Subtype)"
								/>
							</FloatingLabel>
						</Col>
						<Col>
							<FloatingLabel label="Alignment">
								<Form.Control
									type="text"
									placeholder="Alignment"
								/>
							</FloatingLabel>
						</Col>
					</Row>

					<hr />

					<Row className="my-2">
						<Col>
							<div className="d-flex justify-content-center align-items-center">
								<RiHeartFill className="me-2" />
								<h4 className="m-0">Hit Points</h4>
							</div>
							<Form.Control
								type="number"
								min={0}
								max={200}
								placeholder="Hit Points"
							/>
							<Form.Control
								type="text"
								placeholder='Hit Dice (i.e. "1d4+2")'
							/>
						</Col>
						<Col>
							<div className="d-flex justify-content-center align-items-center">
								<RiShieldFill className="me-2" />
								<h4 className="m-0">Armor Class</h4>
							</div>
							<Form.Control
								type="number"
								min={0}
								max={40}
								placeholder="Armor Class"
							/>
							<Form.Control
								type="text"
								placeholder='Armor Type (i.e. "leather")'
							/>
						</Col>
						<Col>
							<div className="d-flex justify-content-center align-items-center">
								<FaArrowCircleRight className="me-2" />
								<h4 className="m-0">Speed</h4>
							</div>
							<InputGroup>
								<Form.Control
									type="text"
									placeholder="Walking"
								/>
								<Form.Control
									type="text"
									placeholder="Swimming"
								/>
							</InputGroup>
							<InputGroup>
								<Form.Control
									type="text"
									placeholder="Climbing"
								/>
								<Form.Control
									type="text"
									placeholder="Flying"
								/>
							</InputGroup>
						</Col>
					</Row>

					<hr />

					<Row>
						<Col className="text-center">
							<Form.Label className="m-0">STR</Form.Label>
							<Form.Control
								type="number"
								min={0}
								max={25}
								placeholder="0"
							/>
						</Col>
						<Col className="text-center">
							<Form.Label className="m-0">DEX</Form.Label>
							<Form.Control
								type="number"
								min={0}
								max={25}
								placeholder="0"
							/>
						</Col>
						<Col className="text-center">
							<Form.Label className="m-0">CON</Form.Label>
							<Form.Control
								type="number"
								min={0}
								max={25}
								placeholder="0"
							/>
						</Col>
						<Col className="text-center">
							<Form.Label className="m-0">INT</Form.Label>
							<Form.Control
								type="number"
								min={0}
								max={25}
								placeholder="0"
							/>
						</Col>
						<Col className="text-center">
							<Form.Label className="m-0">WIS</Form.Label>
							<Form.Control
								type="number"
								min={0}
								max={25}
								placeholder="0"
							/>
						</Col>
						<Col className="text-center">
							<Form.Label className="m-0">CHA</Form.Label>
							<Form.Control
								type="number"
								min={0}
								max={25}
								placeholder="0"
							/>
						</Col>
					</Row>

					<hr />
				</Form>
			</section>
		</section>
	);
};

export default MonsterBuilder;
