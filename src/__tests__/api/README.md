# API Tests

This directory contains tests for the backend API services and endpoints.

## 📁 Test Files

- **userService.test.ts** - Unit tests for User service CRUD operations
- **productService.test.ts** - Unit tests for Product service CRUD operations

## 🧪 Running Tests

### Run all API tests

```bash
npm test -- api
```

### Run specific test file

```bash
npm test -- userService.test.ts
```

### Watch mode

```bash
npm run test:watch -- api
```

### With coverage

```bash
npm run test:coverage -- --collectCoverageFrom='src/api/**/*.ts'
```

## 📊 Test Coverage

The tests cover:

- ✅ CRUD operations (Create, Read, Update, Delete)
- ✅ Data validation and error handling
- ✅ Edge cases (duplicate emails, not found, etc.)
- ✅ Query filters (price range, in-stock, etc.)

## 🎯 Interactive Testing

For manual/interactive API testing, visit:

- **API Demo Page**: `/api-demo` - Visual interface for testing
- **API Tests Page**: `/testing/api-tests` - Automated test runner

## 🔧 Test Structure

Each service test follows this pattern:

```typescript
describe("ServiceName", () => {
  beforeEach(() => {
    // Reset mocks
  });

  describe("methodName", () => {
    it("should handle success case", async () => {
      // Arrange - Set up mocks
      // Act - Call the method
      // Assert - Verify results
    });

    it("should handle error case", async () => {
      // Test error scenarios
    });
  });
});
```

## 📝 Adding New Tests

When adding a new API service:

1. Create test file: `src/__tests__/api/yourService.test.ts`
2. Mock the database layer
3. Test all CRUD operations
4. Test error cases
5. Add to the interactive test page if needed

## 🚀 Best Practices

- **Mock external dependencies** (database, file system)
- **Test edge cases** (empty arrays, null values, invalid IDs)
- **Verify side effects** (database calls, data transformations)
- **Keep tests isolated** (no shared state between tests)
- **Use descriptive test names** (should do X when Y)
