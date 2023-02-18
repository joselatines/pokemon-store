import { Link, NavLink } from 'react-router-dom';
import ShoppingCart from '../../ShoppingCart';

export function Navigation() {
	return (
		<nav className='flex items-center justify-between flex-wrap bg-cyan-400 p-6 mb-5'>
			<div className='flex items-center flex-shrink-0 text-white mr-6'>
				<span className='font-semibold text-3xl tracking-tight'>
					<Link to='/'>😻 Pokemon store</Link>
				</span>
			</div>

			<div className='w-full block flex-grow lg:flex lg:items-center lg:w-auto text-xl'>
				<div className=' lg:flex-grow'>
					<a
						href='#responsive-header'
						className='block mt-4 lg:inline-block lg:mt-0 text-purple-100 hover:text-white mr-4'
					>
						<Link to='/'>Pokemons</Link>
					</a>
				</div>
				<div>
					<ShoppingCart />
				</div>
			</div>
		</nav>
	);
}
