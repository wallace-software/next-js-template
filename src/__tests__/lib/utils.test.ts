import { cn } from "@/lib/utils";

describe("cn utility function", () => {
  it("merges class names", () => {
    const result = cn("btn", "btn-primary");
    expect(result).toBe("btn btn-primary");
  });

  it("handles conditional classes", () => {
    const isActive = true;
    const result = cn("btn", isActive && "active");
    expect(result).toBe("btn active");
  });

  it("filters out falsy values", () => {
    const result = cn("btn", false && "hidden", null, undefined, "visible");
    expect(result).toBe("btn visible");
  });

  it("merges Tailwind classes correctly", () => {
    // Later classes should override earlier ones for conflicting properties
    const result = cn("px-2 py-1", "px-4");
    expect(result).toContain("px-4");
    expect(result).toContain("py-1");
  });

  it("handles empty input", () => {
    const result = cn();
    expect(result).toBe("");
  });

  it("handles arrays of classes", () => {
    const result = cn(["btn", "btn-primary"], "text-white");
    expect(result).toContain("btn");
    expect(result).toContain("btn-primary");
    expect(result).toContain("text-white");
  });

  it("handles objects with boolean values", () => {
    const result = cn({
      btn: true,
      "btn-primary": true,
      hidden: false,
    });
    expect(result).toContain("btn");
    expect(result).toContain("btn-primary");
    expect(result).not.toContain("hidden");
  });
});
