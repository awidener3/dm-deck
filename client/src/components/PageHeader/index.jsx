import './pageHeader.scss';

const PageHeader = ({ image, pageTitle }) => {
	return (
		<div
			className="page-header"
			style={{
				backgroundImage: image,
				backgroundRepeat: 'no-repeat',
				backgroundSize: 'cover',
			}}
		>
			<h1 className="text-center">{pageTitle}</h1>
			<div className="lower-fade"></div>
		</div>
	);
};

export default PageHeader;
