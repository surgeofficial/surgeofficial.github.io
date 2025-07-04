import { Game, Achievement, Challenge, GameCategory, User } from '../types';
53
export const mockGames: Game[] = [
  {
    id: '1',
    title: 'Basketball Random',
    description: 'Fast-paced basketball game with retro pixel graphics',
    thumbnail: '/games/basketballRandom/splash.jpeg',
    preview: '/games/basketballRandom/preview.mp4', // Add your preview video here
    previewType: 'video', // or 'image' if you use a preview image
    category: 'Sports',
    tags: ['basketball', 'pixel', 'sports'],
    rating: 4,
    plays: 0,
    url: '/games/basketballRandom/index.html',
    featured: true,
    new: true,
    difficulty: 'Medium',
    createdAt: new Date('6-24-2025'),
  },
  {
    id: '2',
    title: '8 Ball Pool',
    description: 'Nice and calming game of pool.',
    thumbnail: '/games/8-ball/IMG_2666.png',
    preview: '/games/8-ball/preview.mp4', // Add your preview video here
    previewType: 'video', // or 'image' if you use a preview image
    category: 'Sports',
    tags: ['calm', 'pool', 'sports'],
    rating: 3.5,
    plays: 0,
    url: '/games/8-ball/index.html',
    featured: false,
    new: true,
    difficulty: 'Easy',
    createdAt: new Date('7-4-2025'),
  },
  {
    id: '3',
    title: '2048',
    description: 'A fun number game that can be played calmly or strategically.',
    thumbnail: '/games/2048/favicon.ico',
    preview: '/games/2048/preview.mp4', // Add your preview video here
    previewType: 'video', // or 'image' if you use a preview image
    category: 'Puzzle',
    tags: ['puzzle','numbers', 'strategic'],
    rating: 3.5,
    plays: 0,
    url: '/games/2048/index.html',
    featured: true,
    new: true,
    difficulty: 'Easy',
    createdAt: new Date('7-4-2025'),
  },
  {
    id: '4',
    title: 'Basketball Random',
    description: 'Fast-paced basketball game with retro pixel graphics',
    thumbnail: '/games/basketballRandom/splash.jpeg',
    preview: '/games/basketballRandom/preview.mp4', // Add your preview video here
    previewType: 'video', // or 'image' if you use a preview image
    category: 'Sports',
    tags: ['basketball', 'pixel', 'sports'],
    rating: 4,
    plays: 0,
    url: '/games/basketballRandom/index.html',
    featured: true,
    new: true,
    difficulty: 'Medium',
    createdAt: new Date('6-24-2025'),
  },
  {
    id: '5',
    title: 'Basketball Random',
    description: 'Fast-paced basketball game with retro pixel graphics',
    thumbnail: '/games/basketballRandom/splash.jpeg',
    preview: '/games/basketballRandom/preview.mp4', // Add your preview video here
    previewType: 'video', // or 'image' if you use a preview image
    category: 'Sports',
    tags: ['basketball', 'pixel', 'sports'],
    rating: 4,
    plays: 0,
    url: '/games/basketballRandom/index.html',
    featured: true,
    new: true,
    difficulty: 'Medium',
    createdAt: new Date('6-24-2025'),
  },
  {
    id: '6',
    title: 'Basketball Random',
    description: 'Fast-paced basketball game with retro pixel graphics',
    thumbnail: '/games/basketballRandom/splash.jpeg',
    preview: '/games/basketballRandom/preview.mp4', // Add your preview video here
    previewType: 'video', // or 'image' if you use a preview image
    category: 'Sports',
    tags: ['basketball', 'pixel', 'sports'],
    rating: 4,
    plays: 0,
    url: '/games/basketballRandom/index.html',
    featured: true,
    new: true,
    difficulty: 'Medium',
    createdAt: new Date('6-24-2025'),
  },
  {
    id: '7',
    title: 'Basketball Random',
    description: 'Fast-paced basketball game with retro pixel graphics',
    thumbnail: '/games/basketballRandom/splash.jpeg',
    preview: '/games/basketballRandom/preview.mp4', // Add your preview video here
    previewType: 'video', // or 'image' if you use a preview image
    category: 'Sports',
    tags: ['basketball', 'pixel', 'sports'],
    rating: 4,
    plays: 0,
    url: '/games/basketballRandom/index.html',
    featured: true,
    new: true,
    difficulty: 'Medium',
    createdAt: new Date('6-24-2025'),
  },
  {
    id: '8',
    title: 'Basketball Random',
    description: 'Fast-paced basketball game with retro pixel graphics',
    thumbnail: '/games/basketballRandom/splash.jpeg',
    preview: '/games/basketballRandom/preview.mp4', // Add your preview video here
    previewType: 'video', // or 'image' if you use a preview image
    category: 'Sports',
    tags: ['basketball', 'pixel', 'sports'],
    rating: 4,
    plays: 0,
    url: '/games/basketballRandom/index.html',
    featured: true,
    new: true,
    difficulty: 'Medium',
    createdAt: new Date('6-24-2025'),
  },
  {
    id: '9',
    title: 'Basketball Random',
    description: 'Fast-paced basketball game with retro pixel graphics',
    thumbnail: '/games/basketballRandom/splash.jpeg',
    preview: '/games/basketballRandom/preview.mp4', // Add your preview video here
    previewType: 'video', // or 'image' if you use a preview image
    category: 'Sports',
    tags: ['basketball', 'pixel', 'sports'],
    rating: 4,
    plays: 0,
    url: '/games/basketballRandom/index.html',
    featured: true,
    new: true,
    difficulty: 'Medium',
    createdAt: new Date('6-24-2025'),
  },
  {
    id: '10',
    title: 'Basketball Random',
    description: 'Fast-paced basketball game with retro pixel graphics',
    thumbnail: '/games/basketballRandom/splash.jpeg',
    preview: '/games/basketballRandom/preview.mp4', // Add your preview video here
    previewType: 'video', // or 'image' if you use a preview image
    category: 'Sports',
    tags: ['basketball', 'pixel', 'sports'],
    rating: 4,
    plays: 0,
    url: '/games/basketballRandom/index.html',
    featured: true,
    new: true,
    difficulty: 'Medium',
    createdAt: new Date('6-24-2025'),
  },
  {
    id: '11',
    title: 'Basketball Random',
    description: 'Fast-paced basketball game with retro pixel graphics',
    thumbnail: '/games/basketballRandom/splash.jpeg',
    preview: '/games/basketballRandom/preview.mp4', // Add your preview video here
    previewType: 'video', // or 'image' if you use a preview image
    category: 'Sports',
    tags: ['basketball', 'pixel', 'sports'],
    rating: 4,
    plays: 0,
    url: '/games/basketballRandom/index.html',
    featured: true,
    new: true,
    difficulty: 'Medium',
    createdAt: new Date('6-24-2025'),
  },
  {
    id: '12',
    title: 'Basketball Random',
    description: 'Fast-paced basketball game with retro pixel graphics',
    thumbnail: '/games/basketballRandom/splash.jpeg',
    preview: '/games/basketballRandom/preview.mp4', // Add your preview video here
    previewType: 'video', // or 'image' if you use a preview image
    category: 'Sports',
    tags: ['basketball', 'pixel', 'sports'],
    rating: 4,
    plays: 0,
    url: '/games/basketballRandom/index.html',
    featured: true,
    new: true,
    difficulty: 'Medium',
    createdAt: new Date('6-24-2025'),
  },
  {
    id: '13',
    title: 'Basketball Random',
    description: 'Fast-paced basketball game with retro pixel graphics',
    thumbnail: '/games/basketballRandom/splash.jpeg',
    preview: '/games/basketballRandom/preview.mp4', // Add your preview video here
    previewType: 'video', // or 'image' if you use a preview image
    category: 'Sports',
    tags: ['basketball', 'pixel', 'sports'],
    rating: 4,
    plays: 0,
    url: '/games/basketballRandom/index.html',
    featured: true,
    new: true,
    difficulty: 'Medium',
    createdAt: new Date('6-24-2025'),
  },
  {
    id: '14',
    title: 'Basketball Random',
    description: 'Fast-paced basketball game with retro pixel graphics',
    thumbnail: '/games/basketballRandom/splash.jpeg',
    preview: '/games/basketballRandom/preview.mp4', // Add your preview video here
    previewType: 'video', // or 'image' if you use a preview image
    category: 'Sports',
    tags: ['basketball', 'pixel', 'sports'],
    rating: 4,
    plays: 0,
    url: '/games/basketballRandom/index.html',
    featured: true,
    new: true,
    difficulty: 'Medium',
    createdAt: new Date('6-24-2025'),
  },
  {
    id: '15',
    title: 'Basketball Random',
    description: 'Fast-paced basketball game with retro pixel graphics',
    thumbnail: '/games/basketballRandom/splash.jpeg',
    preview: '/games/basketballRandom/preview.mp4', // Add your preview video here
    previewType: 'video', // or 'image' if you use a preview image
    category: 'Sports',
    tags: ['basketball', 'pixel', 'sports'],
    rating: 4,
    plays: 0,
    url: '/games/basketballRandom/index.html',
    featured: true,
    new: true,
    difficulty: 'Medium',
    createdAt: new Date('6-24-2025'),
  },
  {
    id: '16',
    title: 'Basketball Random',
    description: 'Fast-paced basketball game with retro pixel graphics',
    thumbnail: '/games/basketballRandom/splash.jpeg',
    preview: '/games/basketballRandom/preview.mp4', // Add your preview video here
    previewType: 'video', // or 'image' if you use a preview image
    category: 'Sports',
    tags: ['basketball', 'pixel', 'sports'],
    rating: 4,
    plays: 0,
    url: '/games/basketballRandom/index.html',
    featured: true,
    new: true,
    difficulty: 'Medium',
    createdAt: new Date('6-24-2025'),
  },
  {
    id: '17',
    title: 'Basketball Random',
    description: 'Fast-paced basketball game with retro pixel graphics',
    thumbnail: '/games/basketballRandom/splash.jpeg',
    preview: '/games/basketballRandom/preview.mp4', // Add your preview video here
    previewType: 'video', // or 'image' if you use a preview image
    category: 'Sports',
    tags: ['basketball', 'pixel', 'sports'],
    rating: 4,
    plays: 0,
    url: '/games/basketballRandom/index.html',
    featured: true,
    new: true,
    difficulty: 'Medium',
    createdAt: new Date('6-24-2025'),
  },
  {
    id: '18',
    title: 'Basketball Random',
    description: 'Fast-paced basketball game with retro pixel graphics',
    thumbnail: '/games/basketballRandom/splash.jpeg',
    preview: '/games/basketballRandom/preview.mp4', // Add your preview video here
    previewType: 'video', // or 'image' if you use a preview image
    category: 'Sports',
    tags: ['basketball', 'pixel', 'sports'],
    rating: 4,
    plays: 0,
    url: '/games/basketballRandom/index.html',
    featured: true,
    new: true,
    difficulty: 'Medium',
    createdAt: new Date('6-24-2025'),
  },
  {
    id: '19',
    title: 'Basketball Random',
    description: 'Fast-paced basketball game with retro pixel graphics',
    thumbnail: '/games/basketballRandom/splash.jpeg',
    preview: '/games/basketballRandom/preview.mp4', // Add your preview video here
    previewType: 'video', // or 'image' if you use a preview image
    category: 'Sports',
    tags: ['basketball', 'pixel', 'sports'],
    rating: 4,
    plays: 0,
    url: '/games/basketballRandom/index.html',
    featured: true,
    new: true,
    difficulty: 'Medium',
    createdAt: new Date('6-24-2025'),
  },
  {
    id: '20',
    title: 'Basketball Random',
    description: 'Fast-paced basketball game with retro pixel graphics',
    thumbnail: '/games/basketballRandom/splash.jpeg',
    preview: '/games/basketballRandom/preview.mp4', // Add your preview video here
    previewType: 'video', // or 'image' if you use a preview image
    category: 'Sports',
    tags: ['basketball', 'pixel', 'sports'],
    rating: 4,
    plays: 0,
    url: '/games/basketballRandom/index.html',
    featured: true,
    new: true,
    difficulty: 'Medium',
    createdAt: new Date('6-24-2025'),
  },

  // ADD YOUR NEW GAMES HERE - Just copy this template:
  /*
  {
    id: '4', // Increment the number
    title: 'Your Game Name',
    description: 'Description of your game',
    thumbnail: '/games/your-game-folder/thumbnail.jpg', // For local images in public folder
    preview: '/games/your-game-folder/preview.mp4', // For preview video
    previewType: 'video', // 'video' or 'image'
    // OR
    thumbnail: 'https://images.pexels.com/photos/XXXXX/image.jpeg?auto=compress&cs=tinysrgb&w=400', // For Pexels images
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
    category: 'Gaming'
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
    category: 'Exploration'
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