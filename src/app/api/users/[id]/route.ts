// src/app/api/users/[id]/route.ts
import { NextRequest } from "next/server";
import { userService } from "@/api/services/userService";
import { updateUserSchema, validateData } from "@/api/utils/validators";
import {
  handleError,
  successResponse,
  notFoundResponse,
} from "@/api/middleware/errorHandler";
import { UpdateUserDto } from "@/api/types";

type Params = {
  params: Promise<{
    id: string;
  }>;
};

// GET /api/users/:id - Get a user by ID
export async function GET(_request: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    const user = await userService.getUserById(id);

    if (!user) {
      return notFoundResponse("User");
    }

    return successResponse(user);
  } catch (error) {
    return handleError(error);
  }
}

// PUT /api/users/:id - Update a user
export async function PUT(request: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    const body = await request.json();
    const validatedData = validateData<UpdateUserDto>(updateUserSchema, body);
    const user = await userService.updateUser(id, validatedData);

    if (!user) {
      return notFoundResponse("User");
    }

    return successResponse(user, "User updated successfully");
  } catch (error) {
    return handleError(error);
  }
}

// DELETE /api/users/:id - Delete a user
export async function DELETE(_request: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    const deleted = await userService.deleteUser(id);

    if (!deleted) {
      return notFoundResponse("User");
    }

    return successResponse({ id }, "User deleted successfully");
  } catch (error) {
    return handleError(error);
  }
}
