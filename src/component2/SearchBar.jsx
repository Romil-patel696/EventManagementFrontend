import React, { useEffect, useState } from 'react';

const SearchBar = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleChange = (e) => {
        setSearchTerm(e.target.value);
        
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(searchTerm);
    };
   
    

    return (
        <form onSubmit={handleSubmit}>
            <div className='search-box'>
            <input
            className='search-input'
                type="text"
                placeholder="Search for events..."
                value={searchTerm}
                onChange={handleChange}
            />
            <button className='search-btn' type="submit">Search</button>
        </div></form>
    );
};

export default SearchBar;
