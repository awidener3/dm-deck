import { Link } from 'react-router-dom';
import Message from '../components/message';
import character_builder from '../assets/images/character_builder.png';
import battle_builder from '../assets/images/battle_builder.png';
import battle_deck_select from '../assets/images/battle_deck_select.png';
import monster_builder from '../assets/images/monster_builder.png';

export default function Index() {
	const style = {
		splash: `w-full bg-black h-64 flex justify-center items-center `,
		splashTitle: `text-7xl font-draconis font-bold text-red-700`,
		splashSubtitle: `text-white`,
		linksContainer: `grid grid-cols-2 max-w-2xl pl-0 pr-6`,
		link: `w-100`,
	};

	const homeMsg =
		"This D&D tool was made to make the battle process easier in your games. Build your PC's, create battles, and run them with automatic initiative tracking, spell and ability reference, and more!";

	const links = [
		{
			image: battle_deck_select,
			alt: 'Link to battle and deck select',
			endpoint: '/battles',
		},
		{
			image: battle_builder,
			alt: 'Link to the battle builder',
			endpoint: '/build/battle',
		},
		{
			image: character_builder,
			alt: 'Link to the party builder',
			endpoint: '/build/party',
		},
		{
			image: monster_builder,
			alt: 'Link to the monster builder',
			endpoint: '/build/monster',
		},
	];

	return (
		<>
			<figure className={style.splash}>
				<h2 className={style.splashTitle}>
					DM<span className={style.splashSubtitle}>Deck</span>
				</h2>
			</figure>

			<Message heading={'Welcome to DM Deck!'} message={homeMsg} />

			<section className={style.linksContainer}>
				{links.map((link, index) => (
					<section key={index} className={style.link}>
						<Link to={link.endpoint}>
							<img src={link.image} alt={link.alt} />
						</Link>
					</section>
				))}
			</section>
		</>
	);
}
