import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FlaskConical, TestTube, FileCode, PlayCircle } from "lucide-react";

const TestingPage = () => {
  return (
    <div className="container mx-auto max-w-6xl px-4 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight">
          Testing Playground
        </h1>
        <p className="mt-2 text-muted-foreground">
          Explore and test components, hooks, and utilities in an isolated
          environment.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Unit Tests */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <TestTube className="h-8 w-8 text-blue-500" />
              <Badge variant="default">Active</Badge>
            </div>
            <CardTitle className="mt-4">Unit Tests</CardTitle>
            <CardDescription>
              Run Jest tests and see results for components, hooks, and
              utilities.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild variant="default" className="w-full">
              <Link href="/testing/unit-tests">Run Tests</Link>
            </Button>
          </CardContent>
        </Card>

        {/* Hook Tests */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <FlaskConical className="h-8 w-8 text-green-500" />
              <Badge variant="default">Active</Badge>
            </div>
            <CardTitle className="mt-4">Hook Tests</CardTitle>
            <CardDescription>
              Test custom React hooks like useScrollDirection with live demos
              and scenarios.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild variant="default" className="w-full">
              <Link href="/testing/hook-tests">View Hook Tests</Link>
            </Button>
          </CardContent>
        </Card>

        {/* API Tests */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <FileCode className="h-8 w-8 text-purple-500" />
              <Badge variant="default">Active</Badge>
            </div>
            <CardTitle className="mt-4">API Tests</CardTitle>
            <CardDescription>
              Test API routes and endpoints with automated test suites.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild variant="default" className="w-full">
              <Link href="/testing/api-tests">Run API Tests</Link>
            </Button>
          </CardContent>
        </Card>

        {/* Integration Tests */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <PlayCircle className="h-8 w-8 text-orange-500" />
              <Badge variant="outline">Coming Soon</Badge>
            </div>
            <CardTitle className="mt-4">Integration Tests</CardTitle>
            <CardDescription>
              Test complete user flows and multi-component interactions.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full" disabled>
              View Tests
            </Button>
          </CardContent>
        </Card>

        {/* Visual Tests */}
        <Card className="md:col-span-2 lg:col-span-1">
          <CardHeader>
            <div className="flex items-center justify-between">
              <TestTube className="h-8 w-8 text-pink-500" />
              <Badge>Active</Badge>
            </div>
            <CardTitle className="mt-4">Visual Tests</CardTitle>
            <CardDescription>
              View all components in different states for visual testing.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild variant="default" className="w-full">
              <Link href="/testing/visual">View Components</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>
            Common testing commands and utilities
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="rounded-md bg-muted p-3">
            <code className="text-sm">npm test</code>
            <p className="mt-1 text-xs text-muted-foreground">
              Run all Jest tests
            </p>
          </div>
          <div className="rounded-md bg-muted p-3">
            <code className="text-sm">npm run test:watch</code>
            <p className="mt-1 text-xs text-muted-foreground">
              Run tests in watch mode
            </p>
          </div>
          <div className="rounded-md bg-muted p-3">
            <code className="text-sm">npm run test:coverage</code>
            <p className="mt-1 text-xs text-muted-foreground">
              Generate coverage report
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TestingPage;
