import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router';
import ProductDetail from '../pages/Shop/ProductDetails';
import { BasketContext } from '../context/BasketContext';

// Mock react-router hooks
const mockNavigate = vi.fn();
vi.mock('react-router', async () => {
  const actual = await vi.importActual('react-router');
  return {
    ...actual,
    useParams: () => ({ slug: 'tomatoes' }),
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
      unit: 'kg',
      image: '/images/tomatoes.jpg',
      description: 'Fresh organic tomatoes',
      details: 'Our vine-ripened organic tomatoes are grown without pesticides in nutrient-rich soil.',
    },
    {
      id: 2,
      name: 'Apples',
      slug: 'apples',
      price: 5.99,
      unit: 'kg',
      image: '/images/apples.jpg',
      description: 'Crisp organic apples',
      details: 'Hand-picked organic apples from our local orchard.',
    }
  ]
}));

// Mock basket context
const mockBasketContext = {
  basket: [],
  addToBasket: vi.fn(),
  removeFromBasket: vi.fn(),
  changeQuantity: vi.fn(),
};

// Helper to render component with providers
const renderWithProviders = (basketValue = mockBasketContext) => {
  return render(
    <BrowserRouter>
      <BasketContext.Provider value={basketValue}>
        <ProductDetail />
      </BasketContext.Provider>
    </BrowserRouter>
  );
};

