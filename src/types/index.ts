export interface User {
  id: string;
  email: string;
  username: string;
  surgeCoins: number;
  level: number;
  avatar?: string;
  createdAt: Date;
  lastActive: Date;
  achievements: Achievement[];
  favorites: string[];
  recentGames: string[];
  status?: string;
  ownedItems?: string[];
  equippedItems?: {
    avatar?: string;
    theme?: string;
    badge?: string;
  };
}

export interface Game {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  category: string;
  tags: string[];
  rating: number;
  plays: number;
  url: string;
  featured: boolean;
  new: boolean;
  difficulty?: 'Easy' | 'Medium' | 'Hard';
  createdAt: Date;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  rarity: 'Common' | 'Rare' | 'Epic' | 'Legendary';
  reward: number;
  unlockedAt?: Date;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  type: 'daily' | 'weekly' | 'special';
  progress: number;
  target: number;
  reward: number;
  expiresAt: Date;
  completed: boolean;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: string;
}

export interface GameCategory {
  id: string;
  name: string;
  icon: string;
  count: number;
}

export interface ShopItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'avatar' | 'theme' | 'badge' | 'boost';
  rarity: 'Common' | 'Rare' | 'Epic' | 'Legendary';
  owned?: boolean;
  preview?: string;
  duration?: number; // For boosts, in hours
}