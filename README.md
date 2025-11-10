# Next.js Template

A modern, production-ready Next.js 15 template with comprehensive Jest testing, shadcn/ui components, and everything you need to build your next project.

## ✨ Features

- ⚡ **Next.js 15** with App Router and React 19
- 🎨 **Tailwind CSS v4** for modern styling
- 🧩 **shadcn/ui** complete component library
- 🌙 **Dark mode** with system detection
- 📱 **Responsive design** with mobile-first approach
- 🧪 **Complete Jest testing setup** with 32+ example tests
- 🔧 **Interactive testing playground** (dev-only routes)
- 📝 **Clean architecture** with organized folder structure
- 🚀 **TypeScript** strict mode for type safety
- 🎯 **Production ready** with best practices built-in

## Getting Started

Install dependencies and run the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## 📁 Project Structure

```
src/
├── __tests__/                     # Jest tests (32+ examples to learn from)
│   ├── components/                # Component tests
│   │   ├── button.test.tsx
│   │   ├── badge.test.tsx
│   │   └── card.test.tsx
│   ├── hooks/                     # Custom hook tests
│   │   └── useScrollDirection.test.ts
│   ├── lib/                       # Utility function tests
│   │   └── utils.test.ts
│   ├── jest.d.ts                  # Jest type declarations
│   └── README.md                  # Complete testing guide
├── app/
│   ├── layout.tsx                 # Root layout (HTML, fonts, ThemeProvider)
│   ├── (home)/                    # Public homepage routes
│   │   ├── layout.tsx             # Site layout (Header, Footer)
│   │   └── page.tsx               # Modern landing page
│   └── (dev)/                     # Dev-only routes (blocked in production)
│       ├── layout.tsx             # Dev layout (includes dev banner)
│       └── testing/               # Interactive testing playground
│           ├── page.tsx           # Testing dashboard
│           ├── unit-tests/        # Jest test runner UI
│           ├── hook-tests/        # Hook testing with live demos
│           └── visual/            # Component visual testing
├── components/
│   ├── layout/                    # Header, Footer, Navigation, Theme
│   ├── sections/                  # Page sections and layouts
│   ├── shared/                    # Reusable shared components
│   └── ui/                        # Complete shadcn/ui component library
├── hooks/
│   └── useScrollDirection.ts      # Custom React hooks
├── lib/
│   └── utils.ts                   # Utility functions (cn, etc.)
└── mocks/                         # Test data and mocks
```

## 🏗️ Architecture

### Layout System

The template uses **nested layouts** with route groups for clean organization:

1. **Root Layout** (`app/layout.tsx`)
   - HTML structure, Google fonts, ThemeProvider
   - Wraps entire application

2. **Route Group Layouts**
   - `app/(home)/layout.tsx` - Header + Footer for public pages
   - `app/(dev)/layout.tsx` - Header + Footer + dev banner for testing
   - Route groups `()` organize code without affecting URLs

3. **Page Content**
   - Pages automatically nest inside appropriate layouts
   - Consistent navigation and theming across all routes

### Testing Architecture

Comprehensive Jest setup designed for learning and productivity:

- **Real Examples**: 32+ working tests across components, hooks, utilities
- **Interactive UI**: Browser-based test runner with visual feedback
- **Live Demos**: See hooks working in real-time
- **Learning Path**: Complete guide from basics to advanced testing

## Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run test         # Run Jest tests
npm run test:watch   # Run Jest in watch mode
npm run test:coverage # Generate test coverage report
```

## 🧪 Testing (Complete Setup)

This template includes a **comprehensive Jest testing environment** perfect for learning and development:

### Quick Start

```bash
# Run all tests (32+ examples included)
npm test

# Watch mode - re-runs tests on file changes (recommended!)
npm run test:watch

# Generate coverage report
npm run test:coverage
```

### Interactive Testing Playground

Visit `/testing` in development for a complete testing experience:

- **`/testing/unit-tests`** - Interactive Jest test runner with visual results
- **`/testing/hook-tests`** - Live hook demonstrations + test examples
- **`/testing/visual`** - Component gallery in different states
- **`/testing`** - Testing dashboard with quick commands

### What's Included

- ✅ **32+ Working Tests** - Real examples for components, hooks, utilities
- ✅ **TypeScript Support** - Full type safety for test files
- ✅ **Testing Library** - Best practices with React Testing Library
- ✅ **Interactive UI** - See test results in the browser
- ✅ **Learning Guide** - Complete documentation in `src/__tests__/README.md`

### Test Files Structure

```bash
src/__tests__/
├── components/        # Button, Badge, Card tests
├── hooks/            # useScrollDirection tests
├── lib/              # Utility function tests
└── README.md         # Complete testing guide
```

Perfect for learning Jest or building robust applications with confidence!

## Component Guidelines

- Use arrow function syntax for components
- Export components as named exports
- Use direct imports (no barrel files)
- Follow kebab-case for filenames
- Document props with TypeScript types
- Prefer shadcn/ui components for common UI elements

See [COMPONENT_TEMPLATES.md](./COMPONENT_TEMPLATES.md) for templates and [SHADCN_USAGE.md](./SHADCN_USAGE.md) for shadcn/ui integration patterns.

## 🛠️ Tech Stack

### Frontend

- [Next.js 15](https://nextjs.org) - React framework with App Router
- [React 19](https://react.dev) - Latest React with new features
- [TypeScript](https://typescriptlang.org) - Type safety and better DX
- [Tailwind CSS v4](https://tailwindcss.com) - Utility-first styling
- [shadcn/ui](https://ui.shadcn.com) - Beautiful, accessible components
- [Framer Motion](https://framer.com/motion) - Smooth animations
- [next-themes](https://github.com/pacocoursey/next-themes) - Dark mode support
- [Lucide React](https://lucide.dev) - Beautiful icon library

### Development & Testing

- [Jest](https://jestjs.io) - Testing framework
- [Testing Library](https://testing-library.com) - React component testing
- [ESLint](https://eslint.org) - Code linting
- [React Hook Form](https://react-hook-form.com) - Form handling
- [Zod](https://zod.dev) - Schema validation

## 🚀 Quick Start

1. **Clone & Install**

   ```bash
   git clone <your-repo>
   cd next-template
   npm install
   ```

2. **Start Development**

   ```bash
   npm run dev
   ```

3. **Explore Testing**

   ```bash
   # In another terminal
   npm run test:watch

   # Or visit http://localhost:3000/testing
   ```

4. **Build for Production**
   ```bash
   npm run build
   npm start
   ```

## 📚 Documentation

- **[JEST_PLAYGROUND.md](./JEST_PLAYGROUND.md)** - Quick start guide for testing
- **[src/**tests**/README.md](./src/__tests__/README.md)** - Comprehensive testing guide
- **[COMPONENT_TEMPLATES.md](./COMPONENT_TEMPLATES.md)** - Component patterns
- **[SHADCN_USAGE.md](./SHADCN_USAGE.md)** - shadcn/ui integration guide
- **[TESTING.md](./TESTING.md)** - Testing best practices

## 🎯 Perfect For

- **Learning Jest** - 32+ real test examples with explanations
- **Rapid Prototyping** - All components and tools ready to use
- **Production Apps** - Scalable architecture with best practices
- **Team Projects** - Consistent patterns and comprehensive docs
- **Portfolio Sites** - Beautiful, modern design out of the box

---

**Ready to build something amazing?** 🚀 This template gives you everything you need to start fast and scale confidently.
