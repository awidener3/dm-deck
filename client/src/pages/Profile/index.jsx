import { Alert, Button } from 'react-bootstrap';
import { useMutation, useQuery } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { QUERY_ME, QUERY_USER_CHARACTERS } from '../../utils/queries';
import { DELETE_CHARACTER } from 'utils/mutations/characterMutations';
import { REMOVE_USER } from 'utils/mutations';
import Card from './ProfileCard';
import WarningModal from './WarningModal';
import { useState } from 'react';
import './profile.scss';
import Auth from 'utils/auth';
import { useEffect } from 'react';

const Profile = () => {
	const navigate = useNavigate();
	const [selected, setSelected] = useState({});

	// Check if a user is logged in, and redirect to login page if they are not.
	useEffect(() => {
		if (!Auth.loggedIn() && !localStorage.getItem('guest_id')) {
			console.log('not logged in');
			navigate('/login');
		}
	});

	// Query user data
	const {
		loading: user_loading,
		error: user_error,
		data: user_data,
	} = useQuery(QUERY_ME);

	// Query character data
	const {
		loading: characters_loading,
		error: characters_error,
		data: characters_data,
	} = useQuery(QUERY_USER_CHARACTERS);

	// Delete character mutation
	const [deleteCharacter] = useMutation(DELETE_CHARACTER, {
		refetchQueries: [{ query: QUERY_USER_CHARACTERS }, 'UserCharacters'],
	});

	const [removeUser] = useMutation(REMOVE_USER);

	// Database Results
	const user = user_data?.me || [];
	const characters = characters_data?.userCharacters || [];

	// Modals
	const [showWarningModal, setShowWarningModal] = useState(false);
	const hideWarning = () => setShowWarningModal(false);

	/**
	 * Deletes a users character by its ID
	 * @function handleDeleteCharacter
	 * @param {Object} character - Object containing a characters data
	 */
	const handleDeleteCharacter = async (character) => {
		console.log(`Attempting to delete ${character.character_name}`);
		const characterId = character._id;

		try {
			const { data } = await deleteCharacter({
				variables: { characterId },
			});
			console.log(`${character.character_name} was deleted!\n`, data);
			// Hide modal
			setShowWarningModal(false);
		} catch (err) {
			console.error('💥 Error deleting character\n', err);
		}
	};

	/**
	 * Deletes a users account by their ID
	 * @function handleDeleteAccount
	 */
	const handleDeleteAccount = async () => {
		console.log(`Attempting to delete ${user.username}'s account`);
		const userId = user._id;

		try {
			const { data } = await removeUser({
				variables: { userId },
			});
			console.log(
				`✅ Successfully deleted ${user.username}'s account\n`,
				data
			);
			navigate('/signup');
		} catch (err) {
			console.error('💥 Could not delete account!\n', err);
		}
	};

	// Loading/error handling
	if (user_loading || characters_loading) return <div>Loading...</div>;
	if (user_error || characters_error) return <div>ERROR!</div>;

	return (
		<section className="p-4 d-flex flex-column justify-content-center align-items-center container">
			<h1>Welcome back, {user.username}!</h1>

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
				<div className="d-flex flex-wrap justify-content-center">
					{characters.map((character) => (
						<Card
							key={character._id}
							creature={character}
							cardStyle={character.type}
							setShowWarningModal={setShowWarningModal}
							setSelected={setSelected}
						/>
					))}
				</div>
			</section>

			{/* <section>
				<h2>Your Monsters</h2>
				<div className="d-flex flex-wrap justify-content-center">
					{user.monsters.map((monster) => (
						<Card
							key={monster._id}
							creature={monster}
							cardStyle={'monster'}
						/>
					))}
				</div>
			</section> */}

			{/* Character deletion */}
			<section className="danger-zone">
				<h2>Danger Zone!</h2>

				<div className="delete-account">
					<p>
						Are you sure that you want to delete your account? This
						will delete all decks, battles, and characters that you
						have made!
					</p>
					<Button
						variant="outline-danger"
						className="mx-auto delete-btn"
						onClick={handleDeleteAccount}
					>
						Yes, I would like to delete my account.
					</Button>
				</div>
			</section>

			{/* Hidden modal */}
			<WarningModal
				showWarning={showWarningModal}
				hideWarning={hideWarning}
				handleDelete={handleDeleteCharacter}
				thing={selected}
			/>
		</section>
	);
};

export default Profile;
