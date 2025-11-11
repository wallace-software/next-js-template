# Backend API Documentation

This Next.js template includes a simple backend API with CRUD operations for Users and Products. The API uses a local JSON file for data storage, making it easy to get started without a database.

## 📁 Project Structure

```
src/api/
├── config/
│   └── database.ts          # Local JSON file storage configuration
├── models/
│   ├── User.ts             # User model with validation
│   └── Product.ts          # Product model with validation
├── services/
│   ├── userService.ts      # Business logic for users
│   └── productService.ts   # Business logic for products
├── middleware/
│   └── errorHandler.ts     # Error handling utilities
├── types/
│   └── index.ts           # TypeScript interfaces
└── utils/
    └── validators.ts      # Zod validation schemas
```

## 🚀 Getting Started

### Data Storage

Data is stored in JSON files in the `data/` directory at the project root:

- `data/users.json` - User data
- `data/products.json` - Product data

These files are created automatically when you first use the API.

### Making API Requests

You can test the API using:

- Browser (GET requests)
- curl
- Postman
- Thunder Client (VS Code extension)
- Your frontend application

## 📚 API Endpoints

### Users API

#### Get All Users

```
GET /api/users
```

**Response:**

```json
{
  "success": true,
  "data": [
    {
      "id": "user_1234567890_abc123",
      "name": "John Doe",
      "email": "john@example.com",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

#### Get User by ID

```
GET /api/users/:id
```

**Response:**

```json
{
  "success": true,
  "data": {
    "id": "user_1234567890_abc123",
    "name": "John Doe",
    "email": "john@example.com",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

#### Create User

```
POST /api/users
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Resource created successfully",
  "data": {
    "id": "user_1234567890_abc123",
    "name": "John Doe",
    "email": "john@example.com",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

#### Update User

```
PUT /api/users/:id
Content-Type: application/json

{
  "name": "Jane Doe",
  "email": "jane@example.com"
}
```

**Response:**

```json
{
  "success": true,
  "message": "User updated successfully",
  "data": {
    "id": "user_1234567890_abc123",
    "name": "Jane Doe",
    "email": "jane@example.com",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T12:00:00.000Z"
  }
}
```

#### Delete User

```
DELETE /api/users/:id
```

**Response:**

```json
{
  "success": true,
  "message": "User deleted successfully",
  "data": {
    "id": "user_1234567890_abc123"
  }
}
```

### Products API

#### Get All Products

```
GET /api/products
```

**Query Parameters:**

- `inStock=true` - Filter for in-stock products only
- `minPrice=10&maxPrice=100` - Filter by price range

**Response:**

```json
{
  "success": true,
  "data": [
    {
      "id": "product_1234567890_xyz789",
      "name": "Laptop",
      "description": "High-performance laptop",
      "price": 999.99,
      "inStock": true,
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

#### Get Product by ID

```
GET /api/products/:id
```

#### Create Product

```
POST /api/products
Content-Type: application/json

{
  "name": "Laptop",
  "description": "High-performance laptop",
  "price": 999.99,
  "inStock": true
}
```

#### Update Product

```
PUT /api/products/:id
Content-Type: application/json

{
  "name": "Gaming Laptop",
  "price": 1299.99
}
```

#### Delete Product

```
DELETE /api/products/:id
```

## 🧪 Testing with curl

### Create a User

```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com"}'
```

### Get All Users

```bash
curl http://localhost:3000/api/users
```

### Create a Product

```bash
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "name":"Laptop",
    "description":"High-performance laptop",
    "price":999.99,
    "inStock":true
  }'
```

### Update a Product

```bash
curl -X PUT http://localhost:3000/api/products/PRODUCT_ID \
  -H "Content-Type: application/json" \
  -d '{"price":1099.99}'
```

### Delete a User

```bash
curl -X DELETE http://localhost:3000/api/users/USER_ID
```

## ⚠️ Error Handling

The API includes comprehensive error handling:

### Validation Errors (400)

```json
{
  "success": false,
  "error": "Validation Error",
  "message": "name: Name is required, email: Invalid email address",
  "details": [...]
}
```

### Not Found (404)

```json
{
  "success": false,
  "error": "User not found"
}
```

### Conflict (409)

```json
{
  "success": false,
  "error": "Email already exists"
}
```

### Server Error (500)

```json
{
  "success": false,
  "error": "An unexpected error occurred"
}
```

## 🔧 Customization

### Adding New Fields

1. Update the type in `src/api/types/index.ts`
2. Update the model in `src/api/models/`
3. Update the validation schema in `src/api/utils/validators.ts`
4. The service layer will automatically handle the new fields

### Switching to a Database

To switch from JSON files to a real database (e.g., MongoDB):

1. Update `src/api/config/database.ts` with your database connection
2. Modify the service methods to use database queries instead of file operations
3. Keep the same interfaces - no changes needed in routes or controllers

Example MongoDB implementation:

```typescript
// src/api/config/database.ts
import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URI!);
const db = client.db("myapp");

export const usersCollection = db.collection("users");
export const productsCollection = db.collection("products");
```

## 🎨 Architecture

The backend follows a layered architecture:

1. **Routes** (`src/app/api/*/route.ts`) - Handle HTTP requests/responses
2. **Services** (`src/api/services/`) - Business logic
3. **Models** (`src/api/models/`) - Data models with methods
4. **Database** (`src/api/config/database.ts`) - Data persistence
5. **Middleware** (`src/api/middleware/`) - Cross-cutting concerns
6. **Validators** (`src/api/utils/validators.ts`) - Input validation

This separation makes it easy to:

- Test each layer independently
- Swap out the database
- Reuse business logic
- Maintain consistent error handling

## 📝 TypeScript Types

All API types are defined in `src/api/types/index.ts`:

- `User` - User entity
- `Product` - Product entity
- `CreateUserDto` - Data for creating users
- `UpdateUserDto` - Data for updating users
- `CreateProductDto` - Data for creating products
- `UpdateProductDto` - Data for updating products
- `ApiResponse<T>` - Standard API response format

## 🔍 Next Steps

1. Start the dev server: `npm run dev`
2. Test the API endpoints using curl or Postman
3. Integrate the API with your frontend components
4. Add authentication/authorization as needed
5. Consider adding pagination for list endpoints
6. Add more complex queries as your app grows
