import { useState, useEffect } from 'react';
import open5e from '../api/open5e';

// API call to Open5e, used in 'src/components/CreateBattleForm
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
							`/monsters/?limit=10&search=${monsterData.slug}`
						);
						setMonsterData({ ...monsterData, results: res.data });
					} catch (err) {
						console.error(err);
					}
				};
				fetch();
			}, 500);
			return () => clearTimeout(timeoutId);
		} else {
			setMonsterData({ slug: '', results: [] });
		}
	}, [monsterData.slug]);

	return { monsterData, setMonsterData };
};

export default useFetchMonsters;
