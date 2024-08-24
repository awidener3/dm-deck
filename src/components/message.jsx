export default function Message({ heading, message }) {
	// const style = {
	// 	content: `flex flex-column justify-center`,
	// 	messageContainer: `max-w-2xl bg-emerald-800 m-3 p-3 rounded shadow-lg`,
	// 	contentTitle: `font-bold text-lg`,
	// 	contentText: ``,
	// };

	return (
		<section>
			<figure>
				<h2>{heading}</h2>
				<p>{message}</p>
			</figure>
		</section>
	);
}
