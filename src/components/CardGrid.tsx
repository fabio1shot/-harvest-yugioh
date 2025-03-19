
import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Card } from '@/lib/types';
import CardItem from './CardItem';

interface CardGridProps {
  cards: Card[];
  onCardClick: (card: Card) => void;
  isLoading: boolean;
}

const CardGrid: React.FC<CardGridProps> = ({ cards, onCardClick, isLoading }) => {
  if (isLoading) {
    return (
      <div className="w-full py-12 flex justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="relative w-16 h-16"
        >
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [1, 0.8, 1],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute inset-0 rounded-full border-4 border-t-primary border-r-transparent border-b-transparent border-l-transparent"
          />
          <motion.div
            animate={{ rotate: 360 }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute inset-0 rounded-full border-4 border-r-primary border-l-transparent border-t-transparent border-b-transparent"
          />
        </motion.div>
      </div>
    );
  }

  if (cards.length === 0) {
    return (
      <div className="w-full text-center py-12">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mx-auto max-w-md p-6 bg-white/60 backdrop-blur-sm rounded-xl shadow-sm border border-gray-200"
        >
          <h3 className="text-lg font-medium text-gray-900 mb-2">No cards found</h3>
          <p className="text-gray-500">
            Try adjusting your search criteria or filters to find what you're looking for.
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="card-grid"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6"
      >
        {cards.map((card, index) => (
          <CardItem 
            key={card.id} 
            card={card} 
            onClick={onCardClick}
            index={index}
          />
        ))}
      </motion.div>
    </AnimatePresence>
  );
};

export default CardGrid;
