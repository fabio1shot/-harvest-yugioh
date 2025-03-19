
import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, Shield, Swords, Droplet } from 'lucide-react';
import { Card as CardType } from '@/lib/types';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface CardDetailProps {
  card: CardType | null;
  onClose: () => void;
}

const CardDetail: React.FC<CardDetailProps> = ({ card, onClose }) => {
  if (!card) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden"
        >
          <div className="flex flex-col md:flex-row">
            {/* Card Image */}
            <div className="w-full md:w-2/5 relative overflow-hidden">
              <div className="bg-gradient-to-br from-gray-900/90 to-gray-900/30 absolute inset-0 z-10" />
              
              <img
                src={card.image}
                alt={card.name}
                className="w-full h-full object-cover md:object-cover"
                style={{ minHeight: '300px' }}
              />
              
              <div className="absolute top-4 left-4 right-4 z-20 flex justify-between items-start">
                <div className="space-y-2">
                  <Badge className="bg-white/90 text-gray-900 backdrop-blur-xs border-0">
                    {card.type}
                  </Badge>
                  
                  <Badge className="bg-white/90 text-gray-900 backdrop-blur-xs border-0">
                    {card.rarity}
                  </Badge>
                </div>
                
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onClose}
                  className="h-8 w-8 rounded-full bg-white/80 backdrop-blur-xs text-gray-900 hover:bg-white"
                >
                  <X className="h-4 w-4" />
                  <span className="sr-only">Close</span>
                </Button>
              </div>
              
              <div className="absolute bottom-0 left-0 right-0 z-20 p-4 text-white">
                <h2 className="text-2xl font-bold">{card.name}</h2>
                {card.category && (
                  <p className="text-white/80 text-sm">{card.category}</p>
                )}
              </div>
            </div>
            
            {/* Card Details */}
            <div className="w-full md:w-3/5 p-6 space-y-4">
              {/* Stats */}
              {card.stats && (
                <div className="flex gap-3">
                  {card.stats.mana !== undefined && (
                    <div className="flex items-center p-2 bg-blue-50 rounded-lg">
                      <Droplet className="h-5 w-5 text-blue-600 mr-2" />
                      <div>
                        <p className="text-xs text-blue-600 font-medium">Mana</p>
                        <p className="text-lg font-bold text-blue-700">{card.stats.mana}</p>
                      </div>
                    </div>
                  )}
                  
                  {card.stats.power !== undefined && (
                    <div className="flex items-center p-2 bg-red-50 rounded-lg">
                      <Swords className="h-5 w-5 text-red-600 mr-2" />
                      <div>
                        <p className="text-xs text-red-600 font-medium">Power</p>
                        <p className="text-lg font-bold text-red-700">{card.stats.power}</p>
                      </div>
                    </div>
                  )}
                  
                  {card.stats.health !== undefined && (
                    <div className="flex items-center p-2 bg-green-50 rounded-lg">
                      <Shield className="h-5 w-5 text-green-600 mr-2" />
                      <div>
                        <p className="text-xs text-green-600 font-medium">Health</p>
                        <p className="text-lg font-bold text-green-700">{card.stats.health}</p>
                      </div>
                    </div>
                  )}
                </div>
              )}
              
              {/* Card Text */}
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-gray-500">Card Text</h3>
                <p className="text-gray-900">{card.cardText}</p>
              </div>
              
              {/* Flavor Text */}
              {card.flavor && (
                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-gray-500">Flavor</h3>
                  <p className="text-gray-600 italic">{card.flavor}</p>
                </div>
              )}
              
              <Separator />
              
              {/* Tags */}
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-gray-500">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {card.tags.map(tag => (
                    <Badge key={tag} variant="outline" className="bg-gray-50">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div className="pt-4">
                <Button
                  variant="outline"
                  onClick={onClose}
                  className="w-full transition-all duration-200"
                >
                  Close
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default CardDetail;
