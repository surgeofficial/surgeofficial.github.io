import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Settings as SettingsIcon, 
  User, 
  Bell, 
  Shield, 
  HelpCircle,
  Save,
  Trash2,
  AlertTriangle,
  Check,
  Mail,
  Send,
  Key
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { useAuth } from '../hooks/useAuth';
import { mockUser } from '../data/mockData';
import { deleteUser, reauthenticateWithCredential, EmailAuthProvider, updatePassword } from 'firebase/auth';
import { auth } from '../lib/firebase';

export const Settings: React.FC = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('account');
  
  // Notification settings
  const [notificationSettings, setNotificationSettings] = useState({
    pushEnabled: true,
    newGames: true,
    achievements: true,
    challenges: false,
    dailyChallenges: true,
    emailNotifications: true,
    weeklyDigest: false,
    promotions: true
  });

  // Account settings
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showPasswordPrompt, setShowPasswordPrompt] = useState(false);
  const [password, setPassword] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle');
  
  // Password change
  const [showPasswordChange, setShowPasswordChange] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [passwordChangeStatus, setPasswordChangeStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');

  // Email settings
  const [emailSettings, setEmailSettings] = useState({
    newEmail: mockUser.email,
    currentPassword: ''
  });

  const tabs = [
    { id: 'account', label: 'Account', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'privacy', label: 'Privacy & Security', icon: Shield },
    { id: 'help', label: 'Help', icon: HelpCircle },
  ];

  const handleSaveSettings = async () => {
    setSaveStatus('saving');
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setSaveStatus('saved');
    setTimeout(() => setSaveStatus('idle'), 2000);
  };

  const handlePasswordChange = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordChangeStatus('error');
      return;
    }

    if (!user || !user.email) {
      setPasswordChangeStatus('error');
      return;
    }

    setPasswordChangeStatus('saving');
    
    try {
      // Re-authenticate first
      const credential = EmailAuthProvider.credential(user.email, passwordData.currentPassword);
      await reauthenticateWithCredential(user, credential);
      
      // Update password
      await updatePassword(user, passwordData.newPassword);
      
      setPasswordChangeStatus('saved');
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setTimeout(() => {
        setPasswordChangeStatus('idle');
        setShowPasswordChange(false);
      }, 2000);
    } catch (error: any) {
      console.error('Password change failed:', error);
      setPasswordChangeStatus('error');
    }
  };

  const handleDeleteAccount = async () => {
    if (!user || !user.email) {
      alert('Unable to delete account. Please try signing in again.');
      return;
    }

    setIsDeleting(true);
    
    try {
      // Re-authenticate the user before deletion
      const credential = EmailAuthProvider.credential(user.email, password);
      await reauthenticateWithCredential(user, credential);
      
      // Now delete the user account
      await deleteUser(user);
      await logout();
    } catch (error: any) {
      console.error('Failed to delete account:', error);
      
      if (error.code === 'auth/wrong-password') {
        alert('Incorrect password. Please try again.');
      } else if (error.code === 'auth/too-many-requests') {
        alert('Too many failed attempts. Please try again later.');
      } else {
        alert('Failed to delete account. Please try again.');
      }
    } finally {
      setIsDeleting(false);
      setPassword('');
      setShowPasswordPrompt(false);
      setShowDeleteConfirm(false);
    }
  };

  const initiateDeleteAccount = () => {
    setShowDeleteConfirm(false);
    setShowPasswordPrompt(true);
  };

  const handleNotificationToggle = (setting: string) => {
    setNotificationSettings(prev => ({
      ...prev,
      [setting]: !prev[setting as keyof typeof prev]
    }));
  };

  const sendBulkEmail = async () => {
    // This would integrate with your email service
    alert('Bulk email feature would be implemented with your email service provider (SendGrid, Mailgun, etc.)');
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'account':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Account Information
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Email Address
                  </label>
                  <Input
                    type="email"
                    value={emailSettings.newEmail}
                    onChange={(e) => setEmailSettings({...emailSettings, newEmail: e.target.value})}
                    placeholder="Enter new email"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    User ID
                  </label>
                  <Input
                    value={user?.uid || ''}
                    disabled
                    className="bg-gray-100 dark:bg-gray-700"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Account Created
                  </label>
                  <Input
                    value={mockUser.createdAt.toLocaleDateString()}
                    disabled
                    className="bg-gray-100 dark:bg-gray-700"
                  />
                </div>
              </div>
            </div>

            {/* Bulk Email Section */}
            <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Admin Actions
              </h3>
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl">
                <div className="flex items-center space-x-3 mb-3">
                  <Mail className="h-5 w-5 text-blue-500" />
                  <h4 className="font-medium text-blue-900 dark:text-blue-400">Send Bulk Email</h4>
                </div>
                <p className="text-sm text-blue-700 dark:text-blue-300 mb-4">
                  Send an email to all registered users (excluding those who have disabled notifications).
                </p>
                <Button 
                  variant="outline" 
                  className="text-blue-600 border-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                  onClick={sendBulkEmail}
                >
                  <Send className="h-4 w-4 mr-2" />
                  Send Bulk Email
                </Button>
              </div>
            </div>

            <div className="flex justify-end">
              <Button 
                onClick={handleSaveSettings}
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
            </div>
          </div>
        );

      case 'notifications':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Notification Preferences
              </h3>
              <div className="space-y-4">
                {/* Push Notifications Toggle */}
                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">
                      Push Notifications
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Receive browser notifications
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notificationSettings.pushEnabled}
                      onChange={() => handleNotificationToggle('pushEnabled')}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600"></div>
                  </label>
                </div>

                {/* Notification Types */}
                <div className="space-y-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                  <h4 className="font-medium text-gray-900 dark:text-white">Notification Types</h4>
                  <div className="space-y-3">
                    {[
                      { key: 'newGames', label: 'New game releases' },
                      { key: 'achievements', label: 'Achievement unlocks' },
                      { key: 'challenges', label: 'Challenge completions' },
                      { key: 'dailyChallenges', label: 'Daily challenges' }
                    ].map(({ key, label }) => (
                      <div key={key} className="flex items-center justify-between">
                        <span className="text-gray-700 dark:text-gray-300">{label}</span>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={notificationSettings[key as keyof typeof notificationSettings] as boolean}
                            onChange={() => handleNotificationToggle(key)}
                            className="sr-only peer"
                          />
                          <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600"></div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Email Notifications */}
                <div className="space-y-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                  <h4 className="font-medium text-gray-900 dark:text-white">Email Notifications</h4>
                  <div className="space-y-3">
                    {[
                      { key: 'emailNotifications', label: 'Email notifications' },
                      { key: 'weeklyDigest', label: 'Weekly digest' },
                      { key: 'promotions', label: 'Promotions and updates' }
                    ].map(({ key, label }) => (
                      <div key={key} className="flex items-center justify-between">
                        <span className="text-gray-700 dark:text-gray-300">{label}</span>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={notificationSettings[key as keyof typeof notificationSettings] as boolean}
                            onChange={() => handleNotificationToggle(key)}
                            className="sr-only peer"
                          />
                          <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600"></div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <Button onClick={handleSaveSettings}>
                <Save className="h-4 w-4 mr-2" />
                Save Notification Settings
              </Button>
            </div>
          </div>
        );

      case 'privacy':
        return (
          <div className="space-y-6">
            {/* Password Change */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Password & Security
              </h3>
              
              {!showPasswordChange ? (
                <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">Password</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Last changed: Never
                      </p>
                    </div>
                    <Button 
                      variant="outline"
                      onClick={() => setShowPasswordChange(true)}
                    >
                      <Key className="h-4 w-4 mr-2" />
                      Change Password
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-xl space-y-4">
                  <h4 className="font-medium text-gray-900 dark:text-white">Change Password</h4>
                  <div className="space-y-3">
                    <Input
                      type="password"
                      placeholder="Current password"
                      value={passwordData.currentPassword}
                      onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
                    />
                    <Input
                      type="password"
                      placeholder="New password"
                      value={passwordData.newPassword}
                      onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                    />
                    <Input
                      type="password"
                      placeholder="Confirm new password"
                      value={passwordData.confirmPassword}
                      onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                    />
                  </div>
                  <div className="flex space-x-3">
                    <Button 
                      onClick={handlePasswordChange}
                      disabled={passwordChangeStatus === 'saving'}
                    >
                      {passwordChangeStatus === 'saving' ? (
                        <div className="flex items-center">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                          Updating...
                        </div>
                      ) : passwordChangeStatus === 'saved' ? (
                        <>
                          <Check className="h-4 w-4 mr-2" />
                          Updated!
                        </>
                      ) : (
                        'Update Password'
                      )}
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={() => {
                        setShowPasswordChange(false);
                        setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
                        setPasswordChangeStatus('idle');
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                  {passwordChangeStatus === 'error' && (
                    <p className="text-sm text-red-500">
                      Failed to update password. Please check your current password and try again.
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Account Deletion */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Account Management
              </h3>
              <div className="space-y-3">
                <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl">
                  <div className="flex items-center space-x-3 mb-3">
                    <AlertTriangle className="h-5 w-5 text-red-500" />
                    <h4 className="font-medium text-red-900 dark:text-red-400">Danger Zone</h4>
                  </div>
                  <p className="text-sm text-red-700 dark:text-red-300 mb-4">
                    Once you delete your account, there is no going back. Please be certain.
                  </p>
                  {!showDeleteConfirm && !showPasswordPrompt ? (
                    <Button 
                      variant="outline" 
                      className="text-red-600 border-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                      onClick={() => setShowDeleteConfirm(true)}
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete Account
                    </Button>
                  ) : showDeleteConfirm ? (
                    <div className="space-y-3">
                      <p className="text-sm font-medium text-red-900 dark:text-red-400">
                        Are you absolutely sure? This action cannot be undone.
                      </p>
                      <div className="flex space-x-3">
                        <Button 
                          className="bg-red-600 hover:bg-red-700"
                          onClick={initiateDeleteAccount}
                        >
                          Yes, Delete My Account
                        </Button>
                        <Button 
                          variant="outline"
                          onClick={() => setShowDeleteConfirm(false)}
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <p className="text-sm font-medium text-red-900 dark:text-red-400">
                        Please enter your password to confirm account deletion:
                      </p>
                      <Input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        className="max-w-sm"
                      />
                      <div className="flex space-x-3">
                        <Button 
                          className="bg-red-600 hover:bg-red-700"
                          onClick={handleDeleteAccount}
                          disabled={!password || isDeleting}
                        >
                          {isDeleting ? (
                            <div className="flex items-center">
                              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                              Deleting...
                            </div>
                          ) : (
                            'Confirm Delete'
                          )}
                        </Button>
                        <Button 
                          variant="outline"
                          onClick={() => {
                            setShowPasswordPrompt(false);
                            setPassword('');
                          }}
                          disabled={isDeleting}
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        );

      case 'help':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Help & Support
              </h3>
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors cursor-pointer">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                    Frequently Asked Questions
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Find answers to common questions about Surge
                  </p>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors cursor-pointer">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                    Contact Support
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Get help from our support team
                  </p>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors cursor-pointer">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                    Report a Bug
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Help us improve Surge by reporting issues
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                About Surge
              </h3>
              <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                  Version 1.0.0
                </p>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  © 2025 Surge. Made with ❤️ for gamers everywhere.
                </p>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Settings
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your account preferences and settings
          </p>
        </motion.div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
          <div className="flex flex-col lg:flex-row">
            {/* Sidebar */}
            <div className="lg:w-64 bg-gray-50 dark:bg-gray-700 p-6">
              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                      activeTab === tab.id
                        ? 'bg-primary-500 text-white'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    <tab.icon className="h-5 w-5" />
                    <span className="font-medium">{tab.label}</span>
                  </button>
                ))}
              </nav>
            </div>

            {/* Content */}
            <div className="flex-1 p-6">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
              >
                {renderTabContent()}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};