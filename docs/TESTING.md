# Testing Playground

Complete Jest testing environment with interactive browser UI and 32+ working test examples.

## Access

**Development only:** Visit `/testing` when running `npm run dev`

**Production:** Automatically redirects to home page

## Features

### Unit Tests (`/testing/unit-tests`)

- Interactive Jest test runner with visual feedback
- 32 passing tests across components, hooks, and utilities
- Real-time test execution simulation
- Complete testing guide and examples

### Hook Tests (`/testing/hook-tests`)

- Live demonstration of `useScrollDirection` hook
- Real-time scroll direction and "at top" state tracking
- Hook testing examples and patterns
- Template for creating your own hook tests

### Visual Testing (`/testing/visual`)

- View all components in different states
- Test button variants, badges, form inputs
- Typography showcase
- Dark/light mode testing

## Running Tests

```bash
# Run all tests
npm test

# Watch mode (re-runs on file changes)
npm run test:watch

# Generate coverage report
npm run test:coverage
```

## Test Structure

```
src/
  __tests__/              # Jest test files (32 tests total)
    components/           # Component tests
      button.test.tsx     # 6 tests
      badge.test.tsx      # 6 tests
      card.test.tsx       # 8 tests
    hooks/                # Hook tests
      useScrollDirection.test.ts  # 5 tests
    lib/                  # Utility tests
      utils.test.ts       # 7 tests
    jest.d.ts            # TypeScript declarations
    README.md            # Complete testing guide
  app/(dev)/             # Dev-only routes
    testing/
      page.tsx           # Testing dashboard
      unit-tests/        # Interactive Jest runner
      hook-tests/        # Live hook demonstrations
      visual/            # Component visual testing
```

## Writing Tests

```tsx
// Example component test
import { render, screen } from "@testing-library/react";
import { Button } from "@/components/ui/button";

describe("Button", () => {
  it("renders children", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText("Click me")).toBeInTheDocument();
  });
});
```

## Coverage

View coverage reports after running `npm run test:coverage`:

- Open `coverage/lcov-report/index.html` in browser
- Check console for summary

## Best Practices

1. **Isolate tests** - Each test should be independent
2. **Use Testing Library** - Query by accessible elements
3. **Mock external deps** - Use MSW for API calls
4. **Test user behavior** - Not implementation details
5. **Keep it fast** - Mock heavy operations

## Environment Variables

The testing route checks `NODE_ENV`:

- `development` - Full access to `/testing`
- `production` - Redirects to `/`

## Adding New Visual Tests

Edit `app/(dev)/testing/visual/page.tsx`:

```tsx
<section className="mb-12">
  <h2 className="mb-4 text-2xl font-semibold">Your Component</h2>
  <Card>
    <CardHeader>
      <CardTitle>Test Title</CardTitle>
    </CardHeader>
    <CardContent>{/* Your component examples */}</CardContent>
  </Card>
</section>
```
