import { Game, Achievement, Challenge, GameCategory, User } from '../types';

export const mockGames: Game[] = [
  {
    id: '1',
    title: 'Pixel Runner',
    description: 'Fast-paced endless runner with retro pixel graphics',
    thumbnail: 'https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Action',
    tags: ['runner', 'pixel', 'arcade'],
    rating: 4.5,
    plays: 15420,
    url: '/games/pixel-runner/index.html',
    featured: true,
    new: false,
    difficulty: 'Medium',
    createdAt: new Date('2024-01-15'),
  },
  {
    id: '2',
    title: 'Mind Maze',
    description: 'Challenge your brain with complex puzzles and riddles',
    thumbnail: 'https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Puzzle',
    tags: ['puzzle', 'brain', 'logic'],
    rating: 4.8,
    plays: 8930,
    url: '/games/mind-maze/index.html',
    featured: true,
    new: true,
    difficulty: 'Hard',
    createdAt: new Date('2024-02-20'),
  },
  {
    id: '3',
    title: 'Space Explorer',
    description: 'Navigate through cosmic adventures in this space odyssey',
    thumbnail: 'https://images.pexels.com/photos/586063/pexels-photo-586063.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Adventure',
    tags: ['space', 'exploration', 'sci-fi'],
    rating: 4.3,
    plays: 12750,
    url: '/games/space-explorer/index.html',
    featured: false,
    new: false,
    difficulty: 'Easy',
    createdAt: new Date('2024-01-08'),
  },
  {
    id: '4',
    title: 'Card Master',
    description: 'Strategic card battles with unique deck building mechanics',
    thumbnail: 'https://images.pexels.com/photos/1314410/pexels-photo-1314410.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Strategy',
    tags: ['cards', 'strategy', 'multiplayer'],
    rating: 4.6,
    plays: 9840,
    url: '/games/card-master/index.html',
    featured: false,
    new: true,
    difficulty: 'Hard',
    createdAt: new Date('2024-02-25'),
  },
  {
    id: '5',
    title: 'Rhythm Beat',
    description: 'Feel the music and hit the perfect beats',
    thumbnail: 'https://images.pexels.com/photos/164938/pexels-photo-164938.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Music',
    tags: ['rhythm', 'music', 'timing'],
    rating: 4.7,
    plays: 18650,
    url: '/games/rhythm-beat/index.html',
    featured: true,
    new: false,
    difficulty: 'Medium',
    createdAt: new Date('2024-01-30'),
  },
  {
    id: '6',
    title: 'Tower Defense Pro',
    description: 'Defend your base with strategic tower placement',
    thumbnail: 'https://images.pexels.com/photos/1194713/pexels-photo-1194713.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Strategy',
    tags: ['tower defense', 'strategy', 'waves'],
    rating: 4.4,
    plays: 11230,
    url: '/games/tower-defense-pro/index.html',
    featured: false,
    new: false,
    difficulty: 'Medium',
    createdAt: new Date('2024-01-12'),
  },
  // ADD YOUR NEW GAMES HERE - Just copy this template:
  /*
  {
    id: '7', // Increment the number
    title: 'Your Game Name',
    description: 'Description of your game',
    thumbnail: 'https://your-image-url.com/thumbnail.jpg', // Or use a Pexels image
    category: 'Action', // Action, Puzzle, Adventure, Strategy, Music, Sports, etc.
    tags: ['tag1', 'tag2', 'tag3'],
    rating: 4.5, // 0-5 stars
    plays: 1000, // Starting play count
    url: '/games/your-game-folder/index.html', // Path to your game
    featured: true, // true = shows on homepage, false = only in games library
    new: true, // true = shows "NEW" badge
    difficulty: 'Medium', // Easy, Medium, Hard
    createdAt: new Date('2024-03-01'), // Today's date
  },
  */
];

export const mockCategories: GameCategory[] = [
  { id: '1', name: 'Action', icon: 'Zap', count: 45 },
  { id: '2', name: 'Puzzle', icon: 'Brain', count: 32 },
  { id: '3', name: 'Adventure', icon: 'Map', count: 28 },
  { id: '4', name: 'Strategy', icon: 'Target', count: 19 },
  { id: '5', name: 'Music', icon: 'Music', count: 15 },
  { id: '6', name: 'Sports', icon: 'Trophy', count: 22 },
];

export const mockAchievements: Achievement[] = [
  {
    id: '1',
    title: 'First Play',
    description: 'Play your first game on Surge',
    icon: 'Play',
    rarity: 'Common',
    reward: 10,
    unlockedAt: new Date('2024-02-15'),
  },
  {
    id: '2',
    title: 'Game Explorer',
    description: 'Play games from 5 different categories',
    icon: 'Compass',
    rarity: 'Rare',
    reward: 50,
    unlockedAt: new Date('2024-02-20'),
  },
  {
    id: '3',
    title: 'Surge Veteran',
    description: 'Play for 30 consecutive days',
    icon: 'Calendar',
    rarity: 'Epic',
    reward: 100,
  },
  {
    id: '4',
    title: 'High Scorer',
    description: 'Achieve top 10 in any leaderboard',
    icon: 'Award',
    rarity: 'Legendary',
    reward: 200,
  },
];

export const mockChallenges: Challenge[] = [
  {
    id: '1',
    title: 'Daily Puzzle Master',
    description: 'Complete 3 puzzle games today',
    type: 'daily',
    target: 3,
    reward: 25,
    expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
    completed: false,
    progress: 0,
    difficulty: 'Medium',
    category: ''
  },
  {
    id: '2',
    title: 'Weekly Explorer',
    description: 'Try 10 new games this week',
    type: 'weekly',
    target: 10,
    reward: 100,
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    completed: false,
    progress: 0,
    difficulty: 'Medium',
    category: ''
  },
];

export const mockUser: User = {
  id: '1',
  email: 'player@surge.game',
  username: 'SurgePlayer',
  surgeCoins: 1250,
  level: 12,
  avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
  createdAt: new Date('2024-01-01'),
  lastActive: new Date(),
  achievements: mockAchievements.filter(a => a.unlockedAt),
  favorites: ['1', '2', '5'],
  recentGames: ['2', '1', '5', '3'],
  status: 'Ready to surge! 🎮',
};