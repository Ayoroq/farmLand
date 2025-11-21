import {describe, it, expect} from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router';
import Navbar from '../components/Navbar.jsx';

describe('Navbar Component', () => {
  it('renders the Navbar with the correct title', () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );
    const titleElement = screen.getByText(/FarmLand/i);
    expect(titleElement).toBeInTheDocument();
  });
  it('renders the Navbar with the correct links', () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );
    const shopLinks = screen.getAllByText(/Shop/i);
    const aboutLinks = screen.getAllByText(/Who we are/i);
    const contactLinks = screen.getAllByText(/Find Us/i);
    const BasketLinks = screen.getAllByText(/Basket/i);
    expect(BasketLinks[0]).toBeInTheDocument();
    expect(shopLinks[0]).toBeInTheDocument();
    expect(aboutLinks[0]).toBeInTheDocument();
    expect(contactLinks[0]).toBeInTheDocument();
  });
});

describe('Navbar Mobile Component', () => {
  beforeAll(() => {
    // Mock the window.innerWidth property to simulate a mobile device
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 500, // Set to a value less than or equal to 768px
    });
    // Dispatch a resize event to trigger any listeners
    window.dispatchEvent(new Event('resize'));
  });

  it('renders the Navbar with the correct title on mobile', () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );
    const titleElement = screen.getByText(/FarmLand/i);
    expect(titleElement).toBeInTheDocument();
  });

  it('renders the Navbar with the basket icon on mobile', () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );
    const basketIcon = screen.getByAltText(/shopping basket/i);
    expect(basketIcon).toBeInTheDocument();
  });

  it('renders the menu button on mobile', () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );
    const menuButton = screen.getByRole('button', { name: /Open navigation menu/i });
    expect(menuButton).toBeInTheDocument();
  });
});
