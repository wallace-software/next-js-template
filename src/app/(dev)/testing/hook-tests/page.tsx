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
import {
  Play,
  CheckCircle2,
  XCircle,
  Clock,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import { useScrollDirection } from "@/hooks/useScrollDirection";

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

const HookTestsPage = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [testResults, setTestResults] = useState<TestSuite[]>([]);
  const [hasRun, setHasRun] = useState(false);

  // Live demo of useScrollDirection hook
  const { dir, atTop } = useScrollDirection({ threshold: 10, offset: 20 });

  const mockTestResults: TestSuite[] = [
    {
      name: "useScrollDirection Hook",
      file: "src/__tests__/hooks/useScrollDirection.test.ts",
      totalTests: 5,
      passed: 5,
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
        { name: "tracks atTop state", status: "pass", duration: 25 },
      ],
    },
  ];

  const runTests = async () => {
    setIsRunning(true);
    setTestResults([]);
    setHasRun(false);

    // Simulate test execution
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
        <h1 className="text-4xl font-bold tracking-tight">Hook Tests</h1>
        <p className="mt-2 text-muted-foreground">
          Test custom React hooks with different inputs and scenarios. See live
          demonstrations and test results.
        </p>
      </div>

      {/* Live Hook Demo */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Live Demo: useScrollDirection</CardTitle>
          <CardDescription>
            This hook is running on this page right now. Scroll up and down to
            see it in action!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-6 rounded-lg border p-6">
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-blue-100 p-3 dark:bg-blue-950">
                  {dir === "down" ? (
                    <ArrowDown className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  ) : (
                    <ArrowUp className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  )}
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Scroll Direction
                  </p>
                  <p className="text-2xl font-bold capitalize">{dir}</p>
                </div>
              </div>

              <div className="h-12 w-px bg-border" />

              <div className="flex items-center gap-3">
                <div
                  className={`rounded-full p-3 ${
                    atTop
                      ? "bg-green-100 dark:bg-green-950"
                      : "bg-gray-100 dark:bg-gray-950"
                  }`}
                >
                  <CheckCircle2
                    className={`h-6 w-6 ${
                      atTop
                        ? "text-green-600 dark:text-green-400"
                        : "text-gray-400 dark:text-gray-600"
                    }`}
                  />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    At Top
                  </p>
                  <p className="text-2xl font-bold">{atTop ? "Yes" : "No"}</p>
                </div>
              </div>
            </div>

            <div className="rounded-lg bg-muted p-4">
              <p className="text-sm text-muted-foreground">
                <strong>Try it:</strong> Scroll down this page and watch the
                direction indicator change. The &quot;At Top&quot; indicator
                shows whether you&apos;re within 20px of the top of the page.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Run Tests Button */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Test Runner</CardTitle>
          <CardDescription>
            Run hook tests to see how they&apos;re validated in isolation
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
              {isRunning ? "Running Tests..." : "Run Hook Tests"}
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

      {/* Hook Testing Guide */}
      {!hasRun && !isRunning && (
        <Card>
          <CardHeader>
            <CardTitle>How to Test React Hooks</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="mb-2 font-semibold">
                1. Use Testing Library&apos;s renderHook
              </h3>
              <div className="rounded-lg bg-muted p-3 font-mono text-sm">
                {`import { renderHook } from "@testing-library/react";
import { useScrollDirection } from "@/hooks/useScrollDirection";

const { result } = renderHook(() => useScrollDirection());
expect(result.current.dir).toBe("up");`}
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                renderHook creates a test component that calls your hook
              </p>
            </div>

            <div>
              <h3 className="mb-2 font-semibold">
                2. Test State Changes with act()
              </h3>
              <div className="rounded-lg bg-muted p-3 font-mono text-sm">
                {`import { act } from "@testing-library/react";

act(() => {
  // Trigger state change
  window.scrollY = 100;
  window.dispatchEvent(new Event("scroll"));
});

expect(result.current.dir).toBe("down");`}
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                act() ensures state updates are processed
              </p>
            </div>

            <div>
              <h3 className="mb-2 font-semibold">3. Test Different Inputs</h3>
              <div className="rounded-lg bg-muted p-3 font-mono text-sm">
                {`const { result } = renderHook(() => 
  useScrollDirection({ threshold: 50 })
);

// Test that custom threshold works correctly`}
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                Test hooks with various parameters to ensure robustness
              </p>
            </div>

            <div className="rounded-lg border-l-4 border-blue-500 bg-blue-50 p-4 dark:bg-blue-950/20">
              <p className="text-sm">
                <strong>💡 Tip:</strong> Custom hooks are just functions - test
                them like you would any function, but use renderHook to provide
                React context.
              </p>
            </div>

            <div>
              <h3 className="mb-2 font-semibold">4. Run the Real Tests</h3>
              <div className="rounded-lg bg-muted p-3 font-mono text-sm">
                npm run test:watch
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                Check the actual test file:{" "}
                <code className="rounded bg-muted px-1">
                  src/__tests__/hooks/useScrollDirection.test.ts
                </code>
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Create Your Own Hook Test */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Create Your Own Hook Test</CardTitle>
          <CardDescription>Template for testing a custom hook</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg bg-muted p-4 font-mono text-sm">
            <pre className="overflow-x-auto">
              {`import { renderHook, act } from "@testing-library/react";
import { useYourHook } from "@/hooks/useYourHook";

describe("useYourHook", () => {
  it("returns initial value", () => {
    const { result } = renderHook(() => useYourHook());
    expect(result.current).toBe(/* expected initial value */);
  });

  it("updates value when action occurs", () => {
    const { result } = renderHook(() => useYourHook());
    
    act(() => {
      // Trigger the action that changes state
    });

    expect(result.current).toBe(/* expected new value */);
  });

  it("handles custom parameters", () => {
    const { result } = renderHook(() => 
      useYourHook({ customParam: true })
    );
    
    expect(result.current).toBe(/* expected value */);
  });
});`}
            </pre>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HookTestsPage;
