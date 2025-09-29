import React from 'react';

import { Input } from 'antd';

const { Search } = Input;

interface SearchBarProps {
  placeholder?: string;
  onSearch: (value: string) => void;
  allowClear?: boolean;
  size?: 'small' | 'middle' | 'large';
  className?: string;
  onClear?: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = 'Search...',
  onSearch,
  allowClear = true,
  size = 'middle',
  className = '',
  onClear,
}) => {
  return (
    <Search
      placeholder={placeholder}
      allowClear={allowClear}
      size={size}
      className={className}
      onSearch={onSearch}
      onClear={onClear}
    />
  );
};

export default SearchBar;
