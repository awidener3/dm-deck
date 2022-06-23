import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import Auth from 'utils/auth';
import { ADD_USER } from 'utils/mutations/userMutations';

const SignUp = () => {
	const [formState, setFormState] = useState({
		username: '',
		email: '',
		password: '',
	});

	const [addUser, { error }] = useMutation(ADD_USER);

	const handleFormSubmit = async (event) => {
		event.preventDefault();
		console.log('form submitted:', formState);
		try {
			const mutationResponse = await addUser({
				variables: {
					username: formState.username,
					email: formState.email,
					password: formState.password,
				},
			});
			const token = mutationResponse.data.addUser.token;
			Auth.login(token);
		} catch (error) {
			console.error(error);
		}
	};

	const handleChange = (event) => {
		const { name, value } = event.target;
		setFormState({
			...formState,
			[name]: value,
		});
	};

	return (
		<div className="p-4 d-flex flex-column justify-content-center align-items-center container">
			<h1>Welcome, Adventurer! 🧙</h1>
			<Form onSubmit={handleFormSubmit}>
				<Form.Group>
					<Form.Label>Username</Form.Label>
					<Form.Control
						type="text"
						name="username"
						placeholder="Enter username"
						onChange={handleChange}
						required
					/>
				</Form.Group>
				<Form.Group>
					<Form.Label>Email Address</Form.Label>
					<Form.Control
						type="email"
						name="email"
						placeholder="Enter email"
						onChange={handleChange}
						required
					/>
					<Form.Text>
						We'll never share your email with anyone else.
					</Form.Text>
				</Form.Group>
				<Form.Group>
					<Form.Label>Password</Form.Label>
					<Form.Control
						type="password"
						name="password"
						placeholder="Password"
						onChange={handleChange}
						required
					/>
				</Form.Group>

				<Link to={'/login'}>Have an account? Login!</Link>
				<br />
				<Button className="mt-2" variant="primary" type="submit">
					Signup
				</Button>
			</Form>
		</div>
	);
};

export default SignUp;
