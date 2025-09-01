import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Contact from './Contact';
import emailjs from '@emailjs/browser';

// Mock EmailJS
vi.mock('@emailjs/browser', () => ({
  default: {
    send: vi.fn()
  }
}));

// Mock ReCAPTCHA
vi.mock('react-google-recaptcha', () => ({
  default: vi.fn(({ onChange, onExpired, onErrored }) => (
    <div data-testid="mock-recaptcha">
      <button
        type="button"
        onClick={() => onChange && onChange('mock-captcha-token')}
        data-testid="captcha-complete"
      >
        Complete Captcha
      </button>
      <button
        type="button"
        onClick={() => onChange && onChange(null)}
        data-testid="captcha-expire"
      >
        Expire Captcha
      </button>
    </div>
  ))
}));

// Mock takInfoData
vi.mock('../../data/takInfoData', () => ({
  takInfoData: {
    epost: 'test@example.com',
    sted: 'Test Location',
    facebook: 'Test Facebook',
    facebookUrl: 'https://facebook.com/test',
    instagram: 'Test Instagram',
    instagramUrl: 'https://instagram.com/test'
  }
}));

// Mock UI components
vi.mock('../../ui/cards', () => ({
  InfoCard: ({ title, content, link, linkText }) => (
    <div data-testid={`info-card-${title.toLowerCase()}`}>
      <h3>{title}</h3>
      <p>{content}</p>
      {link && <a href={link}>{linkText}</a>}
    </div>
  )
}));

vi.mock('../../ui/buttons', () => ({
  ButtonHighlight: ({ children, disabled, type, ...props }) => (
    <button type={type} disabled={disabled} {...props}>
      {children}
    </button>
  )
}));

vi.mock('../../ui/sections', () => ({
  Section: ({ children, title, subtitle, id }) => (
    <section id={id}>
      <h2>{title}</h2>
      <p>{subtitle}</p>
      {children}
    </section>
  )
}));

