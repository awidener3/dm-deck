export default function Splash({ heading, background }) {
	const style = {
		splash: `h-40 w-full flex justify-center items-center ${background} bg-center bg-no-repeat bg-cover`,
		splashTitle: `text-4xl font-bold text-slate-200 drop-shadow-md`,
	};

	return (
		<figure className={style.splash}>
			<h2 className={style.splashTitle}>{heading}</h2>
		</figure>
	);
}
