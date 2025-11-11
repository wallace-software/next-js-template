// src/__tests__/api/productService.test.ts
import { productService } from "@/api/services/productService";
import { db } from "@/api/config/database";

// Mock the database
jest.mock("@/api/config/database", () => ({
  db: {
    getProducts: jest.fn(),
    saveProducts: jest.fn(),
  },
}));

describe("ProductService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getAllProducts", () => {
    it("should return all products", async () => {
      const mockProducts = [
        {
          id: "product_1",
          name: "Laptop",
          description: "High-performance laptop",
          price: 999.99,
          inStock: true,
          createdAt: new Date("2024-01-01"),
          updatedAt: new Date("2024-01-01"),
        },
      ];

      (db.getProducts as jest.Mock).mockResolvedValue(mockProducts);

      const products = await productService.getAllProducts();

      expect(products).toHaveLength(1);
      expect(products[0].name).toBe("Laptop");
      expect(db.getProducts).toHaveBeenCalledTimes(1);
    });
  });

  describe("getProductById", () => {
    it("should return product when found", async () => {
      const mockProducts = [
        {
          id: "product_1",
          name: "Laptop",
          description: "High-performance laptop",
          price: 999.99,
          inStock: true,
          createdAt: new Date("2024-01-01"),
          updatedAt: new Date("2024-01-01"),
        },
      ];

      (db.getProducts as jest.Mock).mockResolvedValue(mockProducts);

      const product = await productService.getProductById("product_1");

      expect(product).not.toBeNull();
      expect(product?.id).toBe("product_1");
      expect(product?.name).toBe("Laptop");
    });

    it("should return null when product not found", async () => {
      (db.getProducts as jest.Mock).mockResolvedValue([]);

      const product = await productService.getProductById("nonexistent");

      expect(product).toBeNull();
    });
  });

  describe("createProduct", () => {
    it("should create a new product", async () => {
      (db.getProducts as jest.Mock).mockResolvedValue([]);
      (db.saveProducts as jest.Mock).mockResolvedValue(undefined);

      const newProduct = await productService.createProduct({
        name: "Mouse",
        description: "Wireless mouse",
        price: 29.99,
        inStock: true,
      });

      expect(newProduct.name).toBe("Mouse");
      expect(newProduct.price).toBe(29.99);
      expect(newProduct.id).toBeDefined();
      expect(db.saveProducts).toHaveBeenCalledTimes(1);
    });

    it("should default inStock to true if not provided", async () => {
      (db.getProducts as jest.Mock).mockResolvedValue([]);
      (db.saveProducts as jest.Mock).mockResolvedValue(undefined);

      const newProduct = await productService.createProduct({
        name: "Keyboard",
        description: "Mechanical keyboard",
        price: 79.99,
      });

      expect(newProduct.inStock).toBe(true);
    });
  });

  describe("updateProduct", () => {
    it("should update an existing product", async () => {
      const mockProducts = [
        {
          id: "product_1",
          name: "Laptop",
          description: "High-performance laptop",
          price: 999.99,
          inStock: true,
          createdAt: new Date("2024-01-01"),
          updatedAt: new Date("2024-01-01"),
        },
      ];

      (db.getProducts as jest.Mock).mockResolvedValue(mockProducts);
      (db.saveProducts as jest.Mock).mockResolvedValue(undefined);

      const updated = await productService.updateProduct("product_1", {
        price: 899.99,
      });

      expect(updated).not.toBeNull();
      expect(updated?.price).toBe(899.99);
      expect(updated?.name).toBe("Laptop");
      expect(db.saveProducts).toHaveBeenCalledTimes(1);
    });

    it("should return null when product not found", async () => {
      (db.getProducts as jest.Mock).mockResolvedValue([]);

      const updated = await productService.updateProduct("nonexistent", {
        price: 100,
      });

      expect(updated).toBeNull();
      expect(db.saveProducts).not.toHaveBeenCalled();
    });
  });

  describe("deleteProduct", () => {
    it("should delete an existing product", async () => {
      const mockProducts = [
        {
          id: "product_1",
          name: "Laptop",
          description: "High-performance laptop",
          price: 999.99,
          inStock: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      (db.getProducts as jest.Mock).mockResolvedValue(mockProducts);
      (db.saveProducts as jest.Mock).mockResolvedValue(undefined);

      const result = await productService.deleteProduct("product_1");

      expect(result).toBe(true);
      expect(db.saveProducts).toHaveBeenCalledWith([]);
    });

    it("should return false when product not found", async () => {
      (db.getProducts as jest.Mock).mockResolvedValue([]);

      const result = await productService.deleteProduct("nonexistent");

      expect(result).toBe(false);
      expect(db.saveProducts).not.toHaveBeenCalled();
    });
  });

  describe("getProductsByPriceRange", () => {
    it("should filter products by price range", async () => {
      const mockProducts = [
        {
          id: "product_1",
          name: "Mouse",
          description: "Wireless mouse",
          price: 29.99,
          inStock: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "product_2",
          name: "Keyboard",
          description: "Mechanical keyboard",
          price: 79.99,
          inStock: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "product_3",
          name: "Monitor",
          description: "4K Monitor",
          price: 399.99,
          inStock: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      (db.getProducts as jest.Mock).mockResolvedValue(mockProducts);

      const filtered = await productService.getProductsByPriceRange(20, 100);

      expect(filtered).toHaveLength(2);
      expect(filtered[0].name).toBe("Mouse");
      expect(filtered[1].name).toBe("Keyboard");
    });
  });

  describe("getInStockProducts", () => {
    it("should return only in-stock products", async () => {
      const mockProducts = [
        {
          id: "product_1",
          name: "Mouse",
          description: "Wireless mouse",
          price: 29.99,
          inStock: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "product_2",
          name: "Keyboard",
          description: "Mechanical keyboard",
          price: 79.99,
          inStock: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      (db.getProducts as jest.Mock).mockResolvedValue(mockProducts);

      const inStock = await productService.getInStockProducts();

      expect(inStock).toHaveLength(1);
      expect(inStock[0].name).toBe("Mouse");
      expect(inStock[0].inStock).toBe(true);
    });
  });
});
