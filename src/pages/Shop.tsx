import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  ShoppingBag, 
  Zap, 
  Crown, 
  Palette, 
  Star, 
  Trophy, 
  Sparkles,
  Check,
  Lock,
  RotateCcw,
  Clock
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { useAuth } from '../hooks/useAuth';
import { AuthModal } from '../components/auth/AuthModal';
import { getDailyShopRotation } from '../data/shopItems';
import { ShopItem } from '../types';

export const Shop: React.FC = () => {
  const { user } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [purchasedItems, setPurchasedItems] = useState<string[]>(['avatar-1', 'theme-1']);
  const [userCoins, setUserCoins] = useState(1250);
  const [shopItems, setShopItems] = useState<ShopItem[]>([]);
  const [timeUntilRotation, setTimeUntilRotation] = useState('');

  useEffect(() => {
    // Load daily shop rotation
    setShopItems(getDailyShopRotation());
  }, []);

  useEffect(() => {
    // Update countdown timer
    const updateTimer = () => {
      const now = new Date();
      const tomorrow = new Date(now);
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(0, 0, 0, 0);
      
      const diff = tomorrow.getTime() - now.getTime();
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      
      setTimeUntilRotation(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  const categories = [
    { id: 'all', name: 'All Items', icon: ShoppingBag },
    { id: 'avatar', name: 'Avatars', icon: Crown },
    { id: 'theme', name: 'Themes', icon: Palette },
    { id: 'badge', name: 'Badges', icon: Star },
    { id: 'boost', name: 'Boosts', icon: Zap },
  ];

  const filteredItems = selectedCategory === 'all' 
    ? shopItems 
    : shopItems.filter(item => item.category === selectedCategory);

  const handlePurchase = (item: ShopItem) => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }

    if (userCoins >= item.price && !purchasedItems.includes(item.id)) {
      setUserCoins(prev => prev - item.price);
      setPurchasedItems(prev => [...prev, item.id]);
    }
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'Common': return 'text-gray-500 bg-gray-100 dark:bg-gray-700';
      case 'Rare': return 'text-blue-500 bg-blue-100 dark:bg-blue-900/30';
      case 'Epic': return 'text-purple-500 bg-purple-100 dark:bg-purple-900/30';
      case 'Legendary': return 'text-yellow-500 bg-yellow-100 dark:bg-yellow-900/30';
      default: return 'text-gray-500 bg-gray-100 dark:bg-gray-700';
    }
  };

  const getItemIcon = (category: string) => {
    switch (category) {
      case 'avatar': return Crown;
      case 'theme': return Palette;
      case 'badge': return Trophy;
      case 'boost': return Sparkles;
      default: return ShoppingBag;
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-12"
          >
            <ShoppingBag className="h-16 w-16 text-primary-500 mx-auto mb-6" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Shop Access Required
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Sign in to access the Surge Shop and customize your gaming experience with exclusive items!
            </p>
            <Button onClick={() => setShowAuthModal(true)} size="lg">
              Sign In to Shop
            </Button>
          </motion.div>
        </div>
        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          initialMode="signup"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Daily Shop
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-6">
            Fresh items rotate daily at midnight
          </p>
          
          {/* Coin Balance and Timer */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
            <div className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl text-white shadow-lg">
              <Zap className="h-6 w-6" />
              <span className="text-2xl font-bold">{userCoins}</span>
              <span className="text-lg">Surge Coins</span>
            </div>
            
            <div className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-accent-500 to-yellow-500 rounded-2xl text-white shadow-lg">
              <Clock className="h-5 w-5" />
              <span className="font-semibold">Next rotation: {timeUntilRotation}</span>
            </div>
          </div>
        </motion.div>

        {/* Categories */}
        <div className="flex justify-center mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-2 shadow-lg">
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-xl font-medium transition-all ${
                    selectedCategory === category.id
                      ? 'bg-primary-500 text-white shadow-md'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <category.icon className="h-4 w-4" />
                  <span>{category.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Shop Items */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item, index) => {
            const isOwned = purchasedItems.includes(item.id);
            const canAfford = userCoins >= item.price;
            const ItemIcon = getItemIcon(item.category);
            
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                {/* Item Preview */}
                <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800">
                  {item.preview ? (
                    <img
                      src={item.preview}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <ItemIcon className="h-16 w-16 text-primary-500" />
                    </div>
                  )}
                  
                  {/* Rarity Badge */}
                  <div className={`absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-semibold ${getRarityColor(item.rarity)}`}>
                    {item.rarity}
                  </div>

                  {/* Owned Badge */}
                  {isOwned && (
                    <div className="absolute top-3 right-3 bg-green-500 text-white p-2 rounded-full">
                      <Check className="h-4 w-4" />
                    </div>
                  )}

                  {/* Duration Badge for Boosts */}
                  {item.category === 'boost' && item.duration && (
                    <div className="absolute bottom-3 left-3 bg-black/70 text-white px-2 py-1 rounded-full text-xs">
                      {item.duration}h
                    </div>
                  )}
                </div>

                {/* Item Info */}
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {item.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                    {item.description}
                  </p>

                  {/* Price and Purchase */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Zap className="h-5 w-5 text-primary-500" />
                      <span className="text-lg font-bold text-gray-900 dark:text-white">
                        {item.price}
                      </span>
                    </div>

                    {isOwned ? (
                      <Button variant="ghost" disabled>
                        <Check className="h-4 w-4 mr-2" />
                        Owned
                      </Button>
                    ) : (
                      <Button
                        onClick={() => handlePurchase(item)}
                        disabled={!canAfford}
                        variant={canAfford ? 'primary' : 'ghost'}
                        size="sm"
                      >
                        {canAfford ? (
                          'Purchase'
                        ) : (
                          <>
                            <Lock className="h-4 w-4 mr-2" />
                            Need {item.price - userCoins} more
                          </>
                        )}
                      </Button>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {filteredItems.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <ShoppingBag className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
              No items in this category
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Check back tomorrow for new items!
            </p>
          </motion.div>
        )}

        {/* Rotation Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-12 text-center"
        >
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <RotateCcw className="h-6 w-6 text-primary-500" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Daily Shop Rotation
              </h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              The shop refreshes every day at midnight with 20 new items. Don't miss out on limited-time offers!
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};