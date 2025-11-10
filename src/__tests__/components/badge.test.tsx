import { render, screen } from "@testing-library/react";
import { Badge } from "@/components/ui/badge";

describe("Badge Component", () => {
  it("renders with text content", () => {
    render(<Badge>New</Badge>);
    expect(screen.getByText("New")).toBeInTheDocument();
  });

  it("renders default variant", () => {
    render(<Badge>Default</Badge>);
    expect(screen.getByText("Default")).toHaveClass("bg-primary");
  });

  it("renders secondary variant", () => {
    render(<Badge variant="secondary">Secondary</Badge>);
    expect(screen.getByText("Secondary")).toHaveClass("bg-secondary");
  });

  it("renders destructive variant", () => {
    render(<Badge variant="destructive">Destructive</Badge>);
    expect(screen.getByText("Destructive")).toHaveClass("bg-destructive");
  });

  it("renders outline variant", () => {
    render(<Badge variant="outline">Outline</Badge>);
    expect(screen.getByText("Outline")).toHaveClass("border");
  });

  it("accepts custom className", () => {
    render(<Badge className="custom-class">Custom</Badge>);
    expect(screen.getByText("Custom")).toHaveClass("custom-class");
  });
});
