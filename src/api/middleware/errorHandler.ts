// src/api/middleware/errorHandler.ts
import { NextResponse } from "next/server";
import { ZodError } from "zod";

export class ApiError extends Error {
  constructor(
    public statusCode: number,
    message: string,
    public isOperational = true
  ) {
    super(message);
    Object.setPrototypeOf(this, ApiError.prototype);
  }
}

export function handleError(error: unknown) {
  console.error("API Error:", error);

  // Handle Zod validation errors
  if (error instanceof ZodError) {
    return NextResponse.json(
      {
        success: false,
        error: "Validation Error",
        message: error.issues
          .map((e) => `${e.path.join(".")}: ${e.message}`)
          .join(", "),
        details: error.issues,
      },
      { status: 400 }
    );
  }

  // Handle custom API errors
  if (error instanceof ApiError) {
    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status: error.statusCode }
    );
  }

  // Handle generic errors
  if (error instanceof Error) {
    // Check for specific error messages
    if (error.message.includes("already exists")) {
      return NextResponse.json(
        {
          success: false,
          error: error.message,
        },
        { status: 409 } // Conflict
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status: 400 }
    );
  }

  // Unknown error
  return NextResponse.json(
    {
      success: false,
      error: "An unexpected error occurred",
    },
    { status: 500 }
  );
}

export function notFoundResponse(resource: string) {
  return NextResponse.json(
    {
      success: false,
      error: `${resource} not found`,
    },
    { status: 404 }
  );
}

export function successResponse<T>(data: T, message?: string) {
  return NextResponse.json(
    {
      success: true,
      data,
      ...(message && { message }),
    },
    { status: 200 }
  );
}

export function createdResponse<T>(data: T, message?: string) {
  return NextResponse.json(
    {
      success: true,
      data,
      message: message || "Resource created successfully",
    },
    { status: 201 }
  );
}
