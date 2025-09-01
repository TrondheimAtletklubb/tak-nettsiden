import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Navigation from "./Navigation";

// Mock the navigation data
vi.mock("../../data/navigation", () => ({
  navigationItems: [
    { id: 1, label: "Kontakt", href: "#kontakt" },
    { id: 2, label: "Sted", href: "#sted" },
    { id: 3, label: "Bli med", href: "#priser" },
  ],
}));

describe("Navigation", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("Desktop Navigation", () => {
    it("renders all navigation items", () => {
      render(<Navigation />);

      // Check desktop navigation items
      expect(screen.getAllByText("Kontakt")).toHaveLength(2); // Desktop + mobile
      expect(screen.getAllByText("Sted")).toHaveLength(2);
      expect(screen.getAllByText("Bli med")).toHaveLength(2);
    });

    it("renders correct navigation links", () => {
      render(<Navigation />);

      // Get all links (desktop + mobile)
      const kontaktLinks = screen.getAllByRole("link", { name: "Kontakt" });
      const stedLinks = screen.getAllByRole("link", { name: "Sted" });
      const bliMedLinks = screen.getAllByRole("link", { name: "Bli med" });

      // Check href attributes
      kontaktLinks.forEach((link) => {
        expect(link).toHaveAttribute("href", "#kontakt");
      });
      stedLinks.forEach((link) => {
        expect(link).toHaveAttribute("href", "#sted");
      });
      bliMedLinks.forEach((link) => {
        expect(link).toHaveAttribute("href", "#priser");
      });
    });

    it("sets active item when navigation link is clicked", async () => {
      const user = userEvent.setup();
      render(<Navigation />);

      // Get the first desktop navigation link
      const kontaktLink = screen.getAllByRole("link", { name: "Kontakt" })[0];

      // Click the link
      await user.click(kontaktLink);

      // Check if the link has active class
      expect(kontaktLink.className).toContain("navigation__link--active");
    });

    it("only one item can be active at a time", async () => {
      const user = userEvent.setup();
      render(<Navigation />);

      const kontaktLink = screen.getAllByRole("link", { name: "Kontakt" })[0];
      const stedLink = screen.getAllByRole("link", { name: "Sted" })[0];

      // Click first link
      await user.click(kontaktLink);
      expect(kontaktLink.className).toContain("navigation__link--active");

      // Click second link
      await user.click(stedLink);
      expect(stedLink.className).toContain("navigation__link--active");
      expect(kontaktLink.className).not.toContain("navigation__link--active");
    });
  });

  describe("Mobile Navigation", () => {
    it("renders mobile burger button", () => {
      render(<Navigation />);

      const burgerButton = screen.getByLabelText("Toggle navigation menu");
      expect(burgerButton).toBeInTheDocument();
      expect(burgerButton).toHaveAttribute(
        "aria-label",
        "Toggle navigation menu"
      );
    });

    it("mobile menu is closed by default", () => {
      render(<Navigation />);

      const burgerButton = screen.getByLabelText("Toggle navigation menu");
      expect(burgerButton).toHaveAttribute("aria-expanded", "false");
    });

    it("shows hamburger icon when menu is closed", () => {
      render(<Navigation />);

      // The HiMenu icon should be visible (burger)
      const burgerButton = screen.getByLabelText("Toggle navigation menu");
      expect(burgerButton).toBeInTheDocument();
    });

    it("toggles mobile menu when burger button is clicked", async () => {
      const user = userEvent.setup();
      render(<Navigation />);

      const burgerButton = screen.getByLabelText("Toggle navigation menu");

      // Initially closed
      expect(burgerButton).toHaveAttribute("aria-expanded", "false");

      // Click to open
      await user.click(burgerButton);
      expect(burgerButton).toHaveAttribute("aria-expanded", "true");

      // Click to close
      await user.click(burgerButton);
      expect(burgerButton).toHaveAttribute("aria-expanded", "false");
    });

    it("closes mobile menu when navigation item is clicked", async () => {
      const user = userEvent.setup();
      render(<Navigation />);

      const burgerButton = screen.getByLabelText("Toggle navigation menu");

      // Open mobile menu
      await user.click(burgerButton);
      expect(burgerButton).toHaveAttribute("aria-expanded", "true");

      // Click a mobile navigation link (second occurrence is mobile)
      const mobileKontaktLink = screen.getAllByRole("link", {
        name: "Kontakt",
      })[1];
      await user.click(mobileKontaktLink);

      // Menu should close
      expect(burgerButton).toHaveAttribute("aria-expanded", "false");
    });

    it("sets active item when mobile navigation link is clicked", async () => {
      const user = userEvent.setup();
      render(<Navigation />);

      const burgerButton = screen.getByLabelText("Toggle navigation menu");

      // Open mobile menu
      await user.click(burgerButton);

      // Click mobile navigation link
      const mobileKontaktLink = screen.getAllByRole("link", {
        name: "Kontakt",
      })[1];
      await user.click(mobileKontaktLink);

      // Both desktop and mobile links should be active
      const allKontaktLinks = screen.getAllByRole("link", { name: "Kontakt" });
      allKontaktLinks.forEach((link) => {
        expect(link.className).toContain("navigation__link--active");
      });
    });
  });

  describe("CSS Classes", () => {
    it("has correct CSS classes on navigation container", () => {
      render(<Navigation />);

      const nav = screen.getByRole("navigation");
      expect(nav.className).toContain("navigation");
    });

    it("has correct CSS classes on desktop menu", () => {
      render(<Navigation />);

      const nav = screen.getByRole("navigation");
      const desktopMenu = nav.querySelector("ul");

      expect(desktopMenu.className).toContain("navigation__menu");
      expect(desktopMenu.className).toContain("navigation__menu--desktop");
    });

    it("has correct CSS classes on mobile menu", () => {
      render(<Navigation />);

      const nav = screen.getByRole("navigation");
      const mobileMenu = nav.querySelectorAll("ul")[1]; // Second ul is mobile menu

      expect(mobileMenu.className).toContain("navigation__menu");
      expect(mobileMenu.className).toContain("navigation__menu--mobile");
    });

    it("adds open class to mobile menu when opened", async () => {
      const user = userEvent.setup();
      render(<Navigation />);

      const burgerButton = screen.getByLabelText("Toggle navigation menu");
      const nav = screen.getByRole("navigation");
      const mobileMenu = nav.querySelectorAll("ul")[1];

      // Initially no open class
      expect(mobileMenu.className).not.toContain("navigation__menu--open");

      // Click to open
      await user.click(burgerButton);
      expect(mobileMenu.className).toContain("navigation__menu--open");
    });

    it("has correct CSS class on burger button", () => {
      render(<Navigation />);

      const burgerButton = screen.getByLabelText("Toggle navigation menu");
      expect(burgerButton.className).toContain("navigation__burger");
    });
  });

  describe("Accessibility", () => {
    it("burger button has proper aria attributes", () => {
      render(<Navigation />);

      const burgerButton = screen.getByLabelText("Toggle navigation menu");
      expect(burgerButton).toHaveAttribute(
        "aria-label",
        "Toggle navigation menu"
      );
      expect(burgerButton).toHaveAttribute("aria-expanded", "false");
    });

    it("updates aria-expanded when menu state changes", async () => {
      const user = userEvent.setup();
      render(<Navigation />);

      const burgerButton = screen.getByLabelText("Toggle navigation menu");

      // Initially false
      expect(burgerButton).toHaveAttribute("aria-expanded", "false");

      // Open menu
      await user.click(burgerButton);
      expect(burgerButton).toHaveAttribute("aria-expanded", "true");

      // Close menu
      await user.click(burgerButton);
      expect(burgerButton).toHaveAttribute("aria-expanded", "false");
    });

    it("navigation links are properly focusable", () => {
      render(<Navigation />);

      const allLinks = screen.getAllByRole("link");
      allLinks.forEach((link) => {
        expect(link).toHaveAttribute("href");
        expect(link.getAttribute("href")).toMatch(/^#/); // Anchor links
      });
    });
  });
});
