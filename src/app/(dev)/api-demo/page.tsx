"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export default function ApiDemoPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [newUser, setNewUser] = useState({ name: "", email: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const fetchUsers = async () => {
    setLoading(true);
    setMessage("");
    try {
      const response = await fetch("/api/users");
      const data = await response.json();
      if (data.success) {
        setUsers(data.data);
        setMessage("Users loaded successfully!");
      }
    } catch (error) {
      setMessage("Error fetching users: " + (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const createUser = async () => {
    if (!newUser.name || !newUser.email) {
      setMessage("Please fill in all fields");
      return;
    }

    setLoading(true);
    setMessage("");
    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });
      const data = await response.json();

      if (data.success) {
        setMessage("User created successfully!");
        setNewUser({ name: "", email: "" });
        fetchUsers(); // Refresh the list
      } else {
        setMessage("Error: " + data.error);
      }
    } catch (error) {
      setMessage("Error creating user: " + (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (id: string) => {
    setLoading(true);
    setMessage("");
    try {
      const response = await fetch(`/api/users/${id}`, {
        method: "DELETE",
      });
      const data = await response.json();

      if (data.success) {
        setMessage("User deleted successfully!");
        fetchUsers(); // Refresh the list
      } else {
        setMessage("Error: " + data.error);
      }
    } catch (error) {
      setMessage("Error deleting user: " + (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-8 max-w-4xl">
      <h1 className="text-4xl font-bold mb-2">Backend API Demo</h1>
      <p className="text-muted-foreground mb-8">
        Test the CRUD operations for the Users API
      </p>

      {message && (
        <div
          className={`mb-4 p-4 rounded-lg ${
            message.includes("Error")
              ? "bg-red-100 text-red-900"
              : "bg-green-100 text-green-900"
          }`}
        >
          {message}
        </div>
      )}

      <div className="grid gap-6">
        {/* Create User Card */}
        <Card>
          <CardHeader>
            <CardTitle>Create New User</CardTitle>
            <CardDescription>Add a new user to the database</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-1 block">Name</label>
              <Input
                placeholder="John Doe"
                value={newUser.name}
                onChange={(e) =>
                  setNewUser({ ...newUser, name: e.target.value })
                }
                disabled={loading}
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Email</label>
              <Input
                type="email"
                placeholder="john@example.com"
                value={newUser.email}
                onChange={(e) =>
                  setNewUser({ ...newUser, email: e.target.value })
                }
                disabled={loading}
              />
            </div>
            <Button onClick={createUser} disabled={loading}>
              {loading ? "Creating..." : "Create User"}
            </Button>
          </CardContent>
        </Card>

        {/* Users List Card */}
        <Card>
          <CardHeader>
            <CardTitle>Users List</CardTitle>
            <CardDescription>All users in the database</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={fetchUsers} disabled={loading} className="mb-4">
              {loading ? "Loading..." : "Fetch Users"}
            </Button>

            {users.length === 0 ? (
              <p className="text-muted-foreground">
                No users found. Create one above!
              </p>
            ) : (
              <div className="space-y-2">
                {users.map((user) => (
                  <div
                    key={user.id}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div>
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {user.email}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        ID: {user.id}
                      </p>
                    </div>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => deleteUser(user.id)}
                      disabled={loading}
                    >
                      Delete
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* API Info Card */}
        <Card>
          <CardHeader>
            <CardTitle>API Endpoints</CardTitle>
            <CardDescription>Available endpoints for testing</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm font-mono">
              <p>
                <span className="text-green-600">GET</span> /api/users - Get all
                users
              </p>
              <p>
                <span className="text-green-600">GET</span> /api/users/:id - Get
                user by ID
              </p>
              <p>
                <span className="text-blue-600">POST</span> /api/users - Create
                user
              </p>
              <p>
                <span className="text-yellow-600">PUT</span> /api/users/:id -
                Update user
              </p>
              <p>
                <span className="text-red-600">DELETE</span> /api/users/:id -
                Delete user
              </p>
              <p className="mt-4">
                <span className="text-green-600">GET</span> /api/products - Get
                all products
              </p>
              <p>
                <span className="text-blue-600">POST</span> /api/products -
                Create product
              </p>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              See{" "}
              <code className="bg-muted px-1 py-0.5 rounded">
                docs/BACKEND_API.md
              </code>{" "}
              for complete documentation.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
