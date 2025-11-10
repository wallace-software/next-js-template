# shadcn/ui Integration Guide

This document outlines how shadcn/ui components are used throughout the template for consistency and maintainability.

## Available Components

The following shadcn/ui components are installed and ready to use:

- **Avatar** (`avatar.tsx`) - User profile pictures and avatars
- **Badge** (`badge.tsx`) - Status indicators, labels, and tags
- **Button** (`button.tsx`) - Primary interactive elements
- **Card** (`card.tsx`) - Content containers with headers and descriptions
- **Dropdown Menu** (`dropdown-menu.tsx`) - Contextual menus and dropdowns
- **Form** (`form.tsx`) - Form elements with validation
- **Input** (`input.tsx`) - Text input fields
- **Label** (`label.tsx`) - Form labels
- **Navigation Menu** (`navigation-menu.tsx`) - Main navigation menus
- **Separator** (`separator.tsx`) - Visual dividers
- **Sheet** (`sheet.tsx`) - Side panels and mobile navigation
- **Textarea** (`textarea.tsx`) - Multi-line text input

## Current Usage

### Layout Components

#### **Header** (`src/components/layout/header.tsx`)

Uses the following shadcn components:

- `Button` - For GitHub link and mobile menu trigger
- `NavigationMenu` - Desktop navigation
- `Separator` - Visual separator between brand and nav
- `Sheet` - Mobile navigation drawer

```tsx
// Example: Mobile menu trigger
<Sheet open={open} onOpenChange={setOpen}>
  <SheetTrigger asChild>
    <Button variant="ghost" size="icon" className="md:hidden">
      <Menu className="h-5 w-5" />
    </Button>
  </SheetTrigger>
  <SheetContent side="right">{/* Mobile nav content */}</SheetContent>
</Sheet>
```

#### **Footer** (`src/components/layout/footer.tsx`)

Uses the following shadcn components:

- `Button` - For social media icon links
- `Separator` - Between footer sections

```tsx
// Example: Social media buttons
<Button variant="ghost" size="icon" asChild>
  <a href={social.href} aria-label={social.label}>
    <social.icon className="h-5 w-5" />
  </a>
</Button>
```

#### **Dev Layout** (`src/app/(dev)/layout.tsx`)

Uses the following shadcn components:

- `Badge` - "Testing" badge in dev banner

```tsx
// Example: Dev mode badge
<Badge variant="outline" className="border-yellow-600 text-yellow-600">
  Testing
</Badge>
```

### Pages

#### **Home Page** (`src/app/(home)/page.tsx`)

Uses the following shadcn components:

- `Card` - Main welcome card
- `Badge` - Version badge and feature tags
- `Button` - Call-to-action buttons

```tsx
// Example: Welcome card with actions
<Card className="w-full">
  <CardHeader>
    <CardTitle className="text-3xl">Welcome to Next.js Template</CardTitle>
    <CardDescription className="text-base">
      A modern, reusable template...
    </CardDescription>
  </CardHeader>
  <CardContent className="space-y-4">
    <Button asChild size="lg">
      <a href="...">Deploy Now</a>
    </Button>
  </CardContent>
</Card>
```

#### **Testing Dashboard** (`src/app/(dev)/testing/page.tsx`)

Uses the following shadcn components:

- `Card` - Test category cards
- `Badge` - Status indicators ("Coming Soon", "Active")
- `Button` - Navigation buttons

```tsx
// Example: Test category card
<Card>
  <CardHeader>
    <div className="flex items-center justify-between">
      <TestTube className="h-8 w-8 text-blue-500" />
      <Badge variant="outline">Coming Soon</Badge>
    </div>
    <CardTitle className="mt-4">Component Tests</CardTitle>
    <CardDescription>Test React components in isolation...</CardDescription>
  </CardHeader>
  <CardContent>
    <Button variant="outline" className="w-full" disabled>
      View Tests
    </Button>
  </CardContent>
</Card>
```

#### **Visual Tests Page** (`src/app/(dev)/testing/visual/page.tsx`)

Uses the following shadcn components:

- `Button` - Showcasing all variants and sizes
- `Badge` - Showcasing all variants
- `Card` - Component demonstration containers
- `Input` - Form input examples
- `Label` - Form label examples
- `Textarea` - Multi-line input examples
- `Separator` - Section dividers

This page serves as a comprehensive visual reference for all component styles.

## Best Practices

### 1. **Always Use shadcn Components for Common UI Elements**

Instead of creating custom buttons or cards, use the shadcn equivalents:

❌ **Avoid:**

```tsx
<div className="rounded-md border p-4">
  <a
    href="..."
    className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2"
  >
    Click me
  </a>
</div>
```

✅ **Prefer:**

```tsx
<Card>
  <CardContent>
    <Button asChild>
      <a href="...">Click me</a>
    </Button>
  </CardContent>
</Card>
```

### 2. **Use the `asChild` Prop for Links**

When wrapping links with Button components, use `asChild`:

```tsx
<Button asChild variant="outline">
  <Link href="/about">About</Link>
</Button>
```

### 3. **Consistent Variant Usage**

Use consistent variants across the application:

- **Primary actions:** `variant="default"`
- **Secondary actions:** `variant="outline"` or `variant="secondary"`
- **Destructive actions:** `variant="destructive"`
- **Subtle actions:** `variant="ghost"`
- **Text links:** `variant="link"`

### 4. **Badge for Status and Labels**

Use Badge components for:

- Status indicators ("Active", "Coming Soon", "Beta")
- Tags and labels
- Version numbers
- Notifications counts

```tsx
<Badge>New</Badge>
<Badge variant="secondary">v15</Badge>
<Badge variant="outline">Coming Soon</Badge>
<Badge variant="destructive">Error</Badge>
```

### 5. **Card Structure**

Always use the full Card component structure:

```tsx
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>{/* Main content */}</CardContent>
</Card>
```

### 6. **Form Components**

Use shadcn form components for consistent styling:

```tsx
<div className="space-y-2">
  <Label htmlFor="email">Email</Label>
  <Input id="email" type="email" placeholder="Enter email..." />
</div>
```

## Adding New shadcn Components

To add a new shadcn/ui component:

```bash
npx shadcn@latest add [component-name]
```

This will:

1. Download the component to `src/components/ui/`
2. Install any required dependencies
3. Update your `components.json` configuration

Example:

```bash
npx shadcn@latest add dialog
npx shadcn@latest add alert
npx shadcn@latest add tabs
```

## Customization

All shadcn components can be customized by editing their files in `src/components/ui/`.

The components use Tailwind classes and can be themed using CSS variables defined in `src/app/globals.css`.

### Theme Colors

The theme uses CSS variables that automatically adjust for dark mode:

- `--background` / `--foreground`
- `--primary` / `--primary-foreground`
- `--secondary` / `--secondary-foreground`
- `--muted` / `--muted-foreground`
- `--accent` / `--accent-foreground`
- `--destructive` / `--destructive-foreground`
- `--border` / `--input` / `--ring`

## Resources

- [shadcn/ui Documentation](https://ui.shadcn.com)
- [Browse Components](https://ui.shadcn.com/docs/components)
- [Theming Guide](https://ui.shadcn.com/docs/theming)
- [Dark Mode Setup](https://ui.shadcn.com/docs/dark-mode)
