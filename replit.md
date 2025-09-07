# Overview

This is a modern full-stack web application built with React, TypeScript, and Express.js. The project appears to be a social platform or content sharing application featuring post templates and user interactions. It uses a monorepo structure with shared code between client and server, and implements modern development practices with hot module replacement and development tooling.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **React 18** with TypeScript for the user interface
- **Vite** as the build tool and development server with hot module replacement
- **Wouter** for client-side routing (lightweight React router alternative)
- **TanStack React Query** for server state management and API caching
- **shadcn/ui** component library built on Radix UI primitives for consistent UI components
- **Tailwind CSS** for styling with CSS variables for theming
- **React Hook Form** with resolvers for form handling and validation

## Backend Architecture
- **Express.js** server with TypeScript
- **ESBuild** for server-side bundling in production
- RESTful API structure with `/api` prefix for all endpoints
- Middleware for request logging and error handling
- Session-based architecture with PostgreSQL session storage

## Data Layer
- **Drizzle ORM** for type-safe database operations
- **PostgreSQL** as the primary database (configured for Neon serverless)
- **Zod** schemas for runtime validation integrated with Drizzle
- Database migrations managed through Drizzle Kit
- Shared schema definitions between client and server

## Development Environment
- **Monorepo structure** with shared types and schemas
- **TypeScript** configuration with path mapping for clean imports
- **Hot module replacement** in development with Vite
- **ESLint** and development error overlays for better DX
- **Replit-specific** tooling and cartographer integration

## Authentication & Security
- Session-based authentication using `connect-pg-simple` for PostgreSQL session storage
- User model with username/password authentication
- CORS and credential handling for secure API communication

## UI/UX Design System
- **Consistent design language** using shadcn/ui components
- **Dark/light mode support** with CSS custom properties
- **Responsive design** with mobile-first approach
- **Accessibility** features built into Radix UI components
- **Toast notifications** and form validation feedback

# External Dependencies

## Database Services
- **Neon PostgreSQL** - Serverless PostgreSQL database with connection pooling
- **Environment-based configuration** for database connections

## UI Component Libraries
- **Radix UI** - Headless, accessible UI primitives for React
- **Lucide React** - Icon library for consistent iconography
- **Embla Carousel** - Carousel/slider functionality
- **Vaul** - Drawer component for mobile interfaces

## Development Tools
- **Replit platform integration** - Development environment and deployment
- **PostCSS with Autoprefixer** - CSS processing and vendor prefixes
- **Date-fns** - Date manipulation utilities

## Build & Bundling
- **Vite plugins ecosystem** - React support, error overlays, and development tools
- **ESBuild** - Fast JavaScript/TypeScript bundling for production
- **TypeScript compiler** - Type checking and compilation

## Validation & Forms
- **Zod** - Runtime type validation and schema definition
- **React Hook Form** - Performance-optimized form handling
- **Hookform Resolvers** - Integration between validation libraries and forms