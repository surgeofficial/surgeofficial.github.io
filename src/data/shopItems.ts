import { ShopItem } from '../types';

// Generate a large collection of shop items
export const generateShopItems = (): ShopItem[] => {
  const avatars = [
    'Cyber Warrior', 'Space Explorer', 'Neon Knight', 'Digital Samurai', 'Quantum Guardian',
    'Pixel Mage', 'Chrome Assassin', 'Void Walker', 'Data Phantom', 'Circuit Breaker',
    'Binary Beast', 'Code Crusader', 'Tech Titan', 'Cyber Sage', 'Digital Dragon',
    'Neon Ninja', 'Quantum Queen', 'Pixel Prince', 'Chrome Champion', 'Void Vanguard'
  ];

  const themes = [
    'Dark Neon', 'Ocean Breeze', 'Sunset Glow', 'Forest Whisper', 'Arctic Frost',
    'Lava Flow', 'Galaxy Dream', 'Retro Wave', 'Midnight Blue', 'Golden Hour',
    'Purple Rain', 'Electric Storm', 'Coral Reef', 'Desert Sand', 'Mountain Mist',
    'Cyber Punk', 'Pastel Dreams', 'Monochrome', 'Rainbow Burst', 'Autumn Leaves'
  ];

  const badges = [
    'Gaming Legend', 'Speed Demon', 'Master Strategist', 'Puzzle Solver', 'Action Hero',
    'Adventure Seeker', 'High Scorer', 'Combo Master', 'Time Keeper', 'Perfectionist',
    'Explorer', 'Champion', 'Veteran', 'Elite Player', 'Pro Gamer',
    'Skill Master', 'Achievement Hunter', 'Leaderboard King', 'Victory Royale', 'Unstoppable'
  ];

  const boosts = [
    '2x Coin Boost', 'XP Multiplier', '3x Coin Boost', 'Lucky Charm', 'Time Extender',
    'Score Multiplier', 'Combo Booster', 'Energy Drink', 'Focus Enhancer', 'Power Surge',
    'Mega Boost', 'Super Charge', 'Turbo Mode', 'Hyper Drive', 'Ultimate Power',
    'Double Trouble', 'Triple Threat', 'Quad Force', 'Penta Power', 'Hexa Boost'
  ];

  const rarities: Array<'Common' | 'Rare' | 'Epic' | 'Legendary'> = ['Common', 'Rare', 'Epic', 'Legendary'];
  const categories: Array<'avatar' | 'theme' | 'badge' | 'boost'> = ['avatar', 'theme', 'badge', 'boost'];

  const items: ShopItem[] = [];
  let id = 1;

  // Generate avatars
  avatars.forEach((name, index) => {
    const rarity = rarities[Math.floor(Math.random() * rarities.length)];
    const basePrice = rarity === 'Common' ? 100 : rarity === 'Rare' ? 200 : rarity === 'Epic' ? 350 : 500;
    
    items.push({
      id: `avatar-${id++}`,
      name,
      description: `Unique ${rarity.toLowerCase()} avatar with special effects`,
      price: basePrice + Math.floor(Math.random() * 100),
      category: 'avatar',
      rarity,
      preview: `https://images.pexels.com/photos/${220453 + index}/pexels-photo-${220453 + index}.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop`
    });
  });

  // Generate themes
  themes.forEach((name) => {
    const rarity = rarities[Math.floor(Math.random() * rarities.length)];
    const basePrice = rarity === 'Common' ? 80 : rarity === 'Rare' ? 150 : rarity === 'Epic' ? 250 : 400;
    
    items.push({
      id: `theme-${id++}`,
      name,
      description: `Beautiful ${rarity.toLowerCase()} theme with custom colors and effects`,
      price: basePrice + Math.floor(Math.random() * 50),
      category: 'theme',
      rarity
    });
  });

  // Generate badges
  badges.forEach((name) => {
    const rarity = rarities[Math.floor(Math.random() * rarities.length)];
    const basePrice = rarity === 'Common' ? 120 : rarity === 'Rare' ? 250 : rarity === 'Epic' ? 400 : 600;
    
    items.push({
      id: `badge-${id++}`,
      name,
      description: `Prestigious ${rarity.toLowerCase()} badge to show off your achievements`,
      price: basePrice + Math.floor(Math.random() * 100),
      category: 'badge',
      rarity
    });
  });

  // Generate boosts
  boosts.forEach((name) => {
    const rarity = rarities[Math.floor(Math.random() * rarities.length)];
    const basePrice = rarity === 'Common' ? 150 : rarity === 'Rare' ? 300 : rarity === 'Epic' ? 500 : 750;
    
    items.push({
      id: `boost-${id++}`,
      name,
      description: `Powerful ${rarity.toLowerCase()} boost to enhance your gaming experience`,
      price: basePrice + Math.floor(Math.random() * 100),
      category: 'boost',
      rarity,
      duration: Math.floor(Math.random() * 24) + 1 // 1-24 hours
    });
  });

  return items;
};

export const getRandomShopItems = (count: number = 20): ShopItem[] => {
  const allItems = generateShopItems();
  const shuffled = allItems.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

export const getDailyShopRotation = (): ShopItem[] => {
  // Use current date to seed the random selection for consistent daily rotation
  const today = new Date();
  const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
  
  // Simple seeded random function
  const seededRandom = (seed: number) => {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
  };

  const allItems = generateShopItems();
  const dailyItems: ShopItem[] = [];
  
  // Select 20 items for daily rotation
  for (let i = 0; i < 20; i++) {
    const randomIndex = Math.floor(seededRandom(seed + i) * allItems.length);
    const item = allItems[randomIndex];
    if (!dailyItems.find(existing => existing.id === item.id)) {
      dailyItems.push(item);
    }
  }
  
  return dailyItems.slice(0, 20);
};