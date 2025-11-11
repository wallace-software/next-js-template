import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Rocket,
  Palette,
  TestTube,
  Code2,
  Zap,
  Shield,
  Github,
  ArrowRight,
} from "lucide-react";

const Home = () => {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="container mx-auto max-w-6xl px-4 py-20 md:py-32">
        <div className="flex flex-col items-center text-center">
          <Badge variant="secondary" className="mb-4">
            Next.js 15 + TypeScript + Tailwind
          </Badge>
          <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-6xl">
            Production-Ready
            <br />
            <span className="text-primary">Next.js Template</span>
          </h1>
          <p className="mb-8 max-w-2xl text-lg text-muted-foreground">
            A modern, fully-configured starter template with everything you need
            to build your next project. Copy, customize, and ship faster.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button size="lg" className="gap-2">
              Get Started
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" className="gap-2" asChild>
              <a
                href="https://github.com/wallace-software/next-js-template"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="h-4 w-4" />
                View on GitHub
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="border-t bg-muted/50 py-20">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight">
              Everything You Need
            </h2>
            <p className="text-muted-foreground">
              Built with best practices and modern tools
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Rocket className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Next.js 15</CardTitle>
                <CardDescription>
                  Latest Next.js with App Router, Server Components, and React
                  19
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-500/10">
                  <Palette className="h-6 w-6 text-blue-500" />
                </div>
                <CardTitle>shadcn/ui</CardTitle>
                <CardDescription>
                  Beautiful, accessible components built with Radix UI and
                  Tailwind CSS
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-green-500/10">
                  <TestTube className="h-6 w-6 text-green-500" />
                </div>
                <CardTitle>Testing Ready</CardTitle>
                <CardDescription>
                  Jest + Testing Library configured with 32 example tests to
                  learn from
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-purple-500/10">
                  <Code2 className="h-6 w-6 text-purple-500" />
                </div>
                <CardTitle>TypeScript</CardTitle>
                <CardDescription>
                  Fully typed with strict mode enabled for safer, better code
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-yellow-500/10">
                  <Zap className="h-6 w-6 text-yellow-500" />
                </div>
                <CardTitle>Dark Mode</CardTitle>
                <CardDescription>
                  Built-in theme switching with system preference detection
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-red-500/10">
                  <Shield className="h-6 w-6 text-red-500" />
                </div>
                <CardTitle>Best Practices</CardTitle>
                <CardDescription>
                  Clean architecture with organized components, hooks, and
                  utilities
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="border-t py-20">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight">
              Tech Stack
            </h2>
            <p className="text-muted-foreground">
              Modern tools that work together seamlessly
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Frontend</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  <Badge>Next.js 15</Badge>
                  <Badge>React 19</Badge>
                  <Badge>TypeScript</Badge>
                  <Badge>Tailwind CSS v4</Badge>
                  <Badge>shadcn/ui</Badge>
                  <Badge>Framer Motion</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Developer Tools</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  <Badge>Jest</Badge>
                  <Badge>Testing Library</Badge>
                  <Badge>ESLint</Badge>
                  <Badge>Prettier</Badge>
                  <Badge>Zod</Badge>
                  <Badge>React Hook Form</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t bg-muted/50 py-20">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight">
            Ready to Build Something Amazing?
          </h2>
          <p className="mb-8 text-lg text-muted-foreground">
            Clone this template, customize it for your needs, and start shipping
            faster.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Button size="lg" asChild>
              <Link href="/testing">Explore Testing Playground</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a
                href="https://nextjs.org/docs"
                target="_blank"
                rel="noopener noreferrer"
              >
                Read Documentation
              </a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
