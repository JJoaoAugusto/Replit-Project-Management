# ProjectHub - Project Management System

## Overview

ProjectHub is a full-stack web application for project management built with React, TypeScript, Express.js, and PostgreSQL. The application allows users to register, login, and manage their projects with different status tracking (Pending, In Progress, Completed).

## User Preferences

Preferred communication style: Simple, everyday language.
Validation Requirements: All form fields must be validated on both frontend and backend - no empty fields allowed.
Authentication Flow: Automatic redirection after login/register without manual page refresh.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack Query (React Query) for server state management
- **UI Framework**: Radix UI components with shadcn/ui design system
- **Styling**: Tailwind CSS with CSS variables for theming
- **Build Tool**: Vite with hot module replacement

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Database ORM**: Drizzle ORM with PostgreSQL dialect
- **Authentication**: JWT tokens with bcrypt for password hashing
- **Validation**: Zod schemas for type-safe validation
- **Development**: Custom Vite middleware for SSR in development

### Database Design
- **Database**: PostgreSQL (configured for Neon serverless)
- **Schema**: Two main tables - `users` and `projects`
- **Relationships**: One-to-many relationship between users and projects
- **Migration**: Drizzle Kit for schema management

## Key Components

### Authentication System
- JWT-based authentication with Bearer tokens
- Password hashing using bcrypt
- Protected routes with middleware verification
- User registration and login forms with validation

### Project Management
- CRUD operations for projects (Create, Read, Update, Delete)
- Project status tracking: "pendente" (pending), "andamento" (in progress), "concluido" (completed)
- Project statistics dashboard showing counts by status
- Date-based project scheduling with start dates

### UI Components
- Comprehensive component library using Radix UI primitives
- Modal dialogs for project creation/editing and deletion confirmation
- Form handling with React Hook Form and Zod validation
- Toast notifications for user feedback
- Responsive design with mobile-first approach

### Data Layer
- Storage abstraction layer with interface-based design
- Centralized database configuration with connection pooling
- Type-safe database operations using Drizzle ORM
- Shared schema definitions between client and server

## Data Flow

1. **Authentication Flow**:
   - User submits login/register form
   - Server validates credentials and returns JWT token
   - Token stored in localStorage and used for API requests
   - Protected routes verify token on each request

2. **Project Management Flow**:
   - Dashboard loads user's projects on authentication
   - Project operations (CRUD) update both database and client cache
   - Real-time UI updates through React Query optimistic updates
   - Form submissions validated on both client and server

3. **State Synchronization**:
   - TanStack Query manages server state caching
   - Automatic cache invalidation on mutations
   - Loading and error states handled consistently

## External Dependencies

### Production Dependencies
- **@neondatabase/serverless**: PostgreSQL serverless connection
- **@tanstack/react-query**: Server state management
- **@radix-ui/***: UI component primitives
- **react-hook-form**: Form handling and validation
- **wouter**: Lightweight routing
- **drizzle-orm**: Type-safe ORM
- **jsonwebtoken**: JWT token handling
- **bcrypt**: Password hashing

### Development Tools
- **Vite**: Build tool and development server
- **TypeScript**: Static type checking
- **Tailwind CSS**: Utility-first CSS framework
- **drizzle-kit**: Database migration tool
- **tsx**: TypeScript execution for development

## Deployment Strategy

### Build Process
- Frontend builds to `dist/public` using Vite
- Backend builds to `dist` using esbuild
- Single production bundle with Express serving static files

### Environment Configuration
- Database connection via `DATABASE_URL` environment variable
- JWT secret configuration via `JWT_SECRET`
- Development/production mode switching via `NODE_ENV`

### Production Setup
- Node.js server serving both API and static assets
- Database migrations managed through Drizzle Kit
- Session-based authentication with secure token handling

### Development Features
- Hot module replacement with Vite
- Replit integration with development banner and cartographer
- Runtime error overlay for debugging
- Automatic TypeScript compilation checking

## Recent Changes

### 2025-01-23 - Authentication System Completed
- ✅ Fixed automatic redirection after login/register
- ✅ Added success messages for user feedback
- ✅ Implemented proper field validation (no empty fields)
- ✅ Fixed logout functionality
- ✅ Resolved token management issues
- ✅ User confirmed authentication flow working correctly