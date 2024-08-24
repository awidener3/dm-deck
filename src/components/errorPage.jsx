import { useRouteError, useNavigate } from 'react-router-dom';

export default function ErrorPage() {
	const error = useRouteError();
  const navigate = useNavigate();

	return (
		<main id="error-page">
			<h1>Oops!</h1>

			<p>Sorry, an unexpected error has occurred.</p>

			<p>
				<i>{error.statusText || error.message}</i>
			</p>
      
      <button onClick={() => navigate(-1)}>Go back</button>
		</main>
	);
}
