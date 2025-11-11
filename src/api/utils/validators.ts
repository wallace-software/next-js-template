// src/api/utils/validators.ts
import { z } from "zod";

export const createUserSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name too long"),
  email: z.string().email("Invalid email address"),
});

export const updateUserSchema = z.object({
  name: z.string().min(1).max(100).optional(),
  email: z.string().email().optional(),
});

export const createProductSchema = z.object({
  name: z.string().min(1, "Product name is required").max(200, "Name too long"),
  description: z.string().min(1, "Description is required"),
  price: z.number().positive("Price must be positive"),
  inStock: z.boolean().optional().default(true),
});

export const updateProductSchema = z.object({
  name: z.string().min(1).max(200).optional(),
  description: z.string().min(1).optional(),
  price: z.number().positive().optional(),
  inStock: z.boolean().optional(),
});

export const idSchema = z.string().min(1, "ID is required");

export function validateData<T>(schema: z.ZodSchema<T>, data: unknown): T {
  return schema.parse(data);
}
