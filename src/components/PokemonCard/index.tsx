import axios from 'axios';
import toast from 'react-hot-toast';
import { useEffect, useState } from 'react';
import { capitalize } from '../../utils/stringsModifiers';
import { StatsContainer } from './StatsContainer';
import { useCart } from '../../context/CartContext';

export interface IPokemon {
	name: string;
	qty: number;
	url?: string;
	sprites: {
		back_default: string;
		back_female: string;
		back_shiny: string;
		back_shiny_female: null | string;
		front_default: string;
		front_female: string;
		front_shiny: string;
		front_shiny_female: null | string;
	};
	id: number;
	types: string[];
	stats: {
		stat: {
			name: string;
		};
		base_stat: number;
	}[];
	height?: number;
	weight?: number;
}

interface Props {
	url?: string;
	refresh?: number;

	localStoragePokemon?: IPokemon | false;
}

export default function PokemonCard({
	url,
	refresh,
	localStoragePokemon = false,
}: Props) {
	const [pokemon, setPokemon] = useState<IPokemon | null>(null);
	const { addToCart, removeFromCart } = useCart();

	useEffect(() => {
		const fetchPokemon = async () => {
			if (url) {
				try {
					const response = await axios.get<IPokemon>(url);
					const { name, id, sprites, types, stats } = response.data;
					setPokemon({ name, id, sprites, types, stats, qty: 0 });
				} catch (error) {
					console.log(error);
					toast.error(error.message);
				}
			}
		};

		if (localStoragePokemon === false) {
			fetchPokemon();
		}
	}, [url, refresh, localStoragePokemon]);

	const handleAddOne = (localStoragePokemon: IPokemon) => {
		addToCart(localStoragePokemon);
		toast.success(`${localStoragePokemon.name} added 1`);

		toast('Press "Reload" button to se changes');
	};

	const handleRemoveOne = (pokemonId: number) => {
		removeFromCart(pokemonId);
		toast.success(`Pokemon deleted 1 from the cart`);

		toast('Press "Reload" button to see changes');
	};
	if (localStoragePokemon) {
		return (
			<div className='relative max-w-sm rounded overflow-hidden shadow-lg p-4 grid justify-items-center gap-4'>
				<img
					className='h-60 w-60'
					src={localStoragePokemon.sprites.front_default}
					alt={localStoragePokemon.name}
				/>
				<h3 className='font-bold text-xl mb-2'>
					{capitalize(localStoragePokemon.name)}
				</h3>
				<StatsContainer stats={localStoragePokemon.stats} />
				<span className='absolute top-5 right-5 stat bg-green-400'>
					{localStoragePokemon.qty}
				</span>
				<div className='flex flex-wrap gap-5'>
					<button onClick={() => handleAddOne(localStoragePokemon)}>
						➕ Add to Cart
					</button>
					<button onClick={() => handleRemoveOne(localStoragePokemon.id)}>
						🗑️ Remove One
					</button>
				</div>
			</div>
		);
	}

	return (
		<>
			{pokemon ? (
				<div className='max-w-sm rounded overflow-hidden shadow-lg p-4 grid justify-items-center gap-4'>
					<img
						className='h-60 w-60'
						src={pokemon.sprites.front_default}
						alt={pokemon.name}
					/>
					<h3 className='font-bold text-xl mb-2'>{capitalize(pokemon.name)}</h3>
					<StatsContainer stats={pokemon.stats} />
					<button className='mt-5' onClick={() => addToCart(pokemon)}>
						Add to Cart 🛒
					</button>
				</div>
			) : (
				<svg
					className='animate-spin h-5 w-5 mr-3 ...'
					viewBox='0 0 24 24'
				></svg>
			)}
		</>
	);
}
