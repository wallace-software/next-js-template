"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Play, CheckCircle2, XCircle, Clock } from "lucide-react";

interface TestResult {
  name: string;
  status: "pass" | "fail" | "pending";
  duration?: number;
  error?: string;
}

interface TestSuite {
  name: string;
  file: string;
  tests: TestResult[];
  totalTests: number;
  passed: number;
  failed: number;
  duration: number;
}

const UnitTestsPage = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [testResults, setTestResults] = useState<TestSuite[]>([]);
  const [hasRun, setHasRun] = useState(false);

  const mockTestResults: TestSuite[] = [
    {
      name: "Button Component",
      file: "src/__tests__/components/button.test.tsx",
      totalTests: 6,
      passed: 6,
      failed: 0,
      duration: 245,
      tests: [
        { name: "renders with text content", status: "pass", duration: 42 },
        { name: "renders different variants", status: "pass", duration: 38 },
        { name: "renders different sizes", status: "pass", duration: 35 },
        { name: "handles click events", status: "pass", duration: 52 },
        { name: "can be disabled", status: "pass", duration: 48 },
        {
          name: "renders as a child component when using asChild",
          status: "pass",
          duration: 30,
        },
      ],
    },
    {
      name: "Badge Component",
      file: "src/__tests__/components/badge.test.tsx",
      totalTests: 6,
      passed: 6,
      failed: 0,
      duration: 156,
      tests: [
        { name: "renders with text content", status: "pass", duration: 28 },
        { name: "renders default variant", status: "pass", duration: 25 },
        { name: "renders secondary variant", status: "pass", duration: 24 },
        { name: "renders destructive variant", status: "pass", duration: 26 },
        { name: "renders outline variant", status: "pass", duration: 27 },
        { name: "accepts custom className", status: "pass", duration: 26 },
      ],
    },
    {
      name: "Card Components",
      file: "src/__tests__/components/card.test.tsx",
      totalTests: 8,
      passed: 8,
      failed: 0,
      duration: 198,
      tests: [
        { name: "Card renders children", status: "pass", duration: 22 },
        { name: "Card accepts custom className", status: "pass", duration: 24 },
        {
          name: "CardHeader renders header content",
          status: "pass",
          duration: 20,
        },
        { name: "CardTitle renders title text", status: "pass", duration: 21 },
        {
          name: "CardDescription renders description text",
          status: "pass",
          duration: 23,
        },
        { name: "CardContent renders content", status: "pass", duration: 25 },
        {
          name: "CardFooter renders footer content",
          status: "pass",
          duration: 27,
        },
        {
          name: "Complete Card renders all parts together",
          status: "pass",
          duration: 36,
        },
      ],
    },
    {
      name: "useScrollDirection Hook",
      file: "src/__tests__/hooks/useScrollDirection.test.ts",
      totalTests: 4,
      passed: 4,
      failed: 0,
      duration: 134,
      tests: [
        { name: "returns 'up' initially", status: "pass", duration: 28 },
        {
          name: "returns 'down' when scrolling down",
          status: "pass",
          duration: 35,
        },
        {
          name: "returns 'up' when scrolling up",
          status: "pass",
          duration: 38,
        },
        {
          name: "respects the threshold parameter",
          status: "pass",
          duration: 33,
        },
      ],
    },
    {
      name: "cn utility function",
      file: "src/__tests__/lib/utils.test.ts",
      totalTests: 7,
      passed: 7,
      failed: 0,
      duration: 89,
      tests: [
        { name: "merges class names", status: "pass", duration: 12 },
        { name: "handles conditional classes", status: "pass", duration: 14 },
        { name: "filters out falsy values", status: "pass", duration: 13 },
        {
          name: "merges Tailwind classes correctly",
          status: "pass",
          duration: 15,
        },
        { name: "handles empty input", status: "pass", duration: 10 },
        { name: "handles arrays of classes", status: "pass", duration: 12 },
        {
          name: "handles objects with boolean values",
          status: "pass",
          duration: 13,
        },
      ],
    },
  ];

  const runTests = async () => {
    setIsRunning(true);
    setTestResults([]);
    setHasRun(false);

    // Simulate test execution with progressive results
    for (let i = 0; i < mockTestResults.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 300));
      setTestResults((prev) => [...prev, mockTestResults[i]]);
    }

    setIsRunning(false);
    setHasRun(true);
  };

  const totalStats = testResults.reduce(
    (acc, suite) => ({
      total: acc.total + suite.totalTests,
      passed: acc.passed + suite.passed,
      failed: acc.failed + suite.failed,
      duration: acc.duration + suite.duration,
    }),
    { total: 0, passed: 0, failed: 0, duration: 0 }
  );

  return (
    <div className="container mx-auto max-w-6xl px-4 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight">Unit Tests</h1>
        <p className="mt-2 text-muted-foreground">
          Run and view Jest test results in real-time. This page simulates test
          execution for learning purposes.
        </p>
      </div>

      {/* Run Tests Button */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Test Runner</CardTitle>
          <CardDescription>
            Click to run all unit tests and see the results below
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <Button
              onClick={runTests}
              disabled={isRunning}
              size="lg"
              className="gap-2"
            >
              <Play className="h-4 w-4" />
              {isRunning ? "Running Tests..." : "Run All Tests"}
            </Button>

            {hasRun && !isRunning && (
              <div className="flex items-center gap-4">
                <Badge variant="outline" className="gap-1">
                  <CheckCircle2 className="h-3 w-3" />
                  {totalStats.passed} Passed
                </Badge>
                {totalStats.failed > 0 && (
                  <Badge variant="destructive" className="gap-1">
                    <XCircle className="h-3 w-3" />
                    {totalStats.failed} Failed
                  </Badge>
                )}
                <Badge variant="secondary" className="gap-1">
                  <Clock className="h-3 w-3" />
                  {totalStats.duration}ms
                </Badge>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Test Results */}
      {testResults.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Test Results</h2>
          {testResults.map((suite, index) => (
            <Card key={index}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl">{suite.name}</CardTitle>
                    <CardDescription className="font-mono text-xs">
                      {suite.file}
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant={suite.failed === 0 ? "default" : "destructive"}
                      className="gap-1"
                    >
                      {suite.passed}/{suite.totalTests} passed
                    </Badge>
                    <Badge variant="secondary" className="gap-1">
                      {suite.duration}ms
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {suite.tests.map((test, testIndex) => (
                    <div
                      key={testIndex}
                      className="flex items-center justify-between rounded-lg border p-3"
                    >
                      <div className="flex items-center gap-3">
                        {test.status === "pass" ? (
                          <CheckCircle2 className="h-4 w-4 text-green-500" />
                        ) : (
                          <XCircle className="h-4 w-4 text-red-500" />
                        )}
                        <span className="text-sm">{test.name}</span>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {test.duration}ms
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Instructions */}
      {!hasRun && !isRunning && (
        <Card>
          <CardHeader>
            <CardTitle>How to Use This Testing Playground</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="mb-2 font-semibold">1. Run Tests from Terminal</h3>
              <div className="rounded-lg bg-muted p-3 font-mono text-sm">
                npm test
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                This runs all tests once and shows results
              </p>
            </div>

            <div>
              <h3 className="mb-2 font-semibold">
                2. Watch Mode (Recommended for Development)
              </h3>
              <div className="rounded-lg bg-muted p-3 font-mono text-sm">
                npm run test:watch
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                Automatically re-runs tests when you save files
              </p>
            </div>

            <div>
              <h3 className="mb-2 font-semibold">3. Coverage Report</h3>
              <div className="rounded-lg bg-muted p-3 font-mono text-sm">
                npm run test:coverage
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                Shows which parts of your code are tested
              </p>
            </div>

            <div className="rounded-lg border-l-4 border-blue-500 bg-blue-50 p-4 dark:bg-blue-950/20">
              <p className="text-sm">
                <strong>💡 Tip:</strong> The &quot;Run All Tests&quot; button
                above simulates test execution in the browser. For real Jest
                testing, use the terminal commands.
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default UnitTestsPage;
