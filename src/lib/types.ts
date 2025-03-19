
export interface Card {
  id: string;
  name: string;
  type: string;
  rarity: string;
  cardText: string;
  flavor?: string;
  category?: string;
  stats?: {
    power?: number;
    health?: number;
    mana?: number;
  };
  image: string;
  tags: string[];
}

export type CardFilter = {
  type?: string;
  rarity?: string;
  category?: string;
  searchTerm?: string;
  tags?: string[];
};

export interface SearchState {
  filters: CardFilter;
  results: Card[];
  loading: boolean;
}
