import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
	Form,
	FormGroup,
	FormLabel,
	FormControl,
	Button,
} from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import { LOGIN } from 'utils/mutations/userMutations';
import Auth from 'utils/auth';
import ErrorMessage from './ErrorMessage';
import { FiLogIn } from 'react-icons/fi';
import './login.scss';
import { v4 as uuidv4 } from 'uuid';

const Login = () => {
	const navigate = useNavigate();

	const [formState, setFormState] = useState({ email: '', password: '' });
	const [formStatus, setFormStatus] = useState('');
	const [login, { loading }] = useMutation(LOGIN);

	const handleGuest = async (e) => {
		// logs in with a guest account
		console.log('Attempting to log in as a guest');
		const guestId = uuidv4();
		localStorage.setItem('guest_id', guestId);
		navigate('/guest');
	};

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
			setFormStatus('error');
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

	if (loading) return <p>Submitting...</p>;

	return (
		<div className="p-4 d-flex flex-column justify-content-center align-items-center container">
			<div className="form-container">
				<h1 className="text-center">Login</h1>
				<Form onSubmit={handleFormSubmit}>
					{formStatus === 'error' && <ErrorMessage />}
					<FormGroup>
						<FormLabel>Email Address</FormLabel>
						<FormControl
							type="email"
							name="email"
							placeholder="i.e. acererak@abyss.com"
							onChange={handleChange}
							required
						/>
						<Form.Text>
							We'll never share your email with anyone else,
							because we don't know how...
						</Form.Text>
					</FormGroup>
					<FormGroup className="mb-2">
						<FormLabel>Password</FormLabel>
						<FormControl
							type="password"
							name="password"
							placeholder="Password"
							onChange={handleChange}
							required
						/>
					</FormGroup>
					<Link to={'/signup'}>No account? Signup!</Link>
					<div className="d-flex justify-content-around">
						<Button
							className="mt-2"
							variant="success"
							onClick={handleGuest}
						>
							Continue as Guest
						</Button>
						<Button
							className="mt-2 d-flex align-items-center"
							variant="success"
							type="submit"
						>
							Login <FiLogIn size={'1.2rem'} className="ms-1" />
						</Button>
					</div>
				</Form>
			</div>
		</div>
	);
};

export default Login;
