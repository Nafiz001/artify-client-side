# Artisan's Echo - Art Marketplace Platform

A modern and elegant art marketplace platform where artists can showcase their creative works and art enthusiasts can discover, appreciate, and curate their favorite pieces.

🔗 **Live Site:** [https://artify-client-side.web.app](https://artify-client-side.web.app)

## ✨ Key Features

### 🎯 Assignment 10 Enhancements

- **📊 Professional Dashboard** - Comprehensive dashboard with real-time statistics, dynamic charts (Pie & Line charts using Recharts), data tables, and quick actions for managing your art portfolio
- **👤 Profile Management** - Full-featured profile page with editable information including bio, location, website, and profile photo with account details display
- **🏠 Enhanced Home Page** - 11+ engaging sections including Statistics, Testimonials, FAQ, Featured Artworks, Top Artists, Community Highlights, and Newsletter subscription
- **📄 Additional Pages** - Professional About Us page with team showcase, Contact page with form and map integration, and comprehensive Privacy Policy page
- **🎭 Demo Credentials** - One-click demo login button for easy testing and exploration of the platform
- **🔗 Functional Navigation** - Complete navigation system with working footer links, dashboard sidebar menu, and responsive mobile navigation

### 🎨 Core Features

- **🎨 Stunning Art Gallery** - Browse and explore beautiful artworks from talented artists worldwide with an elegant, modern UI featuring smooth animations and intuitive navigation
- **👤 Artist Profiles** - Dedicated artist profile pages showcasing bio, total artworks, accumulated likes, and follower count with a complete gallery view
- **🖼️ Personal Art Management** - Create, update, and manage your personal art gallery with full CRUD operations including image upload, categorization, and visibility controls
- **❤️ Interactive Engagement System** - Like artworks to show appreciation (using MongoDB $inc for real-time count updates) and add favorites to your personal collection for easy access
- **🔍 Advanced Search & Filter** - Find art by title, artist name, or category with real-time filtering, plus a dedicated category page with tab-based navigation grouping artworks by type
- **🌙 Dark/Light Theme Toggle** - Seamlessly switch between dark and light modes with localStorage persistence for comfortable viewing at any time of day
- **🔐 Secure Authentication** - Google Sign-In and email/password authentication with Firebase, including profile photo display and secure private routes
- **📱 Fully Responsive Design** - Beautiful, consistent experience across desktop, tablet, and mobile devices with adaptive layouts and touch-friendly interfaces

## 🛠️ Technologies Used

### Frontend
- **React** - Modern UI library for building interactive interfaces
- **React Router** - Client-side routing for seamless navigation
- **Tailwind CSS** - Utility-first CSS framework
- **DaisyUI** - Beautiful component library for Tailwind
- **Recharts** - Composable charting library for React (Dashboard charts)
- **Firebase Authentication** - Secure user authentication
- **SweetAlert2** - Beautiful popup notifications
- **React Awesome Reveal** - Smooth animation effects
- **React Simple Typewriter** - Engaging typewriter text animations
- **React Tooltip** - Enhanced user experience with tooltips
- **React Icons** - Comprehensive icon library

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database for flexible data storage
- **CORS** - Cross-Origin Resource Sharing middleware

## 🚀 NPM Packages

```json
{
  "dependencies": {
    "react": "^19.1.1",
    "react-dom": "^19.1.1",
    "react-router-dom": "^7.9.4",
    "firebase": "^12.4.0",
    "sweetalert2": "^11.26.3",
    "react-awesome-reveal": "^4.2.5",
    "react-simple-typewriter": "^5.0.1",
    "react-tooltip": "^5.26.3",
    "react-icons": "^5.0.1",
    "tailwindcss": "^4.1.16",
    "daisyui": "^5.3.10"
  }
}
```

## 🔑 Environment Variables

Create a `.env.local` file in the root directory:

```env
VITE_APIKEY=your_firebase_api_key
VITE_AUTHDOMAIN=your_firebase_auth_domain
VITE_PROJECTID=your_firebase_project_id
VITE_STORAGEBUCKET=your_firebase_storage_bucket
VITE_MESSAGINGSENDERID=your_firebase_messaging_sender_id
VITE_APPID=your_firebase_app_id
VITE_API_URL=your_backend_api_url
```

## 📦 Installation & Setup

1. Clone the repository
```bash
git clone https://github.com/Nafiz001/artify-client-side.git
cd artify-client-side
```

2. Install dependencies
```bash
npm install
```

3. Create `.env.local` file with your Firebase credentials

4. Start the development server
```bash
npm run dev
```

5. Build for production
```bash
npm run build
```

## 🎯 Core Functionalities

### Public Routes
- **Home** - Hero slider, featured artworks, categories, and top artists
- **Explore Artworks** - Browse all public artworks with search and category filters
- **Login/Register** - Secure authentication with email/password and Google Sign-In

### Private Routes (Authentication Required)
- **Add Artwork** - Upload new artworks with detailed information
- **Artwork Details** - View complete artwork information, like, and add to favorites
- **My Gallery** - Manage your artworks (view, edit, delete)
- **My Favorites** - Curated collection of your favorite artworks

## 🎨 Design Inspiration

The design is inspired by [Saatchi Art](https://www.saatchiart.com/), featuring:
- Clean, modern interface with emphasis on artwork imagery
- Grid-based layouts with hover effects
- Elegant typography and balanced spacing
- Professional color scheme and visual hierarchy

## 👨‍💻 Author

**Nafiz001**  
📧 Email: [Your Email]  
🔗 GitHub: [@Nafiz001](https://github.com/Nafiz001)

## 📄 License

This project is licensed under the MIT License.

---

Made with ❤️ by artists, for artists
