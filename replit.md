# Genrezume - Professional Resume Builder

## Overview

Genrezume is a modern web application that allows users to create professional resumes with multiple templates and real-time preview functionality. The application combines a React-based frontend with Express.js backend, Firebase authentication, and PostgreSQL database for persistent storage.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **Styling**: Tailwind CSS with shadcn/ui component library
- **State Management**: React Context for authentication and resume data
- **Form Handling**: React Hook Form with Zod validation
- **PDF Generation**: html2canvas + jsPDF for resume export

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Runtime**: Node.js 20
- **Build Tool**: Vite for frontend bundling, esbuild for backend compilation
- **Development**: Hot reload with Vite middleware integration

### Authentication
- **Primary**: Replit Authentication (OpenID Connect)
- **Methods**: Google OAuth through Replit's secure system
- **Session Management**: PostgreSQL-backed sessions with passport.js
- **Guest Mode**: Local storage fallback for unauthenticated users

### Data Layer
- **Database**: PostgreSQL 16 (configured but not yet implemented)
- **ORM**: Drizzle ORM with Zod schema validation
- **Migration**: Drizzle Kit for database migrations
- **Current Storage**: In-memory storage with local storage persistence

## Key Components

### Core Features
1. **Multi-step Resume Builder**: 8-step form process covering all resume sections
2. **Live Preview**: Real-time resume preview with zoom controls
3. **Template System**: Multiple professional resume templates
4. **PDF Export**: High-quality PDF generation with optimized text rendering
5. **Responsive Design**: Mobile-first responsive layout

### Form Sections
- Personal Details
- Education
- Coursework/Skills
- Projects
- Internships
- Technical Skills
- Extracurricular Activities
- Certifications

### Template System
- Modern Professional
- Classic Traditional
- Creative
- Minimal
- Professional

## Data Flow

### Authentication Flow
1. User registers/logs in via Firebase Auth
2. Authentication state managed by AuthContext
3. Protected routes redirect unauthenticated users
4. Guest mode allows local-only resume building

### Resume Building Flow
1. User navigates through multi-step form
2. Form data validated with Zod schemas
3. Real-time updates reflected in preview
4. Data persisted to local storage (authenticated) or browser storage (guest)
5. PDF export generates from preview DOM element

### Data Persistence
- **Authenticated Users**: Replit Auth + PostgreSQL storage
- **Guest Users**: Local storage only
- **Session Management**: PostgreSQL-backed sessions

## External Dependencies

### Core Dependencies
- **Firebase**: Authentication and planned data storage
- **@neondatabase/serverless**: PostgreSQL connection (configured)
- **Drizzle ORM**: Database operations and schema management
- **Tailwind CSS**: Utility-first styling framework
- **shadcn/ui**: Pre-built component library

### Development Tools
- **Vite**: Build tool and development server
- **TypeScript**: Type safety across frontend and backend
- **ESBuild**: Backend compilation for production
- **Replit**: Development environment and deployment platform

## Deployment Strategy

### Development Environment
- **Platform**: Replit with Node.js 20 runtime
- **Database**: PostgreSQL 16 module
- **Port Configuration**: Backend on 5000, proxied to port 80

### Build Process
1. **Frontend**: Vite builds React app to `dist/public`
2. **Backend**: ESBuild compiles TypeScript server to `dist/index.js`
3. **Assets**: Static files served from build output

### Production Deployment
- **Target**: Autoscale deployment on Replit
- **Build Command**: `npm run build`
- **Start Command**: `npm run start`
- **Environment**: Production Node.js with compiled assets

### Database Setup
- **Current**: PostgreSQL with Drizzle ORM
- **Schema**: User accounts with Replit Auth integration, resume data with JSON fields
- **Session Storage**: PostgreSQL-backed session management

## User Preferences

Preferred communication style: Simple, everyday language.

## Changelog

## Recent Changes

- June 24, 2025: Updated hyperlink functionality to only use user input URLs (no defaults), made project links fully clickable
- June 24, 2025: Created .env file with all necessary environment variables (DATABASE_URL, SESSION_SECRET, PostgreSQL credentials)
- June 24, 2025: Fixed all code errors and database connection issues - application now running successfully
- June 24, 2025: Completely redesigned A4Template to match user's reference template exactly - included all sections with proper formatting and alignment
- June 24, 2025: Fixed routing to allow both authenticated and unauthenticated users to access resume builder
- June 24, 2025: Enhanced template with comprehensive field mapping for all form inputs (education, projects, internships, certifications, etc.)
- June 24, 2025: Implemented proper A4 sizing (210mm x 297mm) with professional typography and spacing
- June 24, 2025: Added support for all technical skills categories, coursework, languages, and hobbies sections
- June 24, 2025: Resolved download functionality - fixed JSON parsing errors in resume data
- June 24, 2025: Enhanced resume data schema to include all form sections (profileSummary, coursework, languages, hobbies, references)
- June 24, 2025: Implemented Google authentication through Replit's secure OAuth system
- June 24, 2025: Migrated from Firebase to PostgreSQL database with Drizzle ORM
- June 24, 2025: Initial project setup