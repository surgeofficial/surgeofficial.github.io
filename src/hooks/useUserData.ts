import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';
import { supabase } from '../lib/supabase';

export interface UserProfile {
  id: string;
  user_id: string;
  username: string;
  display_name?: string;
  avatar_url?: string;
  status: string;
  surge_coins: number;
  level: number;
  experience_points: number;
  total_playtime: number;
  games_played: number;
}

export interface UserSettings {
  // Notification Settings
  push_enabled: boolean;
  new_games: boolean;
  achievements: boolean;
  challenges: boolean;
  daily_challenges: boolean;
  email_notifications: boolean;
  weekly_digest: boolean;
  promotions: boolean;
  
  // Privacy Settings
  profile_public: boolean;
  show_online_status: boolean;
  allow_friend_requests: boolean;
  
  // Game Settings
  auto_save: boolean;
  sound_enabled: boolean;
  music_enabled: boolean;
  graphics_quality: string;
  
  // Theme Settings
  theme: string;
  color_scheme: string;
}

export interface UserGameData {
  game_id: string;
  is_favorite: boolean;
  times_played: number;
  total_playtime: number;
  last_played_at?: string;
  high_score: number;
  completion_percentage: number;
  save_data: any;
}

export interface UserAchievement {
  achievement_id: string;
  unlocked: boolean;
  progress: number;
  unlocked_at?: string;
}

export interface UserShopItem {
  item_id: string;
  owned: boolean;
  equipped: boolean;
  purchased_at?: string;
  purchase_price?: number;
}

export interface UserChallenge {
  challenge_id: string;
  progress: number;
  completed: boolean;
  completed_at?: string;
}

