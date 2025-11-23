# 🐾 Momo - Gamified Task Manager

**Turn productivity into play with adorable pet companions!**

Momo is a gamified task management app that makes getting things done fun and rewarding. Complete tasks, earn coins, build streaks, and watch your cute virtual pet celebrate your achievements with delightful animations.

## ✨ Features

### 📝 **Task Management**

- Create tasks with titles, descriptions, and priorities (Low, Medium, High)
- Set due dates and times
- Organize by priority with visual color coding
- Track open and completed tasks
- OVERDUE indicators for missed tasks

### 🐱 **Virtual Pet Companions**

- 12+ adorable animated pets (Cats, Bears, Pandas, Penguins, and more!)
- Live animations that react to your task completion
- Happy celebration animations when you complete tasks
- Customizable idle animations (Idle, Walk, Roll)
- Switch between owned pets anytime

### 💰 **Gamification & Rewards**

- Earn coins by completing tasks (10-30 coins based on priority)
- Build daily streaks to stay motivated
- Track total tasks completed
- Visual progress tracking on your profile

### 🛍️ **Pet Shop**

- Browse and purchase new pets with earned coins
- Unlock new idle animations
- Clear pricing system
- Instant preview of new pets

### 👥 **Social Features**

- Connect with friends
- Send "good luck" messages (+5 coin bonus)
- View friend streaks and task counts
- Share invite links (+10 coin bonus)

### 📅 **Calendar & Planning**

- Month view with task highlights
- Upcoming tasks list
- Weekly progress tracking
- "Today" view on home page

### 🎨 **Beautiful UI**

- Mobile-first responsive design
- Clean, minimalist interface
- Smooth animations with Framer Motion
- Accessible touch targets (44px+)
- Settings with Profile, Friends, and Theme pages

## Tech Stack

- **React** - UI framework
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first styling
- **Zustand** - State management
- **Framer Motion** - Animations
- **React Router** - Navigation
- **Lucide React** - Icons
- **date-fns** - Date utilities

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
Momo-app/
├── public/
│   └── pets/           # Organized sprite animations
├── src/
│   ├── components/     # React components
│   │   ├── layout/     # Layout components
│   │   ├── pet/        # Pet display & animations
│   │   ├── tasks/      # Task management UI
│   │   ├── shop/       # Shop interface
│   │   ├── customize/  # Pet customization
│   │   ├── progress/   # Stats & calendar
│   │   └── ui/         # Reusable UI components
│   ├── pages/          # Page components
│   ├── store/          # Zustand stores
│   ├── utils/          # Helper functions
│   └── data/           # Sample data
├── assets/             # Source sprite packs
└── ATTRIBUTION.md      # Asset credits
```

## 🚀 How to Use Momo

1. **📝 Create Tasks**

   - Tap "+ Add Task" button
   - Enter title, description (optional), and priority level
   - Set due date/time if needed
   - Submit to add to your task list

2. **✅ Complete Tasks**

   - Tap "Complete" on any task
   - Watch your pet jump for joy! 🎉
   - Earn coins based on priority (High: 30, Medium: 20, Low: 10)
   - Build your daily streak

3. **🎨 Customize Your Pet**

   - Go to "Customize" tab
   - Browse your owned pets and select one
   - Change idle animations (Idle, Walk, Roll)
   - See live preview updates

4. **🛍️ Shop for More**

   - Visit the "Shop" tab
   - Browse available pets and animations
   - Purchase with earned coins
   - Instantly equip your new items

5. **👥 Connect with Friends**

   - Go to Settings → Friends
   - Send good luck messages (+5 coins)
   - Share invite links (+10 coins)
   - View friend progress

6. **📊 Track Progress**
   - Check your profile for stats
   - View current and longest streaks
   - See total tasks completed
   - Monitor your coin balance

## Data Persistence

All data is stored in localStorage:

- `momo-tasks` - Your tasks
- `momo-user` - Coins and streak data
- `momo-pets` - Active pet and owned items

## 🎨 Asset Attribution

### Pet Sprites

All pet character sprites used in Momo are from **[Craftpix.net](https://craftpix.net)** and are used under their respective licenses:

- **Cats, Bears, Pandas, Raccoons, Ducklings, Beavers, Capybaras, Penguins, Pigs, Bunnies, Koalas, Red Pandas**
- **Artist:** Craftpix.net
- **License:** As per Craftpix license terms (see individual license.txt files in `/assets` directory)

### Icons

- **Library:** [Lucide React](https://lucide.dev/)
- **License:** ISC License

### Fonts

- System fonts (San Francisco, Segoe UI, Roboto, etc.)

**Special Thanks:** To Craftpix.net for providing high-quality game assets that make Momo delightful and engaging!

## Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import repository in Vercel dashboard
3. Framework: Vite
4. Build command: `npm run build`
5. Output directory: `dist`
6. Deploy!

## 💡 Development Notes

- **Sprite Performance:** Pet animations are preloaded on mount to prevent flicker
- **Mobile-First:** All touch targets are 44px+ for accessibility
- **Forgiving Streak:** Completing a task today or yesterday continues your streak
- **Priority Rewards:** High priority = 30 coins, Medium = 20 coins, Low = 10 coins
- **State Persistence:** All data stored in localStorage (tasks, user data, pets)

## 🤝 Contributing

This is a prototype/portfolio project. Feel free to fork and build upon it!

## 📄 License

MIT License - Feel free to use this project for learning and inspiration.

---

**Made with ❤️ using React, Vite, and adorable pets from Craftpix.net**
