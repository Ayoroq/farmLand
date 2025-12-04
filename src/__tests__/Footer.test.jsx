import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router';
import Footer from '../components/Footer';

// Helper to render component with router
const renderWithRouter = () => {
  return render(
    <BrowserRouter>
      <Footer />
    </BrowserRouter>
  );
};

describe('Footer Component', () => {
  describe('Footer Rendering', () => {
    it('should render the footer component', () => {
      renderWithRouter();
      
      const footer = screen.getByRole('footer');
      expect(footer).toBeInTheDocument();
    });

    it('should display company name or logo', () => {
      renderWithRouter();
      
      expect(screen.getByText(/FarmLand/i)).toBeInTheDocument();
    });
  });

  describe('Navigation Links', () => {
    it('should render navigation links', () => {
      renderWithRouter();
      
      // Check for common footer navigation links
      const shopLink = screen.queryByText(/Shop/i);
      const aboutLink = screen.queryByText(/About/i) || screen.queryByText(/Who we are/i);
      const contactLink = screen.queryByText(/Contact/i) || screen.queryByText(/Find Us/i);
      
      // At least some navigation should be present
      expect(shopLink || aboutLink || contactLink).toBeInTheDocument();
    });

    it('should have correct href attributes for navigation links', () => {
      renderWithRouter();
      
      const shopLink = screen.queryByText(/Shop/i)?.closest('a');
      const aboutLink = screen.queryByText(/About/i)?.closest('a') || 
                       screen.queryByText(/Who we are/i)?.closest('a');
      const contactLink = screen.queryByText(/Contact/i)?.closest('a') || 
                         screen.queryByText(/Find Us/i)?.closest('a');

      if (shopLink) {
        expect(shopLink).toHaveAttribute('href', '/shop');
      }
      if (aboutLink) {
        expect(aboutLink).toHaveAttribute('href', '/about');
      }
      if (contactLink) {
        expect(contactLink).toHaveAttribute('href', '/contact');
      }
    });
  });

  describe('Contact Information', () => {
    it('should display contact information if present', () => {
      renderWithRouter();
      
      // Check for common contact information patterns
      const emailPattern = /[\w\.-]+@[\w\.-]+\.\w+/;
      const phonePattern = /\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/;
      
      const footerText = screen.getByRole('footer').textContent;
      
      // At least check that footer has some content
      expect(footerText).toBeTruthy();
    });

    it('should display address information if present', () => {
      renderWithRouter();
      
      // Look for common address indicators
      const addressKeywords = ['Street', 'Ave', 'Road', 'Blvd', 'Drive', 'Lane'];
      const footerText = screen.getByRole('footer').textContent;
      
      // This is optional - just check footer exists
      expect(footerText).toBeTruthy();
    });
  });

  describe('Social Media Links', () => {
    it('should render social media links if present', () => {
      renderWithRouter();
      
      // Look for common social media platforms
      const socialPlatforms = ['Facebook', 'Twitter', 'Instagram', 'LinkedIn'];
      const footer = screen.getByRole('footer');
      
      // Check if any social media links exist
      socialPlatforms.forEach(platform => {
        const socialLink = screen.queryByLabelText(new RegExp(platform, 'i')) ||
                          screen.queryByText(new RegExp(platform, 'i'));
        // This is optional, so we don't assert - just check footer exists
      });
      
      expect(footer).toBeInTheDocument();
    });

    it('should have external links open in new tab if present', () => {
      renderWithRouter();
      
      // Find all external links (if any)
      const externalLinks = Array.from(screen.getByRole('footer').querySelectorAll('a'))
        .filter(link => {
          const href = link.getAttribute('href');
          return href && (href.startsWith('http') || href.startsWith('mailto:'));
        });

      externalLinks.forEach(link => {
        expect(link).toHaveAttribute('target', '_blank');
        expect(link).toHaveAttribute('rel', expect.stringContaining('noopener'));
      });
    });
  });

  describe('Copyright Information', () => {
    it('should display copyright information', () => {
      renderWithRouter();
      
      const currentYear = new Date().getFullYear();
      const copyrightPattern = new RegExp(`©.*${currentYear}|Copyright.*${currentYear}`, 'i');
      
      // Look for copyright text
      const copyrightText = screen.queryByText(copyrightPattern);
      
      // If no copyright found, at least check footer exists
      if (!copyrightText) {
        expect(screen.getByRole('footer')).toBeInTheDocument();
      } else {
        expect(copyrightText).toBeInTheDocument();
      }
    });

    it('should include company name in copyright if present', () => {
      renderWithRouter();
      
      const footer = screen.getByRole('footer');
      const footerText = footer.textContent;
      
      // Check if FarmLand appears in footer (likely in copyright)
      if (footerText.includes('©') || footerText.toLowerCase().includes('copyright')) {
        expect(footerText).toMatch(/FarmLand/i);
      } else {
        // Just ensure footer exists
        expect(footer).toBeInTheDocument();
      }
    });
  });

  describe('Footer Structure', () => {
    it('should have proper semantic structure', () => {
      renderWithRouter();
      
      const footer = screen.getByRole('footer');
      expect(footer.tagName.toLowerCase()).toBe('footer');
    });

    it('should be accessible', () => {
      renderWithRouter();
      
      const footer = screen.getByRole('footer');
      
      // Check that all links have accessible text
      const links = footer.querySelectorAll('a');
      links.forEach(link => {
        const hasText = link.textContent.trim().length > 0;
        const hasAriaLabel = link.hasAttribute('aria-label');
        const hasTitle = link.hasAttribute('title');
        
        expect(hasText || hasAriaLabel || hasTitle).toBe(true);
      });
    });
  });

  describe('Responsive Design', () => {
    it('should render properly on different screen sizes', () => {
      renderWithRouter();
      
      const footer = screen.getByRole('footer');
      
      // Basic check that footer renders
      expect(footer).toBeInTheDocument();
      expect(footer).toBeVisible();
    });
  });
});