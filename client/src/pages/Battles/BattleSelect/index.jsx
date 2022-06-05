import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import { QUERY_ME } from 'utils/queries';
import { DELETE_BATTLE } from 'utils/mutations';
import { useQuery, useMutation } from '@apollo/client';
import { RiSwordFill, RiEditLine } from 'react-icons/ri';
import { FiTrash2 } from 'react-icons/fi';

import Summary from './Summary';
import SummaryAccordion from './SummaryAccordion';

const BattleSelect = ({ background = 'back_1.jpg' }) => {
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

			{/* Corner Button */}
			<div className="d-flex justify-content-center create-btn-container">
				<Link to={'/create-battle'} className="create-btn">
					&#43;
				</Link>
			</div>

			<div className="container d-flex flex-wrap justify-content-center">
				{/* Example Decks */}
				<div
					className="m-2 card battle-deck d-flex justify-content-center"
					style={{
						backgroundImage: background
							? `url(${require('assets/images/' + background)})`
							: 'none',
						backgroundRepeat: 'no-repeat',
						backgroundSize: 'cover',
					}}
				>
					<h2 className="battle-deck-title text-center">Deck #1</h2>
					<div className="nested-deck"></div>
					<div className="double-nested-deck"></div>
				</div>

				<div
					className="m-2 card battle-deck d-flex justify-content-center"
					style={{
						backgroundImage: background
							? `url(${require('assets/images/back_17.jpg')})`
							: 'none',
						backgroundRepeat: 'no-repeat',
						backgroundSize: 'cover',
					}}
				>
					<h2 className="battle-deck-title text-center">TOA</h2>
					<div className="nested-deck"></div>
					<div className="double-nested-deck"></div>
				</div>

				{/* Cards */}
				{battles ? (
					battles.map((battle) => {
						return (
							<div
								key={battle._id}
								className="p-2"
								draggable="true"
							>
								<div className="card battle-card p-3">
									<h2 className="battle-card-title text-center">
										{battle.name}
									</h2>

									<hr />

									<div className="card-body">
										<Summary battle={battle} />

										{/* Initiative Roll */}
										<Form>
											<Form.Check
												type="switch"
												label="Auto-roll Initiative"
												defaultChecked={true}
											/>
										</Form>

										<SummaryAccordion battle={battle} />
									</div>

									{/* Buttons */}
									<div className="button-container mt-auto d-flex justify-content-center">
										<button
											className="btn btn-outline-danger m-1"
											title="Delete Battle"
											onClick={() =>
												handleDeleteBattle(battle)
											}
										>
											<FiTrash2 size={'1.5rem'} />
										</button>
										<Link
											className="btn btn-outline-secondary disabled m-1"
											title="Edit Card"
											to={`/battles/${battle._id}`}
										>
											<RiEditLine size={'1.5rem'} />
										</Link>
										<Link
											className="btn btn-outline-primary m-1"
											title="Start Battle"
											to={`/battles/${battle._id}`}
										>
											<RiSwordFill size={'1.5rem'} />
										</Link>
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
