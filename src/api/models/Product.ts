// src/api/models/Product.ts
import { Product } from "../types";

export class ProductModel {
  id: string;
  name: string;
  description: string;
  price: number;
  inStock: boolean;
  createdAt: Date;
  updatedAt: Date;

  constructor(data: Partial<Product>) {
    this.id = data.id || this.generateId();
    this.name = data.name || "";
    this.description = data.description || "";
    this.price = data.price || 0;
    this.inStock = data.inStock !== undefined ? data.inStock : true;
    this.createdAt = data.createdAt || new Date();
    this.updatedAt = data.updatedAt || new Date();
  }

  private generateId(): string {
    return `product_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
  }

  toJSON(): Product {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      price: this.price,
      inStock: this.inStock,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  static fromJSON(data: Product): ProductModel {
    return new ProductModel({
      ...data,
      createdAt: new Date(data.createdAt),
      updatedAt: new Date(data.updatedAt),
    });
  }

  update(data: Partial<Product>): void {
    if (data.name !== undefined) this.name = data.name;
    if (data.description !== undefined) this.description = data.description;
    if (data.price !== undefined) this.price = data.price;
    if (data.inStock !== undefined) this.inStock = data.inStock;
    this.updatedAt = new Date();
  }
}
