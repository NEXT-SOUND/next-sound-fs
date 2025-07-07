# Next Sound FS

Universal app starter with Next.js, React Native, and NestJS backend.

## Apps

- **web**: Next.js web application
- **native**: React Native mobile application (Expo)
- **backend**: NestJS GraphQL API with DynamoDB and AWS Serverless

## Getting Started

### Prerequisites

- Node.js 18+
- Yarn
- AWS CLI (for backend deployment)
- Expo CLI (for mobile development)

### Installation

```bash
# Install dependencies
yarn install

# Copy environment variables
cp env.example .env
```

### Development

```bash
# Start all apps in development mode
yarn dev

# Start specific apps
yarn web          # Start web app
yarn ios          # Start iOS app
yarn android      # Start Android app
yarn backend      # Start backend in watch mode
yarn backend:offline  # Start backend with serverless offline
yarn backend:ddb  # Start local DynamoDB
```

### Backend Development

The backend is a NestJS application with GraphQL, DynamoDB, and AWS Serverless support.

```bash
# Start local development
cd apps/backend
yarn dev

# Start with local DynamoDB
yarn ddb:start
yarn sls:offline

# Deploy to AWS
yarn deploy
```

### GraphQL Endpoints

- Local: http://localhost:5024/graphql
- Offline: http://localhost:5024/dev/graphql
- AWS: https://<your-deployment-id>.execute-api.<region>.amazonaws.com/dev/graphql

## Project Structure

```
├── apps/
│   ├── web/          # Next.js web app
│   ├── native/       # React Native app
│   └── backend/      # NestJS GraphQL API
├── packages/
│   ├── app/          # Shared app logic
│   ├── components/   # Shared UI components
│   ├── ui/           # UI primitives
│   └── utils/        # Shared utilities
└── turbo.json        # Turborepo configuration
```

## Technologies

- **Frontend**: Next.js, React Native, Expo, Tailwind CSS
- **Backend**: NestJS, GraphQL, DynamoDB, AWS Lambda
- **Build Tool**: Turborepo
- **Package Manager**: Yarn

# Universal App Starter

<img width="1725" alt="Universal App Starter Screenshot" src="https://github.com/adebayoileri/rnw-starter-private/assets/46798106/a7343cd0-81f6-4e99-9dc3-deac09c95fac">

## Get Started
**Must have Node and Yarn(v1.22.19) installed to setup locally**

```sh
yarn
```

## Development

```sh
yarn run dev
```

## Build

```sh
yarn run build
```

### Folder Structure
This monorepo consists of the two workspaces `apps` & `packages`
```bash
universal-app-starter
└── apps
    ├── native 
    └── web
└── packages
    ├── ui 
    └── app
```
### Apps and Packages

- `apps/native`: a [react-native](https://reactnative.dev/) app built with [expo](https://docs.expo.dev/)
- `apps/web`: a [Next.js](https://nextjs.org/) app built with [react-native-web](https://necolas.github.io/react-native-web/)
- `packages/ui`: a shared package that contains shared UI components between `web` and `native` applications
- `packages/app`: a shared package that contains shared logic between `web` and `native` applications

### Technologies

- [Expo](https://docs.expo.dev/) for native development
- [Next.js](https://nextjs.org/) for web development
- [React Native](https://reactnative.dev/) for native development
- [React Native Web](https://necolas.github.io/react-native-web/) for web development
- [NativeWind](https://www.nativewind.dev/) styling solution for native
- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [Prettier](https://prettier.io) for code formatting
- [Turborepo](https://turborepo.dev/) build system for managing monorepo

### Misc
Interested in setting up a similar project from scratch? Check out the article [here](https://dev.to/adebayoileri/building-a-universal-react-app-with-expo-nextjs-nativewind-3829)


### Author

#### [Adebayo Ilerioluwa](https://github.com/adebayoileri)
