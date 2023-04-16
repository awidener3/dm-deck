export default function Message({ heading, message }) {
	const style = {
		content: `flex flex-column justify-center`,
		messageContainer: `max-w-2xl bg-emerald-800 m-3 p-3 rounded shadow-lg`,
		contentTitle: `font-bold text-lg`,
		contentText: ``,
	};

	return (
		<section className={style.content}>
			<figure className={style.messageContainer}>
				<h2 className={style.contentTitle}>{heading}</h2>
				<p className={style.contentText}>{message}</p>
			</figure>
		</section>
	);
}
