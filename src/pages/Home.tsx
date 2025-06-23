import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Play, 
  Zap, 
  Users, 
  Trophy, 
  Star, 
  Clock, 
  TrendingUp,
  ArrowRight,
  Gamepad2,
  Award,
  Target,
  Sparkles
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { GameCard } from '../components/game/GameCard';
import { AuthModal } from '../components/auth/AuthModal';
import { GameModal } from '../components/game/GameModal';
import { mockGames, mockCategories } from '../data/mockData';
import { useAuth } from '../hooks/useAuth';

export const Home: React.FC = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showGameModal, setShowGameModal] = useState(false);
  const [selectedGame, setSelectedGame] = useState<any>(null);
  const { user } = useAuth();

  const featuredGames = mockGames.filter(game => game.featured).slice(0, 3);
  const popularGames = mockGames.sort((a, b) => b.plays - a.plays).slice(0, 6);

  // Show login reminder for non-logged-in users
  useEffect(() => {
    if (!user) {
      const interval = setInterval(() => {
        const messages = [
          "You're not signed in! Sign in to gain the full experience!",
          "Missing out on rewards! Create your free account now!",
          "Join Surge to unlock achievements and track your progress!",
          "Sign up to save your favorite games and earn Surge Coins!"
        ];
        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
        alert(randomMessage);
      }, 5 * 60 * 1000); // 5 minutes

      return () => clearInterval(interval);
    }
  }, [user]);

  const stats = [
    { icon: Gamepad2, label: 'Games Available', value: '150+', color: 'text-primary-500' },
    { icon: Users, label: 'Active Players', value: '25K+', color: 'text-secondary-500' },
    { icon: Trophy, label: 'Tournaments', value: '50+', color: 'text-accent-500' },
    { icon: Award, label: 'Achievements', value: '200+', color: 'text-success-500' },
  ];

  const features = [
    {
      icon: Zap,
      title: 'Instant Play',
      description: 'No downloads, no waiting. Jump into any game instantly from your browser.',
      color: 'bg-primary-500'
    },
    {
      icon: Trophy,
      title: 'Earn Rewards',
      description: 'Collect Surge Coins, unlock achievements, and climb the leaderboards.',
      color: 'bg-secondary-500'
    },
    {
      icon: Users,
      title: 'Social Gaming',
      description: 'Connect with friends, share achievements, and compete together.',
      color: 'bg-accent-500'
    },
    {
      icon: Target,
      title: 'Daily Challenges',
      description: 'Fresh challenges every day to test your skills and earn extra rewards.',
      color: 'bg-success-500'
    },
  ];

  const handlePlayGame = (game: any) => {
    setSelectedGame(game);
    setShowGameModal(true);
  };

  const handleToggleFavorite = (gameId: string) => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }
    // Toggle favorite logic
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-500 via-secondary-500 to-accent-500 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse-slow" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse-slow delay-1000" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <h1 className="text-5xl lg:text-7xl font-bold mb-6">
                Feel the{' '}
                <span className="relative">
                  <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                    Surge
                  </span>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5, type: "spring" }}
                    className="absolute -top-4 -right-4"
                  >
                    <Sparkles className="h-8 w-8 text-yellow-400" />
                  </motion.div>
                </span>
              </h1>
              <p className="text-xl lg:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
                The ultimate web-based gaming platform. Play hundreds of games instantly without downloads, 
                earn rewards, and compete with friends.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
            >
              {user ? (
                <Link to="/games">
                  <Button size="lg" variant="white">
                    <Play className="h-5 w-5 mr-2" />
                    Continue Playing
                  </Button>
                </Link>
              ) : (
                <Button 
                  size="lg" 
                  onClick={() => setShowAuthModal(true)}
                  variant="white"
                >
                  <Play className="h-5 w-5 mr-2" />
                  Start Playing Free
                </Button>
              )}
              <Link to="/games">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-white text-white hover:bg-white hover:text-primary-500 transition-all duration-200"
                >
                  Browse Games
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto"
            >
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <stat.icon className={`h-8 w-8 ${stat.color}`} />
                  </div>
                  <div className="text-3xl font-bold mb-1">{stat.value}</div>
                  <div className="text-white/80 text-sm">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Games */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Featured Games
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400">
                Hand-picked games that define the Surge experience
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredGames.map((game, index) => (
              <motion.div
                key={game.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <GameCard
                  game={game}
                  onPlay={handlePlayGame}
                  onToggleFavorite={handleToggleFavorite}
                  isFavorite={false}
                />
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/games">
              <Button size="lg">
                View All Games
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Why Choose Surge?
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                We've built the ultimate gaming platform with features that put you first
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center group"
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 ${feature.color} rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Games */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Trending Now
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400">
                The most popular games on Surge right now
              </p>
            </div>
            <div className="hidden sm:flex items-center space-x-2 text-primary-500">
              <TrendingUp className="h-6 w-6" />
              <span className="font-semibold">Hot</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {popularGames.map((game, index) => (
              <motion.div
                key={game.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <GameCard
                  game={game}
                  onPlay={handlePlayGame}
                  onToggleFavorite={handleToggleFavorite}
                  isFavorite={false}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      {!user && (
        <section className="py-20 bg-gradient-to-r from-primary-500 to-secondary-500">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-white mb-6">
                Ready to Join the Surge Community?
              </h2>
              <p className="text-xl text-white/90 mb-8 leading-relaxed">
                Create your free account today and unlock personalized features, achievements, 
                and the full Surge experience.
              </p>
              <Button 
                size="lg" 
                onClick={() => setShowAuthModal(true)}
                variant="white"
              >
                <Zap className="h-5 w-5 mr-2" />
                Join Surge for Free
              </Button>
            </motion.div>
          </div>
        </section>
      )}

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        initialMode="signup"
      />

      <GameModal
        isOpen={showGameModal}
        onClose={() => setShowGameModal(false)}
        game={selectedGame}
      />
    </div>
  );
};