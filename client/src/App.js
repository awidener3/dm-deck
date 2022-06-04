import React from 'react';
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
import Battles from './pages/Battles';
import Battle from './pages/Battles/Battle';
import BattleSelect from './pages/Battles/BattleSelect';
import CreateBattle from './pages/CreateBattle';
import CreateCharacter from './pages/CreateCharacter';
import CreateMonster from './pages/CreateMonster';
import Legal from './pages/Legal';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile/Profile';

import './App.scss';

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
	return (
		<ApolloProvider client={client}>
			<Router>
				<div className="App">
					<Header />

					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/battles" element={<Battles />}>
							<Route index element={<BattleSelect />} />
							<Route
								path="/battles/:battleId"
								element={<Battle />}
							/>
						</Route>
						<Route
							path="/create-battle"
							element={<CreateBattle />}
						/>
						<Route
							path="/create-character"
							element={<CreateCharacter />}
						/>
						<Route
							path="/create-monster"
							element={<CreateMonster />}
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
