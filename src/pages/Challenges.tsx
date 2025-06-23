import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Trophy, 
  Target, 
  Clock, 
  Zap, 
  Star, 
  Calendar,
  CheckCircle,
  Gift,
  Flame
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { useAuth } from '../hooks/useAuth';
import { AuthModal } from '../components/auth/AuthModal';

interface Challenge {
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

export const Challenges: React.FC = () => {
  const { user } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [challenges, setChallenges] = useState<Challenge[]>([
    {
      id: '1',
      title: 'Daily Gamer',
      description: 'Play 3 different games today',
      type: 'daily',
      progress: 1,
      target: 3,
      reward: 50,
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
      completed: false,
      difficulty: 'Easy',
      category: 'Gaming'
    },
    {
      id: '2',
      title: 'Challenge Master',
      description: 'Complete 5 challenges this week',
      type: 'daily',
      progress: 2,
      target: 5,
      reward: 75,
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
      completed: false,
      difficulty: 'Medium',
      category: 'Achievement'
    },
    {
      id: '3',
      title: 'Weekly Explorer',
      description: 'Try 10 new games this week',
      type: 'weekly',
      progress: 3,
      target: 10,
      reward: 200,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      completed: false,
      difficulty: 'Medium',
      category: 'Exploration'
    },
    {
      id: '4',
      title: 'Puzzle Master',
      description: 'Complete 5 puzzle games this week',
      type: 'weekly',
      progress: 2,
      target: 5,
      reward: 150,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      completed: false,
      difficulty: 'Hard',
      category: 'Puzzle'
    },
    {
      id: '5',
      title: 'Surge Champion',
      description: 'Play for 7 consecutive days',
      type: 'special',
      progress: 4,
      target: 7,
      reward: 500,
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      completed: false,
      difficulty: 'Hard',
      category: 'Dedication'
    }
  ]);

  const [userCoins, setUserCoins] = useState(1250);

  // Simulate progress updates
  useEffect(() => {
    const interval = setInterval(() => {
      setChallenges(prev => prev.map(challenge => {
        if (!challenge.completed && Math.random() < 0.1) {
          const newProgress = Math.min(challenge.progress + 1, challenge.target);
          return { ...challenge, progress: newProgress };
        }
        return challenge;
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleClaimReward = (challengeId: string) => {
    setChallenges(prev => 
      prev.map(challenge => 
        challenge.id === challengeId 
          ? { ...challenge, completed: true }
          : challenge
      )
    );
    
    const challenge = challenges.find(c => c.id === challengeId);
    if (challenge) {
      setUserCoins(prev => prev + challenge.reward);
    }
  };

  const getTimeRemaining = (expiresAt: Date) => {
    const now = new Date();
    const diff = expiresAt.getTime() - now.getTime();
    
    if (diff <= 0) return 'Expired';
    
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    if (hours > 24) {
      const days = Math.floor(hours / 24);
      return `${days}d ${hours % 24}h`;
    }
    
    return `${hours}h ${minutes}m`;
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-500 bg-green-100 dark:bg-green-900/30';
      case 'Medium': return 'text-yellow-500 bg-yellow-100 dark:bg-yellow-900/30';
      case 'Hard': return 'text-red-500 bg-red-100 dark:bg-red-900/30';
      default: return 'text-gray-500 bg-gray-100 dark:bg-gray-700';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'daily': return Calendar;
      case 'weekly': return Target;
      case 'special': return Star;
      default: return Trophy;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'daily': return 'text-blue-500';
      case 'weekly': return 'text-purple-500';
      case 'special': return 'text-yellow-500';
      default: return 'text-gray-500';
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
            <Trophy className="h-16 w-16 text-primary-500 mx-auto mb-6" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Challenges Await!
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Sign in to access daily and weekly challenges, earn Surge Coins, and unlock exclusive rewards!
            </p>
            <Button onClick={() => setShowAuthModal(true)} size="lg">
              Sign In for Challenges
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

  const dailyChallenges = challenges.filter(c => c.type === 'daily');
  const weeklyChallenges = challenges.filter(c => c.type === 'weekly');
  const specialChallenges = challenges.filter(c => c.type === 'special');

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
            Challenges
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-6">
            Complete challenges to earn Surge Coins and unlock rewards
          </p>
          
          {/* Coin Balance */}
          <div className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl text-white shadow-lg">
            <Zap className="h-6 w-6" />
            <span className="text-2xl font-bold">{userCoins}</span>
            <span className="text-lg">Surge Coins</span>
          </div>
        </motion.div>

        {/* Daily Challenges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
              <Calendar className="h-6 w-6 text-blue-500" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Daily Challenges
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Reset every 24 hours
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {dailyChallenges.map((challenge) => {
              const TypeIcon = getTypeIcon(challenge.type);
              const progressPercentage = (challenge.progress / challenge.target) * 100;
              const isCompleted = challenge.progress >= challenge.target;
              
              return (
                <motion.div
                  key={challenge.id}
                  whileHover={{ y: -2 }}
                  className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border-l-4 border-blue-500"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <TypeIcon className={`h-6 w-6 ${getTypeColor(challenge.type)}`} />
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                          {challenge.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                          {challenge.description}
                        </p>
                      </div>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(challenge.difficulty)}`}>
                      {challenge.difficulty}
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        Progress: {challenge.progress}/{challenge.target}
                      </span>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {Math.round(progressPercentage)}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <motion.div
                        className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-500"
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min(progressPercentage, 100)}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1 text-primary-500">
                        <Zap className="h-4 w-4" />
                        <span className="font-semibold">{challenge.reward}</span>
                      </div>
                      <div className="flex items-center space-x-1 text-gray-500 dark:text-gray-400">
                        <Clock className="h-4 w-4" />
                        <span className="text-sm">{getTimeRemaining(challenge.expiresAt)}</span>
                      </div>
                    </div>

                    {isCompleted && !challenge.completed ? (
                      <Button
                        onClick={() => handleClaimReward(challenge.id)}
                        size="sm"
                        className="bg-green-500 hover:bg-green-600"
                      >
                        <Gift className="h-4 w-4 mr-2" />
                        Claim
                      </Button>
                    ) : challenge.completed ? (
                      <div className="flex items-center space-x-2 text-green-500">
                        <CheckCircle className="h-5 w-5" />
                        <span className="text-sm font-medium">Completed</span>
                      </div>
                    ) : (
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        In Progress
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Weekly Challenges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-xl">
              <Target className="h-6 w-6 text-purple-500" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Weekly Challenges
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Reset every Monday
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {weeklyChallenges.map((challenge) => {
              const TypeIcon = getTypeIcon(challenge.type);
              const progressPercentage = (challenge.progress / challenge.target) * 100;
              const isCompleted = challenge.progress >= challenge.target;
              
              return (
                <motion.div
                  key={challenge.id}
                  whileHover={{ y: -2 }}
                  className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border-l-4 border-purple-500"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <TypeIcon className={`h-6 w-6 ${getTypeColor(challenge.type)}`} />
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                          {challenge.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                          {challenge.description}
                        </p>
                      </div>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(challenge.difficulty)}`}>
                      {challenge.difficulty}
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        Progress: {challenge.progress}/{challenge.target}
                      </span>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {Math.round(progressPercentage)}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <motion.div
                        className="bg-gradient-to-r from-purple-500 to-purple-600 h-2 rounded-full transition-all duration-500"
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min(progressPercentage, 100)}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1 text-primary-500">
                        <Zap className="h-4 w-4" />
                        <span className="font-semibold">{challenge.reward}</span>
                      </div>
                      <div className="flex items-center space-x-1 text-gray-500 dark:text-gray-400">
                        <Clock className="h-4 w-4" />
                        <span className="text-sm">{getTimeRemaining(challenge.expiresAt)}</span>
                      </div>
                    </div>

                    {isCompleted && !challenge.completed ? (
                      <Button
                        onClick={() => handleClaimReward(challenge.id)}
                        size="sm"
                        className="bg-green-500 hover:bg-green-600"
                      >
                        <Gift className="h-4 w-4 mr-2" />
                        Claim
                      </Button>
                    ) : challenge.completed ? (
                      <div className="flex items-center space-x-2 text-green-500">
                        <CheckCircle className="h-5 w-5" />
                        <span className="text-sm font-medium">Completed</span>
                      </div>
                    ) : (
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        In Progress
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Special Challenges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded-xl">
              <Star className="h-6 w-6 text-yellow-500" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Special Challenges
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Limited time exclusive challenges
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {specialChallenges.map((challenge) => {
              const TypeIcon = getTypeIcon(challenge.type);
              const progressPercentage = (challenge.progress / challenge.target) * 100;
              const isCompleted = challenge.progress >= challenge.target;
              
              return (
                <motion.div
                  key={challenge.id}
                  whileHover={{ y: -2 }}
                  className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border-l-4 border-yellow-500 relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 p-2">
                    <Flame className="h-5 w-5 text-yellow-500" />
                  </div>
                  
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <TypeIcon className={`h-6 w-6 ${getTypeColor(challenge.type)}`} />
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                          {challenge.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                          {challenge.description}
                        </p>
                      </div>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(challenge.difficulty)}`}>
                      {challenge.difficulty}
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        Progress: {challenge.progress}/{challenge.target}
                      </span>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {Math.round(progressPercentage)}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <motion.div
                        className="bg-gradient-to-r from-yellow-500 to-yellow-600 h-2 rounded-full transition-all duration-500"
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min(progressPercentage, 100)}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1 text-primary-500">
                        <Zap className="h-4 w-4" />
                        <span className="font-semibold">{challenge.reward}</span>
                      </div>
                      <div className="flex items-center space-x-1 text-gray-500 dark:text-gray-400">
                        <Clock className="h-4 w-4" />
                        <span className="text-sm">{getTimeRemaining(challenge.expiresAt)}</span>
                      </div>
                    </div>

                    {isCompleted && !challenge.completed ? (
                      <Button
                        onClick={() => handleClaimReward(challenge.id)}
                        size="sm"
                        className="bg-green-500 hover:bg-green-600"
                      >
                        <Gift className="h-4 w-4 mr-2" />
                        Claim
                      </Button>
                    ) : challenge.completed ? (
                      <div className="flex items-center space-x-2 text-green-500">
                        <CheckCircle className="h-5 w-5" />
                        <span className="text-sm font-medium">Completed</span>
                      </div>
                    ) : (
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        In Progress
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
};