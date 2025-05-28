# AutomateVault - Premium Automation Template Marketplace

## Overview

AutomateVault is a sophisticated marketplace platform designed to help businesses and developers streamline their workflows through premium automation templates. The platform offers curated, ready-to-use automation solutions across multiple industries, complemented by intelligent template recommendations and comprehensive analytics.

## Features

- Premium template marketplace with instant delivery
- Smart template recommendation engine
- Interactive template preview system
- Secure payment processing
- Comprehensive user dashboard
- Advanced template search and filtering
- Mobile-responsive design
- Real-time analytics and insights

## Technology Stack

- Next.js 13
- TypeScript
- Tailwind CSS
- Supabase for backend
- Framer Motion for animations
- Radix UI components
- Recharts for analytics
- Various React hooks and utilities

## Local Development

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start
```
## Environment Setup
Create a .env file with the following variables:
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

## Deployment
The application is deployed on Vercel and can be accessed at: https://automate-vault-project.vercel.app

Project Structure
├── app/                # Next.js 13 app directory
├── components/         # Reusable React components
├── lib/               # Utility functions and configurations
├── hooks/             # Custom React hooks
├── styles/            # Global styles and Tailwind config
└── public/            # Static assets
