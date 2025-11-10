# Components Organization

This project uses a **flat structure with direct imports** via path aliases.

## Folder Structure

```
components/
├── layout/          # Layout components (header, footer, nav)
├── shared/          # Reusable components used across features
├── sections/        # Page-specific sections (hero, features, etc.)
└── ui/              # shadcn/ui components (don't modify structure)
```

## Import Convention

✅ **DO** - Import directly with full path:

```tsx
import { Header } from "@/components/layout/header";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { Button } from "@/components/ui/button";
```

❌ **DON'T** - Use barrel exports or index files:

```tsx
import { Header } from "@/components/layout"; // No index.ts files
import { ThemeToggle } from "@/components"; // No mega barrel
```

## File Naming

- Use **kebab-case** for all component files: `theme-toggle.tsx`, `nav-link.tsx`
- Export components with **PascalCase**: `export function ThemeToggle() { }`
- Keep filenames consistent with component names

## When to Use Dynamic Imports

Only use `dynamic()` for **heavy** components not needed immediately:

```tsx
// ✅ Good use cases
const HeavyChart = dynamic(() => import("@/components/charts/analytics-chart"));
const VideoPlayer = dynamic(() => import("@/components/media/video-player"));

// ❌ Bad use cases (keep static)
import { Button } from "@/components/ui/button";
import { Header } from "@/components/layout/header";
```

## Adding New Components

1. Determine the right folder:
   - **layout/** - Navigation, headers, footers, sidebars
   - **shared/** - Buttons, cards, modals used everywhere
   - **sections/** - Landing page hero, feature sections, CTAs
   - **ui/** - Only add shadcn components here

2. Create the file with kebab-case naming
3. Export the component function
4. Import with full path where needed

## Benefits

- ✅ Clear import paths
- ✅ Better tree-shaking
- ✅ Faster TypeScript compilation
- ✅ No circular dependencies
- ✅ Easy to find components
