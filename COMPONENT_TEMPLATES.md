# Component Templates

Quick templates for creating new components following the project conventions.

## Basic Component Template

```tsx
// components/[folder]/[component-name].tsx

import { cn } from "@/lib/utils";

interface [ComponentName]Props {
  className?: string;
  children?: React.ReactNode;
}

export const [ComponentName] = ({ className, children }: [ComponentName]Props) => {
  return (
    <div className={cn("", className)}>
      {children}
    </div>
  );
};
```

## Client Component Template

```tsx
// components/[folder]/[component-name].tsx
"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface [ComponentName]Props {
  className?: string;
}

export const [ComponentName] = ({ className }: [ComponentName]Props) => {
  const [state, setState] = useState(false);

  return (
    <div className={cn("", className)}>
      {/* component content */}
    </div>
  );
};
```

## Section Component Template

```tsx
// components/sections/[section-name].tsx

import { cn } from "@/lib/utils";

interface [SectionName]Props {
  className?: string;
}

export const [SectionName] = ({ className }: [SectionName]Props) => {
  return (
    <section className={cn("container mx-auto py-16", className)}>
      <div className="max-w-6xl mx-auto">
        {/* section content */}
      </div>
    </section>
  );
};
```

## Usage Example

After creating `components/shared/call-to-action.tsx`:

```tsx
// In your page or layout
import { CallToAction } from "@/components/shared/call-to-action";

export default function Page() {
  return (
    <div>
      <CallToAction className="bg-primary" />
    </div>
  );
}
```

## Quick Commands

```bash
# Create a new component
touch src/components/shared/my-component.tsx

# Create a new section
touch src/components/sections/hero-section.tsx

# Create a new layout component
touch src/components/layout/sidebar.tsx
```

## Checklist

When creating a new component:

- [ ] Use kebab-case for filename
- [ ] Export with PascalCase const and arrow function
- [ ] Add TypeScript interface for props
- [ ] Include `className` prop for customization
- [ ] Use `cn()` utility for class merging
- [ ] Add `"use client"` if it uses hooks/interactivity
- [ ] Import with full path: `@/components/[folder]/[file]`
