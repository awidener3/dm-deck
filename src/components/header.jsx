import { GiSwordClash, GiHouse } from 'react-icons/gi';
import { NavLink } from 'react-router-dom';
import { BsHammer } from 'react-icons/bs';

export default function Header({ mobile }) {
	const style = {
		header: `flex justify-between bg-black p-3`,
		mobileHeader: `flex justify-center bg-black p-3 fixed bottom-0 w-full justify-center`,
		title: `text-5xl text-white font-bold font-draconis`,
		red: `text-red-700`,
		list: `flex items-center gap-3`,
		mobileList: `flex items-center justify-around gap-3 w-full`,
	};

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
			title: 'Battle Select',
		},
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
				<nav className={style.mobileHeader}>
					<ul className={style.mobileList}>
						{mobileRoutes.map((route, i) => (
							<li key={i} className={style.li}>
								<NavLink
									to={route.path}
									className={({ isActive, isPending }) =>
										isActive ? 'active' : isPending ? 'pending' : ''
									}
								>
									{route.icon}
								</NavLink>
							</li>
						))}
					</ul>
				</nav>
			) : (
				<nav className={style.header}>
					<NavLink to={`/`}>
						<h1 className={style.title}>
							<span className={style.red}>DM</span>Deck
						</h1>
					</NavLink>

					<ul className={style.list}>
						{routes.map((route, i) => (
							<li key={i} className={style.li}>
								<NavLink
									to={route.path}
									className={({ isActive, isPending }) =>
										isActive ? 'active' : isPending ? 'pending' : ''
									}
								>
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
