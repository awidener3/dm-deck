import { useQuery } from '@apollo/client';
import { QUERY_ME, QUERY_USER_CHARACTERS } from '../../utils/queries';
import Card from './ProfileCard';
import { Alert } from 'react-bootstrap';

import './profile.scss';

const Profile = () => {
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
	// Database Results
	const user = user_data?.me || [];
	const characters = characters_data?.userCharacters || [];

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
		</section>
	);
};

export default Profile;
