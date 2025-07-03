import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, Star, Users, Clock, Heart, ExternalLink, Maximize, Minimize } from 'lucide-react';
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
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showPreview, setShowPreview] = useState(true);

  if (!game) return null;

  const formatPlays = (plays: number) => {
    if (plays >= 1000000) return `${(plays / 1000000).toFixed(1)}M`;
    if (plays >= 1000) return `${(plays / 1000).toFixed(1)}K`;
    return plays.toString();
  };

  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const handlePlayFullscreen = () => {
    setIsFullscreen(true);
    setShowPreview(false);
  };

  const handleExitFullscreen = () => {
    setIsFullscreen(false);
    setShowPreview(true);
  };

  const handleCloseModal = () => {
    setIsFullscreen(false);
    setShowPreview(true);
    onClose();
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
            onClick={!isFullscreen ? handleCloseModal : undefined}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              y: 0,
              width: isFullscreen ? '100vw' : 'auto',
              height: isFullscreen ? '100vh' : 'auto',
              maxWidth: isFullscreen ? 'none' : '4xl'
            }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3 }}
            className={`relative bg-white dark:bg-gray-800 shadow-2xl overflow-hidden ${
              isFullscreen ? 'rounded-none' : 'w-full max-w-4xl rounded-2xl'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Fullscreen Game View */}
            {isFullscreen ? (
              <div className="w-full h-full relative">
                {/* Fullscreen Controls */}
                <div className="absolute top-4 right-4 z-10 flex items-center space-x-2">
                  <button
                    onClick={handleExitFullscreen}
                    className="p-2 bg-black/50 hover:bg-black/70 rounded-full transition-colors"
                  >
                    <Minimize className="h-5 w-5 text-white" />
                  </button>
                  <button
                    onClick={handleCloseModal}
                    className="p-2 bg-black/50 hover:bg-black/70 rounded-full transition-colors"
                  >
                    <X className="h-5 w-5 text-white" />
                  </button>
                </div>

                {/* Game Iframe */}
                <iframe
                  src={game.url}
                  className="w-full h-full border-0"
                  title={game.title}
                  allowFullScreen
                />
              </div>
            ) : (
              <>
                {/* Header */}
                <div className="relative">
                  {showPreview && game.preview ? (
                    <div className="relative w-full h-64 bg-black">
                      {game.previewType === 'video' ? (
                        <video
                          src={game.preview}
                          className="w-full h-full object-cover"
                          autoPlay
                          loop
                          muted
                          playsInline
                        />
                      ) : (
                        <img
                          src={game.preview}
                          alt={`${game.title} preview`}
                          className="w-full h-full object-cover"
                        />
                      )}
                      
                      {/* Preview Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      
                      {/* Play Button Overlay */}
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={handlePlayFullscreen}
                        className="absolute inset-0 flex items-center justify-center group"
                      >
                        <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-full p-6 shadow-lg group-hover:bg-white group-hover:scale-110 transition-all duration-300">
                          <Play className="h-12 w-12 text-primary-500 ml-1" />
                        </div>
                      </motion.button>
                    </div>
                  ) : (
                    <img
                      src={game.thumbnail}
                      alt={game.title}
                      className="w-full h-64 object-cover"
                    />
                  )}
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  {/* Close Button */}
                  <button
                    onClick={handleCloseModal}
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

                      {/* Game Preview Section */}
                      <div className="bg-gray-100 dark:bg-gray-700 rounded-xl p-6">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                            Game Preview
                          </h4>
                          {game.preview && (
                            <button
                              onClick={() => setShowPreview(!showPreview)}
                              className="text-sm text-primary-500 hover:text-primary-600 font-medium"
                            >
                              {showPreview ? 'Hide Preview' : 'Show Preview'}
                            </button>
                          )}
                        </div>
                        
                        {game.preview && showPreview ? (
                          <div className="relative aspect-video rounded-lg overflow-hidden bg-black">
                            {game.previewType === 'video' ? (
                              <video
                                src={game.preview}
                                className="w-full h-full object-cover"
                                controls
                                loop
                                muted
                              />
                            ) : (
                              <img
                                src={game.preview}
                                alt={`${game.title} preview`}
                                className="w-full h-full object-cover"
                              />
                            )}
                          </div>
                        ) : (
                          <div className="text-center py-8">
                            <div className="text-6xl mb-4">🎮</div>
                            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                              Ready to Play
                            </h4>
                            <p className="text-gray-600 dark:text-gray-400 mb-4">
                              Click "Play Now" to start playing in fullscreen!
                            </p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                      {/* Play Button */}
                      <Button 
                        size="lg" 
                        className="w-full"
                        onClick={handlePlayFullscreen}
                      >
                        <Maximize className="h-5 w-5 mr-2" />
                        Play Fullscreen
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
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};