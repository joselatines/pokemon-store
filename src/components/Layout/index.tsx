import { Toaster } from 'react-hot-toast';
import Footer from '../shared/Footer';
import { Navigation } from '../shared/Navigation';

export function Layout({ children }: any) {
	return (
		<>
			<Navigation />
			<main className='container mx-auto p-6 min-h-screen'>{children}</main>
			<Footer/>
			<Toaster />
		</>
	);
}
