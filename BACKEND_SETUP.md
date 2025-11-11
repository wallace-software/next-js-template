# Backend API Setup - Quick Reference

## ✅ What Was Added

### Directory Structure

```
src/api/
├── config/
│   └── database.ts          # JSON file storage handler
├── models/
│   ├── User.ts             # User model
│   └── Product.ts          # Product model
├── services/
│   ├── userService.ts      # User business logic
│   └── productService.ts   # Product business logic
├── middleware/
│   └── errorHandler.ts     # Error handling utilities
├── types/
│   └── index.ts           # TypeScript interfaces
└── utils/
    └── validators.ts       # Zod validation schemas

src/app/api/
├── users/
│   ├── route.ts           # GET /api/users, POST /api/users
│   └── [id]/
│       └── route.ts       # GET/PUT/DELETE /api/users/:id
└── products/
    ├── route.ts           # GET /api/products, POST /api/products
    └── [id]/
        └── route.ts       # GET/PUT/DELETE /api/products/:id

src/__tests__/api/
├── userService.test.ts     # Jest tests for user service
└── productService.test.ts  # Jest tests for product service
```

### Demo & Testing Pages

- `/src/app/(dev)/api-demo/page.tsx` - Interactive API demo
- `/src/app/(dev)/testing/api-tests/page.tsx` - Automated test runner

### Documentation

- `/docs/BACKEND_API.md` - Complete API documentation with examples
- `/src/__tests__/api/README.md` - Testing guide

## 🚀 Quick Start

1. **Start the dev server:**

   ```bash
   npm run dev
   ```

2. **Visit the demo page:**

   ```
   http://localhost:3000/api-demo
   ```

3. **Or visit the test runner:**

   ```
   http://localhost:3000/testing/api-tests
   ```

4. **Or test with curl:**

   ```bash
   # Create a user
   curl -X POST http://localhost:3000/api/users \
     -H "Content-Type: application/json" \
     -d '{"name":"John Doe","email":"john@example.com"}'

   # Get all users
   curl http://localhost:3000/api/users
   ```

## 📊 Data Storage

- Data is stored in `data/users.json` and `data/products.json`
- Files are auto-created on first use
- The `data/` directory is in `.gitignore`

## 🔧 How It Works

1. **Request** comes to `/api/users` (Next.js API route)
2. **Route handler** validates input with Zod
3. **Service layer** handles business logic
4. **Model** formats and validates data
5. **Database** reads/writes JSON files
6. **Response** sent back with consistent format

## 🎯 Features

- ✅ Full CRUD operations for Users and Products
- ✅ Input validation with Zod
- ✅ Comprehensive error handling
- ✅ TypeScript types throughout
- ✅ Easy to swap JSON storage for real database
- ✅ Layered architecture for maintainability
- ✅ Demo page for testing

## 📝 Example Usage in Your App

```typescript
// Fetch users
const response = await fetch("/api/users");
const { data } = await response.json();

// Create user
const response = await fetch("/api/users", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ name: "John", email: "john@example.com" }),
});

// Update user
await fetch(`/api/users/${id}`, {
  method: "PUT",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ name: "Jane" }),
});

// Delete user
await fetch(`/api/users/${id}`, { method: "DELETE" });
```

## 🔄 Next Steps

1. Test the API using the demo page
2. Read the full documentation in `docs/BACKEND_API.md`
3. Add authentication if needed
4. Extend with more models (e.g., Orders, Comments)
5. Swap JSON storage for a real database when ready

## 🗂️ Available Endpoints

### Users

- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### Products

- `GET /api/products` - Get all products
- `GET /api/products?inStock=true` - Filter in-stock
- `GET /api/products?minPrice=10&maxPrice=100` - Filter by price
- `POST /api/products` - Create product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product
