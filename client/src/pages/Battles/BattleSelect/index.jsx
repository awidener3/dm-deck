import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import { QUERY_ME } from 'utils/queries';
import { DELETE_BATTLE } from 'utils/mutations';
import { useQuery, useMutation } from '@apollo/client';

import Summary from './Summary';
import SummaryAccordion from './SummaryAccordion';

const BattleSelect = () => {
	const [battles, setBattles] = useState([]);
	const [deleteBattle, { deleteError }] = useMutation(DELETE_BATTLE, {
		update(cache, { data: { deleteBattle } }) {
			try {
				cache.writeQuery({
					query: QUERY_ME,
					data: { me: deleteBattle },
				});
			} catch (e) {
				console.error(e);
			}
		},
	});

	const { loading, error, data } = useQuery(QUERY_ME);
	const user = data?.me || data?.user || [];

	useEffect(() => {
		if (user) {
			setBattles(user.battles);
		}
	}, [user]);

	console.log('battles: ', battles);

	const handleDeleteBattle = (selectedBattle) => {
		let updatedArray = battles.slice();

		updatedArray = updatedArray.filter(
			(battle) => battle !== selectedBattle
		);

		const id = selectedBattle._id;
		setBattles(updatedArray);
		deleteBattle({
			variables: { id },
		});
	};

	if (loading) return <div>Loading...</div>;
	if (!user?.username) return <h4>You need to be logged in to see this.</h4>;
	if (error) return <div>ERROR!</div>;

	return (
		<div className="py-4">
			<h1 className="text-center">Select a Saved Battle</h1>
			<div className="d-flex justify-content-center create-btn-container">
				<Link to={'/create-battle'} className="create-btn">
					&#43;
				</Link>
			</div>
			<div className="container d-flex flex-wrap justify-content-center">
				{battles ? (
					battles.map((battle) => {
						return (
							<div key={battle._id} className="p-2">
								<div className="card custom-card">
									<h2 className="text-center">
										{battle.name}
									</h2>

									<hr />

									<div className="card-body">
										<Summary battle={battle} />

										{/* Initiative Roll */}
										<Form>
											<Form.Check
												type="switch"
												label="Auto-roll Initiative (not implemented)"
												defaultChecked={true}
											/>
										</Form>

										<SummaryAccordion battle={battle} />
									</div>

									{/* Buttons */}
									<div className="button-container mt-auto d-flex justify-content-center">
										<Link
											className="btn btn-outline-primary me-2"
											to={`/battles/${battle._id}`}
										>
											Battle!
										</Link>

										<button
											className="btn btn-outline-danger ms-2"
											onClick={() =>
												handleDeleteBattle(battle)
											}
										>
											Delete
										</button>
									</div>
								</div>
							</div>
						);
					})
				) : (
					<div>
						<h2 className="mx-auto">No battles yet!</h2>
					</div>
				)}
			</div>
		</div>
	);
};

export default BattleSelect;
