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

const Profile = () => {
	const navigate = useNavigate();
	const [selected, setSelected] = useState({});

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
	const hideWarning = () => {
		console.log('attempting to hide warning modal');
		setShowWarningModal(false);
	};

	const handleDelete = async (character) => {
		console.log(`deleting ${character.character_name}...${character._id}`);
		const characterId = character._id;
		try {
			const { data } = await deleteCharacter({
				variables: { characterId },
			});
			console.log(`✅ ${character.character_name} was deleted!\n`, data);
			setShowWarningModal(false);
		} catch (err) {
			console.error('💥 Error deleting character\n', err);
		}
	};

	const handleDeleteAccount = async () => {
		console.log('user about to delete account');
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
	if (!user?.username) return <h4>You need to be logged in to see this.</h4>;
	if (user_error || characters_error) return <div>ERROR!</div>;

	return (
		<section className="p-4 d-flex flex-column justify-content-center align-items-center container">
			<h1>Welcome back, {user.username}!</h1>

			<Alert variant="danger">
				<Alert.Heading className="my-2 text-center">
					🚧 UNDER CONSTRUCTION 🚧
				</Alert.Heading>
				<p className="m-0">
					The kobolds are still working here, but don't worry! You'll
					be seeing updates as soon as they are ready.
				</p>
			</Alert>

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

			<WarningModal
				showWarning={showWarningModal}
				hideWarning={hideWarning}
				handleDelete={handleDelete}
				thing={selected}
			/>
		</section>
	);
};

export default Profile;
