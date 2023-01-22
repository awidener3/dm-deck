import { FaDiceD20 } from 'react-icons/fa';
import './loading.scss';

const Loading = () => {
	return (
		<section className="load-container">
			<FaDiceD20 className="load-spin" />
		</section>
	);
};

export default Loading;
