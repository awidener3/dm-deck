import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
	Form,
	FormGroup,
	FormLabel,
	FormControl,
	FormText,
	Button,
} from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import Auth from 'utils/auth';
import { ADD_USER } from 'utils/mutations/userMutations';
import { FiInfo } from 'react-icons/fi';

import './signup.scss';

const SignUp = () => {
	const [formState, setFormState] = useState({
		username: '',
		email: '',
		password: '',
		confirm_password: '',
	});

	const [addUser] = useMutation(ADD_USER);

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
			<div className="form-container">
				<h1>Welcome, Adventurer!</h1>
				<Form onSubmit={handleFormSubmit}>
					<FormGroup>
						<FormLabel>Email Address</FormLabel>
						<FormControl
							type="email"
							name="email"
							placeholder="i.e. tiamat@avernus.com"
							onChange={handleChange}
							required
						/>
						<FormText>
							We'll never share your email with anyone else.
						</FormText>
					</FormGroup>
					<FormGroup>
						<FormLabel>
							Username{' '}
							<FiInfo title="Must be between 8-20 characters, and can only contain alphanumeric characters, underscores and dots" />
						</FormLabel>
						<FormControl
							type="text"
							name="username"
							placeholder="Enter username"
							pattern="^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$"
							onChange={handleChange}
							required
						/>
					</FormGroup>
					<FormGroup>
						<FormLabel>
							Password{' '}
							{formState.password !==
								formState.confirm_password && (
								<span className="invalid">
									Passwords do not match
								</span>
							)}
						</FormLabel>
						<FormControl
							type="password"
							name="password"
							placeholder="Password"
							pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$"
							onChange={handleChange}
							required
						/>
						<FormText>
							Must contain at least one letter and one number
						</FormText>
					</FormGroup>
					<FormGroup>
						<FormLabel>Confirm Password</FormLabel>
						<FormControl
							type="password"
							name="confirm_password"
							placeholder="Confirm Password"
							onChange={handleChange}
							required
						/>
					</FormGroup>

					<Link to={'/login'}>Have an account? Login!</Link>

					<div className="d-flex justify-content-center">
						<Button
							className="mt-2"
							variant="primary"
							type="submit"
						>
							Signup
						</Button>
					</div>
				</Form>
			</div>
		</div>
	);
};

export default SignUp;
