import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, act, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ThemeProvider } from "./ThemeContext";
import { useTheme } from "../hooks/useTheme";

// Test component that uses the theme context
const TestComponent = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div>
      <span data-testid="current-theme">{theme}</span>
      <button data-testid="toggle-theme" onClick={toggleTheme}>
        Toggle Theme
      </button>
    </div>
  );
};

// Test component for testing hook outside provider
const TestComponentWithoutProvider = () => {
  const { theme } = useTheme();
  return <div>{theme}</div>;
};

describe("ThemeContext", () => {
  let mockMatchMedia;
  let mockLocalStorage;
  let mockSetAttribute;

  beforeEach(() => {
    // Mock window.matchMedia
    mockMatchMedia = vi.fn();
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: mockMatchMedia,
    });

    // Mock localStorage
    mockLocalStorage = {
      getItem: vi.fn(),
      setItem: vi.fn(),
      removeItem: vi.fn(),
    };
    Object.defineProperty(window, "localStorage", {
      writable: true,
      value: mockLocalStorage,
    });

    // Mock document.documentElement.setAttribute
    mockSetAttribute = vi.fn();
    if (!document.documentElement) {
      Object.defineProperty(document, "documentElement", {
        writable: true,
        value: {},
      });
    }
    document.documentElement.setAttribute = mockSetAttribute;
  });

  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  describe("ThemeProvider", () => {
    it("defaults to dark theme when no saved theme and system prefers dark", () => {
      mockLocalStorage.getItem.mockReturnValue(null);
      mockMatchMedia.mockReturnValue({ matches: true });

      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      );

      expect(screen.getByTestId("current-theme")).toHaveTextContent("dark");
      expect(mockSetAttribute).toHaveBeenCalledWith("data-theme", "dark");
    });

    it("defaults to light theme when no saved theme and system prefers light", () => {
      mockLocalStorage.getItem.mockReturnValue(null);
      mockMatchMedia.mockReturnValue({ matches: false });

      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      );

      expect(screen.getByTestId("current-theme")).toHaveTextContent("light");
      expect(mockSetAttribute).toHaveBeenCalledWith("data-theme", "light");
    });

    it("uses saved theme from localStorage", () => {
      mockLocalStorage.getItem.mockReturnValue("light");
      mockMatchMedia.mockReturnValue({ matches: true }); // System prefers dark, but saved is light

      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      );

      expect(screen.getByTestId("current-theme")).toHaveTextContent("light");
      expect(mockSetAttribute).toHaveBeenCalledWith("data-theme", "light");
    });

    it("toggles from light to dark theme", async () => {
      const user = userEvent.setup();
      mockLocalStorage.getItem.mockReturnValue("light");
      mockMatchMedia.mockReturnValue({ matches: false });

      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      );

      expect(screen.getByTestId("current-theme")).toHaveTextContent("light");

      await act(async () => {
        await user.click(screen.getByTestId("toggle-theme"));
      });

      expect(screen.getByTestId("current-theme")).toHaveTextContent("dark");
      expect(mockLocalStorage.setItem).toHaveBeenCalledWith("theme", "dark");
      expect(mockSetAttribute).toHaveBeenCalledWith("data-theme", "dark");
    });

    it("toggles from dark to light theme", async () => {
      const user = userEvent.setup();
      mockLocalStorage.getItem.mockReturnValue("dark");
      mockMatchMedia.mockReturnValue({ matches: true });

      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      );

      expect(screen.getByTestId("current-theme")).toHaveTextContent("dark");

      await act(async () => {
        await user.click(screen.getByTestId("toggle-theme"));
      });

      expect(screen.getByTestId("current-theme")).toHaveTextContent("light");
      expect(mockLocalStorage.setItem).toHaveBeenCalledWith("theme", "light");
      expect(mockSetAttribute).toHaveBeenCalledWith("data-theme", "light");
    });
  });

  describe("useTheme hook", () => {
    it("throws error when used outside ThemeProvider", () => {
      // Capture console.error to prevent test output noise
      const consoleSpy = vi
        .spyOn(console, "error")
        .mockImplementation(() => {});

      expect(() => {
        render(<TestComponentWithoutProvider />);
      }).toThrow("useTheme must be used within a ThemeProvider");

      consoleSpy.mockRestore();
    });

    it("provides theme and toggleTheme function", () => {
      mockLocalStorage.getItem.mockReturnValue("light");
      mockMatchMedia.mockReturnValue({ matches: false });

      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      );

      expect(screen.getByTestId("current-theme")).toHaveTextContent("light");
      expect(screen.getByTestId("toggle-theme")).toBeInTheDocument();
    });
  });

  describe("localStorage integration", () => {
    it("calls localStorage.getItem on initialization", () => {
      mockLocalStorage.getItem.mockReturnValue("dark");
      mockMatchMedia.mockReturnValue({ matches: false });

      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      );

      expect(mockLocalStorage.getItem).toHaveBeenCalledWith("theme");
    });

    it("saves theme to localStorage when toggling", async () => {
      const user = userEvent.setup();
      mockLocalStorage.getItem.mockReturnValue("light");
      mockMatchMedia.mockReturnValue({ matches: false });

      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      );

      await act(async () => {
        await user.click(screen.getByTestId("toggle-theme"));
      });

      expect(mockLocalStorage.setItem).toHaveBeenCalledWith("theme", "dark");
    });
  });

  describe("DOM integration", () => {
    it("sets data-theme attribute on document element during initialization", () => {
      mockLocalStorage.getItem.mockReturnValue("light");
      mockMatchMedia.mockReturnValue({ matches: false });

      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      );

      expect(mockSetAttribute).toHaveBeenCalledWith("data-theme", "light");
    });

    it("updates data-theme attribute when toggling theme", async () => {
      const user = userEvent.setup();
      mockLocalStorage.getItem.mockReturnValue("light");
      mockMatchMedia.mockReturnValue({ matches: false });

      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      );

      // Clear initial calls
      vi.clearAllMocks();

      await act(async () => {
        await user.click(screen.getByTestId("toggle-theme"));
      });

      expect(mockSetAttribute).toHaveBeenCalledWith("data-theme", "dark");
    });
  });
});
