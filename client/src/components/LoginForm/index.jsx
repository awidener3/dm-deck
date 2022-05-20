import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../../utils/mutations';
import Auth from '../../utils/auth';
import './loginForm.scss';

const LoginForm = () => {
	const [formState, setFormState] = useState({ email: '', password: '' });
	const [login, { error }] = useMutation(LOGIN);

	const handleFormSubmit = async (e) => {
		e.preventDefault();
		try {
			const mutationResponse = await login({
				variables: {
					email: formState.email,
					password: formState.password,
				},
			});
			const token = mutationResponse.data.login.token;
			Auth.login(token);
		} catch (e) {
			console.error(e);
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
		<Form onSubmit={handleFormSubmit} autoComplete="off">
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
			<a href="/signup">No account? Signup!</a>
			<br />
			<Button className="mt-2" variant="primary" type="submit">
				Login
			</Button>
		</Form>
	);
};

export default LoginForm;
