# Futuristic Developer Portfolio

A high-performance, accessible, and visually stunning portfolio website built with React, Vite, and Tailwind CSS.

## 🚀 Features

- **Futuristic Design**: Glassmorphism, neon accents, and smooth animations.
- **Responsive**: Fully responsive layout that works on all devices.
- **Accessible**: Semantic HTML, ARIA labels, and keyboard navigation support.
- **Performance**: Lazy loading, optimized assets, and minimal layout thrashing.
- **Interactive**: Custom cursor, hover effects, and animated transitions.
- **Project Showcase**: Filterable project gallery with detailed modals.
- **Contact Form**: Client-side validation and easy integration.

## 🛠 Tech Stack

- **Core**: React 18+, Vite
- **Styling**: Tailwind CSS, PostCSS
- **Animations**: Framer Motion, CSS Transitions
- **Icons**: Lucide React
- **Routing**: React Router DOM

## 🏃‍♂️ Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/portfolio.git
   cd portfolio
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create environment variables:

   ```bash
   cp .env.example .env
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open [http://localhost:5173](http://localhost:5173) in your browser.

## 📦 Build for Production

To create a production build:

```bash
npm run build
```

The built files will be in the `dist` directory.

## 🎨 Customization

### Colors & Theme

Edit `tailwind.config.js` to customize the color palette:

```javascript
colors: {
  neon: {
    blue: '#00f3ff',
    purple: '#bc13fe',
    pink: '#ff00ff',
    green: '#0aff00',
  },
  // ...
}
```

### Projects Data

Update `src/data/projects.json` to add your own projects.

## 📄 License

MIT License - feel free to use this for your own portfolio!
