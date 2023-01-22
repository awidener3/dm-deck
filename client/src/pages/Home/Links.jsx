import { Link } from 'react-router-dom';
import battle_deck_select from 'assets/images/battle_deck_select.png';
import character_builder from 'assets/images/character_builder.png';
import battle_builder from 'assets/images/battle_builder.png';
import monster_builder from 'assets/images/monster_builder.png';

const HomeLinks = () => {
	const linkImages = [
		{
			image: battle_deck_select,
			alt: 'Link to battle and deck select',
			endpoint: 'battle-select',
		},
		{
			image: battle_builder,
			alt: 'Link to the battle builder',
			endpoint: 'battle-builder',
		},
		{
			image: character_builder,
			alt: 'Link to the character builder',
			endpoint: 'character-builder',
		},
		{
			image: monster_builder,
			alt: 'Link to the monster builder',
			endpoint: 'monster-builder',
		},
	];

	const QuickLink = ({ link }) => (
		<Link to={link.endpoint} className="mx-2">
			<img
				className="quick-link"
				src={link.image}
				alt={link.alt}
				width={350}
				height={175}
			/>
		</Link>
	);

	return (
		<section className="d-flex flex-wrap justify-content-center mb-3">
			{linkImages.map((link) => (
				<QuickLink link={link} key={link.endpoint} />
			))}
		</section>
	);
};

export default HomeLinks;
