import changelog from 'changelog';

const HomeChangelog = () => {
	return (
		<section>
			<h2>Changelog</h2>

			{changelog.version.map((version) => (
				<div key={version.name}>
					<h3>{version.name}</h3>
					<ul>
						{version.changes.map((change) => (
							<li key={change}>{change}</li>
						))}
					</ul>
				</div>
			))}
		</section>
	);
};

export default HomeChangelog;
