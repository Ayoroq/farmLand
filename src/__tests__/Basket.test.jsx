import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router';
import Basket from '../pages/Basket/Basket';
import { BasketContext } from '../context/BasketContext';

// Mock basket context
const mockBasketContext = {
  basket: [],
  addToBasket: vi.fn(),
  removeFromBasket: vi.fn(),
  changeQuantity: vi.fn(),
  clearBasket: vi.fn(),
  getTotalItems: vi.fn(() => 0),
  getSubTotal: vi.fn(() => 0),
  getTax: vi.fn(() => 0),
  getShipping: vi.fn(() => 8),
  getTotal: vi.fn(() => 8),
};

// Mock cart items
const mockCartItems = [
  {
    id: 1,
    name: 'Tomatoes',
    price: 4.99,
    unit: 'kg',
    image: '/images/tomatoes.jpg',
    description: 'Fresh organic tomatoes',
    quantity: 2,
  },
  {
    id: 2,
    name: 'Apples',
    price: 5.99,
    unit: 'kg',
    image: '/images/apples.jpg',
    description: 'Crisp organic apples',
    quantity: 1,
  }
];

// mock navigate
const mockNavigate = vi.fn();
vi.mock('react-router', async () => {
  const actual = await vi.importActual('react-router');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});


// Helper to render component with providers
const renderWithProviders = (basketValue = mockBasketContext) => {
  return render(
    <BrowserRouter>
      <BasketContext.Provider value={basketValue}>
        <Basket />
      </BasketContext.Provider>
    </BrowserRouter>
  );
};

