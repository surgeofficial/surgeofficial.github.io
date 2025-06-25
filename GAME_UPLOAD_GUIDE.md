# 🎮 How to Add Games to Your Surge Site

This guide shows you how to add games directly to your project files.

## 📁 File Structure

Your games go in the `public/games/` folder:

```
public/
└── games/
    ├── snake-game/
    │   └── index.html
    ├── tetris/
    │   └── index.html
    ├── your-new-game/
    │   ├── index.html
    │   ├── style.css
    │   ├── script.js
    │   └── assets/
    └── another-game/
        └── index.html
```

## 🚀 Step-by-Step Process

### Step 1: Add Your Game Files

1. **Create a folder** in `public/games/` with your game name (use hyphens, no spaces)
   ```
   public/games/my-awesome-game/
   ```

2. **Add your game files** to that folder:
   - `index.html` (required - main game file)
   - `style.css` (optional - if you have separate CSS)
   - `script.js` (optional - if you have separate JS)
   - `assets/` folder (optional - for images, sounds, etc.)

### Step 2: Update the Game List

Open `src/data/mockData.ts` and add your game to the `mockGames` array:

```typescript
{
  id: '7', // Increment the number
  title: 'My Awesome Game',
  description: 'A super fun game that does amazing things!',
  thumbnail: 'https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=400',
  category: 'Action', // Action, Puzzle, Adventure, Strategy, Music, Sports
  tags: ['fun', 'action', 'arcade'],
  rating: 4.5, // 0-5 stars
  plays: 1000, // Starting play count
  url: '/games/my-awesome-game/index.html', // Path to your game
  featured: true, // true = shows on homepage
  new: true, // true = shows "NEW" badge
  difficulty: 'Medium', // Easy, Medium, Hard
  createdAt: new Date('2024-03-01'), // Today's date
},
```

### Step 3: Deploy

Commit and push your changes to GitHub. Your game will be live!

## 🎯 Example Games Included

I've added two example games to show you how it works:

1. **Snake Game** - `/games/snake-game/index.html`
2. **Tetris** - `/games/tetris/index.html`

You can play these right now on your site to see how it works!

## 📝 Game Requirements

Your game should:
- Have an `index.html` file as the main entry point
- Work in an iframe (most HTML5 games do)
- Be responsive (work on mobile and desktop)
- Use relative paths for assets (no absolute URLs)

## 🖼️ Thumbnails

For thumbnails, you can:
- Use Pexels URLs (free stock photos)
- Upload images to your repo and reference them
- Use any public image URL

Example Pexels URLs:
```
https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=400
https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg?auto=compress&cs=tinysrgb&w=400
```

## 🏷️ Categories

Available categories:
- Action
- Adventure  
- Puzzle
- Strategy
- Sports
- Racing
- Simulation
- RPG
- Platformer
- Shooter
- Music
- Educational

## ⭐ Featured Games

Set `featured: true` to show your game:
- On the homepage
- In the "Featured Games" section
- With special highlighting

## 🆕 New Games

Set `new: true` to show a "NEW" badge on your game.

## 🎮 That's It!

Your games are now part of your site permanently. Just simple file management!

The games will load instantly when users click "Play Now" and will be embedded directly in your site.
