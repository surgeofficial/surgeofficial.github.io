import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Grid, List, Star, Clock, Users, Zap, Heart, RotateCcw } from 'lucide-react';
import { GameCard } from '../components/game/GameCard';
import { GameModal } from '../components/game/GameModal';
import { AuthModal } from '../components/auth/AuthModal';
import { Button } from '../components/ui/Button';
import { mockGames, mockCategories } from '../data/mockData';
import { useAuth } from '../hooks/useAuth';

export const Games: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('popular');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showGameModal, setShowGameModal] = useState(false);
  const [selectedGame, setSelectedGame] = useState<any>(null);
  const [favorites, setFavorites] = useState<string[]>(['1', '2', '5']);
  const [recentlyPlayed, setRecentlyPlayed] = useState<string[]>(['2', '1', '5', '3']);
  const [activeTab, setActiveTab] = useState<'all' | 'favorites' | 'recent'>('all');
  const { user } = useAuth();

  const sortOptions = [
    { value: 'popular', label: 'Most Popular' },
    { value: 'newest', label: 'Newest' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'alphabetical', label: 'A-Z' },
  ];

  // Calculate actual category counts
  const categoriesWithCounts = useMemo(() => {
    const counts = mockGames.reduce((acc, game) => {
      acc[game.category] = (acc[game.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return mockCategories.map(category => ({
      ...category,
      count: counts[category.name] || 0
    }));
  }, []);

  const filteredAndSortedGames = useMemo(() => {
    let filtered = mockGames;

    // Filter by tab
    if (activeTab === 'favorites') {
      filtered = mockGames.filter(game => favorites.includes(game.id));
    } else if (activeTab === 'recent') {
      filtered = mockGames.filter(game => recentlyPlayed.includes(game.id));
    }

    // Apply search and category filters
    filtered = filtered.filter(game => {
      const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          game.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          game.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesCategory = selectedCategory === 'All' || game.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });

    // Sort games
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'popular':
          return b.plays - a.plays;
        case 'newest':
          return b.createdAt.getTime() - a.createdAt.getTime();
        case 'rating':
          return b.rating - a.rating;
        case 'alphabetical':
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

    return filtered;
  }, [searchQuery, selectedCategory, sortBy, activeTab, favorites, recentlyPlayed]);

  const handlePlayGame = (game: any) => {
    setSelectedGame(game);
    setShowGameModal(true);
    
    // Add to recently played
    if (!recentlyPlayed.includes(game.id)) {
      setRecentlyPlayed([game.id, ...recentlyPlayed.slice(0, 9)]);
    }
  };

  const handleToggleFavorite = (gameId: string) => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }
    
    setFavorites(prev => 
      prev.includes(gameId) 
        ? prev.filter(id => id !== gameId)
        : [...prev, gameId]
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Game Library
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Discover amazing games and start playing instantly
            </p>
          </motion.div>

          {/* Tabs */}
          <div className="flex justify-center mb-6">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-1 shadow-lg">
              <div className="flex space-x-1">
                <button
                  onClick={() => setActiveTab('all')}
                  className={`px-6 py-2 rounded-xl font-medium transition-all ${
                    activeTab === 'all'
                      ? 'bg-primary-500 text-white shadow-md'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  All Games
                </button>
                {user && (
                  <>
                    <button
                      onClick={() => setActiveTab('favorites')}
                      className={`px-6 py-2 rounded-xl font-medium transition-all flex items-center space-x-2 ${
                        activeTab === 'favorites'
                          ? 'bg-primary-500 text-white shadow-md'
                          : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                      }`}
                    >
                      <Heart className="h-4 w-4" />
                      <span>Favorites ({favorites.length})</span>
                    </button>
                    <button
                      onClick={() => setActiveTab('recent')}
                      className={`px-6 py-2 rounded-xl font-medium transition-all flex items-center space-x-2 ${
                        activeTab === 'recent'
                          ? 'bg-primary-500 text-white shadow-md'
                          : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                      }`}
                    >
                      <RotateCcw className="h-4 w-4" />
                      <span>Recent ({recentlyPlayed.length})</span>
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search games, categories, or tags..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Category Filter */}
              <div className="flex items-center space-x-4">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="All">All Categories</option>
                  {categoriesWithCounts.map(category => (
                    <option key={category.id} value={category.name}>
                      {category.name} ({category.count})
                    </option>
                  ))}
                </select>

                {/* Sort */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  {sortOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>

                {/* View Mode */}
                <div className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-xl p-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-lg transition-colors ${
                      viewMode === 'grid'
                        ? 'bg-white dark:bg-gray-600 text-primary-500 shadow-sm'
                        : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                    }`}
                  >
                    <Grid className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-lg transition-colors ${
                      viewMode === 'list'
                        ? 'bg-white dark:bg-gray-600 text-primary-500 shadow-sm'
                        : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                    }`}
                  >
                    <List className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-600 dark:text-gray-400">
            Showing {filteredAndSortedGames.length} games
            {activeTab === 'favorites' && ' in favorites'}
            {activeTab === 'recent' && ' recently played'}
            {selectedCategory !== 'All' && ` in ${selectedCategory}`}
            {searchQuery && ` matching "${searchQuery}"`}
          </p>
          
          {filteredAndSortedGames.length > 0 && (
            <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
              <Zap className="h-4 w-4 text-primary-500" />
              <span>All games play instantly</span>
            </div>
          )}
        </div>

        {/* Games Grid/List */}
        {filteredAndSortedGames.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <div className="text-6xl mb-4">🎮</div>
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
              {activeTab === 'favorites' ? 'No favorite games yet' : 
               activeTab === 'recent' ? 'No recently played games' : 'No games found'}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {activeTab === 'favorites' ? 'Start adding games to your favorites by clicking the heart icon!' :
               activeTab === 'recent' ? 'Start playing some games to see them here!' :
               'Try adjusting your search or filters to find more games.'}
            </p>
            {activeTab === 'all' && (
              <Button onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}>
                Clear Filters
              </Button>
            )}
            {(activeTab === 'favorites' || activeTab === 'recent') && (
              <Button onClick={() => setActiveTab('all')}>
                Browse All Games
              </Button>
            )}
          </motion.div>
        ) : (
          <div className={`grid gap-6 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
              : 'grid-cols-1'
          }`}>
            {filteredAndSortedGames.map((game, index) => (
              <motion.div
                key={game.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                {viewMode === 'grid' ? (
                  <GameCard
                    game={game}
                    onPlay={handlePlayGame}
                    onToggleFavorite={handleToggleFavorite}
                    isFavorite={favorites.includes(game.id)}
                  />
                ) : (
                  <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 flex items-center space-x-6 hover:shadow-xl transition-shadow">
                    <img
                      src={game.thumbnail}
                      alt={game.title}
                      className="w-24 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                        {game.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-2">
                        {game.description}
                      </p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 text-yellow-500 fill-current" />
                          <span>{game.rating}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Users className="h-4 w-4" />
                          <span>{game.plays.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>{game.difficulty}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleToggleFavorite(game.id)}
                        className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      >
                        <Heart className={`h-5 w-5 ${favorites.includes(game.id) ? 'text-red-500 fill-current' : 'text-gray-400'}`} />
                      </button>
                      <Button onClick={() => handlePlayGame(game)}>
                        Play Now
                      </Button>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>

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