const capitalize = (str: string): string => {
	return str.charAt(0).toUpperCase() + str.slice(1);
};

function extractNumber(str: string): number | null {
	const index = str.indexOf('=');
	if (index === -1) {
		return null;
	}
	const numStr = str.substring(index + 1).match(/\d+/)?.[0];
	return numStr ? parseInt(numStr) : null;
}

const decidePokemonType = (typeName: string, decide: string) => {
	if (decide === 'color') {
		switch (typeName) {
			case 'normal':
				return 'bg-gray-400 text-white';
			case 'fighting':
				return 'bg-red-400 text-white';
			case 'poison':
				return 'bg-purple-400 text-white';
			case 'flying':
				return 'bg-sky-500 text-white';
			case 'ground':
				return 'bg-emerald-400 text-white';
			case 'rock':
				return 'bg-neutral-800 text-white';
			case 'bug':
				return 'bg-green-400 text-white';
			case 'ghost':
				return 'bg-gray-100 text-black';
			case 'steel':
				return 'bg-gray-200 text-black';
			case 'fire':
				return 'bg-orange-400 text-white';
			case 'water':
				return 'bg-blue-200 text-white';
			case 'electric':
				return 'bg-yellow-400 text-white';
			case 'psychic':
				return 'bg-orange-200 text-white';
			case 'ice':
				return 'bg-violet-300 text-white';
			case 'dragon':
				return 'bg-red-500 text-white';
			case 'fairy':
				return 'bg-amber-300 text-white';
			case 'dark':
				return 'bg-neutral-900 text-white';
			case 'unknown':
				return 'bg-cyan-400 text-white';
			case 'shadow':
				return 'bg-stone-700 text-white';
			default:
				return 'bg-gray-400 text-white';
		}
	} else if (decide === 'emoji') {
		switch (typeName) {
			case 'normal':
				return '😀';
			case 'fighting':
				return '⚔️';
			case 'poison':
				return '😮‍💨';
			case 'flying':
				return '🐦';
			case 'ground':
				return '⛱️';
			case 'rock':
				return '🪨';
			case 'bug':
				return '🐛';
			case 'ghost':
				return '👻';
			case 'steel':
				return '⛏️';
			case 'fire':
				return '🔥';
			case 'water':
				return '💧';
			case 'electric':
				return '🔌';
			case 'psychic':
				return '🧠';
			case 'ice':
				return '🧊';
			case 'dragon':
				return '🐲';
			case 'fairy':
				return '🧚';
			case 'dark':
				return '☠️';
			case 'unknown':
				return '❓';
			case 'shadow':
				return '👥';
			default:
				return '😅';
		}
	}
};

export { capitalize, extractNumber, decidePokemonType };
