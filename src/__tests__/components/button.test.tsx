import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button } from "@/components/ui/button";

describe("Button Component", () => {
  it("renders with text content", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText("Click me")).toBeInTheDocument();
  });

  it("renders different variants", () => {
    const { rerender } = render(<Button variant="default">Default</Button>);
    expect(screen.getByText("Default")).toHaveClass("bg-primary");

    rerender(<Button variant="destructive">Destructive</Button>);
    expect(screen.getByText("Destructive")).toHaveClass("bg-destructive");

    rerender(<Button variant="outline">Outline</Button>);
    expect(screen.getByText("Outline")).toHaveClass("border");
  });

  it("renders different sizes", () => {
    const { rerender } = render(<Button size="sm">Small</Button>);
    const smallButton = screen.getByText("Small");
    expect(smallButton).toBeInTheDocument();
    // Check that it has the expected smaller height class
    expect(smallButton.className).toContain("h-8");

    rerender(<Button size="lg">Large</Button>);
    const largeButton = screen.getByText("Large");
    expect(largeButton).toBeInTheDocument();
    // Check that it has the expected larger height class
    expect(largeButton.className).toContain("h-10");
  });

  it("handles click events", async () => {
    const handleClick = jest.fn();
    const user = userEvent.setup();

    render(<Button onClick={handleClick}>Click me</Button>);

    await user.click(screen.getByText("Click me"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("can be disabled", async () => {
    const handleClick = jest.fn();
    const user = userEvent.setup();

    render(
      <Button disabled onClick={handleClick}>
        Disabled
      </Button>
    );

    const button = screen.getByText("Disabled");
    expect(button).toBeDisabled();

    await user.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });

  it("renders as a child component when using asChild", () => {
    render(
      <Button asChild>
        <a href="/test">Link Button</a>
      </Button>
    );

    const link = screen.getByRole("link", { name: "Link Button" });
    expect(link).toHaveAttribute("href", "/test");
  });
});
