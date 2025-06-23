import React from 'react';
import { motion } from 'framer-motion';
import { Play, Star, Users, Heart, Clock } from 'lucide-react';
import { Game } from '../../types';

interface GameCardProps {
  game: Game;
  onPlay: (game: Game) => void;
  onToggleFavorite: (gameId: string) => void;
  isFavorite: boolean;
}

export const GameCard: React.FC<GameCardProps> = ({
  game,
  onPlay,
  onToggleFavorite,
  isFavorite,
}) => {
  const formatPlays = (plays: number) => {
    if (plays >= 1000000) return `${(plays / 1000000).toFixed(1)}M`;
    if (plays >= 1000) return `${(plays / 1000).toFixed(1)}K`;
    return plays.toString();
  };

  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
    >
      {/* Thumbnail */}
      <div className="relative aspect-video overflow-hidden">
        <img
          src={game.thumbnail}
          alt={game.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Play Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => onPlay(game)}
          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-full p-4 shadow-lg">
            <Play className="h-8 w-8 text-primary-500 ml-1" />
          </div>
        </motion.button>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex items-center space-x-2">
          {game.new && (
            <span className="px-2 py-1 text-xs font-semibold bg-accent-500 text-white rounded-full">
              NEW
            </span>
          )}
          {game.featured && (
            <span className="px-2 py-1 text-xs font-semibold bg-primary-500 text-white rounded-full">
              FEATURED
            </span>
          )}
        </div>

        {/* Favorite Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(game.id);
          }}
          className="absolute top-3 right-3 p-2 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          <Heart className={`h-5 w-5 ${isFavorite ? 'text-red-500 fill-current' : 'text-gray-600'}`} />
        </motion.button>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-gray-900 dark:text-white text-lg group-hover:text-primary-500 transition-colors">
            {game.title}
          </h3>
          <div className="flex items-center space-x-1 text-sm text-yellow-500">
            <Star className="h-4 w-4 fill-current" />
            <span className="font-medium">{game.rating}</span>
          </div>
        </div>

        <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-2">
          {game.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-3">
          {game.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1">
              <Users className="h-4 w-4" />
              <span>{formatPlays(game.plays)}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="h-4 w-4" />
              <span>{game.difficulty}</span>
            </div>
          </div>
          <span className="text-xs font-medium px-2 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded-full">
            {game.category}
          </span>
        </div>
      </div>
    </motion.div>
  );
};