// src/__tests__/api/userService.test.ts
import { userService } from "@/api/services/userService";
import { db } from "@/api/config/database";

// Mock the database
jest.mock("@/api/config/database", () => ({
  db: {
    getUsers: jest.fn(),
    saveUsers: jest.fn(),
  },
}));

describe("UserService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getAllUsers", () => {
    it("should return all users", async () => {
      const mockUsers = [
        {
          id: "user_1",
          name: "John Doe",
          email: "john@example.com",
          createdAt: new Date("2024-01-01"),
          updatedAt: new Date("2024-01-01"),
        },
      ];

      (db.getUsers as jest.Mock).mockResolvedValue(mockUsers);

      const users = await userService.getAllUsers();

      expect(users).toHaveLength(1);
      expect(users[0].name).toBe("John Doe");
      expect(db.getUsers).toHaveBeenCalledTimes(1);
    });

    it("should return empty array when no users exist", async () => {
      (db.getUsers as jest.Mock).mockResolvedValue([]);

      const users = await userService.getAllUsers();

      expect(users).toEqual([]);
    });
  });

  describe("getUserById", () => {
    it("should return user when found", async () => {
      const mockUsers = [
        {
          id: "user_1",
          name: "John Doe",
          email: "john@example.com",
          createdAt: new Date("2024-01-01"),
          updatedAt: new Date("2024-01-01"),
        },
      ];

      (db.getUsers as jest.Mock).mockResolvedValue(mockUsers);

      const user = await userService.getUserById("user_1");

      expect(user).not.toBeNull();
      expect(user?.id).toBe("user_1");
      expect(user?.name).toBe("John Doe");
    });

    it("should return null when user not found", async () => {
      (db.getUsers as jest.Mock).mockResolvedValue([]);

      const user = await userService.getUserById("nonexistent");

      expect(user).toBeNull();
    });
  });

  describe("createUser", () => {
    it("should create a new user", async () => {
      (db.getUsers as jest.Mock).mockResolvedValue([]);
      (db.saveUsers as jest.Mock).mockResolvedValue(undefined);

      const newUser = await userService.createUser({
        name: "Jane Doe",
        email: "jane@example.com",
      });

      expect(newUser.name).toBe("Jane Doe");
      expect(newUser.email).toBe("jane@example.com");
      expect(newUser.id).toBeDefined();
      expect(db.saveUsers).toHaveBeenCalledTimes(1);
    });

    it("should throw error if email already exists", async () => {
      const existingUsers = [
        {
          id: "user_1",
          name: "John Doe",
          email: "john@example.com",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      (db.getUsers as jest.Mock).mockResolvedValue(existingUsers);

      await expect(
        userService.createUser({
          name: "Jane Doe",
          email: "john@example.com",
        })
      ).rejects.toThrow("Email already exists");
    });
  });

  describe("updateUser", () => {
    it("should update an existing user", async () => {
      const mockUsers = [
        {
          id: "user_1",
          name: "John Doe",
          email: "john@example.com",
          createdAt: new Date("2024-01-01"),
          updatedAt: new Date("2024-01-01"),
        },
      ];

      (db.getUsers as jest.Mock).mockResolvedValue(mockUsers);
      (db.saveUsers as jest.Mock).mockResolvedValue(undefined);

      const updated = await userService.updateUser("user_1", {
        name: "John Updated",
      });

      expect(updated).not.toBeNull();
      expect(updated?.name).toBe("John Updated");
      expect(updated?.email).toBe("john@example.com");
      expect(db.saveUsers).toHaveBeenCalledTimes(1);
    });

    it("should return null when user not found", async () => {
      (db.getUsers as jest.Mock).mockResolvedValue([]);

      const updated = await userService.updateUser("nonexistent", {
        name: "Updated",
      });

      expect(updated).toBeNull();
      expect(db.saveUsers).not.toHaveBeenCalled();
    });

    it("should throw error if updating to existing email", async () => {
      const mockUsers = [
        {
          id: "user_1",
          name: "John Doe",
          email: "john@example.com",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "user_2",
          name: "Jane Doe",
          email: "jane@example.com",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      (db.getUsers as jest.Mock).mockResolvedValue(mockUsers);

      await expect(
        userService.updateUser("user_1", {
          email: "jane@example.com",
        })
      ).rejects.toThrow("Email already exists");
    });
  });

  describe("deleteUser", () => {
    it("should delete an existing user", async () => {
      const mockUsers = [
        {
          id: "user_1",
          name: "John Doe",
          email: "john@example.com",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      (db.getUsers as jest.Mock).mockResolvedValue(mockUsers);
      (db.saveUsers as jest.Mock).mockResolvedValue(undefined);

      const result = await userService.deleteUser("user_1");

      expect(result).toBe(true);
      expect(db.saveUsers).toHaveBeenCalledWith([]);
    });

    it("should return false when user not found", async () => {
      (db.getUsers as jest.Mock).mockResolvedValue([]);

      const result = await userService.deleteUser("nonexistent");

      expect(result).toBe(false);
      expect(db.saveUsers).not.toHaveBeenCalled();
    });
  });

  describe("getUserByEmail", () => {
    it("should find user by email", async () => {
      const mockUsers = [
        {
          id: "user_1",
          name: "John Doe",
          email: "john@example.com",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      (db.getUsers as jest.Mock).mockResolvedValue(mockUsers);

      const user = await userService.getUserByEmail("john@example.com");

      expect(user).not.toBeNull();
      expect(user?.email).toBe("john@example.com");
    });

    it("should return null when email not found", async () => {
      (db.getUsers as jest.Mock).mockResolvedValue([]);

      const user = await userService.getUserByEmail("notfound@example.com");

      expect(user).toBeNull();
    });
  });
});
