
import { Card, CardFilter } from './types';

// Cache for card data
let cardCache: Card[] | null = null;

// Fetch cards from db.json
const fetchCardsFromDb = async (): Promise<Card[]> => {
  if (cardCache) {
    return cardCache;
  }

  try {
    const response = await fetch('/db.json');
    if (!response.ok) {
      throw new Error('Failed to fetch card data');
    }
    const data = await response.json();
    cardCache = data.cards;
    return data.cards;
  } catch (error) {
    console.error('Error fetching cards:', error);
    return [];
  }
};

// Get all unique values for a specific property across all cards
export const getUniqueValues = async (property: keyof Card | keyof Card['stats']): Promise<string[]> => {
  const cards = await fetchCardsFromDb();
  
  if (property === 'stats') {
    return [];
  }
  
  if (property in ((cards[0] || {}).stats || {})) {
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
export const getUniqueTags = async (): Promise<string[]> => {
  const cards = await fetchCardsFromDb();
  const allTags = cards.flatMap(card => card.tags);
  return Array.from(new Set(allTags)).sort();
};

// Filter cards based on the provided filters
export const filterCards = async (filters: CardFilter): Promise<Card[]> => {
  const cards = await fetchCardsFromDb();
  
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
  // Add a small delay to simulate network request
  return new Promise((resolve) => {
    setTimeout(async () => {
      const filteredCards = await filterCards(filters);
      resolve(filteredCards);
    }, 300);
  });
};
