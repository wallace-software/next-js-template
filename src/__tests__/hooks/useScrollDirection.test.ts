import { renderHook, act } from "@testing-library/react";
import { useScrollDirection } from "@/hooks/useScrollDirection";

describe("useScrollDirection Hook", () => {
  let scrollY = 0;

  beforeEach(() => {
    scrollY = 0;
    Object.defineProperty(window, "scrollY", {
      writable: true,
      configurable: true,
      value: scrollY,
    });
  });

  it("returns 'up' initially", () => {
    const { result } = renderHook(() => useScrollDirection());
    expect(result.current.dir).toBe("up");
  });

  it("returns 'down' when scrolling down", () => {
    const { result } = renderHook(() => useScrollDirection());

    act(() => {
      scrollY = 100;
      Object.defineProperty(window, "scrollY", {
        value: scrollY,
        writable: true,
      });
      window.dispatchEvent(new Event("scroll"));
    });

    expect(result.current.dir).toBe("down");
  });

  it("returns 'up' when scrolling up", () => {
    const { result } = renderHook(() => useScrollDirection());

    // Scroll down first
    act(() => {
      scrollY = 100;
      Object.defineProperty(window, "scrollY", {
        value: scrollY,
        writable: true,
      });
      window.dispatchEvent(new Event("scroll"));
    });

    // Then scroll up
    act(() => {
      scrollY = 50;
      Object.defineProperty(window, "scrollY", {
        value: scrollY,
        writable: true,
      });
      window.dispatchEvent(new Event("scroll"));
    });

    expect(result.current.dir).toBe("up");
  });

  it("respects the threshold parameter", () => {
    const threshold = 50;
    const { result } = renderHook(() => useScrollDirection({ threshold }));

    // Scroll less than threshold
    act(() => {
      scrollY = 30;
      Object.defineProperty(window, "scrollY", {
        value: scrollY,
        writable: true,
      });
      window.dispatchEvent(new Event("scroll"));
    });

    // Should still be 'up' because scroll is less than threshold
    expect(result.current.dir).toBe("up");

    // Scroll more than threshold
    act(() => {
      scrollY = 60;
      Object.defineProperty(window, "scrollY", {
        value: scrollY,
        writable: true,
      });
      window.dispatchEvent(new Event("scroll"));
    });

    expect(result.current.dir).toBe("down");
  });

  it("tracks atTop state", () => {
    const { result } = renderHook(() => useScrollDirection({ offset: 20 }));

    // Initially at top
    expect(result.current.atTop).toBe(true);

    // Scroll past offset
    act(() => {
      scrollY = 50;
      Object.defineProperty(window, "scrollY", {
        value: scrollY,
        writable: true,
      });
      window.dispatchEvent(new Event("scroll"));
    });

    expect(result.current.atTop).toBe(false);
  });
});
