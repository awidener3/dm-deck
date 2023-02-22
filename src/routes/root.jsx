import { useEffect, useState } from 'react';
import { Outlet, NavLink, useNavigation } from 'react-router-dom';
import { GiPerson, GiSwordClash, GiHouse } from 'react-icons/gi';

export default function Root() {
	const [windowDimension, setWindowDimension] = useState(null);

	const navigation = useNavigation();

	useEffect(() => {
		setWindowDimension(window.innerWidth);
	}, []);

	useEffect(() => {
		function handleResize() {
			setWindowDimension(window.innerWidth);
		}

		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	const isMobile = windowDimension <= 640;

	const style = {
		header: `flex justify-between bg-black p-3`,
		mobileHeader: `flex justify-center bg-black p-3 fixed bottom-0 w-full justify-center`,
		title: `text-4xl text-white font-bold`,
		red: `text-red-700`,
		list: `flex items-center gap-3`,
		mobileList: `flex items-center justify-around gap-3 w-full`,
	};

	return (
		<>
			{isMobile ? (
				<nav className={style.mobileHeader}>
					<ul className={style.mobileList}>
						<li className={style.li}>
							<NavLink
								to={`/build/battle`}
								className={({ isActive, isPending }) =>
									isActive ? 'active' : isPending ? 'pending' : ''
								}
							>
								<GiSwordClash size={30} />
							</NavLink>
						</li>
						<li className={style.li}>
							<NavLink
								to={`/`}
								className={({ isActive, isPending }) =>
									isActive ? 'active' : isPending ? 'pending' : ''
								}
							>
								<GiHouse size={30} />
							</NavLink>
						</li>
						<li className={style.li}>
							<NavLink
								to={`/build/character`}
								className={({ isActive, isPending }) =>
									isActive ? 'active' : isPending ? 'pending' : ''
								}
							>
								<GiPerson size={30} />
							</NavLink>
						</li>
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
						<li className={style.li}>
							<NavLink
								to={`/build/battle`}
								className={({ isActive, isPending }) =>
									isActive ? 'active' : isPending ? 'pending' : ''
								}
							>
								Battle Builder
							</NavLink>
						</li>
						<li className={style.li}>
							<NavLink
								to={`/build/character`}
								className={({ isActive, isPending }) =>
									isActive ? 'active' : isPending ? 'pending' : ''
								}
							>
								Character Builder
							</NavLink>
						</li>
					</ul>
				</nav>
			)}

			<div
				id="content"
				className={navigation.state === 'loading' ? 'loading' : ''}
			>
				<Outlet />
			</div>
		</>
	);
}
