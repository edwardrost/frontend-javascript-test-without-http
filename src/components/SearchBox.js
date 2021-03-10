import React from 'react';

const SearchBox = ({searchfield, searchChange}) => {
	return (
		<div className="db">
			<input
				className='w-30 tc mt2 pa2 ba br3 b--green' 
				type='search' 
				placeholder='Поиск. Начните набирать ...'
				onChange={searchChange}
			/>
		</div>
	);
}

export default SearchBox;