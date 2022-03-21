import React from 'react';
import Card from '../components/Card';
import Hero from '../components/Hero';
import monsters from '../components/Card/cardData';

const Battle = () => {
	return (
		<div className="p-4 d-flex flex-column justify-content-center align-items-center container">
			<h1>Example Battle</h1>

			<Hero />
			
			<div className="card-container">
				{monsters.map((monster, index) => (
					<Card key={index} monster={monster} />
				))}
			</div>
		</div>
	);
};

export default Battle;
