# Mobile Car Wash Website

A modern, responsive website for a mobile car wash service built with React, TypeScript, and Tailwind CSS.

## Features

### 🏠 **Home Page**
- Hero section with call-to-action
- Service highlights and features
- Customer testimonials
- Why choose us section

### 🚗 **Services & Pricing**
- Three service packages (Basic, Premium, Deluxe)
- Detailed service descriptions
- Add-on services
- Pricing comparison

### 📅 **Booking System**
- Interactive date and time selection
- Service package selection
- Customer information form
- Booking confirmation
- Form validation with error handling

### 📞 **Contact Form**
- Name, email, phone, and message fields
- Form validation
- Success/error notifications
- Contact information display
- FAQ section

### 👨‍💼 **Admin Dashboard**
- View all bookings (list and calendar view)
- Booking management (approve/cancel/complete)
- Customer information display
- Revenue statistics
- Search and filter functionality

## Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS + shadcn/ui components
- **Routing**: React Router v6
- **Forms**: React Hook Form + Zod validation
- **State Management**: React Context API
- **Icons**: Lucide React
- **Build Tool**: Vite

## Getting Started

### Prerequisites

Make sure you have Node.js installed on your system:
- Download from [nodejs.org](https://nodejs.org/)
- Or install via Homebrew: `brew install node`

### Installation

1. **Navigate to the project directory:**
   ```bash
   cd mobile-car-wash
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
mobile-car-wash/
├── src/
│   ├── components/
│   │   ├── ui/              # Reusable UI components
│   │   ├── Header.tsx       # Navigation header
│   │   └── Footer.tsx       # Site footer
│   ├── pages/
│   │   ├── Home.tsx         # Landing page
│   │   ├── Services.tsx     # Services and pricing
│   │   ├── Booking.tsx      # Booking form
│   │   ├── Contact.tsx      # Contact form
│   │   └── Admin.tsx        # Admin dashboard
│   ├── context/
│   │   └── BookingContext.tsx # State management
│   ├── types/
│   │   └── index.ts         # TypeScript type definitions
│   ├── lib/
│   │   └── utils.ts         # Utility functions
│   ├── App.tsx              # Main app component
│   ├── main.tsx             # App entry point
│   └── index.css            # Global styles
├── public/                  # Static assets
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

## Key Features Explained

### Booking System
- **Date Selection**: Choose from available dates (next 30 days)
- **Time Slots**: Select from available time slots (9 AM - 6 PM)
- **Service Packages**: Choose from Basic ($25), Premium ($45), or Deluxe ($75)
- **Form Validation**: Real-time validation using Zod schema
- **Confirmation**: Success page after booking submission

### Admin Dashboard
- **Statistics**: Total bookings, revenue, status breakdown
- **Booking Management**: Approve, cancel, or mark bookings as complete
- **Search & Filter**: Find bookings by customer info or status
- **Status Tracking**: Visual status indicators for each booking

### Responsive Design
- **Mobile-First**: Optimized for mobile devices
- **Breakpoints**: Responsive design for tablet and desktop
- **Touch-Friendly**: Large buttons and touch targets

## Customization

### Adding New Service Packages
Edit `src/context/BookingContext.tsx` to add or modify service packages:

```typescript
const servicePackages: ServicePackage[] = [
  {
    id: 'new-package',
    name: 'New Package',
    description: 'Description here',
    price: 50,
    duration: 45,
    features: ['Feature 1', 'Feature 2'],
    popular: false
  }
]
```

### Styling
- **Colors**: Modify `tailwind.config.js` for color scheme changes
- **Components**: Edit individual component files for styling
- **Global Styles**: Update `src/index.css` for global changes

### Adding New Pages
1. Create new component in `src/pages/`
2. Add route in `src/App.tsx`
3. Update navigation in `src/components/Header.tsx`

## Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow the prompts

### Deploy to Netlify
1. Build the project: `npm run build`
2. Upload the `dist` folder to Netlify

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

For questions or support, please contact:
- Email: info@mobilecarwash.com
- Phone: (555) 123-4567

---

**Built with ❤️ for mobile car wash businesses**



