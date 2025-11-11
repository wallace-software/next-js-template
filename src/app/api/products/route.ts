// src/app/api/products/route.ts
import { NextRequest } from "next/server";
import { productService } from "@/api/services/productService";
import { createProductSchema, validateData } from "@/api/utils/validators";
import {
  handleError,
  successResponse,
  createdResponse,
} from "@/api/middleware/errorHandler";
import { CreateProductDto } from "@/api/types";

// GET /api/products - Get all products (with optional filters)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const inStockOnly = searchParams.get("inStock") === "true";
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");

    let products;

    if (minPrice && maxPrice) {
      products = await productService.getProductsByPriceRange(
        parseFloat(minPrice),
        parseFloat(maxPrice)
      );
    } else if (inStockOnly) {
      products = await productService.getInStockProducts();
    } else {
      products = await productService.getAllProducts();
    }

    return successResponse(products);
  } catch (error) {
    return handleError(error);
  }
}

// POST /api/products - Create a new product
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = validateData<CreateProductDto>(
      createProductSchema,
      body
    );
    const product = await productService.createProduct(validatedData);
    return createdResponse(product);
  } catch (error) {
    return handleError(error);
  }
}
