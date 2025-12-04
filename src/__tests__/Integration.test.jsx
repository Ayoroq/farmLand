import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router';
import userEvent from '@testing-library/user-event';
import Shop from '../pages/Shop/Shop';
import ProductDetail from '../pages/Shop/ProductDetails';
import Basket from '../pages/Basket/Basket';
import BasketProvider from '../context/BasketContext';
import { BasketContext } from '../context/BasketContext';
import { useNavigate } from 'react-router';

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(() => null),
  setItem: vi.fn(),
  clear: vi.fn(),
};
global.localStorage = localStorageMock;

const mockNavigate = vi.fn();

vi.mock('react-router', async () => {
  const actual = await vi.importActual('react-router');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

// Mock products data
vi.mock('../data/products', () => ({
  products: [
    {
      id: 1,
      name: 'Tomatoes',
      slug: 'tomatoes',
      price: 4.99,
      category: 'vegetables',
      image: '/images/tomatoes.jpg',
      description: 'Fresh organic tomatoes',
      details: 'Our vine-ripened organic tomatoes are grown without pesticides.',
    },
    {
      id: 2,
      name: 'Apples',
      slug: 'apples',
      price: 5.99,
      category: 'fruits',
      image: '/images/apples.jpg',
      description: 'Crisp organic apples',
      details: 'Hand-picked organic apples from our local orchard.',
    },
    {
      id: 3,
      name: 'Spinach',
      slug: 'spinach',
      price: 3.99,
      category: 'vegetables',
      image: '/images/spinach.jpg',
      description: 'Nutrient-rich spinach',
      details: 'Fresh organic spinach leaves packed with nutrients.',
    }
  ]
}));

// Test App with routes
const TestApp = ({ initialEntries = ['/shop'] }) => (
  <MemoryRouter initialEntries={initialEntries}>
    <BasketProvider>
      <Routes>
        <Route path="/shop" element={<Shop />} />
        <Route path="/shop/:slug" element={<ProductDetail />} />
        <Route path="/basket" element={<Basket />} />
      </Routes>
    </BasketProvider>
  </MemoryRouter>
);

describe('Integration Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorageMock.getItem.mockReturnValue(null);
  });

  describe('Complete Shopping Flow', () => {
    it('should display products on shop page', async () => {
      render(<TestApp initialEntries={['/shop']} />);
      
      // Verify products are displayed
      expect(screen.getByText('Tomatoes')).toBeInTheDocument();
      expect(screen.getByText('Apples')).toBeInTheDocument();
      expect(screen.getByText('Spinach')).toBeInTheDocument();
    });

    it('should navigate to product details when clicking product card', async () => {
      const user = userEvent.setup();
      
      render(<TestApp initialEntries={['/shop']} />);
      
      // Click on tomatoes product card (uses navigate())
      const cards = screen.getAllByTestId('shopCard');
      const tomatoCard = cards.find(card => card.textContent.includes('Tomatoes'));
      await user.click(tomatoCard);
      
      // Verify navigation to product details
      expect(mockNavigate).toHaveBeenCalledWith('/shop/tomatoes');

    });

    it('should add item to cart from product details', async () => {
      const user = userEvent.setup();
      
      render(<TestApp initialEntries={['/shop/tomatoes']} />);
      
      // Add product to cart
      const addToCartButton = screen.getByText('Add to Cart');
      await user.click(addToCartButton);
      
      // Use Buy Now to navigate to basket
      const buyNowButton = screen.getByText('Buy Now');
      await user.click(buyNowButton);
      
      // Verify item is in basket
      await waitFor(() => {
        expect(screen.getByText('Tomatoes')).toBeInTheDocument();
        expect(screen.getByDisplayValue('1')).toBeInTheDocument();
      });
    });
  });

  describe('Search and Filter Workflow', () => {
    it('should filter products by search', async () => {
      const user = userEvent.setup();
      
      render(<TestApp initialEntries={['/shop']} />);
      
      // Search for tomatoes
      const searchInput = screen.getByPlaceholderText('Search Here');
      await user.type(searchInput, 'tomato');
      
      await waitFor(() => {
        expect(screen.getByText('Tomatoes')).toBeInTheDocument();
        expect(screen.queryByText('Apples')).not.toBeInTheDocument();
      });
    });

    it('should filter products by category', async () => {
      const user = userEvent.setup();
      
      render(<TestApp initialEntries={['/shop']} />);
      
      // Apply filter
      const filterButton = screen.getByRole('button', { name: /filter/i });
      await user.click(filterButton);
      
      const fruitsFilter = screen.getByText('Fruits');
      await user.click(fruitsFilter);
      
      await waitFor(() => {
        expect(screen.getByText('Apples')).toBeInTheDocument();
        expect(screen.queryByText('Tomatoes')).not.toBeInTheDocument();
      });
    });
  });

  describe('Cart Management', () => {
    it('should add items to cart from shop page', async () => {
      const user = userEvent.setup();
      
      render(<TestApp initialEntries={['/shop']} />);
      
      // Add item to cart
      const addButton = screen.getAllByRole('toggleBasket')[0];
      await user.click(addButton);
      
      // Verify button text changes (indicating item was added)
      await waitFor(() => {
        expect(screen.getByTestId('in-cart')).toBeInTheDocument();
      });
    });

    it('should display cart items correctly on basket page', async () => {
      // Create basket with items
      const TestBasketWithItems = () => {
        const mockBasketWithItems = {
          basket: [
            { id: 1, name: 'Tomatoes', price: 4.99, quantity: 2, image: '/images/tomatoes.jpg', unit: 'kg' },
            { id: 2, name: 'Apples', price: 5.99, quantity: 1, image: '/images/apples.jpg', unit: 'kg' }
          ],
          getTotalItems: () => 3,
          getSubTotal: () => 15.97,
          getTax: () => 1.60,
          getShipping: () => 8,
          getTotal: () => 25.57,
          changeQuantity: vi.fn(),
          removeFromBasket: vi.fn(),
        };
        
        return (
          <MemoryRouter initialEntries={['/basket']}>
            <BasketContext.Provider value={mockBasketWithItems}>
              <Routes>
                <Route path="/basket" element={<Basket />} />
              </Routes>
            </BasketContext.Provider>
          </MemoryRouter>
        );
      };
      
      render(<TestBasketWithItems />);
      
      // Verify items are displayed
      expect(screen.getByText('Tomatoes')).toBeInTheDocument();
      expect(screen.getByText('Apples')).toBeInTheDocument();
      expect(screen.getByDisplayValue('2')).toBeInTheDocument();
      expect(screen.getByDisplayValue('1')).toBeInTheDocument();
    });
  });

  describe('Product Detail Page', () => {
    it('should display product details correctly', async () => {
      render(<TestApp initialEntries={['/shop/tomatoes']} />);
      
      expect(screen.getByText('Tomatoes')).toBeInTheDocument();
      expect(screen.getByText(/Our vine-ripened organic tomatoes/)).toBeInTheDocument();
      expect(screen.getByText('$4.99')).toBeInTheDocument();
    });

    it('should allow quantity selection before adding to cart', async () => {
      const user = userEvent.setup();
      
      render(<TestApp initialEntries={['/shop/tomatoes']} />);
      
      // Increase quantity before adding to cart
      const incrementButton = screen.getByRole('button', { name: /addQuantity/i });
      await user.click(incrementButton);
      await user.click(incrementButton); // quantity = 3
      
      // Verify quantity display
      expect(screen.getByDisplayValue('3')).toBeInTheDocument();
      expect(screen.getByText('$14.97')).toBeInTheDocument(); // 4.99 * 3
    });
  });

  describe('Empty States', () => {
    it('should display empty basket message', async () => {
      render(<TestApp initialEntries={['/basket']} />);
      
      expect(screen.getByText(/Your basket is empty/i)).toBeInTheDocument();
      expect(screen.getByText(/Shop Now/i)).toBeInTheDocument();
    });

    it('should show no results when search matches nothing', async () => {
      const user = userEvent.setup();
      
      render(<TestApp initialEntries={['/shop']} />);
      
      const searchInput = screen.getByPlaceholderText('Search Here');
      await user.type(searchInput, 'nonexistent');
      
      await waitFor(() => {
        expect(screen.queryByText('Tomatoes')).not.toBeInTheDocument();
        expect(screen.queryByText('Apples')).not.toBeInTheDocument();
        expect(screen.queryByText('Spinach')).not.toBeInTheDocument();
      });
    });
  });

  describe('State Management Across Components', () => {
    it('should show correct button text when item is in cart', async () => {
      const user = userEvent.setup();
      
      // Create a shared basket context with an item
      const TestAppWithItem = () => {
        const mockBasketWithItem = {
          basket: [{ id: 1, name: 'Tomatoes', price: 4.99, quantity: 1 }],
          addToBasket: vi.fn(),
          removeFromBasket: vi.fn(),
          changeQuantity: vi.fn(),
        };
        
        return (
          <MemoryRouter initialEntries={['/shop/tomatoes']}>
            <BasketContext.Provider value={mockBasketWithItem}>
              <Routes>
                <Route path="/shop/:slug" element={<ProductDetail />} />
              </Routes>
            </BasketContext.Provider>
          </MemoryRouter>
        );
      };
      
      render(<TestAppWithItem />);
      
      // Should show "Remove from Cart" since item is already in basket
      expect(screen.getByText('Remove from Cart')).toBeInTheDocument();
    });

    it('should handle back navigation link', async () => {
      render(<TestApp initialEntries={['/shop/tomatoes']} />);
      
      // Verify back link exists and points to shop
      const backLink = screen.getByRole('link');
      expect(backLink).toHaveAttribute('href', '/shop');
    });
  });
});