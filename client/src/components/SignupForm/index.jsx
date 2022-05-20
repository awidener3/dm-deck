import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import Auth from '../../utils/auth';
import { ADD_USER } from '../../utils/mutations';
import './signupForm.scss';

const Signup = () => {
	const [formState, setFormState] = useState({
		username: '',
		email: '',
		password: '',
	});

	const [addUser] = useMutation(ADD_USER);

	const handleFormSubmit = async (event) => {
		event.preventDefault();
		console.log('form submitted:', formState);
		const mutationResponse = await addUser({
			variables: {
				username: formState.username,
				email: formState.email,
				password: formState.password,
			},
		});
		const token = mutationResponse.data.addUser.token;
		Auth.login(token);
	};

	const handleChange = (event) => {
		const { name, value } = event.target;
		setFormState({
			...formState,
			[name]: value,
		});
	};

	return (
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
			<a href="/signup">Have an account? Login!</a>
			<br />
			<Button className="mt-2" variant="primary" type="submit">
				Signup
			</Button>
		</Form>
	);
};

export default Signup;
