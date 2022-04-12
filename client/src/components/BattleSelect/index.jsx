import { Link } from 'react-router-dom';

const BattleSelect = () => {
	return (
		<div>
			<h1 className="text-center">Select a saved Battle</h1>
			<div className="container-fluid d-flex flex-wrap">
				<div className="card w-50 p-3">
					<h2 className="text-center">Example Battle</h2>

					<p>Used for testing with hard-coded data.</p>

					<Link className="btn btn-success" to={`/battles/001`}>
						Battle!
					</Link>
				</div>

				<div className="card w-50 p-3">
					<h2 className="text-center">Battle</h2>
					<p>Nothing here yet...</p>
					<Link
						className="btn btn-success disabled"
						to={`/battles/002`}
					>
						Battle!
					</Link>
				</div>
			</div>
		</div>
	);
};

export default BattleSelect;
