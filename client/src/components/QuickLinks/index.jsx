import './quicklink.scss';

const QuickLinks = () => {
	return (
		<div className="d-flex flex-wrap justify-content-center">
			<a href="/create-battle">
				<div className="quicklink-div">
					<h3 className="m-0">Create a Battle</h3>
				</div>
			</a>
			<a href="/create-character">
				<div className="quicklink-div">
					<h3 className="m-0">New Character</h3>
				</div>
			</a>
			<a href="/create-monster">
				<div className="quicklink-div">
					<h3 className="m-0">Custom Monster</h3>
				</div>
			</a>
		</div>
	);
};

export default QuickLinks;
