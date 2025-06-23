import React from 'react';
import { Link } from 'react-router-dom';
import { Zap, Github, Heart, MessageSquare, Send, Twitter, Instagram, Facebook } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <Zap className="h-8 w-8 text-primary-500" />
              <span className="text-2xl font-bold bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">
                Surge
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Feel the Surge. Play without limits.
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-500">
              The ultimate web-based gaming platform for students and casual players everywhere.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/games" className="text-gray-600 dark:text-gray-400 hover:text-primary-500 transition-colors">Browse Games</Link></li>
              <li><Link to="/challenges" className="text-gray-600 dark:text-gray-400 hover:text-primary-500 transition-colors">Challenges</Link></li>
              <li><Link to="/shop" className="text-gray-600 dark:text-gray-400 hover:text-primary-500 transition-colors">Shop</Link></li>
              <li><Link to="/profile" className="text-gray-600 dark:text-gray-400 hover:text-primary-500 transition-colors">Profile</Link></li>
            </ul>
          </div>

          {/* Community */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Community</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-primary-500 transition-colors">Submit a Game</a></li>
              <li><Link to="/feedback" className="text-gray-600 dark:text-gray-400 hover:text-primary-500 transition-colors">Give Feedback</Link></li>
              <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-primary-500 transition-colors">Discord</a></li>
              <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-primary-500 transition-colors">Community</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Support</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-primary-500 transition-colors">Help Center</a></li>
              <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-primary-500 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-primary-500 transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-primary-500 transition-colors">Contact Us</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                © 2025 Surge. Made with <Heart className="inline h-4 w-4 text-red-500 mx-1" /> for gamers everywhere.
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <a href="#" className="text-gray-400 hover:text-primary-500 transition-colors">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-500 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-500 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-500 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-500 transition-colors">
                <MessageSquare className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};