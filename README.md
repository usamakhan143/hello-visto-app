# Hello Visto - Multi-Vendor Travel Agency App

A comprehensive React Native Expo application for a multi-vendor travel booking platform where vendors can list tours and customers can discover and book amazing travel experiences.

## 🚀 Features

### Core Functionality

- **Multi-Role System**: Admin, Vendor, and Customer roles with different interfaces
- **Tour Management**: Vendors can create, edit, and manage tour listings
- **Booking System**: Customers can browse, search, and book tours
- **Commission System**: 5% commission on each booking
- **Subscription Model**: Vendors pay for subscription plans to list tours
- **Reviews & Ratings**: Customer feedback system for tours and vendors

### Tech Stack

- **Frontend**: React Native with Expo
- **Navigation**: React Navigation with tab and stack navigators
- **UI Components**: Custom components with beautiful designs
- **Styling**: Modern gradient designs and responsive layouts
- **State Management**: Ready for Redux/Context API integration
- **Backend Ready**: Firebase integration structure prepared

## 📱 App Structure

### User Roles

#### 🏠 Customer Features

- Browse and discover tours
- Advanced search with filters
- Tour details with image galleries
- Booking management
- Reviews and ratings
- Wishlist functionality

#### 🏢 Vendor Features

- Dashboard with analytics
- Tour creation and management
- Booking management
- Subscription management
- Revenue tracking
- Performance analytics

#### 👑 Admin Features

- Platform analytics dashboard
- Vendor management
- Commission tracking
- System monitoring
- User management

### 📁 Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── common/          # Common components (Button, Header, etc.)
│   ├── cards/           # Card components (TourCard, etc.)
│   ├── forms/           # Form components
│   └── modals/          # Modal components
├── screens/             # App screens
│   ├── auth/            # Authentication screens
│   ├── customer/        # Customer app screens
│   ├── vendor/          # Vendor dashboard screens
│   ├── admin/           # Admin panel screens
│   └── shared/          # Shared screens
├── navigation/          # Navigation configuration
├── services/            # API and Firebase services
├── types/               # TypeScript type definitions
├── constants/           # App constants and theme
└── utils/               # Utility functions
```

## 🎨 Design Features

### Visual Design

- **Modern UI**: Clean, professional interface with gradient designs
- **Responsive**: Works seamlessly on all screen sizes
- **Consistent**: Unified design system across all screens
- **Accessible**: Proper contrast ratios and touch targets

### Key Components

- **TourCard**: Beautiful tour listing cards with images and details
- **Header**: Consistent navigation header with customization options
- **Button**: Versatile button component with multiple variants
- **Search**: Advanced search with filtering capabilities

## 🛠 Installation & Setup

### Prerequisites

- Node.js (v14 or higher)
- Expo CLI
- React Native development environment

### Getting Started

1. **Clone and Install**

   ```bash
   git clone <repository>
   cd hello-visto-app
   npm install
   ```

2. **Start Development Server**

   ```bash
   npm start
   # or
   expo start
   ```

3. **Run on Device**
   - Install Expo Go app on your mobile device
   - Scan QR code from the terminal or browser
   - App will load on your device

### Firebase Setup (Future Implementation)

1. Create a Firebase project
2. Enable Authentication, Firestore, Storage, and Cloud Functions
3. Update `src/services/firebase.ts` with your configuration
4. Set up Firestore collections:
   - `users`
   - `vendors`
   - `tours`
   - `bookings`
   - `subscriptions`
   - `reviews`
   - `commissions`

## 📦 Dependencies

### Core Dependencies

- `expo` - Expo framework
- `react-native` - React Native framework
- `@react-navigation/native` - Navigation
- `@react-navigation/stack` - Stack navigation
- `@react-navigation/bottom-tabs` - Tab navigation
- `react-native-paper` - UI component library
- `expo-linear-gradient` - Gradient components
- `@expo/vector-icons` - Icon library

### Additional Features (Ready to Implement)

- Firebase integration
- Payment processing (Stripe/PayPal)
- Push notifications
- Maps integration (Google Maps/Mapbox)
- Image handling and uploads
- Analytics tracking

## 🔮 Future Enhancements

### Phase 2 Features

- **Payment Integration**: Stripe/PayPal for secure transactions
- **Maps Integration**: Interactive maps for tour locations
- **Real-time Chat**: Customer-vendor communication
- **Advanced Analytics**: Detailed reporting and insights
- **Multi-language Support**: International market support
- **Offline Support**: Cached data for offline browsing

### Backend Implementation

- **Firebase Functions**: Handle business logic
- **Payment Processing**: Secure transaction handling
- **Notification System**: Push notifications for updates
- **File Storage**: Tour images and documents
- **Real-time Updates**: Live booking status updates

## 📱 Screenshots & Demo

The app currently includes:

- Beautiful onboarding flow
- Complete authentication system
- Customer home with tour discovery
- Advanced search and filtering
- Detailed tour pages with galleries
- Vendor dashboard with analytics
- Admin panel structure
- Consistent design system

## 🤝 Contributing

This is a complete foundation for a travel booking platform. Key areas for contribution:

- Backend Firebase implementation
- Payment gateway integration
- Advanced booking features
- Real-time features
- Performance optimizations

## 📄 License

This project is ready for commercial use and can be customized for specific business requirements.

---

**Hello Visto** - Your gateway to amazing travel experiences! 🌍✈️
