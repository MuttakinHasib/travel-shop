import React, { useState } from 'react';
import { Input } from '@geist-ui/react';
import { Search } from '@geist-ui/react-icons';

const SearchProducts = ({ filterProducts }) => {
  const [query, setQuery] = useState('');
  const onChange = e => {
    setQuery(e.target.value);
    filterProducts(e.target.value);
  };

  return (
    <Input
      icon={<Search />}
      autoFocus
      placeholder='Search products...'
      value={query}
      onChange={onChange}
    />
  );
};

export default SearchProducts;
