import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, Star, Users, Clock, Heart, ExternalLink } from 'lucide-react';
import { Button } from '../ui/Button';
import { Game } from '../../types';

interface GameModalProps {
  isOpen: boolean;
  onClose: () => void;
  game: Game | null;
}

export const GameModal: React.FC<GameModalProps> = ({
  isOpen,
  onClose,
  game,
}) => {
  const [isFavorite, setIsFavorite] = useState(false);

  if (!game) return null;

  const formatPlays = (plays: number) => {
    if (plays >= 1000000) return `${(plays / 1000000).toFixed(1)}M`;
    if (plays >= 1000) return `${(plays / 1000).toFixed(1)}K`;
    return plays.toString();
  };

  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-4xl bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="relative">
              <img
                src={game.thumbnail}
                alt={game.title}
                className="w-full h-64 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-black/70 rounded-full transition-colors"
              >
                <X className="h-5 w-5 text-white" />
              </button>

              {/* Game Info Overlay */}
              <div className="absolute bottom-4 left-4 right-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-3xl font-bold text-white mb-2">{game.title}</h2>
                    <div className="flex items-center space-x-4 text-white/90">
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span>{game.rating}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="h-4 w-4" />
                        <span>{formatPlays(game.plays)}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{game.difficulty}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {game.featured && (
                      <span className="px-3 py-1 text-sm font-semibold bg-primary-500 text-white rounded-full">
                        FEATURED
                      </span>
                    )}
                    {game.new && (
                      <span className="px-3 py-1 text-sm font-semibold bg-accent-500 text-white rounded-full">
                        NEW
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Game Description */}
                <div className="lg:col-span-2">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    About This Game
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                    {game.description}
                  </p>

                  {/* Tags */}
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                      Tags
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {game.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Game Preview (Placeholder) */}
                  <div className="bg-gray-100 dark:bg-gray-700 rounded-xl p-8 text-center">
                    <div className="text-6xl mb-4">🎮</div>
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      Game Preview
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      This is where the game would be embedded. Click "Play Now" to start playing!
                    </p>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Game URL: {game.url}
                    </div>
                  </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                  {/* Play Button */}
                  <Button 
                    size="lg" 
                    className="w-full"
                    onClick={() => window.open(game.url, '_blank')}
                  >
                    <Play className="h-5 w-5 mr-2" />
                    Play Now
                  </Button>

                  {/* Game Stats */}
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                      Game Stats
                    </h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Category</span>
                        <span className="font-medium text-gray-900 dark:text-white">
                          {game.category}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Rating</span>
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="font-medium text-gray-900 dark:text-white">
                            {game.rating}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Total Plays</span>
                        <span className="font-medium text-gray-900 dark:text-white">
                          {formatPlays(game.plays)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Difficulty</span>
                        <span className="font-medium text-gray-900 dark:text-white">
                          {game.difficulty}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="space-y-3">
                    <Button 
                      variant="outline" 
                      className={`w-full ${isFavorite ? 'bg-red-50 border-red-200 text-red-600 dark:bg-red-900/20 dark:border-red-800 dark:text-red-400' : ''}`}
                      onClick={handleToggleFavorite}
                    >
                      <Heart className={`h-4 w-4 mr-2 ${isFavorite ? 'fill-current' : ''}`} />
                      {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
                    </Button>
                    <Button variant="ghost" className="w-full" onClick={() => window.open(game.url, '_blank')}>
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Open in New Tab
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};