#  FarmLand - Organic Produce E-commerce

A modern, responsive e-commerce application for organic produce built with React 19 and modern web technologies.

![FarmLand Preview](/public/FarmLand.jpeg)
![Shop Page](/public/Shop.jpeg)
![Basket Page](/public/Basket.jpeg)

##  Features

### Shopping Experience
- **Product Catalog** - Browse 29+ organic products (fruits, vegetables, organic items)
- **Smart Search** - Real-time product search with instant results
- **Advanced Filtering** - Filter by category (fruits, vegetables, organic)
- **Price Sorting** - Sort products by price (low to high, high to low)
- **Shopping Cart** - Add, remove, and manage cart items with quantity controls
- **Persistent Cart** - Cart state preserved across browser sessions

### User Experience
- **Responsive Design** - Optimized for desktop, tablet, and mobile
- **Smooth Animations** - GSAP-powered animations and Lenis smooth scrolling
- **Error Handling** - Comprehensive error boundaries and 404 pages
- **Loading States** - Professional loading indicators and shimmer effects

### 🏗️ Technical Features
- **Modern React** - Built with React 19 and latest features
- **Type Safety** - ESLint configuration for code quality
- **Testing** - Comprehensive test suite with Vitest and Testing Library
- **Performance** - Optimized bundle size and lazy loading
- **Accessibility** - ARIA labels and keyboard navigation support

##  Live Demo

[View Live Demo](https://farmland-produce.vercel.app/) | [View Source Code](https://github.com/ayoroq/farmland)

## Tech Stack

- **Frontend:** React 19, JavaScript ES6+
- **Routing:** React Router 7
- **Styling:** CSS Modules
- **Animations:** GSAP, Lenis
- **Build Tool:** Vite
- **Testing:** Vitest, Testing Library, jsdom
- **Linting:** ESLint
- **Package Manager:** npm

##  Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/farmland.git
   cd farmland
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:5173
   ```

## Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

## Build & Deploy

```bash
# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## 📁 Project Structure

```
farmland/
├── public/
│   └── images/           # Product images
├── src/
│   ├── components/       # Reusable UI components
│   │   ├── Card.jsx
│   │   ├── ErrorBoundary.jsx
│   │   ├── ImageWithLoading.jsx
│   │   ├── Navbar.jsx
│   │   └── Footer.jsx
│   ├── pages/           # Page components
│   │   ├── Home/
│   │   ├── Shop/
│   │   ├── Basket/
│   │   ├── About/
│   │   ├── Contact/
│   │   └── NotFound/
│   ├── context/         # React Context
│   │   └── BasketContext.jsx
│   ├── data/           # Static data
│   │   └── products.js
│   ├── routes/         # Routing configuration
│   │   └── Approute.jsx
│   └── __tests__/      # Test files
└── package.json
```

## Key Components

### Shopping Cart Context
- Global state management for cart items
- Persistent storage with localStorage
- Quantity management and price calculations

### Error Handling
- Error boundaries for JavaScript errors
- 404 pages for invalid routes
- Graceful fallbacks for missing data

## Future Enhancements

- [ ] **Checkout Process** - Payment integration and order confirmation
- [ ] **User Authentication** - Login, registration, and user profiles
- [ ] **Product Reviews** - Customer reviews and ratings
- [ ] **Wishlist** - Save products for later
- [ ] **Admin Panel** - Product management interface
- [ ] **Backend Integration** - API integration for dynamic data
- [ ] **PWA Features** - Offline support and app-like experience

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author

**Your Name**
- GitHub: [Ayoroq](https://github.com/ayoroq)
- LinkedIn: [Your LinkedIn](https://linkedin.com/in/roqeeb)

## Acknowledgments and Sources

### Image & Video Sources
- Product images from [Unsplash](https://unsplash.com)
- Additional images from [Freepik](https://www.freepik.com/photos)
- Spinach images from [Lettuce Info](https://lettuceinfo.org/products/spinach/)
- Kale images from [Buy BC](https://buybc.gov.bc.ca/app/uploads/sites/386/2024/03/Kale_352895761.png) and [Lettuce Info](https://lettuceinfo.org/products/kale/)
- Aerial farmland video from stock footage sources and [Pexels](https://www.pexels.com/)

### Development Resources
- Design based on [Figma Basics Community File](https://www.figma.com/community/file/1407443818947305406)
- Icons from [GoogleFonts](https://fonts.google.com/)
- Font from [Google-Webfonts-Helper](https://gwfh.mranftl.com/fonts/agbalumo?subsets=latin)
- Inspiration from modern e-commerce platforms
- The Odin Project for the learning journey

---