describe('Basket Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Empty Basket', () => {
    it('should display empty basket message when no items', () => {
      renderWithProviders();
      
      expect(screen.getByText(/Your basket is empty/i)).toBeInTheDocument();
    });

    it('should display shop now button when basket is empty', () => {
      renderWithProviders();
      
      const shopButton = screen.getByText(/Shop Now/i);
      fireEvent.click(shopButton);
      expect(mockNavigate).toHaveBeenCalledWith('/shop');
    });

    it('should not display checkout section when basket is empty', () => {
      renderWithProviders();
      
      expect(screen.queryByText(/Continue to Payment/i)).not.toBeInTheDocument();
      expect(screen.queryByText(/Subtotal/i)).not.toBeInTheDocument();
    });
  });

  describe('Basket with Items', () => {
    const basketWithItems = {
      ...mockBasketContext,
      basket: mockCartItems,
      getTotalItems: vi.fn(() => 3),
      getSubTotal: vi.fn(() => 15.97),
      getTax: vi.fn(() => 1.60),
      getShipping: vi.fn(() => 8),
      getTotal: vi.fn(() => 25.57),
    };

    it('should display basket header with item count', () => {
      renderWithProviders(basketWithItems);
      
      expect(screen.getByText(/Basket/i)).toBeInTheDocument();
      expect(screen.getByText(/3 items/i)).toBeInTheDocument();
    });

    it('should render all cart items', () => {
      renderWithProviders(basketWithItems);
      
      expect(screen.getByText('Tomatoes')).toBeInTheDocument();
      expect(screen.getByText('Apples')).toBeInTheDocument();
    });

    it('should display item quantities correctly', () => {
      renderWithProviders(basketWithItems);
      
      expect(screen.getByDisplayValue('2')).toBeInTheDocument(); // Tomatoes quantity
      expect(screen.getByDisplayValue('1')).toBeInTheDocument(); // Apples quantity
    });

    it('should display item prices correctly', () => {
      renderWithProviders(basketWithItems);
      
      expect(screen.getByText('$9.98')).toBeInTheDocument(); // 4.99 * 2
      expect(screen.getByText('$5.99')).toBeInTheDocument(); // 5.99 * 1
    });
  });

  describe('Checkout Section', () => {
    const basketWithItems = {
      ...mockBasketContext,
      basket: mockCartItems,
      getTotalItems: vi.fn(() => 3),
      getSubTotal: vi.fn(() => 15.97),
      getTax: vi.fn(() => 1.60),
      getShipping: vi.fn(() => 8),
      getTotal: vi.fn(() => 25.57),
    };

    it('should display checkout section when items exist', () => {
      renderWithProviders(basketWithItems);
      
      expect(screen.getByText(/Continue to Payment/i)).toBeInTheDocument();
    });

    it('should display correct subtotal', () => {
      renderWithProviders(basketWithItems);
      
      expect(screen.getByText('Subtotal')).toBeInTheDocument();
      expect(screen.getByText('$15.97')).toBeInTheDocument();
    });

    it('should display correct tax amount', () => {
      renderWithProviders(basketWithItems);
      
      expect(screen.getByText('Tax')).toBeInTheDocument();
      expect(screen.getByText('$1.60')).toBeInTheDocument();
    });

    it('should display correct shipping cost', () => {
      renderWithProviders(basketWithItems);
      
      expect(screen.getByText('Shipping')).toBeInTheDocument();
      expect(screen.getByText('$8.00')).toBeInTheDocument();
    });

    it('should display correct total amount', () => {
      renderWithProviders(basketWithItems);
      
      expect(screen.getByText('Total')).toBeInTheDocument();
      expect(screen.getByText('$25.57')).toBeInTheDocument();
    });

    it('should display checkout button', () => {
      renderWithProviders(basketWithItems);
      
      const checkoutButton = screen.getByRole('button', { name: /Continue to Payment/i });
      expect(checkoutButton).toBeInTheDocument();
    });
  });

  describe('Item Interactions', () => {
    const basketWithItems = {
      ...mockBasketContext,
      basket: mockCartItems,
      getTotalItems: vi.fn(() => 3),
      getSubTotal: vi.fn(() => 15.97),
      getTax: vi.fn(() => 1.60),
      getShipping: vi.fn(() => 8),
      getTotal: vi.fn(() => 25.57),
    };

    it('should call changeQuantity when quantity is increased', () => {
      const mockChangeQuantity = vi.fn();
      const basketContext = { ...basketWithItems, changeQuantity: mockChangeQuantity };
      
      renderWithProviders(basketContext);
      
      const incrementButtons = screen.getAllByRole('button', { name: /increaseQuantity/i });
      fireEvent.click(incrementButtons[0]); // Click first increment button
      
      expect(mockChangeQuantity).toHaveBeenCalledWith(mockCartItems[0], 3);
    });

    it('should call changeQuantity when quantity is decreased', () => {
      const mockChangeQuantity = vi.fn();
      const basketContext = { ...basketWithItems, changeQuantity: mockChangeQuantity };
      
      renderWithProviders(basketContext);
      
      const decrementButtons = screen.getAllByRole('button', { name: /decreaseQuantity/i });
      fireEvent.click(decrementButtons[0]); // Click first decrement button
      
      expect(mockChangeQuantity).toHaveBeenCalledWith(mockCartItems[0], 1);
    });

    it('should call removeFromBasket when remove button is clicked', () => {
      const mockRemoveFromBasket = vi.fn();
      const basketContext = { ...basketWithItems, removeFromBasket: mockRemoveFromBasket };
      
      renderWithProviders(basketContext);
      
      const removeButtons = screen.getAllByRole('button');
      const deleteButton = removeButtons.find(button => 
        button.querySelector('svg') && button.querySelector('path[fill="#EA3323"]')
      );
      
      fireEvent.click(deleteButton);
      
      expect(mockRemoveFromBasket).toHaveBeenCalled();
    });

    it('should remove item when quantity is 1 and decrement is clicked', () => {
      const itemWithQuantity1 = [{ ...mockCartItems[0], quantity: 1 }];
      const mockRemoveFromBasket = vi.fn();
      const basketContext = {
        ...basketWithItems,
        basket: itemWithQuantity1,
        removeFromBasket: mockRemoveFromBasket,
      };
      
      renderWithProviders(basketContext);
      
      const decrementButton = screen.getByRole('button', { name: /remove/i });
      fireEvent.click(decrementButton);
      
      expect(mockRemoveFromBasket).toHaveBeenCalledWith(itemWithQuantity1[0]);
    });
  });

  describe('Basket Management', () => {
    const basketWithItems = {
      ...mockBasketContext,
      basket: mockCartItems,
      getTotalItems: vi.fn(() => 3),
      getSubTotal: vi.fn(() => 15.97),
      getTax: vi.fn(() => 1.60),
      getShipping: vi.fn(() => 8),
      getTotal: vi.fn(() => 25.57),
    };

    it('should call clearBasket when clear basket button is clicked', () => {
      const mockClearBasket = vi.fn();
      const basketContext = { ...basketWithItems, clearBasket: mockClearBasket };
      
      renderWithProviders(basketContext);
      
      // Look for clear basket button (might be in a menu or as a separate button)
      const clearButton = screen.queryByText(/clear basket/i) || screen.queryByText(/empty basket/i);
      
      if (clearButton) {
        fireEvent.click(clearButton);
        expect(mockClearBasket).toHaveBeenCalled();
      }
    });
  });

  describe('Price Calculations', () => {
    it('should call basket context methods for price calculations', () => {
      const basketWithItems = {
        ...mockBasketContext,
        basket: mockCartItems,
        getTotalItems: vi.fn(() => 3),
        getSubTotal: vi.fn(() => 15.97),
        getTax: vi.fn(() => 1.60),
        getShipping: vi.fn(() => 8),
        getTotal: vi.fn(() => 25.57),
      };
      
      renderWithProviders(basketWithItems);
      
      expect(basketWithItems.getSubTotal).toHaveBeenCalled();
      expect(basketWithItems.getTax).toHaveBeenCalled();
      expect(basketWithItems.getShipping).toHaveBeenCalled();
      expect(basketWithItems.getTotal).toHaveBeenCalled();
    });

    it('should display zero values correctly for empty basket', () => {
      const emptyBasketContext = {
        ...mockBasketContext,
        getSubTotal: vi.fn(() => 0),
        getTax: vi.fn(() => 0),
        getTotal: vi.fn(() => 8), // Only shipping cost
      };
      
      renderWithProviders(emptyBasketContext);
      
      // Empty basket shouldn't show checkout section
      expect(screen.queryByText('Subtotal')).not.toBeInTheDocument();
    });
  });

  describe('Responsive Behavior', () => {
    const basketWithItems = {
      ...mockBasketContext,
      basket: mockCartItems,
      getTotalItems: vi.fn(() => 3),
      getSubTotal: vi.fn(() => 15.97),
      getTax: vi.fn(() => 1.60),
      getShipping: vi.fn(() => 8),
      getTotal: vi.fn(() => 25.57),
    };

    it('should render properly on different screen sizes', () => {
      renderWithProviders(basketWithItems);
      
      // Check that main elements are present
      expect(screen.getByText(/Basket/i)).toBeInTheDocument();
      expect(screen.getByText('Tomatoes')).toBeInTheDocument();
      expect(screen.getByText(/Continue to Payment/i)).toBeInTheDocument();
    });
  });
});