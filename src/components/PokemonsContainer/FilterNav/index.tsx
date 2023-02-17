import { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { capitalize, decidePokemonType } from '../../../utils/stringsModifiers';
import { SearchInput } from './SearchInput';

interface PokemonType {
	name: string;
	url: string;
}

interface Props {
	fetchPokemons: (url?: any, searchType?: string) => void;
}

export default function FilterNav({ fetchPokemons }: Props) {
	const [pokemonTypes, setPokemonTypes] = useState<PokemonType[]>([]);

	useEffect(() => {
		const fetchPokemonTypes = async () => {
			try {
				const response = await axios.get(
					`${process.env.REACT_APP_API_URL}/type`
				);
				setPokemonTypes(response.data.results);
			} catch (error) {
				console.log(error);
				toast.error(error.message);
			}
		};

		fetchPokemonTypes();
	}, []);

	return (
		<nav className='mb-10'>
			<SearchInput />
			<ul className='flex flex-wrap'>
				<li>
					<button
						onClick={() => fetchPokemons('https://pokeapi.co/api/v2/pokemon')}
						className='stat bg-gray-200 text-black'
					>
						All types
					</button>
				</li>
				{pokemonTypes.map(type => (
					<li
						className={`stat ${decidePokemonType(type.name, 'color')}`}
						key={type.name}
					>
						<span onClick={() => fetchPokemons(type.url, 'types')}>
							{capitalize(type.name)}
						</span>
					</li>
				))}
			</ul>
		</nav>
	);
}
