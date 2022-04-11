import { useState, useEffect } from 'react';
import open5e from '../api/open5e';

const useFetchMonsters = () => {
	const [monsterData, setMonsterData] = useState({
		slug: '',
		results: [],
	});

	useEffect(() => {
		if (monsterData.slug !== '') {
			const timeoutId = setTimeout(() => {
				const fetch = async () => {
					try {
						const res = await open5e.get(
							`/monsters/?search=${monsterData.slug}`
						);
						console.log(res);
						setMonsterData({ ...monsterData, results: res.data });
					} catch (err) {
						console.error(err);
					}
				};
				fetch();
			}, 1000);
			return () => clearTimeout(timeoutId);
		}
	}, [monsterData.slug]);

	return { monsterData, setMonsterData };
};

export default useFetchMonsters;
