# Swami Corporate Premier League 2026 - Tournament Portal

A complete React + Vite application for managing corporate cricket tournament registrations with multi-step forms, verification workflows, and admin dashboard.

## 🚀 Features

- **Dynamic Homepage** with animated sections
- **Multi-step Registration Form** with validation
- **Corporate Verification System** 
- **Admin Dashboard** for team management
- **Config-driven UI** for easy customization
- **Responsive Design** with Tailwind CSS
- **Smooth Animations** with Framer Motion

## 🛠️ Tech Stack

- React 18
- Vite
- Tailwind CSS
- Framer Motion
- React Router DOM
- Context API

## 📦 Installation

1. **Clone or download the project**
2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```

4. **Build for production:**
   ```bash
   npm run build
   ```

## 🏗️ Project Structure

```
src/
├── components/
│   ├── Hero/
│   ├── EntryFee/
│   ├── MatchFormat/
│   ├── Awards/
│   ├── Dates/
│   ├── Venue/
│   ├── Contact/
│   ├── Forms/
│   │   ├── Step1Company/
│   │   ├── Step2Captain/
│   │   └── Step3Players/
│   └── Admin/
├── pages/
│   ├── Home.jsx
│   ├── Register.jsx
│   └── Admin.jsx
├── config/
│   └── tournamentConfig.js
├── context/
│   └── AppContext.jsx
├── utils/
│   ├── validation.js
│   └── helpers.js
└── assets/
```

## ⚙️ Configuration

Edit `src/config/tournamentConfig.js` to customize:
- Tournament details
- Entry fees
- Match format rules
- Awards and prizes
- Contact information
- Form validation rules

## 🎯 Key Features

### Homepage Sections
- Hero with tournament branding
- Entry fee details
- Match format and rules
- Awards and trophies
- Important dates
- Venue information
- Contact details

### Registration Flow
1. **Company Verification** - Company details and proof upload
2. **Captain Details** - Captain information with corporate verification
3. **Player List** - 8-10 players with individual verification

### Admin Dashboard
- View all team registrations
- Approve/reject teams
- Player-wise verification status
- Team details management

## 🎨 Styling

- Premium gradient backgrounds
- Glassmorphism effects
- Smooth animations
- Mobile-responsive design
- Professional color scheme

## 📱 Routes

- `/` - Homepage
- `/register` - Team registration form
- `/admin` - Admin dashboard

## 🔧 Development

The application uses:
- Context API for state management
- Form validation utilities
- File upload handling
- Responsive grid layouts
- Animation libraries

## 📄 License

This project is created for Swami Corporate Premier League 2026.