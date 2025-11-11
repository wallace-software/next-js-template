// src/app/api/users/route.ts
import { NextRequest } from "next/server";
import { userService } from "@/api/services/userService";
import { createUserSchema, validateData } from "@/api/utils/validators";
import {
  handleError,
  successResponse,
  createdResponse,
} from "@/api/middleware/errorHandler";
import { CreateUserDto } from "@/api/types";

// GET /api/users - Get all users
export async function GET() {
  try {
    const users = await userService.getAllUsers();
    return successResponse(users);
  } catch (error) {
    return handleError(error);
  }
}

// POST /api/users - Create a new user
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = validateData<CreateUserDto>(createUserSchema, body);
    const user = await userService.createUser(validatedData);
    return createdResponse(user);
  } catch (error) {
    return handleError(error);
  }
}
