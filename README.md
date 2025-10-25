# CourierPro - Advanced Courier Management System

A comprehensive, multi-role courier management system built with modern web technologies. The platform provides seamless parcel tracking, user management, and analytics for administrators, senders, and receivers.

![CourierPro](https://img.shields.io/badge/React-19.1.1-blue.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-blue.svg)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1.14-blue.svg)
![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-2.9.0-purple.svg)

## 🚀 Project Overview

CourierPro is a full-featured courier management platform that streamlines the entire parcel delivery process. The system supports multiple user roles with role-based access control, real-time parcel tracking, comprehensive analytics, and an intuitive user interface.

### Key Features

- **Multi-Role Dashboard System**: Separate interfaces for Admins, Senders, and Receivers
- **Public Parcel Tracking**: Anyone can track parcels using tracking IDs without authentication
- **Real-time Analytics**: Comprehensive dashboard with parcel trends and performance metrics
- **Role-Based Access Control**: Secure authentication and authorization system
- **Responsive Design**: Mobile-first approach with seamless cross-device experience
- **Modern UI/UX**: Built with Tailwind CSS and Radix UI components for professional appearance

### User Roles & Capabilities

#### 🛠️ Administrator
- View comprehensive analytics and parcel trends
- Manage all parcels across the system
- User management and role administration
- System-wide parcel overview and monitoring
- Access to detailed reporting and insights

#### 📦 Sender
- Create and manage parcel shipments
- View all created parcels with status tracking
- Manage receiver information
- Access to parcel creation forms with validation
- Track shipment progress and history

#### 📬 Receiver
- View incoming parcels in real-time
- Access complete delivery history
- Manage personal profile information
- Receive notifications about parcel status updates
- Track parcels assigned to them

## 🛠️ Technology Stack

### Frontend Framework
- **React 19.1.1** - Latest React with concurrent features
- **TypeScript 5.9.3** - Type-safe JavaScript development
- **Vite 7.1.7** - Fast build tool and development server

### State Management & Data
- **Redux Toolkit 2.9.0** - Predictable state container
- **RTK Query** - Powerful data fetching and caching
- **Axios 1.12.2** - HTTP client for API requests

### UI & Styling
- **Tailwind CSS 4.1.14** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **Lucide React 0.546.0** - Beautiful icon library
- **React Hook Form 7.65.0** - Performant forms with validation
- **Zod 4.1.12** - TypeScript-first schema validation

### Additional Libraries
- **React Router 7.9.4** - Client-side routing
- **Recharts 3.3.0** - Data visualization components
- **Swiper 12.0.3** - Carousel and slider components
- **Sonner 2.0.7** - Toast notifications
- **Next Themes 0.4.6** - Theme management

### Development Tools
- **ESLint 9.38.0** - Code linting and formatting
- **TypeScript ESLint** - TypeScript-specific linting rules
- **Bun 1.0.0** - Fast JavaScript runtime and package manager

## ⚡ Setup Instructions

### Prerequisites
- **Node.js** (v18 or higher)
- **Bun** (v1.0.0 or higher) - Recommended package manager
- **Git** - Version control system

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd l2-b5-a6-courier-pro-api-frontend
   ```

2. **Install dependencies**
   ```bash
   bun install
   ```
   Or using npm:
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   # Copy environment template
   cp .env.example .env

   # Configure your environment variables
   # Add your API endpoints and other configuration
   ```

4. **Start development server**
   ```bash
   bun run dev
   ```
   Or using npm:
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000` to view the application.

### Available Scripts

- `bun run dev` - Start development server
- `bun run build` - Build for production
- `bun run preview` - Preview production build
- `bun run lint` - Run ESLint for code quality

## 🌐 Live Demo

Experience the full functionality of CourierPro at our live deployment:

**🔗 [CourierPro Live Demo](https://l2-b5-a6-courier-pro-api-frontend.vercel.app/)**

### Demo Credentials
- **Admin Access**: Contact system administrator for credentials
- **Test Tracking**: Use any valid tracking ID to test public parcel tracking

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── layouts/        # Layout components (Common, Dashboard)
│   ├── modules/        # Feature-specific component modules
│   └── ui/             # Base UI components (buttons, forms, etc.)
├── pages/              # Route components and page views
│   ├── Admin/          # Administrator dashboard pages
│   ├── Sender/         # Sender dashboard pages
│   ├── Receiver/       # Receiver dashboard pages
│   └── public/         # Public-facing pages
├── redux/              # State management (slices, store)
├── routes/             # Route configuration and navigation
├── types/              # TypeScript type definitions
├── utils/              # Utility functions and helpers
├── hooks/              # Custom React hooks
└── constants/          # Application constants
```

## ✨ Key Features Deep Dive

### Public Features
- **Landing Page**: Professional homepage with service information
- **Parcel Tracking**: Public API for tracking parcels by ID
- **Contact & About**: Information pages with company details
- **User Registration**: Self-service account creation
- **Authentication**: Secure login system with role detection

### Admin Dashboard
- **Analytics Dashboard**: Real-time metrics and KPIs
- **Parcel Trends**: Visual representation of delivery patterns
- **User Management**: Complete user administration interface
- **System Overview**: Comprehensive system status monitoring
- **Advanced Search**: Full-text search across all parcels

### Sender Portal
- **Parcel Creation**: Multi-step form with validation
- **Shipment Management**: Track all created parcels
- **Receiver Management**: Manage delivery contacts
- **Status Updates**: Real-time parcel status notifications
- **History Tracking**: Complete shipment history

### Receiver Portal
- **Incoming Parcels**: Real-time view of assigned deliveries
- **Delivery History**: Complete delivery record keeping
- **Profile Management**: Personal information management
- **Status Updates**: Live parcel status notifications
- **Search & Filter**: Easy parcel discovery

## 🔧 Development Guidelines

### Code Quality
- **TypeScript**: Strict type checking enabled
- **ESLint**: Comprehensive linting rules configured
- **Prettier**: Code formatting standards
- **Husky**: Pre-commit hooks for quality assurance

### Best Practices
- **Component Structure**: Functional components with hooks
- **State Management**: Centralized Redux store with RTK Query
- **API Integration**: RESTful API patterns with error handling
- **Responsive Design**: Mobile-first CSS approach
- **Accessibility**: ARIA labels and keyboard navigation

### Performance Optimizations
- **Code Splitting**: Route-based and component-based splitting
- **Lazy Loading**: Components and routes loaded on demand
- **Image Optimization**: Responsive images with WebP support
- **Caching**: RTK Query provides intelligent caching
- **Bundle Analysis**: Webpack bundle analyzer integration

## 🚀 Deployment

The application is optimized for deployment on Vercel, Netlify, or any static hosting platform:

1. **Build the application**
   ```bash
   bun run build
   ```

2. **Deploy the dist folder** to your hosting platform

3. **Environment Variables**: Configure your production environment variables

### Production Optimizations
- **Minification**: Automatic CSS and JS minification
- **Compression**: Gzip compression enabled
- **CDN**: Static assets served via CDN
- **Caching**: Aggressive caching headers configured

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit your changes**: `git commit -m 'Add amazing feature'`
4. **Push to the branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

### Development Workflow
- **Feature Branches**: Create branches for new features
- **Pull Requests**: Required for all changes
- **Code Review**: All changes require review
- **Testing**: Comprehensive test coverage required
- **Documentation**: Update README for new features

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- **Documentation**: Check the `/docs` folder for detailed documentation
- **Issues**: Open an issue on GitHub for bug reports
- **Discussions**: Use GitHub Discussions for questions and ideas
- **Email**: Contact the development team for enterprise support

## 🔄 Version History

### v1.0.0 (Current)
- Complete multi-role courier management system
- Real-time parcel tracking and analytics
- Modern React 19 with TypeScript
- Comprehensive user dashboards
- Public parcel tracking interface
- Mobile-responsive design

---

**Built with ❤️ using modern web technologies**

For more information, visit our [Live Demo](https://l2-b5-a6-courier-pro-api-frontend.vercel.app/)
