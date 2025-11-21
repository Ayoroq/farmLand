import {describe, it, expect} from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router';
import Navbar from '../components/Navbar.jsx';
import Sidebar from '../components/Sidebar.jsx';
import userEvent from '@testing-library/user-event';
import sidebarStyles from '../components/Navbar.module.css';

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


describe('Sidebar Component', () => {
  it('renders the Sidebar with the correct links', () => {
    render(
      <BrowserRouter>
        <Sidebar />
      </BrowserRouter>
    );
    const shopLinks = screen.getAllByText(/Shop/i);
    const aboutLinks = screen.getAllByText(/Who we are/i);
    const contactLinks = screen.getAllByText(/Find Us/i);
    expect(shopLinks[0]).toBeInTheDocument();
    expect(aboutLinks[0]).toBeInTheDocument();
    expect(contactLinks[0]).toBeInTheDocument();
  });
  it('renders the close button in Sidebar', () => {
    render(
      <BrowserRouter>
        <Sidebar />
      </BrowserRouter>
    );
    const closeButton = screen.getByRole('button', { name: /Close navigation menu/i });
    expect(closeButton).toBeInTheDocument();
  });
});

describe('Navbar and Sidebar Integration', () => {
  it('shows the Sidebar when the menu button is clicked', async () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );
    const user = userEvent.setup();
    const menuButton = screen.getByRole('button', { name: /Open navigation menu/i });
    
    // Sidebar should be hidden initially
    const sidebar = screen.getByRole('navigation', { name: /sidebar/i });
    expect(sidebar).not.toHaveClass(sidebarStyles.open);
    
    // Click menu button to open sidebar
    await user.click(menuButton);
    expect(sidebar).toHaveClass(sidebarStyles.open);
  });
    it('hides the Sidebar when the close button is clicked', async () => {
    render(
      <BrowserRouter>
        <Navbar />
        </BrowserRouter>
    );
    const user = userEvent.setup();
    const menuButton = screen.getByRole('button', { name: /Open navigation menu/i });
    // Open the sidebar first
    await user.click(menuButton);
    const sidebar = screen.getByRole('navigation', { name: /sidebar/i });
    expect(sidebar).toHaveClass(sidebarStyles.open);
    
    // Click close button to close sidebar
    const closeButton = screen.getByRole('button', { name: /Close navigation menu/i });
    await user.click(closeButton);
    expect(sidebar).not.toHaveClass(sidebarStyles.open);
  });
});