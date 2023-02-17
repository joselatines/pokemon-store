import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { Home } from './pages/Home';
import { PokemonPage } from './pages/PokemonPage';
import { ShoppingCartPage } from './pages/ShoppingCartPage';

function App(): JSX.Element {
	return (
		<CartProvider>
			<BrowserRouter>
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/pokemon/:pokemonName' element={<PokemonPage />} />
					<Route path='/cart' element={<ShoppingCartPage />} />
				</Routes>
			</BrowserRouter>
		</CartProvider>
	);
}

export default App;
