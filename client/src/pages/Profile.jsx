import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_USER, QUERY_ME } from '../utils/queries';

import Auth from '../utils/auth';

const Profile = () => {
	const { username: userParam } = useParams();
	const { loading, error, data } = useQuery(
		userParam ? QUERY_USER : QUERY_ME,
		{ variables: { username: userParam } }
	);

	const user = data?.me || data?.user || [];
	console.log(user);
	// navigate to personal profile page if username is yours
	// if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
	// 	return <h1>Hi</h1>;
	// }

	if (loading) return <div>Loading...</div>;
	if (!user?.username) return <h4>You need to be logged in to see this.</h4>;
	if (error) return <div>ERROR!</div>;

	return (
		<div className="p-4 d-flex flex-column justify-content-center align-items-center container">
			<h1>Welcome back, {user.username}</h1>

			<p>
				The kobolds are still working here, but don't worry! You'll be
				seeing updates as soon as they are ready!
			</p>
		</div>
	);
};

export default Profile;
