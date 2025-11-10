# Next.js Template

A modern, production-ready Next.js 15 template with Tailwind CSS, shadcn/ui, and dark mode support.

## Features

- ⚡ **Next.js 15** with App Router
- 🎨 **Tailwind CSS** for styling
- 🧩 **shadcn/ui** component library
- 🌙 **Dark mode** with next-themes
- 📱 **Responsive** header with scroll behavior
- 🧪 **Testing playground** (dev-only routes)
- 📝 **Clean folder structure** with kebab-case naming
- 🔧 **Component templates** for consistency

## Getting Started

Install dependencies and run the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Project Structure

```
src/
├── app/
│   ├── layout.tsx                 # Root layout (HTML, fonts, ThemeProvider)
│   ├── (site)/                    # Public site routes
│   │   ├── layout.tsx             # Site layout (Header, Footer)
│   │   └── page.tsx               # Home page
│   └── (dev)/                     # Dev-only routes (blocked in production)
│       ├── layout.tsx             # Dev layout (includes dev banner)
│       └── testing/               # Testing playground
├── components/
│   ├── layout/                    # Header, Footer, Nav, Theme
│   ├── shared/                    # Reusable components
│   └── ui/                        # shadcn/ui components
└── lib/
    └── utils.ts                   # Utility functions
```

## Layout Architecture

The template uses a **unified layout system** with three layers:

1. **Root Layout** (`app/layout.tsx`)
   - HTML structure, fonts, ThemeProvider
   - Wraps all routes

2. **Route Group Layouts**
   - `app/(site)/layout.tsx` - Header + Footer for public pages
   - `app/(dev)/layout.tsx` - Header + Footer + dev banner for testing routes
   - Both share the same visual structure

3. **Page Content**
   - Individual pages render inside the appropriate layout

This ensures all pages have consistent navigation, footer, and theme support.

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

## Testing

Visit `/testing` in development to access the testing playground:

- Component visual tests at `/testing/visual`
- Jest unit tests with `npm test`

See [TESTING.md](./TESTING.md) for details.

## Component Guidelines

- Use arrow function syntax for components
- Export components as named exports
- Use direct imports (no barrel files)
- Follow kebab-case for filenames
- Document props with TypeScript types
- Prefer shadcn/ui components for common UI elements

See [COMPONENT_TEMPLATES.md](./COMPONENT_TEMPLATES.md) for templates and [SHADCN_USAGE.md](./SHADCN_USAGE.md) for shadcn/ui integration patterns.

## Tech Stack

- [Next.js 15](https://nextjs.org) - React framework
- [Tailwind CSS](https://tailwindcss.com) - Utility-first CSS
- [shadcn/ui](https://ui.shadcn.com) - Component library
- [next-themes](https://github.com/pacocoursey/next-themes) - Dark mode
- [Lucide React](https://lucide.dev) - Icon library
- [Jest](https://jestjs.io) - Testing framework
