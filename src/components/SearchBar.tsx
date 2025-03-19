
import React, { useState, useRef, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface SearchBarProps {
  onSearch: (term: string) => void;
  placeholder?: string;
  initialTerm?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ 
  onSearch, 
  placeholder = 'Search cards...', 
  initialTerm = '' 
}) => {
  const [searchTerm, setSearchTerm] = useState(initialTerm);
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Focus the search bar on mount
  useEffect(() => {
    if (inputRef.current) {
      // Small delay to allow for animations
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 300);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  const clearSearch = () => {
    setSearchTerm('');
    onSearch('');
    inputRef.current?.focus();
  };

  return (
    <form 
      onSubmit={handleSearch} 
      className="relative w-full max-w-xl mx-auto animate-slide-down"
    >
      <div className="relative flex items-center">
        <Input
          ref={inputRef}
          type="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder={placeholder}
          className="w-full h-12 pl-12 pr-12 bg-white/70 backdrop-blur-sm border border-gray-200 rounded-full shadow-sm transition-all duration-300 focus:border-gray-300 focus:bg-white focus:shadow-md"
        />
        <Search className="absolute left-4 h-5 w-5 text-gray-400" />
        
        {searchTerm && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={clearSearch}
            className="absolute right-12 h-8 w-8 p-0 text-gray-400 hover:text-gray-700"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Clear search</span>
          </Button>
        )}
        
        <Button 
          type="submit" 
          size="icon" 
          className="absolute right-3 h-8 w-8 rounded-full bg-gray-800 hover:bg-gray-900 text-white transition-all duration-200"
        >
          <Search className="h-4 w-4" />
          <span className="sr-only">Search</span>
        </Button>
      </div>
    </form>
  );
};

export default SearchBar;
