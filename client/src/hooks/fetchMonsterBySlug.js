import { useState, useEffect } from 'react';
import open5e from '../api/open5e';

// API call to Open5e, used in 'src/components/CreateBattleForm
const fetchMonsterBySlug = (monster) => {
	let result = {};
	const timeoutId = setTimeout(() => {
		const fetch = async () => {
			try {
				const res = await open5e.get(`/monsters/${monster}`);
				result = res.data;
			} catch (err) {
				console.error(err);
			}
		};
		fetch();
	}, 500);
	clearTimeout(timeoutId);
	return result;
};

export default fetchMonsterBySlug;
