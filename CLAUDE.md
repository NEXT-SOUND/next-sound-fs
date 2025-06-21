# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a universal React app built with a monorepo structure using Turborepo. The project allows code sharing between web (Next.js) and native (React Native/Expo) applications.

## Key Architecture

### Monorepo Structure
- **Root**: Contains shared configuration and scripts
- **apps/web**: Next.js web application with React Native Web
- **apps/native**: Expo/React Native mobile application
- **packages/app**: Shared business logic and screens
- **packages/ui**: Shared UI components with platform-specific implementations

### Cross-Platform Strategy
- Components in `packages/ui` have platform-specific files (`.web.tsx` for web, `.tsx` for native)
- Shared screens in `packages/app/screens` are consumed by both apps
- Styling uses NativeWind (TailwindCSS for React Native) for cross-platform consistency
- Services and utilities handle platform differences with separate implementations

## Development Commands

### Setup
```bash
yarn  # Install dependencies
```

### Development
```bash
yarn dev        # Start all apps in development mode
yarn web        # Start only web app
yarn ios        # Start iOS app
yarn android    # Start Android app
```

### Build
```bash
yarn build      # Build all applications
```

### Other Commands
```bash
yarn prebuild   # Generate native code for Expo
yarn clean      # Clean all build artifacts and node_modules
yarn format     # Format code with Prettier
```

### App-Specific Commands
```bash
# Web app (from apps/web)
yarn lint       # Run ESLint

# Native app (from apps/native)  
yarn lint       # Run Expo lint
```

## Technology Stack

- **Build System**: Turborepo for monorepo management
- **Web**: Next.js with React Native Web
- **Mobile**: Expo/React Native
- **Styling**: NativeWind (TailwindCSS)
- **State Management**: Zustand
- **Internationalization**: i18next with react-i18next/next-i18next
- **Navigation**: Expo Router (native), Next.js routing (web)
- **Animations**: Framer Motion (web), Moti/Reanimated (native)
- **Package Manager**: Yarn v1.22.19

## Important Notes

- The project uses Yarn workspaces with specific version resolutions
- Cross-platform components require platform-specific implementations
- The `app` package contains shared screens and business logic
- The `ui` package contains reusable components with platform variants
- Both apps consume shared packages via workspace dependencies (`*`)