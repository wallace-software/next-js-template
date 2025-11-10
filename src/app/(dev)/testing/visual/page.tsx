import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const VisualTestsPage = () => {
  return (
    <div className="container mx-auto max-w-6xl px-4 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight">
          Visual Component Tests
        </h1>
        <p className="mt-2 text-muted-foreground">
          View all components in different states and variants.
        </p>
      </div>

      {/* Buttons */}
      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-semibold">Buttons</h2>
        <Card>
          <CardHeader>
            <CardTitle>Button Variants</CardTitle>
            <CardDescription>All button styles and sizes</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="mb-2 text-sm font-medium">Variants</h3>
              <div className="flex flex-wrap gap-2">
                <Button variant="default">Default</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="destructive">Destructive</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="link">Link</Button>
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="mb-2 text-sm font-medium">Sizes</h3>
              <div className="flex flex-wrap items-center gap-2">
                <Button size="sm">Small</Button>
                <Button size="default">Default</Button>
                <Button size="lg">Large</Button>
                <Button size="icon">🎨</Button>
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="mb-2 text-sm font-medium">States</h3>
              <div className="flex flex-wrap gap-2">
                <Button>Normal</Button>
                <Button disabled>Disabled</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Badges */}
      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-semibold">Badges</h2>
        <Card>
          <CardHeader>
            <CardTitle>Badge Variants</CardTitle>
            <CardDescription>
              Badge styles for status and labels
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              <Badge>Default</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="destructive">Destructive</Badge>
              <Badge variant="outline">Outline</Badge>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Form Inputs */}
      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-semibold">Form Inputs</h2>
        <Card>
          <CardHeader>
            <CardTitle>Input Components</CardTitle>
            <CardDescription>Text inputs and form elements</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="test-input">Text Input</Label>
              <Input id="test-input" placeholder="Enter text..." />
            </div>

            <div className="space-y-2">
              <Label htmlFor="test-input-disabled">Disabled Input</Label>
              <Input
                id="test-input-disabled"
                placeholder="Disabled..."
                disabled
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="test-textarea">Textarea</Label>
              <Textarea id="test-textarea" placeholder="Enter longer text..." />
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Cards */}
      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-semibold">Cards</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Simple Card</CardTitle>
              <CardDescription>Basic card with header</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                This is a simple card component with header and content.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Card with Badge</CardTitle>
              <div className="flex items-center gap-2">
                <CardDescription>Status indicator</CardDescription>
                <Badge>New</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Cards can include badges and other components.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Typography */}
      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-semibold">Typography</h2>
        <Card>
          <CardHeader>
            <CardTitle>Text Styles</CardTitle>
            <CardDescription>Typography hierarchy and colors</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h1 className="text-4xl font-bold">Heading 1</h1>
              <h2 className="text-3xl font-semibold">Heading 2</h2>
              <h3 className="text-2xl font-semibold">Heading 3</h3>
              <h4 className="text-xl font-semibold">Heading 4</h4>
            </div>

            <Separator />

            <div className="space-y-2">
              <p className="text-foreground">Default text color</p>
              <p className="text-muted-foreground">Muted text color</p>
              <p className="text-sm">Small text</p>
              <p className="text-xs">Extra small text</p>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default VisualTestsPage;
