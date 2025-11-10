/// <reference types="@testing-library/jest-dom" />

declare namespace jest {
  interface Matchers<R> {
    toBeInTheDocument(): R;
    toHaveClass(...classNames: string[]): R;
    toBeDisabled(): R;
    toHaveAttribute(attr: string, value?: string): R;
  }
}
