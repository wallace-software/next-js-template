// src/api/services/userService.ts
import { db } from "../config/database";
import { UserModel } from "../models/User";
import { User, CreateUserDto, UpdateUserDto } from "../types";

export class UserService {
  async getAllUsers(): Promise<User[]> {
    const users = (await db.getUsers()) as User[];
    return users.map((user) => UserModel.fromJSON(user).toJSON());
  }

  async getUserById(id: string): Promise<User | null> {
    const users = (await db.getUsers()) as User[];
    const user = users.find((u) => u.id === id);
    return user ? UserModel.fromJSON(user).toJSON() : null;
  }

  async createUser(data: CreateUserDto): Promise<User> {
    const users = (await db.getUsers()) as User[];

    // Check if email already exists
    const emailExists = users.some((u) => u.email === data.email);
    if (emailExists) {
      throw new Error("Email already exists");
    }

    const newUser = new UserModel(data);
    users.push(newUser.toJSON());
    await db.saveUsers(users);

    return newUser.toJSON();
  }

  async updateUser(id: string, data: UpdateUserDto): Promise<User | null> {
    const users = (await db.getUsers()) as User[];
    const index = users.findIndex((u) => u.id === id);

    if (index === -1) {
      return null;
    }

    // Check if email is being changed and if it already exists
    if (data.email && data.email !== users[index].email) {
      const emailExists = users.some((u) => u.email === data.email);
      if (emailExists) {
        throw new Error("Email already exists");
      }
    }

    const userModel = UserModel.fromJSON(users[index]);
    userModel.update(data);
    users[index] = userModel.toJSON();

    await db.saveUsers(users);
    return userModel.toJSON();
  }

  async deleteUser(id: string): Promise<boolean> {
    const users = (await db.getUsers()) as User[];
    const initialLength = users.length;
    const filteredUsers = users.filter((u) => u.id !== id);

    if (filteredUsers.length === initialLength) {
      return false; // User not found
    }

    await db.saveUsers(filteredUsers);
    return true;
  }

  async getUserByEmail(email: string): Promise<User | null> {
    const users = (await db.getUsers()) as User[];
    const user = users.find((u) => u.email === email);
    return user ? UserModel.fromJSON(user).toJSON() : null;
  }
}

export const userService = new UserService();
