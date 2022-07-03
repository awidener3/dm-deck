import useLocalStorage from 'use-local-storage';
import { Outlet } from 'react-router-dom';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
	ApolloClient,
	InMemoryCache,
	ApolloProvider,
	createHttpLink,
} from '@apollo/client';

import Header from './components/Header';
import Home from './pages/Home';
import Battle from './pages/Battle';
import BattleSelect from './pages/BattleSelect';
import BattleBuilder from './pages/BattleBuilder';
import CharacterBuilder from 'pages/CharacterBuilder';
import MonsterBuilder from './pages/MonsterBuilder';
import Legal from './pages/Legal';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';

import './App.scss';
import Collection from 'pages/BattleSelect/Collection';

const httpLink = createHttpLink({
	uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
	const token = localStorage.getItem('id_token');
	return {
		headers: {
			...headers,
			authorization: token ? `Bearer ${token}` : '',
		},
	};
});

const client = new ApolloClient({
	// Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
	link: authLink.concat(httpLink),
	cache: new InMemoryCache({
		addTypename: false,
	}),
});

const App = () => {
	const defaultDark = window.matchMedia(
		'(prefers-color-scheme: dark)'
	).matches;
	const [theme, setTheme] = useLocalStorage(
		'theme',
		defaultDark ? 'dark' : 'light'
	);

	const switchTheme = () => {
		const newTheme = theme === 'light' ? 'dark' : 'light';
		setTheme(newTheme);
	};

	return (
		<ApolloProvider client={client}>
			<Router>
				<div className="App" data-theme={theme}>
					<Header theme={theme} handleTheme={switchTheme} />

					<Routes>
						<Route path="/" element={<Home />} />
						<Route
							path="/battle-select"
							element={<BattleSelect />}
						/>
						<Route
							path="/collection/:collectionId"
							element={<Collection />}
						/>
						<Route path="/battle/:battleId" element={<Battle />} />
						<Route
							path="/battle-builder"
							element={<BattleBuilder />}
						/>
						<Route
							path="/character-builder"
							element={<CharacterBuilder />}
						/>
						<Route
							path="/monster-builder"
							element={<MonsterBuilder />}
						/>
						<Route path="/legal" element={<Legal />} />
						<Route path="/login" element={<Login />} />
						<Route path="/me" element={<Profile />} />
						<Route
							path="/profile/:username"
							element={<Profile />}
						/>
						<Route path="/signup" element={<Signup />} />
						<Route
							path="/*"
							element={
								<main>
									<p>There's nothing here!</p>
								</main>
							}
						/>
					</Routes>
					<Outlet />
				</div>
			</Router>
		</ApolloProvider>
	);
};

export default App;
