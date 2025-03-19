
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Filter, ChevronDown, ChevronUp, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { CardFilter } from '@/lib/types';
import { getUniqueValues, getUniqueTags } from '@/lib/api';

interface SearchFiltersProps {
  filters: CardFilter;
  onFilterChange: (newFilters: CardFilter) => void;
}

const SearchFilters: React.FC<SearchFiltersProps> = ({ filters, onFilterChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [types, setTypes] = useState<string[]>([]);
  const [rarities, setRarities] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Fetch filter options
  useEffect(() => {
    const fetchFilterOptions = async () => {
      setLoading(true);
      try {
        const [typesData, raritiesData, categoriesData, tagsData] = await Promise.all([
          getUniqueValues('type'),
          getUniqueValues('rarity'),
          getUniqueValues('category'),
          getUniqueTags()
        ]);
        
        setTypes(typesData);
        setRarities(raritiesData);
        setCategories(categoriesData);
        setTags(tagsData);
      } catch (error) {
        console.error('Error fetching filter options:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchFilterOptions();
  }, []);
  
  const handleFilterChange = (key: keyof CardFilter, value: string | null) => {
    const newFilters = { ...filters };
    
    if (key === 'tags') {
      if (!value) {
        newFilters.tags = undefined;
      } else {
        const currentTags = newFilters.tags || [];
        if (currentTags.includes(value)) {
          newFilters.tags = currentTags.filter(tag => tag !== value);
          if (newFilters.tags.length === 0) {
            newFilters.tags = undefined;
          }
        } else {
          newFilters.tags = [...currentTags, value];
        }
      }
    } else {
      // @ts-ignore: Dynamic property access
      if (value === null || value === newFilters[key]) {
        // @ts-ignore: Dynamic property access
        newFilters[key] = undefined;
      } else {
        // @ts-ignore: Dynamic property access
        newFilters[key] = value;
      }
    }
    
    onFilterChange(newFilters);
  };
  
  const clearAllFilters = () => {
    onFilterChange({
      searchTerm: filters.searchTerm
    });
  };
  
  // Count active filters (excluding search term)
  const activeFiltersCount = Object.entries(filters)
    .filter(([key, value]) => key !== 'searchTerm' && value !== undefined)
    .length + (filters.tags?.length || 0);
  
  return (
    <div className="w-full max-w-5xl mx-auto bg-white/60 backdrop-blur-sm rounded-xl border border-gray-200 shadow-sm overflow-hidden transition-all duration-300">
      <Button
        variant="ghost"
        className="w-full flex items-center justify-between px-4 py-3 h-auto text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4" />
          <span className="font-medium">Filters</span>
          {activeFiltersCount > 0 && (
            <Badge variant="secondary" className="ml-2 bg-primary/10 text-primary">
              {activeFiltersCount}
            </Badge>
          )}
        </div>
        {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
      </Button>
      
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="px-4 pb-4"
        >
          {loading ? (
            <div className="py-4 text-center text-sm text-muted-foreground">
              Loading filter options...
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {/* Types */}
                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-gray-700">Card Type</h3>
                  <div className="flex flex-wrap gap-2">
                    {types.map(type => (
                      <Badge
                        key={type}
                        variant={filters.type === type ? "default" : "outline"}
                        className="cursor-pointer hover:bg-secondary transition-colors"
                        onClick={() => handleFilterChange('type', type)}
                      >
                        {type}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                {/* Rarities */}
                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-gray-700">Rarity</h3>
                  <div className="flex flex-wrap gap-2">
                    {rarities.map(rarity => (
                      <Badge
                        key={rarity}
                        variant={filters.rarity === rarity ? "default" : "outline"}
                        className="cursor-pointer hover:bg-secondary transition-colors"
                        onClick={() => handleFilterChange('rarity', rarity)}
                      >
                        {rarity}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                {/* Categories */}
                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-gray-700">Category</h3>
                  <div className="flex flex-wrap gap-2">
                    {categories.map(category => (
                      <Badge
                        key={category}
                        variant={filters.category === category ? "default" : "outline"}
                        className="cursor-pointer hover:bg-secondary transition-colors"
                        onClick={() => handleFilterChange('category', category)}
                      >
                        {category}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                {/* Tags */}
                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-gray-700">Tags</h3>
                  <div className="flex flex-wrap gap-2 max-h-24 overflow-y-auto subtle-scroll">
                    {tags.map(tag => (
                      <Badge
                        key={tag}
                        variant={filters.tags?.includes(tag) ? "default" : "outline"}
                        className="cursor-pointer hover:bg-secondary transition-colors"
                        onClick={() => handleFilterChange('tags', tag)}
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
              
              <Separator className="my-4" />
              
              <div className="flex justify-between items-center">
                <div className="text-sm text-muted-foreground">
                  {activeFiltersCount === 0 ? (
                    'No active filters'
                  ) : (
                    <span>
                      {activeFiltersCount} active filter{activeFiltersCount > 1 ? 's' : ''}
                    </span>
                  )}
                </div>
                
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-sm"
                  onClick={clearAllFilters}
                  disabled={activeFiltersCount === 0}
                >
                  <X className="mr-1 h-3 w-3" />
                  Clear all
                </Button>
              </div>
            </>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default SearchFilters;