describe('ProductDetail Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Product Display', () => {
    it('should render product information correctly', () => {
      renderWithProviders();
      
      expect(screen.getByText('Tomatoes')).toBeInTheDocument();
      expect(screen.getByText('$4.99')).toBeInTheDocument();
      expect(screen.getByText('kg')).toBeInTheDocument();
      expect(screen.getByText(/Our vine-ripened organic tomatoes/)).toBeInTheDocument();
    });

    it('should render product image with correct attributes', () => {
      renderWithProviders();
      
      const image = screen.getByAltText('Tomatoes');
      expect(image).toHaveAttribute('src', '/images/tomatoes.jpg');
    });

    it('should display correct initial price', () => {
      renderWithProviders();
      
      expect(screen.getByText('$4.99')).toBeInTheDocument();
    });

    it('should have back link to shop', () => {
      renderWithProviders();
      
      const backLink = screen.getByRole('link');
      expect(backLink).toHaveAttribute('href', '/shop');
    });
  });

  describe('Quantity Management - Item Not in Basket', () => {
    it('should start with quantity 1 when item not in basket', () => {
      renderWithProviders();
      
      const quantityInput = screen.getByDisplayValue('1');
      expect(quantityInput).toBeInTheDocument();
    });

    it('should increment local quantity when + button clicked', () => {
      renderWithProviders();
      
      const incrementButton = screen.getByRole('button', { name: /addQuantity/i });
      fireEvent.click(incrementButton);
      
      expect(screen.getByDisplayValue('2')).toBeInTheDocument();
      expect(screen.getByText('$9.98')).toBeInTheDocument(); // 4.99 * 2
    });

    it('should decrement local quantity when - button clicked', () => {
      renderWithProviders();
      
      // First increment to 2
      const incrementButton = screen.getByRole('button', { name: /addQuantity/i });
      fireEvent.click(incrementButton);
      
      // Then decrement back to 1
      const decrementButton = screen.getByRole('button', { name: /decreaseQuantity/i });
      fireEvent.click(decrementButton);
      
      expect(screen.getByDisplayValue('1')).toBeInTheDocument();
      expect(screen.getByText('$4.99')).toBeInTheDocument();
    });

    it('should not decrement below 1', () => {
      renderWithProviders();
      
      const decrementButton = screen.getByRole('button', { name: /decreaseQuantity/i });
      fireEvent.click(decrementButton);
      
      expect(screen.getByDisplayValue('1')).toBeInTheDocument();
    });
  });

  describe('Quantity Management - Item in Basket', () => {
    const basketWithItem = {
      ...mockBasketContext,
      basket: [{ id: 1, name: 'Tomatoes', price: 4.99, quantity: 3 }]
    };

    it('should show basket quantity when item is in basket', () => {
      renderWithProviders(basketWithItem);
      
      expect(screen.getByDisplayValue('3')).toBeInTheDocument();
      expect(screen.getByText('$14.97')).toBeInTheDocument(); // 4.99 * 3
    });

    it('should call changeQuantity when incrementing basket item', () => {
      const mockChangeQuantity = vi.fn();
      const basketContext = { ...basketWithItem, changeQuantity: mockChangeQuantity };
      
      renderWithProviders(basketContext);
      
      const incrementButton = screen.getByRole('button', { name: /addQuantity/i });
      fireEvent.click(incrementButton);
      
      expect(mockChangeQuantity).toHaveBeenCalledWith(
        expect.objectContaining({ id: 1, name: 'Tomatoes' }),
        4
      );
    });

    it('should call changeQuantity when decrementing basket item', () => {
      const mockChangeQuantity = vi.fn();
      const basketContext = { ...basketWithItem, changeQuantity: mockChangeQuantity };
      
      renderWithProviders(basketContext);
      
      const decrementButton = screen.getByRole('button', { name: /decreaseQuantity/i });
      fireEvent.click(decrementButton);
      
      expect(mockChangeQuantity).toHaveBeenCalledWith(
        expect.objectContaining({ id: 1, name: 'Tomatoes' }),
        2
      );
    });

    it('should remove item when quantity is 1 and decrement is clicked', () => {
      const basketWithOneItem = {
        ...mockBasketContext,
        basket: [{ id: 1, name: 'Tomatoes', price: 4.99, quantity: 1 }]
      };
      const mockRemoveFromBasket = vi.fn();
      const basketContext = { ...basketWithOneItem, removeFromBasket: mockRemoveFromBasket };
      
      renderWithProviders(basketContext);
      
      const decrementButton = screen.getByRole('button', { name: /remove/i });
      fireEvent.click(decrementButton);
      
      expect(mockRemoveFromBasket).toHaveBeenCalledWith(
        expect.objectContaining({ id: 1, name: 'Tomatoes' })
      );
    });
  });

  describe('Add to Cart Functionality', () => {
    it('should show "Add to Cart" when item not in basket', () => {
      renderWithProviders();
      
      expect(screen.getByText('Add to Cart')).toBeInTheDocument();
    });

    it('should show "Remove from Cart" when item is in basket', () => {
      const basketWithItem = {
        ...mockBasketContext,
        basket: [{ id: 1, name: 'Tomatoes', price: 4.99, quantity: 2 }]
      };
      
      renderWithProviders(basketWithItem);
      
      expect(screen.getByText('Remove from Cart')).toBeInTheDocument();
    });

    it('should add item to basket when "Add to Cart" is clicked', () => {
      const mockAddToBasket = vi.fn();
      const basketContext = { ...mockBasketContext, addToBasket: mockAddToBasket };
      
      renderWithProviders(basketContext);
      
      const addButton = screen.getByText('Add to Cart');
      fireEvent.click(addButton);
      
      expect(mockAddToBasket).toHaveBeenCalledWith(
        expect.objectContaining({ id: 1, name: 'Tomatoes' }),
        1
      );
    });

    it('should remove item from basket when "Remove from Cart" is clicked', () => {
      const basketWithItem = {
        ...mockBasketContext,
        basket: [{ id: 1, name: 'Tomatoes', price: 4.99, quantity: 2 }]
      };
      const mockRemoveFromBasket = vi.fn();
      const basketContext = { ...basketWithItem, removeFromBasket: mockRemoveFromBasket };
      
      renderWithProviders(basketContext);
      
      const removeButton = screen.getByText('Remove from Cart');
      fireEvent.click(removeButton);
      
      expect(mockRemoveFromBasket).toHaveBeenCalledWith(
        expect.objectContaining({ id: 1, name: 'Tomatoes' })
      );
    });
  });

  describe('Buy Now Functionality', () => {
    it('should add item to basket and navigate to basket page', () => {
      const mockAddToBasket = vi.fn();
      const basketContext = { ...mockBasketContext, addToBasket: mockAddToBasket };
      
      renderWithProviders(basketContext);
      
      const buyNowButton = screen.getByText('Buy Now');
      fireEvent.click(buyNowButton);
      
      expect(mockAddToBasket).toHaveBeenCalledWith(
        expect.objectContaining({ id: 1, name: 'Tomatoes' }),
        1
      );
      expect(mockNavigate).toHaveBeenCalledWith('/basket');
    });

    it('should only navigate when item already in basket', () => {
      const basketWithItem = {
        ...mockBasketContext,
        basket: [{ id: 1, name: 'Tomatoes', price: 4.99, quantity: 2 }]
      };
      
      renderWithProviders(basketWithItem);
      
      const buyNowButton = screen.getByText('Buy Now');
      fireEvent.click(buyNowButton);
      
      expect(mockBasketContext.addToBasket).not.toHaveBeenCalled();
      expect(mockNavigate).toHaveBeenCalledWith('/basket');
    });
  });

  describe('Price Calculations', () => {
    it('should update price when local quantity changes', () => {
      renderWithProviders();
      
      // Initial price
      expect(screen.getByText('$4.99')).toBeInTheDocument();
      
      // Increment quantity
      const incrementButton = screen.getByRole('button', { name: /addQuantity/i });
      fireEvent.click(incrementButton);
      fireEvent.click(incrementButton); // quantity = 3
      
      expect(screen.getByText('$14.97')).toBeInTheDocument(); // 4.99 * 3
    });
  });
});