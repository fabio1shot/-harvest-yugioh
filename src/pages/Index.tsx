
import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Header from '@/components/Header';
import SearchBar from '@/components/SearchBar';
import SearchFilters from '@/components/SearchFilters';
import CardGrid from '@/components/CardGrid';
import CardDetail from '@/components/CardDetail';
import { Card, CardFilter } from '@/lib/types';
import { searchCards } from '@/lib/api';

const Index = () => {
  const [filters, setFilters] = useState<CardFilter>({});
  const [cards, setCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);
  const [initialLoad, setInitialLoad] = useState(true);
  
  // Fetch cards when filters change
  useEffect(() => {
    const fetchCards = async () => {
      setLoading(true);
      try {
        const results = await searchCards(filters);
        setCards(results);
      } catch (error) {
        console.error('Error fetching cards:', error);
      } finally {
        setLoading(false);
        if (initialLoad) setInitialLoad(false);
      }
    };
    
    fetchCards();
  }, [filters, initialLoad]);
  
  const handleSearch = (searchTerm: string) => {
    setFilters(prev => ({
      ...prev,
      searchTerm
    }));
  };
  
  const handleFilterChange = (newFilters: CardFilter) => {
    setFilters(newFilters);
  };
  
  const handleCardClick = (card: Card) => {
    setSelectedCard(card);
    document.body.style.overflow = 'hidden';
  };
  
  const handleCloseDetail = () => {
    setSelectedCard(null);
    document.body.style.overflow = '';
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <AnimatePresence>
        {initialLoad ? (
          <motion.div 
            className="fixed inset-0 bg-white z-50 flex items-center justify-center"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-center"
            >
              <motion.div
                className="w-16 h-16 bg-gradient-to-tr from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center text-white mx-auto mb-4"
                animate={{ 
                  rotate: [0, 10, 0, -10, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  duration: 2, 
                  ease: "easeInOut",
                  repeat: Infinity
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </motion.div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">CardVault</h1>
              <p className="text-gray-600">Your premium card collection</p>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
      
      <main className="pt-24 pb-16 page-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Card Database</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Search through our collection of premium cards. Use the filters to narrow down your search.
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8"
        >
          <SearchBar onSearch={handleSearch} />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-8"
        >
          <SearchFilters filters={filters} onFilterChange={handleFilterChange} />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <CardGrid 
            cards={cards} 
            onCardClick={handleCardClick} 
            isLoading={loading} 
          />
        </motion.div>
      </main>
      
      <CardDetail card={selectedCard} onClose={handleCloseDetail} />
    </div>
  );
};

export default Index;
