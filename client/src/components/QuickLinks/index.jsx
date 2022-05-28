import './quicklink.scss';
import { Link } from 'react-router-dom';

const QuickLinks = () => {
	return (
		<div className="d-flex flex-wrap justify-content-center">
			<Link to={'create-battle'}>
				<div className="quicklink-div">
					<h3 className="m-0">New Battle</h3>
				</div>
			</Link>
			<Link to={'create-character'}>
				<div className="quicklink-div">
					<h3 className="m-0">New Character</h3>
				</div>
			</Link>
			<Link to={'create-monster'}>
				<div className="quicklink-div">
					<h3 className="m-0">New Monster</h3>
				</div>
			</Link>
		</div>
	);
};

export default QuickLinks;
