# API Directory

This directory contains the backend API implementation for the Next.js template.

## 📁 Structure

- **config/** - Database and configuration files
- **models/** - Data models with business logic
- **services/** - Business logic layer (CRUD operations)
- **middleware/** - Error handling and other middleware
- **types/** - TypeScript type definitions
- **utils/** - Utility functions (validators, helpers)

## 🔗 API Routes

The actual HTTP endpoints are in `/src/app/api/`:

- `/src/app/api/users/` - User endpoints
- `/src/app/api/products/` - Product endpoints

## 📖 Documentation

See [docs/BACKEND_API.md](../docs/BACKEND_API.md) for complete API documentation.

## 🏗️ Architecture

This follows a layered architecture pattern:

```
API Routes (Next.js)
    ↓
Services (Business Logic)
    ↓
Models (Data Validation)
    ↓
Database (JSON File Storage)
```

This separation allows you to:

- Easily swap the database (JSON → MongoDB, PostgreSQL, etc.)
- Test business logic independently
- Reuse services across different routes
- Maintain consistent validation and error handling
