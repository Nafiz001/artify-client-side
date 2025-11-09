# Artisan's Echo

A modern and elegant art marketplace platform where artists can showcase their creative works and art enthusiasts can discover, appreciate, and curate their favorite pieces.

🔗 **Live Site:** [Coming Soon]

## ✨ Key Features

- **🎨 Beautiful Gallery Experience** - Browse stunning artworks from talented artists worldwide with an elegant, modern UI inspired by leading art marketplaces
- **🔐 Secure Authentication** - Google Sign-In and email/password authentication with Firebase, including profile management
- **🖼️ Artist Portfolios** - Create and manage your personal art gallery with full CRUD operations
- **❤️ Interactive Engagement** - Like artworks and add favorites to your personal collection
- **🔍 Smart Search & Filters** - Find art by title, artist name, or category with real-time filtering
- **🌙 Dark/Light Mode** - Toggle between themes with localStorage persistence for comfortable viewing
- **📱 Fully Responsive** - Seamless experience across desktop, tablet, and mobile devices

## 🛠️ Technologies Used

### Frontend
- **React** - Modern UI library for building interactive interfaces
- **React Router** - Client-side routing for seamless navigation
- **Tailwind CSS** - Utility-first CSS framework
- **DaisyUI** - Beautiful component library for Tailwind
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
