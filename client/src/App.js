import React from 'react';
import Header from './components/Header';
// Added for router
import { Outlet, Link } from 'react-router-dom';
import { setContext } from '@apollo/client/link/context';
import {
	ApolloClient,
	InMemoryCache,
	ApolloProvider,
	createHttpLink,
} from '@apollo/client';
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
	link: authLink.concat(httpLink),
	cache: new InMemoryCache(),
});

const App = () => {
	return (
		<ApolloProvider client={client}>
			<div className="App">
				<Header />

				<Outlet />
			</div>
		</ApolloProvider>
	);
};

export default App;
