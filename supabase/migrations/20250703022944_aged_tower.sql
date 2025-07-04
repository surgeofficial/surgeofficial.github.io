/*
  # Complete User Data Persistence System

  1. New Tables
    - `user_profiles` - Extended user profile data
    - `user_settings` - All user preferences and settings
    - `user_game_data` - Game-specific data (favorites, recent plays, progress)
    - `user_achievements` - Achievement progress and unlocks
    - `user_shop_items` - Purchased and equipped items
    - `user_challenges` - Challenge progress
    - `game_sessions` - Track game play sessions

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to manage their own data
*/

-- User Profiles (extended profile data)
CREATE TABLE IF NOT EXISTS user_profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE NOT NULL,
  username text UNIQUE NOT NULL,
  display_name text,
  avatar_url text,
  status text DEFAULT '',
  surge_coins integer DEFAULT 0,
  level integer DEFAULT 1,
  experience_points integer DEFAULT 0,
  total_playtime integer DEFAULT 0, -- in minutes
  games_played integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- User Settings (all preferences)
CREATE TABLE IF NOT EXISTS user_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE NOT NULL,
  
  -- Notification Settings
  push_enabled boolean DEFAULT true,
  new_games boolean DEFAULT true,
  achievements boolean DEFAULT true,
  challenges boolean DEFAULT false,
  daily_challenges boolean DEFAULT true,
  email_notifications boolean DEFAULT true,
  weekly_digest boolean DEFAULT false,
  promotions boolean DEFAULT true,
  
  -- Privacy Settings
  profile_public boolean DEFAULT true,
  show_online_status boolean DEFAULT true,
  allow_friend_requests boolean DEFAULT true,
  
  -- Game Settings
  auto_save boolean DEFAULT true,
  sound_enabled boolean DEFAULT true,
  music_enabled boolean DEFAULT true,
  graphics_quality text DEFAULT 'medium',
  
  -- Theme Settings
  theme text DEFAULT 'light', -- light, dark, auto
  color_scheme text DEFAULT 'default',
  
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- User Game Data (favorites, recent plays, etc.)
CREATE TABLE IF NOT EXISTS user_game_data (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  game_id text NOT NULL,
  
  -- Game interaction data
  is_favorite boolean DEFAULT false,
  times_played integer DEFAULT 0,
  total_playtime integer DEFAULT 0, -- in minutes
  last_played_at timestamptz,
  high_score integer DEFAULT 0,
  completion_percentage integer DEFAULT 0,
  
  -- Game-specific save data (JSON)
  save_data jsonb DEFAULT '{}',
  
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  
  UNIQUE(user_id, game_id)
);

-- User Achievements
CREATE TABLE IF NOT EXISTS user_achievements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  achievement_id text NOT NULL,
  
  -- Achievement data
  unlocked boolean DEFAULT false,
  progress integer DEFAULT 0,
  unlocked_at timestamptz,
  
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  
  UNIQUE(user_id, achievement_id)
);

-- User Shop Items (purchases and equipment)
CREATE TABLE IF NOT EXISTS user_shop_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  item_id text NOT NULL,
  
  -- Item data
  owned boolean DEFAULT false,
  equipped boolean DEFAULT false,
  purchased_at timestamptz,
  purchase_price integer,
  
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  
  UNIQUE(user_id, item_id)
);

-- User Challenges
CREATE TABLE IF NOT EXISTS user_challenges (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  challenge_id text NOT NULL,
  
  -- Challenge data
  progress integer DEFAULT 0,
  completed boolean DEFAULT false,
  completed_at timestamptz,
  
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  
  UNIQUE(user_id, challenge_id)
);

-- Game Sessions (track individual play sessions)
CREATE TABLE IF NOT EXISTS game_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  game_id text NOT NULL,
  
  -- Session data
  started_at timestamptz DEFAULT now(),
  ended_at timestamptz,
  duration integer, -- in minutes
  score integer DEFAULT 0,
  completed boolean DEFAULT false,
  
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_game_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_shop_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_challenges ENABLE ROW LEVEL SECURITY;
ALTER TABLE game_sessions ENABLE ROW LEVEL SECURITY;

-- RLS Policies for user_profiles
CREATE POLICY "Users can read own profile"
  ON user_profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own profile"
  ON user_profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own profile"
  ON user_profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- RLS Policies for user_settings
CREATE POLICY "Users can manage own settings"
  ON user_settings
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- RLS Policies for user_game_data
CREATE POLICY "Users can manage own game data"
  ON user_game_data
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- RLS Policies for user_achievements
CREATE POLICY "Users can manage own achievements"
  ON user_achievements
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- RLS Policies for user_shop_items
CREATE POLICY "Users can manage own shop items"
  ON user_shop_items
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- RLS Policies for user_challenges
CREATE POLICY "Users can manage own challenges"
  ON user_challenges
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- RLS Policies for game_sessions
CREATE POLICY "Users can manage own game sessions"
  ON game_sessions
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Functions to automatically update timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Add triggers for updated_at
CREATE TRIGGER update_user_profiles_updated_at
  BEFORE UPDATE ON user_profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_settings_updated_at
  BEFORE UPDATE ON user_settings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_game_data_updated_at
  BEFORE UPDATE ON user_game_data
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_achievements_updated_at
  BEFORE UPDATE ON user_achievements
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_shop_items_updated_at
  BEFORE UPDATE ON user_shop_items
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_challenges_updated_at
  BEFORE UPDATE ON user_challenges
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
