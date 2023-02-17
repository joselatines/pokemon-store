interface Stat {
	stat: {
		name: string;
	};
	base_stat: number;
}

interface Props {
	stats: Stat[];
}

const ALLOWED_STATS = ['hp', 'defense', 'attack'];

export function StatsContainer({ stats }: Props) {
	const filteredStats = stats.filter(({ stat }) =>
		ALLOWED_STATS.includes(stat.name)
	);

	const decideStyle = (statName: string) => {
		switch (statName) {
			case 'hp':
				return 'bg-green-400 ';
			case 'defense':
				return 'bg-yellow-400 ';
			case 'attack':
				return 'bg-red-400 text-white';
			default:
				return '';
		}
	};

	const decideEmoji = (statName: string) => {
		switch (statName) {
			case 'hp':
				return '💓';
			case 'defense':
				return '🛡️';
			case 'attack':
				return '⚔️';
			default:
				return '';
		}
	};

	return (
		<ul className='flex flex-wrap'>
			{filteredStats.map(({ stat, base_stat }) => (
				<li className={`stat ${decideStyle(stat.name)}`} key={stat.name}>
					{decideEmoji(stat.name)}: {base_stat} <br />
				</li>
			))}
		</ul>
	);
}
