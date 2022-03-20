import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
// import Card from './components/Card';
// import Home from './pages/Home';
// import Battle from './pages/Battle';
// import CreateBattle from './pages/CreateBattle';
import './App.scss';

function Home() {
	return (
		<>
			<main>
				<h2>Welcome to the homepage!</h2>
				<p>You can do this, I believe in you.</p>
			</main>
			<nav>
				<Link to="/about">About</Link>
			</nav>
		</>
	);
}

function About() {
	return (
		<>
			<main>
				<h2>Who are we?</h2>
				<p>That feels like an existential question, don't you think?</p>
			</main>
			<nav>
				<Link to="/">Home</Link>
			</nav>
		</>
	);
}

const App = () => {
	return (
		<div className="App">
			<h1>Welcome to React Router!</h1>
			<Routes>
				<Route exact path="/" element={<Home />} />
				<Route path="about" element={<About />} />
			</Routes>
		</div>
	);
};

export default App;
