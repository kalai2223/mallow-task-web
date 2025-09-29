import React from 'react';

import { Input } from 'antd';

const { Search } = Input;

interface SearchBarProps {
  placeholder?: string;
  onSearch: (value: string) => void;
  allowClear?: boolean;
  size?: 'small' | 'middle' | 'large';
  className?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = 'Search...',
  onSearch,
  allowClear = true,
  size = 'middle',
  className = '',
}) => {
  return (
    <Search
      placeholder={placeholder}
      allowClear={allowClear}
      size={size}
      className={className}
      onSearch={onSearch}
    />
  );
};

export default SearchBar;
