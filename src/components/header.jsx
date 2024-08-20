import { GiSwordClash, GiHouse } from 'react-icons/gi';
import { NavLink } from 'react-router-dom';
import { BsHammer } from 'react-icons/bs';

export default function Header({ mobile }) {
	const routes = [
		{
			path: '/',
			title: 'Home',
		},
		{
			path: '/build/battle',
			title: 'Battle Builder',
		},
		{
			path: '/build/party',
			title: 'Party Builder',
		},
		{
			path: '/build/monster',
			title: 'Monster Builder',
		},
		{
			path: '/battles',
			title: 'Battles',
		}
	];

	const mobileRoutes = [
		{
			path: '/build',
			icon: <BsHammer size={30} />,
		},
		{
			path: '/',
			icon: <GiHouse size={30} />,
		},
		{
			path: '/battles',
			icon: <GiSwordClash size={30} />,
		},
	];

	return (
		<>
			{mobile ? (
				<nav className='header'>
					<ul>
						{mobileRoutes.map((route, i) => (
							<li key={i}>
								<NavLink to={route.path} className={({ isActive, isPending }) => isActive ? 'active' : isPending ? 'pending' : ''}>
									{route.icon}
								</NavLink>
							</li>
						))}
					</ul>
				</nav>
			) : (
				<nav className='header'>
					<NavLink to={`/`}>
						<h1>
							<span>DM</span>Deck
						</h1>
					</NavLink>

					<ul>
						{routes.map((route, i) => (
							<li key={i}>
								<NavLink to={route.path} className={({ isActive, isPending }) => isActive ? 'active' : isPending ? 'pending' : ''}>
									{route.title}
								</NavLink>
							</li>
						))}
					</ul>
				</nav>
			)}
		</>
	);
}