describe('Contact', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    
    // Mock environment variables
    vi.stubGlobal('import.meta', {
      env: {
        VITE_EMAILJS_SERVICE_ID: 'test-service-id',
        VITE_EMAILJS_TEMPLATE_ID: 'test-template-id', 
        VITE_EMAILJS_PUBLIC_KEY: 'test-public-key',
        VITE_RECAPTCHA_SITE_KEY: 'test-recaptcha-key'
      }
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('Component Rendering', () => {
    it('renders contact section with correct title and subtitle', () => {
      render(<Contact />);
      
      expect(screen.getByText('Kontakt oss')).toBeInTheDocument();
      expect(screen.getByText(/Ta kontakt hvis du har spørsmål/)).toBeInTheDocument();
    });

    it('renders all info cards', () => {
      render(<Contact />);
      
      expect(screen.getByTestId('info-card-e-post')).toBeInTheDocument();
      expect(screen.getByTestId('info-card-sted')).toBeInTheDocument();
      expect(screen.getByTestId('info-card-facebook')).toBeInTheDocument();
      expect(screen.getByTestId('info-card-instagram')).toBeInTheDocument();
    });

    it('renders contact form with all required fields', () => {
      render(<Contact />);
      
      expect(screen.getByLabelText('Fornavn')).toBeInTheDocument();
      expect(screen.getByLabelText('Etternavn')).toBeInTheDocument();
      expect(screen.getByLabelText('E-post')).toBeInTheDocument();
      expect(screen.getByLabelText('Emne')).toBeInTheDocument();
      expect(screen.getByLabelText('Melding')).toBeInTheDocument();
    });

    it('renders reCAPTCHA component', () => {
      render(<Contact />);
      
      expect(screen.getByTestId('mock-recaptcha')).toBeInTheDocument();
    });

    it('renders submit button', () => {
      render(<Contact />);
      
      expect(screen.getByRole('button', { name: 'Send melding' })).toBeInTheDocument();
    });
  });

  describe('Form Interaction', () => {
    it('updates form data when inputs change', async () => {
      const user = userEvent.setup();
      render(<Contact />);
      
      const firstNameInput = screen.getByLabelText('Fornavn');
      const lastNameInput = screen.getByLabelText('Etternavn');
      const emailInput = screen.getByLabelText('E-post');
      
      await user.type(firstNameInput, 'John');
      await user.type(lastNameInput, 'Doe');
      await user.type(emailInput, 'john@example.com');
      
      expect(firstNameInput.value).toBe('John');
      expect(lastNameInput.value).toBe('Doe');
      expect(emailInput.value).toBe('john@example.com');
    });

    it('updates message field when typing', async () => {
      const user = userEvent.setup();
      render(<Contact />);
      
      const messageInput = screen.getByLabelText('Melding');
      await user.type(messageInput, 'This is a test message');
      
      expect(messageInput.value).toBe('This is a test message');
    });

    it('updates subject field when typing', async () => {
      const user = userEvent.setup();
      render(<Contact />);
      
      const subjectInput = screen.getByLabelText('Emne');
      await user.type(subjectInput, 'Test Subject');
      
      expect(subjectInput.value).toBe('Test Subject');
    });
  });

  describe('Form Validation', () => {
    it('all form fields are marked as required', () => {
      render(<Contact />);
      
      expect(screen.getByLabelText('Fornavn')).toHaveAttribute('required');
      expect(screen.getByLabelText('Etternavn')).toHaveAttribute('required');
      expect(screen.getByLabelText('E-post')).toHaveAttribute('required');
      expect(screen.getByLabelText('Emne')).toHaveAttribute('required');
      expect(screen.getByLabelText('Melding')).toHaveAttribute('required');
    });

    it('email field has correct type', () => {
      render(<Contact />);
      
      expect(screen.getByLabelText('E-post')).toHaveAttribute('type', 'email');
    });

    it('submit button is disabled when captcha is not completed', () => {
      render(<Contact />);
      
      const submitButton = screen.getByRole('button', { name: 'Send melding' });
      expect(submitButton).toBeDisabled();
    });

    it('submit button is enabled when captcha is completed', async () => {
      const user = userEvent.setup();
      render(<Contact />);
      
      const captchaButton = screen.getByTestId('captcha-complete');
      await user.click(captchaButton);
      
      const submitButton = screen.getByRole('button', { name: 'Send melding' });
      expect(submitButton).not.toBeDisabled();
    });

    it('shows captcha error when form is submitted without captcha', async () => {
      const user = userEvent.setup();
      render(<Contact />);
      
      // Fill form without completing captcha
      await user.type(screen.getByLabelText('Fornavn'), 'John');
      await user.type(screen.getByLabelText('Etternavn'), 'Doe');
      await user.type(screen.getByLabelText('E-post'), 'john@example.com');
      await user.type(screen.getByLabelText('Emne'), 'Test');
      await user.type(screen.getByLabelText('Melding'), 'Test message');
      
      // Try to submit
      fireEvent.submit(screen.getByRole('button', { name: 'Send melding' }).closest('form'));
      
      await waitFor(() => {
        expect(screen.getByText(/Vennligst bekreft at du ikke er en robot/)).toBeInTheDocument();
      });
    });
  });

  describe('reCAPTCHA Integration', () => {
    it('handles captcha completion', async () => {
      const user = userEvent.setup();
      render(<Contact />);
      
      const submitButton = screen.getByRole('button', { name: 'Send melding' });
      expect(submitButton).toBeDisabled();
      
      // Complete captcha
      const captchaButton = screen.getByTestId('captcha-complete');
      await user.click(captchaButton);
      
      expect(submitButton).not.toBeDisabled();
    });

    it('handles captcha expiration', async () => {
      const user = userEvent.setup();
      render(<Contact />);
      
      // Complete captcha first
      const captchaCompleteButton = screen.getByTestId('captcha-complete');
      await user.click(captchaCompleteButton);
      
      let submitButton = screen.getByRole('button', { name: 'Send melding' });
      expect(submitButton).not.toBeDisabled();
      
      // Expire captcha
      const captchaExpireButton = screen.getByTestId('captcha-expire');
      await user.click(captchaExpireButton);
      
      submitButton = screen.getByRole('button', { name: 'Send melding' });
      expect(submitButton).toBeDisabled();
    });
  });

  describe('Form Submission', () => {
    it('shows loading state during submission', async () => {
      const user = userEvent.setup();
      emailjs.send.mockImplementation(() => new Promise(resolve => setTimeout(resolve, 100)));
      
      render(<Contact />);
      
      // Fill form and complete captcha
      await user.type(screen.getByLabelText('Fornavn'), 'John');
      await user.type(screen.getByLabelText('Etternavn'), 'Doe');
      await user.type(screen.getByLabelText('E-post'), 'john@example.com');
      await user.type(screen.getByLabelText('Emne'), 'Test');
      await user.type(screen.getByLabelText('Melding'), 'Test message');
      await user.click(screen.getByTestId('captcha-complete'));
      
      // Submit form
      await user.click(screen.getByRole('button', { name: 'Send melding' }));
      
      expect(screen.getByRole('button', { name: 'Sender...' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Sender...' })).toBeDisabled();
    });

    it('calls emailjs.send with form data', async () => {
      const user = userEvent.setup();
      emailjs.send.mockResolvedValue({ status: 200 });
      
      render(<Contact />);
      
      // Fill form
      await user.type(screen.getByLabelText('Fornavn'), 'John');
      await user.type(screen.getByLabelText('Etternavn'), 'Doe');
      await user.type(screen.getByLabelText('E-post'), 'john@example.com');
      await user.type(screen.getByLabelText('Emne'), 'Test Subject');
      await user.type(screen.getByLabelText('Melding'), 'Test message');
      await user.click(screen.getByTestId('captcha-complete'));
      
      // Submit form
      await user.click(screen.getByRole('button', { name: 'Send melding' }));
      
      await waitFor(() => {
        expect(emailjs.send).toHaveBeenCalledTimes(1);
        const [serviceId, templateId, templateParams, publicKey] = emailjs.send.mock.calls[0];
        
        // Verify the form data is correctly passed
        expect(templateParams).toEqual({
          from_name: 'John Doe',
          from_email: 'john@example.com',
          subject: 'Test Subject',
          message: 'Test message',
          to_name: 'Trondheim Atletklubb',
          reply_to: 'john@example.com'
        });
        
        // Verify that environment variables are used (even if we can't mock them)
        expect(serviceId).toBeTruthy();
        expect(templateId).toBeTruthy();
        expect(publicKey).toBeTruthy();
      });
    });

    it('shows success message and clears form on successful submission', async () => {
      const user = userEvent.setup();
      emailjs.send.mockResolvedValue({ status: 200 });
      
      render(<Contact />);
      
      // Fill form
      await user.type(screen.getByLabelText('Fornavn'), 'John');
      await user.type(screen.getByLabelText('Etternavn'), 'Doe');
      await user.type(screen.getByLabelText('E-post'), 'john@example.com');
      await user.type(screen.getByLabelText('Emne'), 'Test Subject');
      await user.type(screen.getByLabelText('Melding'), 'Test message');
      await user.click(screen.getByTestId('captcha-complete'));
      
      // Submit form
      await user.click(screen.getByRole('button', { name: 'Send melding' }));
      
      await waitFor(() => {
        expect(screen.getByText(/Takk for din melding! Vi kommer tilbake til deg snart./)).toBeInTheDocument();
      });
      
      // Form should be cleared
      expect(screen.getByLabelText('Fornavn').value).toBe('');
      expect(screen.getByLabelText('Etternavn').value).toBe('');
      expect(screen.getByLabelText('E-post').value).toBe('');
      expect(screen.getByLabelText('Emne').value).toBe('');
      expect(screen.getByLabelText('Melding').value).toBe('');
    });

    it('shows error message on submission failure', async () => {
      const user = userEvent.setup();
      emailjs.send.mockRejectedValue(new Error('Network error'));
      
      // Mock console.error to avoid noise in test output
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      
      render(<Contact />);
      
      // Fill form
      await user.type(screen.getByLabelText('Fornavn'), 'John');
      await user.type(screen.getByLabelText('Etternavn'), 'Doe');
      await user.type(screen.getByLabelText('E-post'), 'john@example.com');
      await user.type(screen.getByLabelText('Emne'), 'Test Subject');
      await user.type(screen.getByLabelText('Melding'), 'Test message');
      await user.click(screen.getByTestId('captcha-complete'));
      
      // Submit form
      await user.click(screen.getByRole('button', { name: 'Send melding' }));
      
      await waitFor(() => {
        expect(screen.getByText(/Noe gikk galt. Vennligst prøv igjen/)).toBeInTheDocument();
      });
      
      consoleSpy.mockRestore();
    });
  });

  describe('Accessibility', () => {
    it('has proper form labels', () => {
      render(<Contact />);
      
      expect(screen.getByLabelText('Fornavn')).toBeInTheDocument();
      expect(screen.getByLabelText('Etternavn')).toBeInTheDocument();
      expect(screen.getByLabelText('E-post')).toBeInTheDocument();
      expect(screen.getByLabelText('Emne')).toBeInTheDocument();
      expect(screen.getByLabelText('Melding')).toBeInTheDocument();
    });

    it('textarea has placeholder text', () => {
      render(<Contact />);
      
      expect(screen.getByPlaceholderText('Skriv din melding...')).toBeInTheDocument();
    });

    it('submit button has correct type', () => {
      render(<Contact />);
      
      expect(screen.getByRole('button', { name: 'Send melding' })).toHaveAttribute('type', 'submit');
    });
  });
});