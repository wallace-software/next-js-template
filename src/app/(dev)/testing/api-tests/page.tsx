"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { CheckCircle2, XCircle, Loader2, PlayCircle } from "lucide-react";

interface TestResult {
  name: string;
  status: "success" | "error" | "pending";
  message: string;
  duration?: number;
}

export default function ApiTestsPage() {
  const [results, setResults] = useState<TestResult[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [testEmail, setTestEmail] = useState("test@example.com");

  const updateResult = (
    name: string,
    status: TestResult["status"],
    message: string,
    duration?: number
  ) => {
    setResults((prev) => {
      const exists = prev.find((r) => r.name === name);
      if (exists) {
        return prev.map((r) =>
          r.name === name ? { name, status, message, duration } : r
        );
      }
      return [...prev, { name, status, message, duration }];
    });
  };

  const runAllTests = async () => {
    setIsRunning(true);
    setResults([]);

    // Test 1: Create User
    await testCreateUser();

    // Test 2: Get All Users
    await testGetAllUsers();

    // Test 3: Get User by ID
    await testGetUserById();

    // Test 4: Update User
    await testUpdateUser();

    // Test 5: Create Product
    await testCreateProduct();

    // Test 6: Get Products with Filters
    await testGetProductsWithFilters();

    // Test 7: Validation Error
    await testValidationError();

    // Test 8: Not Found Error
    await testNotFoundError();

    setIsRunning(false);
  };

  const testCreateUser = async () => {
    const testName = "POST /api/users - Create User";
    updateResult(testName, "pending", "Running...");
    const startTime = Date.now();

    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Test User",
          email: testEmail,
        }),
      });

      const data = await response.json();
      const duration = Date.now() - startTime;

      if (data.success && data.data.id) {
        // Store the ID for later tests
        sessionStorage.setItem("testUserId", data.data.id);
        updateResult(
          testName,
          "success",
          `User created with ID: ${data.data.id}`,
          duration
        );
      } else {
        updateResult(
          testName,
          "error",
          data.error || "Failed to create user",
          duration
        );
      }
    } catch (error) {
      updateResult(testName, "error", (error as Error).message);
    }
  };

  const testGetAllUsers = async () => {
    const testName = "GET /api/users - Get All Users";
    updateResult(testName, "pending", "Running...");
    const startTime = Date.now();

    try {
      const response = await fetch("/api/users");
      const data = await response.json();
      const duration = Date.now() - startTime;

      if (data.success && Array.isArray(data.data)) {
        updateResult(
          testName,
          "success",
          `Returned ${data.data.length} users`,
          duration
        );
      } else {
        updateResult(testName, "error", "Invalid response format", duration);
      }
    } catch (error) {
      updateResult(testName, "error", (error as Error).message);
    }
  };

  const testGetUserById = async () => {
    const testName = "GET /api/users/:id - Get User by ID";
    updateResult(testName, "pending", "Running...");
    const startTime = Date.now();

    const userId = sessionStorage.getItem("testUserId");
    if (!userId) {
      updateResult(
        testName,
        "error",
        "No user ID available (create user first)"
      );
      return;
    }

    try {
      const response = await fetch(`/api/users/${userId}`);
      const data = await response.json();
      const duration = Date.now() - startTime;

      if (data.success && data.data.id === userId) {
        updateResult(
          testName,
          "success",
          `Found user: ${data.data.name}`,
          duration
        );
      } else {
        updateResult(
          testName,
          "error",
          "User not found or invalid response",
          duration
        );
      }
    } catch (error) {
      updateResult(testName, "error", (error as Error).message);
    }
  };

  const testUpdateUser = async () => {
    const testName = "PUT /api/users/:id - Update User";
    updateResult(testName, "pending", "Running...");
    const startTime = Date.now();

    const userId = sessionStorage.getItem("testUserId");
    if (!userId) {
      updateResult(testName, "error", "No user ID available");
      return;
    }

    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Updated Test User",
        }),
      });

      const data = await response.json();
      const duration = Date.now() - startTime;

      if (data.success && data.data.name === "Updated Test User") {
        updateResult(
          testName,
          "success",
          "User updated successfully",
          duration
        );
      } else {
        updateResult(
          testName,
          "error",
          data.error || "Update failed",
          duration
        );
      }
    } catch (error) {
      updateResult(testName, "error", (error as Error).message);
    }
  };

  const testCreateProduct = async () => {
    const testName = "POST /api/products - Create Product";
    updateResult(testName, "pending", "Running...");
    const startTime = Date.now();

    try {
      const response = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Test Product",
          description: "A test product for API testing",
          price: 99.99,
          inStock: true,
        }),
      });

      const data = await response.json();
      const duration = Date.now() - startTime;

      if (data.success && data.data.id) {
        sessionStorage.setItem("testProductId", data.data.id);
        updateResult(
          testName,
          "success",
          `Product created with ID: ${data.data.id}`,
          duration
        );
      } else {
        updateResult(
          testName,
          "error",
          data.error || "Failed to create product",
          duration
        );
      }
    } catch (error) {
      updateResult(testName, "error", (error as Error).message);
    }
  };

  const testGetProductsWithFilters = async () => {
    const testName = "GET /api/products?inStock=true - Filter Products";
    updateResult(testName, "pending", "Running...");
    const startTime = Date.now();

    try {
      const response = await fetch("/api/products?inStock=true");
      const data = await response.json();
      const duration = Date.now() - startTime;

      if (data.success && Array.isArray(data.data)) {
        const allInStock = data.data.every(
          (p: { inStock: boolean }) => p.inStock
        );
        if (allInStock) {
          updateResult(
            testName,
            "success",
            `Returned ${data.data.length} in-stock products`,
            duration
          );
        } else {
          updateResult(
            testName,
            "error",
            "Filter not working correctly",
            duration
          );
        }
      } else {
        updateResult(testName, "error", "Invalid response format", duration);
      }
    } catch (error) {
      updateResult(testName, "error", (error as Error).message);
    }
  };

  const testValidationError = async () => {
    const testName = "Validation Error - Invalid Email";
    updateResult(testName, "pending", "Running...");
    const startTime = Date.now();

    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Test",
          email: "invalid-email",
        }),
      });

      const data = await response.json();
      const duration = Date.now() - startTime;

      if (!data.success && response.status === 400) {
        updateResult(
          testName,
          "success",
          "Validation error caught correctly",
          duration
        );
      } else {
        updateResult(
          testName,
          "error",
          "Validation should have failed",
          duration
        );
      }
    } catch (error) {
      updateResult(testName, "error", (error as Error).message);
    }
  };

  const testNotFoundError = async () => {
    const testName = "Not Found Error - Invalid User ID";
    updateResult(testName, "pending", "Running...");
    const startTime = Date.now();

    try {
      const response = await fetch("/api/users/invalid-id-12345");
      const data = await response.json();
      const duration = Date.now() - startTime;

      if (!data.success && response.status === 404) {
        updateResult(
          testName,
          "success",
          "404 error handled correctly",
          duration
        );
      } else {
        updateResult(testName, "error", "Should return 404", duration);
      }
    } catch (error) {
      updateResult(testName, "error", (error as Error).message);
    }
  };

  const successCount = results.filter((r) => r.status === "success").length;
  const errorCount = results.filter((r) => r.status === "error").length;
  const totalTests = 8;

  return (
    <div className="container mx-auto py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">API Tests</h1>
        <p className="text-muted-foreground">
          Automated tests for backend API endpoints
        </p>
      </div>

      {/* Test Configuration */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Test Configuration</CardTitle>
          <CardDescription>
            Configure test parameters before running
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-1 block">Test Email</label>
            <Input
              type="email"
              placeholder="test@example.com"
              value={testEmail}
              onChange={(e) => setTestEmail(e.target.value)}
              disabled={isRunning}
            />
            <p className="text-xs text-muted-foreground mt-1">
              Email to use for creating test users
            </p>
          </div>
          <Button onClick={runAllTests} disabled={isRunning} className="w-full">
            {isRunning ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Running Tests...
              </>
            ) : (
              <>
                <PlayCircle className="mr-2 h-4 w-4" />
                Run All Tests ({totalTests})
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Test Results Summary */}
      {results.length > 0 && (
        <div className="grid grid-cols-3 gap-4 mb-6">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-2xl font-bold">{results.length}</p>
                <p className="text-sm text-muted-foreground">Total Run</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">
                  {successCount}
                </p>
                <p className="text-sm text-muted-foreground">Passed</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-red-600">{errorCount}</p>
                <p className="text-sm text-muted-foreground">Failed</p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Test Results */}
      <Card>
        <CardHeader>
          <CardTitle>Test Results</CardTitle>
          <CardDescription>Individual test case results</CardDescription>
        </CardHeader>
        <CardContent>
          {results.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No tests run yet. Click &quot;Run All Tests&quot; to begin.
            </div>
          ) : (
            <div className="space-y-3">
              {results.map((result, index) => (
                <div
                  key={index}
                  className="flex items-start justify-between p-4 border rounded-lg"
                >
                  <div className="flex items-start gap-3 flex-1">
                    {result.status === "success" && (
                      <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
                    )}
                    {result.status === "error" && (
                      <XCircle className="h-5 w-5 text-red-600 mt-0.5" />
                    )}
                    {result.status === "pending" && (
                      <Loader2 className="h-5 w-5 text-blue-600 animate-spin mt-0.5" />
                    )}
                    <div className="flex-1">
                      <p className="font-medium">{result.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {result.message}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {result.duration && (
                      <span className="text-xs text-muted-foreground">
                        {result.duration}ms
                      </span>
                    )}
                    <Badge
                      variant={
                        result.status === "success"
                          ? "default"
                          : result.status === "error"
                            ? "destructive"
                            : "outline"
                      }
                    >
                      {result.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Test Coverage */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>API Coverage</CardTitle>
          <CardDescription>Endpoints being tested</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm font-mono">
            <p>
              <Badge variant="outline" className="mr-2">
                POST
              </Badge>
              /api/users
            </p>
            <p>
              <Badge variant="outline" className="mr-2">
                GET
              </Badge>
              /api/users
            </p>
            <p>
              <Badge variant="outline" className="mr-2">
                GET
              </Badge>
              /api/users/:id
            </p>
            <p>
              <Badge variant="outline" className="mr-2">
                PUT
              </Badge>
              /api/users/:id
            </p>
            <p>
              <Badge variant="outline" className="mr-2">
                POST
              </Badge>
              /api/products
            </p>
            <p>
              <Badge variant="outline" className="mr-2">
                GET
              </Badge>
              /api/products?inStock=true
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
