import axios from 'axios';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { Link, useParams } from 'react-router-dom';
import { Layout } from '../../components/Layout';
import { IPokemon } from '../../components/PokemonCard';
import { StatsContainer } from '../../components/PokemonCard/StatsContainer';
import { decidePokemonType } from '../../utils/stringsModifiers';

export function PokemonPage() {
	const { pokemonName } = useParams();
	const [pokemonData, setPokemonData] = useState<IPokemon | null>(null);

	useEffect(() => {
		const fetchPokemons = async () => {
			try {
				const response = await axios.get(
					`${process.env.REACT_APP_API_URL}/pokemon/${pokemonName}`
				);
				const { name, stats, sprites, types, height, weight, id } =
					response.data;

				const formattedTypes = types.map((type: any) => type.type.name);
				setPokemonData({
					name,
					stats,
					sprites,
					types: formattedTypes,
					height,
					weight,
					id,
					qty: 0,
				});

				console.log(types);
			} catch (error) {
				console.log(error);
				toast.error(error.message);
			}
		};

		fetchPokemons();
	}, []);

	return (
		<Layout>
			<button>
				⬅️ <Link to={`/`}>Go to back</Link>
			</button>
			{pokemonData ? (
				<main className='flex align-center justify-center '>
					<div className=' text-center shadow-xl text-3xl items-center grid align-center p-8'>
						<div className='flex align-center justify-center'>
							<img
								className='h-60 w-60'
								src={pokemonData.sprites.front_default}
								alt={pokemonData.name}
							/>
						</div>
						<StatsContainer stats={pokemonData.stats} />
						<span className='capitalize text-4xl'>{pokemonData.name}</span>
						<span className='capitalize '>Weight: {pokemonData.weight}</span>
						<span className='capitalize '>Height: {pokemonData.height}</span>
						{pokemonData.types.map(type => (
							<span
								className={`stat-no-size mt-5 text-xl ${decidePokemonType(
									type,
									'color'
								)} capitalize`}
								key={type}
							>
								{decidePokemonType(type, 'emoji')} {type}
							</span>
						))}
					</div>
				</main>
			) : (
				'Pokemon not exists'
			)}
		</Layout>
	);
}
