import { Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';

const Profile = () => {
	const navigate = useNavigate();

	// Check if a user is logged in, and redirect to login page if they are not.
	useEffect(() => {
		if (!localStorage.getItem('guest_id')) {
			console.log('not logged in');
			navigate('/login');
		}
	});

	return (
		<section className="p-4 d-flex flex-column justify-content-center align-items-center container">
			<h1>Welcome, Adventurer!</h1>

			{/* Developer message */}
			<Alert variant="danger">
				<Alert.Heading className="my-2 text-center">
					🚧 UNDER CONSTRUCTION 🚧
				</Alert.Heading>
				<p className="m-0">
					The kobolds are still working here, but don't worry! You'll
					be seeing updates as soon as they are ready.
				</p>
			</Alert>

			{/* Character cards */}
			<section>
				<h2>Your Characters</h2>
				<div className="d-flex flex-wrap justify-content-center"></div>
			</section>
		</section>
	);
};

export default Profile;
