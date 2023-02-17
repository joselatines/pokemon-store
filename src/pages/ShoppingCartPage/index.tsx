import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { Layout } from '../../components/Layout';
import PokemonCard, { IPokemon } from '../../components/PokemonCard';

import { useCart } from '../../context/CartContext';

export function ShoppingCartPage() {
	const [products, setProducts] = useState([]);
	const [refresh, setRefresh] = useState(0);
	const { emptyCart } = useCart();

	useEffect(() => {
		console.log('Shopping cart renders');
		const savedProducts = JSON.parse(localStorage.getItem('products') || '[]');
		setProducts(savedProducts);
	}, [refresh]);

	const handleEmptyCart = () => {
		emptyCart();
		toast.success('Cart emptied');
		setRefresh(refresh + 1);
	};

	const handleRefresh = () => {
		toast.success('Page refreshed');
		setRefresh(refresh + 1);
	};

	return (
		<Layout>
			{products.length > 0 ? (
				<>
					<div className='flex flex-wrap gap-5'>
						<button onClick={handleRefresh}>🔁 Reload</button>
						<button onClick={handleEmptyCart}>🗑️ Empty cart</button>
					</div>
					<section className='flex flex-wrap gap-2 justify-center'>
						{products.map((pokemon: IPokemon) => (
							<PokemonCard key={pokemon.id} localStoragePokemon={pokemon} />
						))}
					</section>
				</>
			) : (
				'Not pokemons in the cart'
			)}
		</Layout>
	);
}
