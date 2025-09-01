import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Modal from "./Modal";

describe("Modal", () => {
  const mockOnClose = vi.fn();
  const defaultProps = {
    isOpen: true,
    onClose: mockOnClose,
    title: "Test Modal",
    children: <p>Test content</p>,
  };

  beforeEach(() => {
    vi.clearAllMocks();

    // Mock document.body.style
    Object.defineProperty(document.body.style, "overflow", {
      value: "",
      writable: true,
      configurable: true,
    });
  });

  afterEach(() => {
    document.body.style.overflow = "unset";
  });

  describe("Rendering", () => {
    it("renders nothing when isOpen is false", () => {
      render(
        <Modal {...defaultProps} isOpen={false}>
          <p>Should not render</p>
        </Modal>
      );

      expect(screen.queryByText("Test Modal")).not.toBeInTheDocument();
      expect(screen.queryByText("Should not render")).not.toBeInTheDocument();
    });

    it("renders modal when isOpen is true", () => {
      render(<Modal {...defaultProps} />);

      expect(screen.getByText("Test Modal")).toBeInTheDocument();
      expect(screen.getByText("Test content")).toBeInTheDocument();
    });

    it("renders modal with correct title", () => {
      render(<Modal {...defaultProps} title="Custom Title" />);

      expect(screen.getByText("Custom Title")).toBeInTheDocument();
    });

    it("renders modal with children content", () => {
      render(
        <Modal {...defaultProps}>
          <div>
            <h3>Child Heading</h3>
            <p>Child paragraph</p>
          </div>
        </Modal>
      );

      expect(screen.getByText("Child Heading")).toBeInTheDocument();
      expect(screen.getByText("Child paragraph")).toBeInTheDocument();
    });

    it("renders close button with correct aria-label", () => {
      render(<Modal {...defaultProps} />);

      const closeButton = screen.getByLabelText("Lukk modal");
      expect(closeButton).toBeInTheDocument();
      expect(closeButton).toHaveAttribute("aria-label", "Lukk modal");
    });
  });

  describe("Size Variants", () => {
    it("applies medium size by default", () => {
      const { container } = render(<Modal {...defaultProps} />);

      // Look specifically for the modal container (not overlay)
      const modalElement = container.querySelector(
        '[class*="modal"]:not([class*="modal-overlay"]):not([class*="modal__"])'
      );
      expect(modalElement).toBeInTheDocument();
      expect(modalElement.className).toMatch(/modal--medium/);
    });

    it("applies small size when specified", () => {
      const { container } = render(<Modal {...defaultProps} size="small" />);

      const modalElement = container.querySelector(
        '[class*="modal"]:not([class*="modal-overlay"]):not([class*="modal__"])'
      );
      expect(modalElement).toBeInTheDocument();
      expect(modalElement.className).toMatch(/modal--small/);
    });

    it("applies large size when specified", () => {
      const { container } = render(<Modal {...defaultProps} size="large" />);

      const modalElement = container.querySelector(
        '[class*="modal"]:not([class*="modal-overlay"]):not([class*="modal__"])'
      );
      expect(modalElement).toBeInTheDocument();
      expect(modalElement.className).toMatch(/modal--large/);
    });
  });

  describe("CSS Classes", () => {
    it("has correct CSS classes on modal overlay", () => {
      const { container } = render(<Modal {...defaultProps} />);

      const overlay = container.querySelector('[class*="modal-overlay"]');
      expect(overlay).toBeInTheDocument();
      expect(overlay.className).toMatch(/modal-overlay/);
    });

    it("has correct CSS classes on modal container", () => {
      const { container } = render(<Modal {...defaultProps} />);

      const modal = container.querySelector(
        '[class*="modal"]:not([class*="modal-overlay"])'
      );
      expect(modal).toBeInTheDocument();
      expect(modal.className).toMatch(/modal/);
    });

    it("has correct CSS classes on modal header", () => {
      const { container } = render(<Modal {...defaultProps} />);

      const header = container.querySelector('[class*="modal__header"]');
      expect(header).toBeInTheDocument();
      expect(header.className).toMatch(/modal__header/);
    });

    it("has correct CSS classes on modal title", () => {
      const { container } = render(<Modal {...defaultProps} />);

      const title = container.querySelector('[class*="modal__title"]');
      expect(title).toBeInTheDocument();
      expect(title.className).toMatch(/modal__title/);
    });

    it("has correct CSS classes on close button", () => {
      const { container } = render(<Modal {...defaultProps} />);

      const closeButton = container.querySelector('[class*="modal__close"]');
      expect(closeButton).toBeInTheDocument();
      expect(closeButton.className).toMatch(/modal__close/);
    });

    it("has correct CSS classes on modal content", () => {
      const { container } = render(<Modal {...defaultProps} />);

      const content = container.querySelector('[class*="modal__content"]');
      expect(content).toBeInTheDocument();
      expect(content.className).toMatch(/modal__content/);
    });
  });

  describe("Interaction", () => {
    it("calls onClose when close button is clicked", async () => {
      const user = userEvent.setup();
      render(<Modal {...defaultProps} />);

      const closeButton = screen.getByLabelText("Lukk modal");
      await user.click(closeButton);

      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

    it("calls onClose when backdrop is clicked", () => {
      const { container } = render(<Modal {...defaultProps} />);

      const overlay = container.querySelector('[class*="modal-overlay"]');
      fireEvent.click(overlay);

      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

    it("does not call onClose when modal content is clicked", () => {
      const { container } = render(<Modal {...defaultProps} />);

      const modal = container.querySelector(
        '[class*="modal"]:not([class*="modal-overlay"])'
      );
      fireEvent.click(modal);

      expect(mockOnClose).not.toHaveBeenCalled();
    });

    it("calls onClose when Escape key is pressed", () => {
      render(<Modal {...defaultProps} />);

      fireEvent.keyDown(document, { key: "Escape", code: "Escape" });

      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

    it("does not call onClose when other keys are pressed", () => {
      render(<Modal {...defaultProps} />);

      fireEvent.keyDown(document, { key: "Enter", code: "Enter" });
      fireEvent.keyDown(document, { key: "Space", code: "Space" });
      fireEvent.keyDown(document, { key: "Tab", code: "Tab" });

      expect(mockOnClose).not.toHaveBeenCalled();
    });
  });

  describe("Body Overflow Management", () => {
    it("sets body overflow to hidden when modal opens", () => {
      render(<Modal {...defaultProps} isOpen={true} />);

      expect(document.body.style.overflow).toBe("hidden");
    });

    it("does not set body overflow when modal is closed", () => {
      render(<Modal {...defaultProps} isOpen={false} />);

      expect(document.body.style.overflow).toBe("");
    });

    it("resets body overflow when modal unmounts", () => {
      const { unmount } = render(<Modal {...defaultProps} isOpen={true} />);

      expect(document.body.style.overflow).toBe("hidden");

      unmount();

      expect(document.body.style.overflow).toBe("unset");
    });

    it("resets body overflow when isOpen changes from true to false", () => {
      const { rerender } = render(<Modal {...defaultProps} isOpen={true} />);

      expect(document.body.style.overflow).toBe("hidden");

      rerender(<Modal {...defaultProps} isOpen={false} />);

      expect(document.body.style.overflow).toBe("unset");
    });
  });

  describe("Event Listeners", () => {
    it("adds keydown event listener when modal opens", () => {
      const addEventListenerSpy = vi.spyOn(document, "addEventListener");

      render(<Modal {...defaultProps} isOpen={true} />);

      expect(addEventListenerSpy).toHaveBeenCalledWith(
        "keydown",
        expect.any(Function)
      );

      addEventListenerSpy.mockRestore();
    });

    it("does not add keydown event listener when modal is closed", () => {
      const addEventListenerSpy = vi.spyOn(document, "addEventListener");

      render(<Modal {...defaultProps} isOpen={false} />);

      expect(addEventListenerSpy).not.toHaveBeenCalled();

      addEventListenerSpy.mockRestore();
    });

    it("removes keydown event listener when modal unmounts", () => {
      const removeEventListenerSpy = vi.spyOn(document, "removeEventListener");

      const { unmount } = render(<Modal {...defaultProps} isOpen={true} />);

      unmount();

      expect(removeEventListenerSpy).toHaveBeenCalledWith(
        "keydown",
        expect.any(Function)
      );

      removeEventListenerSpy.mockRestore();
    });

    it("removes keydown event listener when isOpen changes from true to false", () => {
      const removeEventListenerSpy = vi.spyOn(document, "removeEventListener");

      const { rerender } = render(<Modal {...defaultProps} isOpen={true} />);

      rerender(<Modal {...defaultProps} isOpen={false} />);

      expect(removeEventListenerSpy).toHaveBeenCalledWith(
        "keydown",
        expect.any(Function)
      );

      removeEventListenerSpy.mockRestore();
    });
  });

  describe("Props Changes", () => {
    it("updates title when title prop changes", () => {
      const { rerender } = render(
        <Modal {...defaultProps} title="Original Title" />
      );

      expect(screen.getByText("Original Title")).toBeInTheDocument();

      rerender(<Modal {...defaultProps} title="Updated Title" />);

      expect(screen.getByText("Updated Title")).toBeInTheDocument();
      expect(screen.queryByText("Original Title")).not.toBeInTheDocument();
    });

    it("updates content when children prop changes", () => {
      const { rerender } = render(
        <Modal {...defaultProps}>
          <p>Original content</p>
        </Modal>
      );

      expect(screen.getByText("Original content")).toBeInTheDocument();

      rerender(
        <Modal {...defaultProps}>
          <p>Updated content</p>
        </Modal>
      );

      expect(screen.getByText("Updated content")).toBeInTheDocument();
      expect(screen.queryByText("Original content")).not.toBeInTheDocument();
    });

    it("updates onClose callback when prop changes", async () => {
      const user = userEvent.setup();
      const newOnClose = vi.fn();

      const { rerender } = render(<Modal {...defaultProps} />);

      rerender(<Modal {...defaultProps} onClose={newOnClose} />);

      const closeButton = screen.getByLabelText("Lukk modal");
      await user.click(closeButton);

      expect(mockOnClose).not.toHaveBeenCalled();
      expect(newOnClose).toHaveBeenCalledTimes(1);
    });
  });

  describe("Accessibility", () => {
    it("has proper semantic structure with heading", () => {
      render(<Modal {...defaultProps} />);

      const title = screen.getByRole("heading", { level: 2 });
      expect(title).toBeInTheDocument();
      expect(title).toHaveTextContent("Test Modal");
    });

    it("close button is keyboard accessible", () => {
      render(<Modal {...defaultProps} />);

      const closeButton = screen.getByLabelText("Lukk modal");
      expect(closeButton).toBeInTheDocument();

      // Check that it's a button element (inherently keyboard accessible)
      expect(closeButton.tagName).toBe("BUTTON");
    });

    it("modal content is accessible to screen readers", () => {
      render(
        <Modal {...defaultProps}>
          <div>
            <p>Accessible content</p>
            <button>Action button</button>
          </div>
        </Modal>
      );

      expect(screen.getByText("Accessible content")).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: "Action button" })
      ).toBeInTheDocument();
    });
  });
});
