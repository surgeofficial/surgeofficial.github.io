import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Trophy, 
  Star, 
  Zap, 
  Calendar, 
  Award,
  TrendingUp,
  Target,
  Crown,
  Edit3,
  Camera,
  Palette,
  ShoppingBag,
  Save,
  Check
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { useAuth } from '../hooks/useAuth';
import { useUserData } from '../hooks/useUserData';

export const Profile: React.FC = () => {
  const { user } = useAuth();
  const { 
    profile, 
    shopItems, 
    updateProfile, 
    equipShopItem,
    getEquippedItems,
    loading 
  } = useUserData();
  
  const [isEditing, setIsEditing] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle');
  const [profileData, setProfileData] = useState({
    username: profile?.username || '',
    display_name: profile?.display_name || '',
    status: profile?.status || '',
    avatar_url: profile?.avatar_url || ''
  });

  // Update local state when profile loads
  React.useEffect(() => {
    if (profile) {
      setProfileData({
        username: profile.username,
        display_name: profile.display_name || '',
        status: profile.status,
        avatar_url: profile.avatar_url || ''
      });
    }
  }, [profile]);

  const equippedItems = getEquippedItems();
  const ownedAvatars = shopItems.filter(item => item.item_id.startsWith('avatar-') && item.owned);
  const ownedThemes = shopItems.filter(item => item.item_id.startsWith('theme-') && item.owned);
  const ownedBadges = shopItems.filter(item => item.item_id.startsWith('badge-') && item.owned);

  const stats = [
    { icon: Zap, label: 'Surge Coins', value: profile?.surge_coins || 0, color: 'text-primary-500' },
    { icon: Trophy, label: 'Level', value: profile?.level || 1, color: 'text-secondary-500' },
    { icon: Award, label: 'Games Played', value: profile?.games_played || 0, color: 'text-accent-500' },
    { icon: Star, label: 'Playtime', value: `${Math.floor((profile?.total_playtime || 0) / 60)}h`, color: 'text-yellow-500' },
  ];

  const levelProgress = ((profile?.experience_points || 0) % 1000) / 10; // Assuming 1000 XP per level
  const nextLevel = (profile?.level || 1) + 1;

  const handleSaveProfile = async () => {
    setSaveStatus('saving');
    try {
      await updateProfile(profileData);
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus('idle'), 2000);
      setIsEditing(false);
    } catch (error) {
      console.error('Error saving profile:', error);
      setSaveStatus('idle');
    }
  };

  const handleEquipItem = async (itemId: string) => {
    const category = itemId.split('-')[0]; // Extract category from item ID
    await equipShopItem(itemId, category);
  };

  const getEquippedItemName = (category: string) => {
    const equippedItem = equippedItems.find(item => item.item_id.startsWith(category));
    return equippedItem?.item_id.replace(`${category}-`, '').replace(/([A-Z])/g, ' $1').trim() || 'None';
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
            <User className="h-16 w-16 text-primary-500 mx-auto mb-6" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Profile Access Required
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Sign in to view and customize your gaming profile!
            </p>
          </motion.div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading your profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 mb-8"
        >
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
            {/* Avatar */}
            <div className="relative">
              <img
                src={profileData.avatar_url || 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'}
                alt="Profile"
                className="w-32 h-32 rounded-full border-4 border-primary-500 shadow-lg"
              />
              
              {/* Level Badge */}
              <div className="absolute -top-2 -right-2 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold shadow-lg">
                {profile?.level || 1}
              </div>
            </div>

            {/* Profile Info */}
            <div className="flex-1 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start space-x-3 mb-2">
                {isEditing ? (
                  <Input
                    value={profileData.display_name}
                    onChange={(e) => setProfileData({...profileData, display_name: e.target.value})}
                    className="text-3xl font-bold bg-transparent border-b-2 border-primary-500 text-gray-900 dark:text-white focus:outline-none max-w-xs"
                    placeholder="Display Name"
                  />
                ) : (
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                    {profileData.display_name || profileData.username}
                  </h1>
                )}
                <Crown className="h-6 w-6 text-yellow-500" />
              </div>
              
              <p className="text-gray-500 dark:text-gray-400 mb-2">@{profileData.username}</p>
              
              {isEditing ? (
                <Input
                  value={profileData.status}
                  onChange={(e) => setProfileData({...profileData, status: e.target.value})}
                  placeholder="What's your gaming status?"
                  className="text-gray-600 dark:text-gray-400 bg-transparent border-b border-gray-300 dark:border-gray-600 focus:outline-none focus:border-primary-500 mb-4 max-w-md"
                />
              ) : (
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {profileData.status}
                </p>
              )}

              {/* Level Progress */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Level {profile?.level || 1} → {nextLevel}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {Math.round(levelProgress)}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-primary-500 to-secondary-500 h-3 rounded-full transition-all duration-300"
                    style={{ width: `${levelProgress}%` }}
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-center md:justify-start space-x-3">
                {isEditing ? (
                  <>
                    <Button 
                      onClick={handleSaveProfile}
                      disabled={saveStatus === 'saving'}
                    >
                      {saveStatus === 'saving' ? (
                        <div className="flex items-center">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                          Saving...
                        </div>
                      ) : saveStatus === 'saved' ? (
                        <>
                          <Check className="h-4 w-4 mr-2" />
                          Saved!
                        </>
                      ) : (
                        <>
                          <Save className="h-4 w-4 mr-2" />
                          Save Changes
                        </>
                      )}
                    </Button>
                    <Button variant="outline" onClick={() => setIsEditing(false)}>
                      Cancel
                    </Button>
                  </>
                ) : (
                  <Button onClick={() => setIsEditing(true)}>
                    <Edit3 className="h-4 w-4 mr-2" />
                    Edit Profile
                  </Button>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2 space-y-8"
          >
            {/* Stats */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Gaming Stats
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 + index * 0.1 }}
                    className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-xl"
                  >
                    <stat.icon className={`h-8 w-8 ${stat.color} mx-auto mb-2`} />
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      {typeof stat.value === 'number' ? stat.value.toLocaleString() : stat.value}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Equipment Section */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Equipment & Customization
              </h2>
              
              {/* Currently Equipped */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Currently Equipped
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                    <div className="flex items-center space-x-3 mb-2">
                      <Crown className="h-5 w-5 text-primary-500" />
                      <span className="font-medium text-gray-900 dark:text-white">Avatar</span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {getEquippedItemName('avatar')}
                    </p>
                  </div>
                  <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                    <div className="flex items-center space-x-3 mb-2">
                      <Palette className="h-5 w-5 text-secondary-500" />
                      <span className="font-medium text-gray-900 dark:text-white">Theme</span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {getEquippedItemName('theme')}
                    </p>
                  </div>
                  <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                    <div className="flex items-center space-x-3 mb-2">
                      <Trophy className="h-5 w-5 text-accent-500" />
                      <span className="font-medium text-gray-900 dark:text-white">Badge</span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {getEquippedItemName('badge')}
                    </p>
                  </div>
                </div>
              </div>

              {/* Equipment Tabs */}
              <div className="space-y-6">
                {/* Avatars */}
                {ownedAvatars.length > 0 && (
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center space-x-2">
                      <Crown className="h-5 w-5 text-primary-500" />
                      <span>Avatars ({ownedAvatars.length})</span>
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {ownedAvatars.map((item) => (
                        <div
                          key={item.item_id}
                          className={`p-3 rounded-xl border-2 cursor-pointer transition-all ${
                            item.equipped
                              ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                              : 'border-gray-200 dark:border-gray-600 hover:border-primary-300'
                          }`}
                          onClick={() => handleEquipItem(item.item_id)}
                        >
                          <div className="text-center">
                            <Crown className="h-8 w-8 mx-auto mb-2 text-primary-500" />
                            <p className="text-sm font-medium text-gray-900 dark:text-white">
                              {item.item_id.replace('avatar-', '').replace(/([A-Z])/g, ' $1').trim()}
                            </p>
                            {item.equipped && (
                              <Check className="h-4 w-4 text-primary-500 mx-auto mt-1" />
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Themes */}
                {ownedThemes.length > 0 && (
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center space-x-2">
                      <Palette className="h-5 w-5 text-secondary-500" />
                      <span>Themes ({ownedThemes.length})</span>
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {ownedThemes.map((item) => (
                        <div
                          key={item.item_id}
                          className={`p-3 rounded-xl border-2 cursor-pointer transition-all ${
                            item.equipped
                              ? 'border-secondary-500 bg-secondary-50 dark:bg-secondary-900/20'
                              : 'border-gray-200 dark:border-gray-600 hover:border-secondary-300'
                          }`}
                          onClick={() => handleEquipItem(item.item_id)}
                        >
                          <div className="text-center">
                            <Palette className="h-8 w-8 mx-auto mb-2 text-secondary-500" />
                            <p className="text-sm font-medium text-gray-900 dark:text-white">
                              {item.item_id.replace('theme-', '').replace(/([A-Z])/g, ' $1').trim()}
                            </p>
                            {item.equipped && (
                              <Check className="h-4 w-4 text-secondary-500 mx-auto mt-1" />
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Badges */}
                {ownedBadges.length > 0 && (
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center space-x-2">
                      <Trophy className="h-5 w-5 text-accent-500" />
                      <span>Badges ({ownedBadges.length})</span>
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {ownedBadges.map((item) => (
                        <div
                          key={item.item_id}
                          className={`p-3 rounded-xl border-2 cursor-pointer transition-all ${
                            item.equipped
                              ? 'border-accent-500 bg-accent-50 dark:bg-accent-900/20'
                              : 'border-gray-200 dark:border-gray-600 hover:border-accent-300'
                          }`}
                          onClick={() => handleEquipItem(item.item_id)}
                        >
                          <div className="text-center">
                            <Trophy className="h-8 w-8 mx-auto mb-2 text-accent-500" />
                            <p className="text-sm font-medium text-gray-900 dark:text-white">
                              {item.item_id.replace('badge-', '').replace(/([A-Z])/g, ' $1').trim()}
                            </p>
                            {item.equipped && (
                              <Check className="h-4 w-4 text-accent-500 mx-auto mt-1" />
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* No items message */}
                {ownedAvatars.length === 0 && ownedThemes.length === 0 && ownedBadges.length === 0 && (
                  <div className="text-center py-8">
                    <ShoppingBag className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      No Items Yet
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      Visit the shop to purchase customization items!
                    </p>
                    <Button onClick={() => window.location.href = '/shop'}>
                      <ShoppingBag className="h-4 w-4 mr-2" />
                      Visit Shop
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-8"
          >
            {/* Quick Stats */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Quick Stats
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Experience</span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {profile?.experience_points || 0} XP
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Total Playtime</span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {Math.floor((profile?.total_playtime || 0) / 60)}h {(profile?.total_playtime || 0) % 60}m
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Games Played</span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {profile?.games_played || 0}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Member Since</span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {profile?.created_at ? new Date(profile.created_at).toLocaleDateString() : 'N/A'}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};