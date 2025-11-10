import { render, screen } from "@testing-library/react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

describe("Card Components", () => {
  describe("Card", () => {
    it("renders children", () => {
      render(<Card>Card content</Card>);
      expect(screen.getByText("Card content")).toBeInTheDocument();
    });

    it("accepts custom className", () => {
      const { container } = render(
        <Card className="custom-card">Content</Card>
      );
      const card = container.firstChild as HTMLElement;
      expect(card).toHaveClass("custom-card");
    });
  });

  describe("CardHeader", () => {
    it("renders header content", () => {
      render(<CardHeader>Header content</CardHeader>);
      expect(screen.getByText("Header content")).toBeInTheDocument();
    });
  });

  describe("CardTitle", () => {
    it("renders title text", () => {
      render(<CardTitle>Card Title</CardTitle>);
      expect(screen.getByText("Card Title")).toBeInTheDocument();
    });
  });

  describe("CardDescription", () => {
    it("renders description text", () => {
      render(<CardDescription>Card description</CardDescription>);
      expect(screen.getByText("Card description")).toBeInTheDocument();
    });
  });

  describe("CardContent", () => {
    it("renders content", () => {
      render(<CardContent>Main content</CardContent>);
      expect(screen.getByText("Main content")).toBeInTheDocument();
    });
  });

  describe("CardFooter", () => {
    it("renders footer content", () => {
      render(<CardFooter>Footer content</CardFooter>);
      expect(screen.getByText("Footer content")).toBeInTheDocument();
    });
  });

  describe("Complete Card", () => {
    it("renders all card parts together", () => {
      render(
        <Card>
          <CardHeader>
            <CardTitle>Test Title</CardTitle>
            <CardDescription>Test Description</CardDescription>
          </CardHeader>
          <CardContent>Test Content</CardContent>
          <CardFooter>Test Footer</CardFooter>
        </Card>
      );

      expect(screen.getByText("Test Title")).toBeInTheDocument();
      expect(screen.getByText("Test Description")).toBeInTheDocument();
      expect(screen.getByText("Test Content")).toBeInTheDocument();
      expect(screen.getByText("Test Footer")).toBeInTheDocument();
    });
  });
});
