# E-Commerce Admin Dashboard

A powerful and modern admin dashboard for managing your e-commerce platform. Built with Next.js 13, TypeScript, and Tailwind CSS.

## Features

- 🏪 Multi-vendor/store support
- 📊 Real-time analytics and sales tracking
- 🎨 Product management with variants (sizes, colors)
- 🖼️ Image upload with Cloudinary
- 💳 Payment processing with Stripe
- 📱 Responsive design
- 🔐 Authentication with Clerk
- 🎯 Billboard & category management
- 📦 Order tracking and management
- 🌙 Light/Dark mode

## Tech Stack

- **Framework**: Next.js 13 (App Router)
- **Styling**: Tailwind CSS
- **Authentication**: Clerk
- **Database**: PostgreSQL with Prisma ORM
- **Payment Processing**: Stripe
- **Image Storage**: Cloudinary
- **State Management**: Zustand
- **Charts**: Recharts
- **UI Components**: shadcn/ui
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 16+
- npm/yarn
- PostgreSQL database
- Clerk account
- Cloudinary account
- Stripe account

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Mj-Njuguna/E-store-backend.git
   cd E-store-backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:

   - Copy `.env.example` to `.env`
   - Fill in your credentials:
     - Clerk authentication keys
     - Database URL
     - Cloudinary credentials
     - Stripe API keys

4. Set up the database:

   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. Run the development server:
   ```bash
   npm run dev
   ```

The app will be available at `http://localhost:3000`

## Project Structure

- `/app` - Next.js 13 app router pages and layouts
- `/components` - Reusable UI components
- `/prisma` - Database schema and migrations
- `/lib` - Utility functions and configurations
- `/hooks` - Custom React hooks
- `/actions` - Server actions and API routes
- `/providers` - Context providers
- `/public` - Static assets

## Key Features Explained

### Multi-Store Management

- Create and manage multiple stores
- Switch between stores easily
- Store-specific settings and configurations

### Product Management

- Create, edit, and delete products
- Manage product variants (sizes, colors)
- Upload and manage product images
- Set prices and inventory

### Order Management

- View and process orders
- Track order status
- View order history and details

### Analytics Dashboard

- Real-time sales tracking
- Revenue graphs
- Stock monitoring
- Sales statistics

### API Integration

- RESTful API endpoints
- Webhook support for Stripe
- Image upload API for Cloudinary

## Environment Variables

Required environment variables:

\`\`\`env

# Authentication (Clerk)

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/

# Database (PostgreSQL)

DATABASE_URL=

# Image Upload (Cloudinary)

NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=

# Stripe

STRIPE_API_KEY=
STRIPE_WEBHOOK_SECRET=

# Frontend URL

FRONTEND_STORE_URL=http://localhost:3001
\`\`\`

## API Routes

- `/api/[storeId]/products` - Product management
- `/api/[storeId]/categories` - Category management
- `/api/[storeId]/billboards` - Billboard management
- `/api/[storeId]/orders` - Order management
- `/api/[storeId]/checkout` - Stripe checkout
- `/api/webhook` - Stripe webhooks

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, email [your-email] or create an issue in the repository.
