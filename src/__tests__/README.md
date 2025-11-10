# Jest Testing Playground

Welcome to your Jest testing playground! This section was created to help you learn Jest testing by providing real, working examples.

## 🎯 What You've Got

### 1. **Test Files** (`src/__tests__/`)

Real Jest tests you can run and learn from:

- **`components/button.test.tsx`** - Tests button variants, sizes, states, and click handlers
- **`components/badge.test.tsx`** - Tests badge variants and custom classes
- **`components/card.test.tsx`** - Tests all card sub-components
- **`hooks/useScrollDirection.test.ts`** - Tests custom React hook behavior
- **`lib/utils.test.ts`** - Tests utility functions like the `cn()` helper

### 2. **Interactive Test Runner** (`/testing/unit-tests`)

A browser-based UI that:

- Simulates test execution with visual feedback
- Shows test results in real-time
- Displays pass/fail status for each test
- Provides terminal commands to run actual tests

### 3. **Visual Testing** (`/testing/visual`)

View all your components in different states without writing code

## 🚀 Getting Started

### Run Tests in Terminal

```bash
# Run all tests once
npm test

# Watch mode (automatically re-runs when files change) - BEST FOR LEARNING
npm run test:watch

# Generate coverage report
npm run test:coverage
```

### Interactive Browser Testing

1. Start your dev server: `npm run dev`
2. Visit: http://localhost:3000/testing
3. Click "Run Tests" to see simulated results
4. Use terminal commands for real Jest testing

## 📚 Learning Path

### Week 1: Understanding Test Basics

1. **Read existing tests** in `src/__tests__/components/button.test.tsx`
2. **Run tests** using `npm run test:watch`
3. **Modify a test** - change "Click me" to something else and watch it fail
4. **Fix it** - update the test to match your change

### Week 2: Writing Your First Test

1. **Pick a simple component** (maybe `Input` or `Label`)
2. **Create a test file**: `src/__tests__/components/input.test.tsx`
3. **Copy the pattern** from `button.test.tsx`
4. **Write 2-3 simple tests**:
   - Does it render?
   - Can you type in it?
   - Does the disabled state work?

### Week 3: Testing Interactions

1. **Study** `button.test.tsx` - see how `userEvent.click()` works
2. **Test a form** - can you fill out inputs and submit?
3. **Test dropdown menus** - can you open/close them?

### Week 4: Advanced Concepts

1. **Test async behavior** - API calls, loading states
2. **Mock functions** - use `jest.fn()`
3. **Test custom hooks** - see `useScrollDirection.test.ts`

## 🔍 Key Testing Concepts

### 1. **Arrange, Act, Assert**

```tsx
it("handles click events", async () => {
  // ARRANGE: Set up the test
  const handleClick = jest.fn();
  render(<Button onClick={handleClick}>Click me</Button>);

  // ACT: Perform the action
  await userEvent.click(screen.getByText("Click me"));

  // ASSERT: Check the result
  expect(handleClick).toHaveBeenCalledTimes(1);
});
```

### 2. **Query Methods**

- `getByText()` - Find by visible text
- `getByRole()` - Find by ARIA role (most accessible!)
- `getByLabelText()` - Find form fields by their label
- `queryBy*()` - Returns null if not found (good for checking absence)
- `findBy*()` - Async, waits for element to appear

### 3. **Jest Matchers**

```tsx
expect(element).toBeInTheDocument();
expect(element).toHaveClass("bg-primary");
expect(element).toBeDisabled();
expect(mockFn).toHaveBeenCalled();
expect(value).toBe(expected);
```

### 4. **User Events**

```tsx
import userEvent from "@testing-library/user-event";

const user = userEvent.setup();
await user.click(button);
await user.type(input, "Hello");
await user.hover(element);
```

## 📁 Project Structure

```
src/
├── __tests__/                    # All test files go here
│   ├── components/               # Component tests
│   │   ├── button.test.tsx
│   │   ├── badge.test.tsx
│   │   └── card.test.tsx
│   ├── hooks/                    # Hook tests
│   │   └── useScrollDirection.test.ts
│   └── lib/                      # Utility tests
│       └── utils.test.ts
├── app/(dev)/testing/            # Testing UI pages
│   ├── page.tsx                  # Testing dashboard
│   ├── unit-tests/
│   │   └── page.tsx              # Interactive test runner
│   └── visual/
│       └── page.tsx              # Visual component gallery
└── components/                   # Components to test
```

## 🎓 Testing Best Practices

### ✅ DO

- Test user behavior, not implementation details
- Use `getByRole()` for better accessibility
- Keep tests simple and focused (one thing per test)
- Use descriptive test names: `it("disables button when loading")`
- Run tests in watch mode while developing

### ❌ DON'T

- Test internal state or component internals
- Write tests that are too broad (testing everything at once)
- Rely on class names or IDs (use accessible queries)
- Skip edge cases (disabled states, errors, empty data)

## 🐛 Common Issues & Solutions

### Issue: Tests failing with "not wrapped in act()"

**Solution:** Use `async/await` with user events:

```tsx
await userEvent.click(button); // ✅ Good
userEvent.click(button); // ❌ Bad
```

### Issue: "Unable to find element"

**Solution:**

1. Check the component actually renders
2. Use `screen.debug()` to see what's rendered
3. Try different query methods (getByRole, getByLabelText)

### Issue: Tests are slow

**Solution:**

1. Don't use `waitFor` unless needed
2. Mock heavy operations (API calls, timers)
3. Use `userEvent.setup()` once per test

## 📊 Coverage Reports

After running `npm run test:coverage`, open:

```
coverage/lcov-report/index.html
```

**What's good coverage?**

- 80%+ is excellent
- Don't obsess over 100% - test important paths
- Focus on components users interact with

## 🔗 Resources

- [Testing Library Docs](https://testing-library.com/docs/react-testing-library/intro/)
- [Jest Docs](https://jestjs.io/docs/getting-started)
- [Common Mistakes](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)

## 💡 Pro Tips

1. **Use watch mode** - it's a game changer: `npm run test:watch`
2. **Start small** - test simple components first
3. **Copy patterns** - use existing tests as templates
4. **Test failures** - not just happy paths
5. **Read error messages** - Jest gives helpful hints

## 🎯 Your Next Steps

1. ✅ Run `npm run test:watch` right now
2. ✅ Open `button.test.tsx` and read through it
3. ✅ Change something in the Button component
4. ✅ Watch the tests update automatically
5. ✅ Fix the failing test
6. ✅ Write your first test for another component

**Happy Testing! 🧪**
