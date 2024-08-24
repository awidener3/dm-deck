import { Alert } from 'react-bootstrap';
import { GiBrokenAxe } from 'react-icons/gi';

const ErrorMessage = () => {
	return (
		<Alert
			variant="warning"
			className="p-2 d-flex align-items-center flex-column flex-sm-row"
		>
			<GiBrokenAxe size={'50px'} className="mx-3" />
			<div className="d-flex flex-column">
				<p className="m-0 fw-bold">Uh oh! The kobolds could not sign you in.</p>
				<p className="m-0">
					Double check your email address and password, and make sure it's in
					Common!
				</p>
			</div>
		</Alert>
	);
};

export default ErrorMessage;
