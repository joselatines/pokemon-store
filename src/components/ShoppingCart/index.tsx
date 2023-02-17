import { NavLink } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { IPokemon } from '../PokemonCard';

function ShoppingCart(): JSX.Element {
	const { products } = useCart();

	const sumQty = (items: Array<IPokemon>) => {
		const result: number = items.reduce((total, item) => total + item.qty, 0);
		return result;
	};

	return (
		<NavLink to='/cart'>
			<div className='p-3 bg-white rounded drop-shadow-md'>
				<span>🛒 {sumQty(products)}</span>
			</div>
		</NavLink>
	);
}

export default ShoppingCart;
