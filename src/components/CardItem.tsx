
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card as CardType } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

interface CardItemProps {
  card: CardType;
  onClick: (card: CardType) => void;
  index: number;
}

const CardItem: React.FC<CardItemProps> = ({ card, onClick, index }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Determine rarity color
  const getRarityColor = (rarity: string) => {
    switch (rarity.toLowerCase()) {
      case 'common': return 'bg-gray-100 text-gray-800';
      case 'uncommon': return 'bg-green-100 text-green-800';
      case 'rare': return 'bg-blue-100 text-blue-800';
      case 'epic': return 'bg-purple-100 text-purple-800';
      case 'legendary': return 'bg-amber-100 text-amber-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  
  // Determine card type icon/color
  const getTypeStyles = (type: string) => {
    switch (type.toLowerCase()) {
      case 'unit': return 'bg-red-50 text-red-600';
      case 'spell': return 'bg-blue-50 text-blue-600';
      case 'artifact': return 'bg-amber-50 text-amber-600';
      default: return 'bg-gray-50 text-gray-600';
    }
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.4, 
        delay: index * 0.05, 
        ease: [0.22, 1, 0.36, 1] 
      }}
    >
      <Card 
        className="overflow-hidden cursor-pointer group card-hover"
        onClick={() => onClick(card)}
      >
        <div className="relative aspect-[3/4] overflow-hidden">
          <div 
            className={`absolute top-2 left-2 z-10 px-2 py-1 rounded-md text-xs font-medium ${getTypeStyles(card.type)}`}
          >
            {card.type}
          </div>
          
          <div 
            className={`absolute top-2 right-2 z-10 px-2 py-1 rounded-md text-xs font-medium ${getRarityColor(card.rarity)}`}
          >
            {card.rarity}
          </div>
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex items-end">
            <div className="p-4 text-white">
              <p className="text-sm line-clamp-2">{card.cardText}</p>
            </div>
          </div>
          
          <img
            src={card.image}
            alt={card.name}
            className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-105 ${isLoaded ? 'loaded' : 'lazy-image'}`}
            onLoad={() => setIsLoaded(true)}
          />
        </div>
        
        <CardContent className="p-3">
          <h3 className="font-medium text-gray-900 mb-1 line-clamp-1">{card.name}</h3>
          
          {card.stats && (
            <div className="flex items-center gap-2 mb-2">
              {card.stats.mana !== undefined && (
                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                  {card.stats.mana} Mana
                </Badge>
              )}
              
              {card.stats.power !== undefined && card.stats.health !== undefined && (
                <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                  {card.stats.power}/{card.stats.health}
                </Badge>
              )}
            </div>
          )}
          
          <div className="flex flex-wrap gap-1 mt-1">
            {card.tags.slice(0, 2).map(tag => (
              <Badge key={tag} variant="secondary" className="text-xs bg-gray-100">
                {tag}
              </Badge>
            ))}
            {card.tags.length > 2 && (
              <Badge variant="secondary" className="text-xs bg-gray-100">
                +{card.tags.length - 2}
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default CardItem;
