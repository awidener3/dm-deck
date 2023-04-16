import { useEffect, useState } from 'react';
import { Outlet, useNavigation } from 'react-router-dom';
import Header from '../components/header';

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

	return (
		<>
			<Header mobile={isMobile} />

			<div
				id="content"
				className={
					navigation.state === 'loading'
						? 'loading'
						: 'flex flex-col justify-center items-center'
				}
			>
				<Outlet />
			</div>
		</>
	);
}
