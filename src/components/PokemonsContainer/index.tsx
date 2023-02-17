import axios from 'axios';
import toast from 'react-hot-toast';
import { useEffect, useState } from 'react';

import FilterNav from './FilterNav';
import { capitalize, extractNumber } from '../../utils/stringsModifiers';
import PokemonCard, { IPokemon } from '../PokemonCard';

const API_URL = process.env.REACT_APP_API_URL;

export default function PokemonsContainer() {
	const [pokemonsData, setPokemonsData] = useState({
		previous: null,
		next: null,
		results: [],
		typeName: '',
	});

	const fetchData = async (url: any, dataType: any = 'pokemons') => {
		try {
			const response = await axios.get(url);
			const data = response.data;
			console.log(data);

			if (dataType.includes('types')) {
				const newData = {
					previous: null,
					next: null,
					results: data.pokemon.map((el: any) => el.pokemon),
					typeName: data.name,
				};

				setPokemonsData(newData);
			} else {
				setPokemonsData(data);
			}
			console.log('✅: Data fetched!');
		} catch (error) {
			console.log(error);
			toast.error(error.message);
		}
	};

	useEffect(() => {
		async function fetchPokemons() {
			try {
				const response = await axios.get(`${API_URL}/pokemon`);
				const data = response.data;
				setPokemonsData(data);
				console.log('✅: Pokemons fetched!');
			} catch (error) {
				console.log(error);
				toast.error(error.message);
			}
		}

		fetchPokemons();
	}, []);

	const handlePrevClick = () => {
		fetchData(pokemonsData.previous);
	};

	const handleNextClick = () => {
		fetchData(pokemonsData.next);
	};

	return (
		<section>
			<FilterNav fetchPokemons={fetchData} />
			{pokemonsData?.typeName && (
				<h2 className='text-xl font-black'>
					Pokemons type: <span>{capitalize(pokemonsData.typeName)}</span>
				</h2>
			)}
			<nav className='flex justify-center mt-5 gap-5'>
				{pokemonsData.previous && (
					<button onClick={handlePrevClick}>
						{extractNumber(pokemonsData.previous)} Prev
					</button>
				)}

				{pokemonsData.next && (
					<button onClick={handleNextClick}>
						Next {extractNumber(pokemonsData.next)}
					</button>
				)}
			</nav>

			<main className='flex flex-wrap gap-2 min-h-screen justify-center'>
				{pokemonsData.results.length > 0 ? (
					pokemonsData.results.map((pokemon: IPokemon) => (
						<PokemonCard key={pokemon.name} url={pokemon.url} />
					))
				) : (
					<p>Not pokemons founded</p>
				)}
			</main>
			<nav className='flex justify-center mt-5 gap-5'>
				{pokemonsData.previous && (
					<button onClick={handlePrevClick}>
						{extractNumber(pokemonsData.previous)} Prev
					</button>
				)}

				{pokemonsData.next && (
					<button onClick={handleNextClick}>
						Next {extractNumber(pokemonsData.next)}
					</button>
				)}
			</nav>
		</section>
	);
}