export const useUserData = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [settings, setSettings] = useState<UserSettings | null>(null);
  const [gameData, setGameData] = useState<UserGameData[]>([]);
  const [achievements, setAchievements] = useState<UserAchievement[]>([]);
  const [shopItems, setShopItems] = useState<UserShopItem[]>([]);
  const [challenges, setChallenges] = useState<UserChallenge[]>([]);
  const [loading, setLoading] = useState(true);

  // Load all user data
  const loadUserData = async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);

      // Load profile
      const { data: profileData } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('user_id', user.uid)
        .single();

      if (profileData) {
        setProfile(profileData);
      } else {
        // Create default profile
        await createDefaultProfile();
      }

      // Load settings
      const { data: settingsData } = await supabase
        .from('user_settings')
        .select('*')
        .eq('user_id', user.uid)
        .single();

      if (settingsData) {
        setSettings(settingsData);
      } else {
        // Create default settings
        await createDefaultSettings();
      }

      // Load game data
      const { data: gameDataResult } = await supabase
        .from('user_game_data')
        .select('*')
        .eq('user_id', user.uid);

      setGameData(gameDataResult || []);

      // Load achievements
      const { data: achievementsResult } = await supabase
        .from('user_achievements')
        .select('*')
        .eq('user_id', user.uid);

      setAchievements(achievementsResult || []);

      // Load shop items
      const { data: shopItemsResult } = await supabase
        .from('user_shop_items')
        .select('*')
        .eq('user_id', user.uid);

      setShopItems(shopItemsResult || []);

      // Load challenges
      const { data: challengesResult } = await supabase
        .from('user_challenges')
        .select('*')
        .eq('user_id', user.uid);

      setChallenges(challengesResult || []);

    } catch (error) {
      console.error('Error loading user data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Create default profile
  const createDefaultProfile = async () => {
    if (!user) return;

    const defaultProfile = {
      user_id: user.uid,
      username: user.email?.split('@')[0] || 'Player',
      display_name: user.email?.split('@')[0] || 'Player',
      status: 'Ready to surge! 🎮',
      surge_coins: 1000,
      level: 1,
      experience_points: 0,
      total_playtime: 0,
      games_played: 0
    };

    const { data } = await supabase
      .from('user_profiles')
      .insert(defaultProfile)
      .select()
      .single();

    if (data) {
      setProfile(data);
    }
  };

  // Create default settings
  const createDefaultSettings = async () => {
    if (!user) return;

    const defaultSettings = {
      user_id: user.uid,
      push_enabled: true,
      new_games: true,
      achievements: true,
      challenges: false,
      daily_challenges: true,
      email_notifications: true,
      weekly_digest: false,
      promotions: true,
      profile_public: true,
      show_online_status: true,
      allow_friend_requests: true,
      auto_save: true,
      sound_enabled: true,
      music_enabled: true,
      graphics_quality: 'medium',
      theme: 'light',
      color_scheme: 'default'
    };

    const { data } = await supabase
      .from('user_settings')
      .insert(defaultSettings)
      .select()
      .single();

    if (data) {
      setSettings(data);
    }
  };

  // Update profile
  const updateProfile = async (updates: Partial<UserProfile>) => {
    if (!user || !profile) return;

    const { data } = await supabase
      .from('user_profiles')
      .update(updates)
      .eq('user_id', user.uid)
      .select()
      .single();

    if (data) {
      setProfile(data);
    }
  };

  // Update settings
  const updateSettings = async (updates: Partial<UserSettings>) => {
    if (!user) return;

    const { data } = await supabase
      .from('user_settings')
      .update(updates)
      .eq('user_id', user.uid)
      .select()
      .single();

    if (data) {
      setSettings(data);
    }
  };

  // Update game data
  const updateGameData = async (gameId: string, updates: Partial<UserGameData>) => {
    if (!user) return;

    const { data } = await supabase
      .from('user_game_data')
      .upsert({
        user_id: user.uid,
        game_id: gameId,
        ...updates
      })
      .select()
      .single();

    if (data) {
      setGameData(prev => {
        const existing = prev.find(g => g.game_id === gameId);
        if (existing) {
          return prev.map(g => g.game_id === gameId ? data : g);
        } else {
          return [...prev, data];
        }
      });
    }
  };

  // Toggle favorite
  const toggleFavorite = async (gameId: string) => {
    const existing = gameData.find(g => g.game_id === gameId);
    const isFavorite = existing?.is_favorite || false;
    
    await updateGameData(gameId, { is_favorite: !isFavorite });
  };

  // Add to recent games
  const addToRecentGames = async (gameId: string) => {
    await updateGameData(gameId, { 
      last_played_at: new Date().toISOString(),
      times_played: (gameData.find(g => g.game_id === gameId)?.times_played || 0) + 1
    });
  };

  // Update achievement
  const updateAchievement = async (achievementId: string, progress: number, unlocked: boolean = false) => {
    if (!user) return;

    const updates: any = { progress };
    if (unlocked) {
      updates.unlocked = true;
      updates.unlocked_at = new Date().toISOString();
    }

    const { data } = await supabase
      .from('user_achievements')
      .upsert({
        user_id: user.uid,
        achievement_id: achievementId,
        ...updates
      })
      .select()
      .single();

    if (data) {
      setAchievements(prev => {
        const existing = prev.find(a => a.achievement_id === achievementId);
        if (existing) {
          return prev.map(a => a.achievement_id === achievementId ? data : a);
        } else {
          return [...prev, data];
        }
      });
    }
  };

  // Purchase shop item
  const purchaseShopItem = async (itemId: string, price: number) => {
    if (!user || !profile || profile.surge_coins < price) return false;

    try {
      // Update coins
      await updateProfile({ surge_coins: profile.surge_coins - price });

      // Add item
      const { data } = await supabase
        .from('user_shop_items')
        .upsert({
          user_id: user.uid,
          item_id: itemId,
          owned: true,
          purchased_at: new Date().toISOString(),
          purchase_price: price
        })
        .select()
        .single();

      if (data) {
        setShopItems(prev => {
          const existing = prev.find(i => i.item_id === itemId);
          if (existing) {
            return prev.map(i => i.item_id === itemId ? data : i);
          } else {
            return [...prev, data];
          }
        });
        return true;
      }
    } catch (error) {
      console.error('Error purchasing item:', error);
    }
    
    return false;
  };

  // Equip shop item
  const equipShopItem = async (itemId: string, category: string) => {
    if (!user) return;

    // Unequip other items in the same category
    const itemsInCategory = shopItems.filter(item => 
      item.item_id.startsWith(category) && item.equipped
    );

    for (const item of itemsInCategory) {
      await supabase
        .from('user_shop_items')
        .update({ equipped: false })
        .eq('user_id', user.uid)
        .eq('item_id', item.item_id);
    }

    // Equip the new item
    const { data } = await supabase
      .from('user_shop_items')
      .update({ equipped: true })
      .eq('user_id', user.uid)
      .eq('item_id', itemId)
      .select()
      .single();

    if (data) {
      setShopItems(prev => prev.map(item => ({
        ...item,
        equipped: item.item_id === itemId ? true : 
                 item.item_id.startsWith(category) ? false : item.equipped
      })));
    }
  };

  // Update challenge progress
  const updateChallengeProgress = async (challengeId: string, progress: number, completed: boolean = false) => {
    if (!user) return;

    const updates: any = { progress };
    if (completed) {
      updates.completed = true;
      updates.completed_at = new Date().toISOString();
    }

    const { data } = await supabase
      .from('user_challenges')
      .upsert({
        user_id: user.uid,
        challenge_id: challengeId,
        ...updates
      })
      .select()
      .single();

    if (data) {
      setChallenges(prev => {
        const existing = prev.find(c => c.challenge_id === challengeId);
        if (existing) {
          return prev.map(c => c.challenge_id === challengeId ? data : c);
        } else {
          return [...prev, data];
        }
      });
    }
  };

  // Start game session
  const startGameSession = async (gameId: string) => {
    if (!user) return null;

    const { data } = await supabase
      .from('game_sessions')
      .insert({
        user_id: user.uid,
        game_id: gameId,
        started_at: new Date().toISOString()
      })
      .select()
      .single();

    return data?.id || null;
  };

  // End game session
  const endGameSession = async (sessionId: string, score: number = 0, completed: boolean = false) => {
    if (!user || !sessionId) return;

    const startTime = new Date();
    const endTime = new Date();
    const duration = Math.round((endTime.getTime() - startTime.getTime()) / (1000 * 60)); // minutes

    await supabase
      .from('game_sessions')
      .update({
        ended_at: endTime.toISOString(),
        duration,
        score,
        completed
      })
      .eq('id', sessionId);
  };

  // Load data when user changes
  useEffect(() => {
    loadUserData();
  }, [user]);

  // Helper functions to get data
  const getFavoriteGames = () => gameData.filter(g => g.is_favorite).map(g => g.game_id);
  const getRecentGames = () => gameData
    .filter(g => g.last_played_at)
    .sort((a, b) => new Date(b.last_played_at!).getTime() - new Date(a.last_played_at!).getTime())
    .map(g => g.game_id);
  const getOwnedItems = () => shopItems.filter(i => i.owned).map(i => i.item_id);
  const getEquippedItems = () => shopItems.filter(i => i.equipped);
  const getUnlockedAchievements = () => achievements.filter(a => a.unlocked);

  return {
    // Data
    profile,
    settings,
    gameData,
    achievements,
    shopItems,
    challenges,
    loading,

    // Actions
    updateProfile,
    updateSettings,
    updateGameData,
    toggleFavorite,
    addToRecentGames,
    updateAchievement,
    purchaseShopItem,
    equipShopItem,
    updateChallengeProgress,
    startGameSession,
    endGameSession,
    loadUserData,

    // Helpers
    getFavoriteGames,
    getRecentGames,
    getOwnedItems,
    getEquippedItems,
    getUnlockedAchievements
  };
};
