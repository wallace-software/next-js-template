// src/api/config/database.ts
import fs from "fs/promises";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");
const USERS_FILE = path.join(DATA_DIR, "users.json");
const PRODUCTS_FILE = path.join(DATA_DIR, "products.json");

export class Database {
  private static instance: Database;

  private constructor() {}

  static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  async ensureDataDirectory(): Promise<void> {
    try {
      await fs.access(DATA_DIR);
    } catch {
      await fs.mkdir(DATA_DIR, { recursive: true });
    }
  }

  async readFile<T>(filepath: string): Promise<T[]> {
    try {
      await this.ensureDataDirectory();
      const data = await fs.readFile(filepath, "utf-8");
      return JSON.parse(data);
    } catch (error) {
      // If file doesn't exist, return empty array
      if ((error as NodeJS.ErrnoException).code === "ENOENT") {
        return [];
      }
      throw error;
    }
  }

  async writeFile<T>(filepath: string, data: T[]): Promise<void> {
    await this.ensureDataDirectory();
    await fs.writeFile(filepath, JSON.stringify(data, null, 2), "utf-8");
  }

  async getUsers() {
    return this.readFile(USERS_FILE);
  }

  async saveUsers(users: unknown[]) {
    return this.writeFile(USERS_FILE, users);
  }

  async getProducts() {
    return this.readFile(PRODUCTS_FILE);
  }

  async saveProducts(products: unknown[]) {
    return this.writeFile(PRODUCTS_FILE, products);
  }
}

export const db = Database.getInstance();
