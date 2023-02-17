import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function SearchInput() {
	const [query, setQuery] = useState('');
	const navigate = useNavigate();

	const handleSearch = () => {
		navigate(`/pokemon/${query}`);
	};

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setQuery(event.target.value);
	};

	const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Enter') {
			handleSearch();
		}
	};

	return (
		<div className='relative mr-6 my-2 '>
			<input
				type='text'
				placeholder='Search...'
				value={query}
				onChange={handleInputChange}
				onKeyPress={handleKeyPress}
				className='bg-purple-white w-1/2 drop-shadow-2xl rounded border-0 p-3'
			/>
			<button className='drop-shadow-2xl' onClick={handleSearch}>
				Search
			</button>
		</div>
	);
}
