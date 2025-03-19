
import { Card, CardFilter } from './types';

// Mock card data based on the reference
export const mockCards: Card[] = [
  {
    id: '1',
    name: 'Arcane Scholar',
    type: 'Unit',
    rarity: 'Rare',
    cardText: 'When played: Draw a card.',
    flavor: 'Knowledge is the greatest power of all.',
    category: 'Spellcaster',
    stats: {
      power: 2,
      health: 2,
      mana: 3
    },
    image: 'https://placehold.co/300x420/black/white?text=Arcane+Scholar',
    tags: ['Draw', 'Spellcaster', 'Arcane']
  },
  {
    id: '2',
    name: 'Mystic Barrier',
    type: 'Spell',
    rarity: 'Common',
    cardText: 'Prevent the next 3 damage that would be dealt to your hero.',
    flavor: 'A shimmer in the air is all that betrays its presence.',
    category: 'Protection',
    stats: {
      mana: 2
    },
    image: 'https://placehold.co/300x420/purple/white?text=Mystic+Barrier',
    tags: ['Defense', 'Magic']
  },
  {
    id: '3',
    name: 'Steel Guardian',
    type: 'Unit',
    rarity: 'Epic',
    cardText: 'Taunt. Takes half damage from spells.',
    flavor: 'Forged in the eternal flames of the underworld.',
    category: 'Warrior',
    stats: {
      power: 4,
      health: 6,
      mana: 5
    },
    image: 'https://placehold.co/300x420/silver/white?text=Steel+Guardian',
    tags: ['Taunt', 'Warrior', 'Anti-magic']
  },
  {
    id: '4',
    name: 'Nature\'s Wrath',
    type: 'Spell',
    rarity: 'Legendary',
    cardText: 'Deal 5 damage to all enemy units.',
    flavor: 'When nature fights back, there is nowhere to hide.',
    category: 'Destruction',
    stats: {
      mana: 7
    },
    image: 'https://placehold.co/300x420/green/white?text=Nature\'s+Wrath',
    tags: ['AOE', 'Damage', 'Nature']
  },
  {
    id: '5',
    name: 'Swift Assassin',
    type: 'Unit',
    rarity: 'Uncommon',
    cardText: 'Stealth. When this attacks, deal 2 additional damage.',
    flavor: 'You\'ll never see her coming.',
    category: 'Rogue',
    stats: {
      power: 3,
      health: 2,
      mana: 4
    },
    image: 'https://placehold.co/300x420/black/white?text=Swift+Assassin',
    tags: ['Stealth', 'Damage', 'Rogue']
  },
  {
    id: '6',
    name: 'Holy Light',
    type: 'Spell',
    rarity: 'Common',
    cardText: 'Restore 5 health to any target.',
    flavor: 'The divine knows no limits to its mercy.',
    category: 'Healing',
    stats: {
      mana: 3
    },
    image: 'https://placehold.co/300x420/gold/white?text=Holy+Light',
    tags: ['Heal', 'Divine']
  },
  {
    id: '7',
    name: 'Shadow Walker',
    type: 'Unit',
    rarity: 'Epic',
    cardText: 'Can attack immediately. Gains +1/+1 when an enemy dies.',
    category: 'Assassin',
    stats: {
      power: 2,
      health: 3,
      mana: 4
    },
    image: 'https://placehold.co/300x420/darkgray/white?text=Shadow+Walker',
    tags: ['Charge', 'Growth', 'Shadow']
  },
  {
    id: '8',
    name: 'Dragon\'s Roar',
    type: 'Spell',
    rarity: 'Legendary',
    cardText: 'Summon a 5/5 Dragon with Flying.',
    flavor: 'The skies belong to those who claim them.',
    category: 'Summoning',
    stats: {
      mana: 6
    },
    image: 'https://placehold.co/300x420/red/white?text=Dragon\'s+Roar',
    tags: ['Dragon', 'Summon', 'Flying']
  }
];

// Get all unique values for a specific property across all cards
export const getUniqueValues = (property: keyof Card | keyof Card['stats'], cards = mockCards): string[] => {
  if (property === 'stats') {
    return [];
  }
  
  if (property in (mockCards[0].stats || {})) {
    return Array.from(new Set(
      cards
        .map(card => card.stats && card.stats[property as keyof Card['stats']])
        .filter(Boolean)
        .map(String)
    )).sort();
  }
  
  return Array.from(new Set(
    cards
      .map(card => card[property as keyof Card])
      .filter(Boolean)
      .map(String)
  )).sort();
};

// Get all unique tags
export const getUniqueTags = (cards = mockCards): string[] => {
  const allTags = cards.flatMap(card => card.tags);
  return Array.from(new Set(allTags)).sort();
};

// Filter cards based on the provided filters
export const filterCards = (filters: CardFilter, cards = mockCards): Card[] => {
  return cards.filter(card => {
    // Type filter
    if (filters.type && card.type !== filters.type) {
      return false;
    }
    
    // Rarity filter
    if (filters.rarity && card.rarity !== filters.rarity) {
      return false;
    }
    
    // Category filter
    if (filters.category && card.category !== filters.category) {
      return false;
    }
    
    // Tags filter
    if (filters.tags && filters.tags.length > 0) {
      if (!filters.tags.some(tag => card.tags.includes(tag))) {
        return false;
      }
    }
    
    // Search term (name or text)
    if (filters.searchTerm) {
      const searchTermLower = filters.searchTerm.toLowerCase();
      const nameMatch = card.name.toLowerCase().includes(searchTermLower);
      const textMatch = card.cardText.toLowerCase().includes(searchTermLower);
      const flavorMatch = card.flavor?.toLowerCase().includes(searchTermLower);
      
      if (!(nameMatch || textMatch || (flavorMatch || false))) {
        return false;
      }
    }
    
    return true;
  });
};

// Simulate an API call with a delay
export const searchCards = async (filters: CardFilter): Promise<Card[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const filteredCards = filterCards(filters);
      resolve(filteredCards);
    }, 300); // Simulate network delay
  });
};
