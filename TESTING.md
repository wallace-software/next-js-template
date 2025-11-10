# Testing Playground

Development-only testing environment for visual testing and component exploration.

## Access

**Development only:** Visit `/testing` when running `npm run dev`

**Production:** Automatically redirects to home page

## Features

### Visual Testing (`/testing/visual`)

- View all components in different states
- Test button variants, badges, form inputs
- Typography showcase
- Dark/light mode testing

### Planned Features

- Component unit tests with live results
- Hook testing playground
- API endpoint testing
- Integration test scenarios

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
  __tests__/              # Test files
    components/
    hooks/
    utils/
  app/(dev)/              # Dev-only routes
    testing/
      page.tsx            # Testing dashboard
      visual/
        page.tsx          # Visual component tests
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
