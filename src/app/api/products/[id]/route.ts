// src/app/api/products/[id]/route.ts
import { NextRequest } from "next/server";
import { productService } from "@/api/services/productService";
import { updateProductSchema, validateData } from "@/api/utils/validators";
import {
  handleError,
  successResponse,
  notFoundResponse,
} from "@/api/middleware/errorHandler";
import { UpdateProductDto } from "@/api/types";

type Params = {
  params: Promise<{
    id: string;
  }>;
};

// GET /api/products/:id - Get a product by ID
export async function GET(_request: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    const product = await productService.getProductById(id);

    if (!product) {
      return notFoundResponse("Product");
    }

    return successResponse(product);
  } catch (error) {
    return handleError(error);
  }
}

// PUT /api/products/:id - Update a product
export async function PUT(request: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    const body = await request.json();
    const validatedData = validateData<UpdateProductDto>(
      updateProductSchema,
      body
    );
    const product = await productService.updateProduct(id, validatedData);

    if (!product) {
      return notFoundResponse("Product");
    }

    return successResponse(product, "Product updated successfully");
  } catch (error) {
    return handleError(error);
  }
}

// DELETE /api/products/:id - Delete a product
export async function DELETE(_request: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    const deleted = await productService.deleteProduct(id);

    if (!deleted) {
      return notFoundResponse("Product");
    }

    return successResponse({ id }, "Product deleted successfully");
  } catch (error) {
    return handleError(error);
  }
}
