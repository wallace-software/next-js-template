// src/api/services/productService.ts
import { db } from "../config/database";
import { ProductModel } from "../models/Product";
import { Product, CreateProductDto, UpdateProductDto } from "../types";

export class ProductService {
  async getAllProducts(): Promise<Product[]> {
    const products = (await db.getProducts()) as Product[];
    return products.map((product) => ProductModel.fromJSON(product).toJSON());
  }

  async getProductById(id: string): Promise<Product | null> {
    const products = (await db.getProducts()) as Product[];
    const product = products.find((p) => p.id === id);
    return product ? ProductModel.fromJSON(product).toJSON() : null;
  }

  async createProduct(data: CreateProductDto): Promise<Product> {
    const products = (await db.getProducts()) as Product[];

    const newProduct = new ProductModel(data);
    products.push(newProduct.toJSON());
    await db.saveProducts(products);

    return newProduct.toJSON();
  }

  async updateProduct(
    id: string,
    data: UpdateProductDto
  ): Promise<Product | null> {
    const products = (await db.getProducts()) as Product[];
    const index = products.findIndex((p) => p.id === id);

    if (index === -1) {
      return null;
    }

    const productModel = ProductModel.fromJSON(products[index]);
    productModel.update(data);
    products[index] = productModel.toJSON();

    await db.saveProducts(products);
    return productModel.toJSON();
  }

  async deleteProduct(id: string): Promise<boolean> {
    const products = (await db.getProducts()) as Product[];
    const initialLength = products.length;
    const filteredProducts = products.filter((p) => p.id !== id);

    if (filteredProducts.length === initialLength) {
      return false; // Product not found
    }

    await db.saveProducts(filteredProducts);
    return true;
  }

  async getProductsByPriceRange(min: number, max: number): Promise<Product[]> {
    const products = (await db.getProducts()) as Product[];
    return products
      .filter((p) => p.price >= min && p.price <= max)
      .map((product) => ProductModel.fromJSON(product).toJSON());
  }

  async getInStockProducts(): Promise<Product[]> {
    const products = (await db.getProducts()) as Product[];
    return products
      .filter((p) => p.inStock)
      .map((product) => ProductModel.fromJSON(product).toJSON());
  }
}

export const productService = new ProductService();
