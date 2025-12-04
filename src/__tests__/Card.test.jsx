import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router';
import ShopCard, { CartCard } from '../components/Card';
import BasketProvider, { BasketContext } from '../context/BasketContext';

// Mock product data
const mockProduct = {
  id: 1,
  name: 'Tomatoes',
  slug: 'tomatoes',
  price: 4.99,
  unit: 'kg',
  image: '/images/tomatoes.jpg',
  description: 'Fresh organic tomatoes',
};

const mockCartItem = {
  id: 1,
  name: 'Tomatoes',
  price: 4.99,
  unit: 'kg',
  image: '/images/tomatoes.jpg',
  description: 'Fresh organic tomatoes',
  quantity: 2,
};

// Mock basket context
const mockBasketContext = {
  basket: [],
  addToBasket: vi.fn(),
  removeFromBasket: vi.fn(),
  changeQuantity: vi.fn(),
};

// Mock Navigate
const mockNavigate = vi.fn();
vi.mock('react-router', async () => {
  const actual = await vi.importActual('react-router');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

// Helper to render components with providers
const renderWithProviders = (component, basketValue = mockBasketContext) => {
  return render(
    <BrowserRouter>
      <BasketContext.Provider value={basketValue}>
        {component}
      </BasketContext.Provider>
    </BrowserRouter>
  );
};

describe('ShopCard Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render product information correctly', () => {
    renderWithProviders(<ShopCard {...mockProduct} />);
    
    expect(screen.getByText('Tomatoes')).toBeInTheDocument();
    expect(screen.getByText(/\$4\.99/)).toBeInTheDocument();
    expect(screen.getByText('kg')).toBeInTheDocument();
    expect(screen.getByAltText('Fresh organic tomatoes')).toBeInTheDocument();
  });

  it('should render product image with correct src and alt', () => {
    renderWithProviders(<ShopCard {...mockProduct} />);
    
    const image = screen.getByAltText('Fresh organic tomatoes');
    expect(image).toHaveAttribute('src', '/images/tomatoes.jpg');
  });

  it('should navigate to the right product detail page', () => {
    renderWithProviders(<ShopCard {...mockProduct} />);
    
    const link = screen.getByTestId('shopCard');
    fireEvent.click(link);
    expect(mockNavigate).toHaveBeenCalledWith('/shop/tomatoes');
  });

  it('should call addToBasket when Add to Basket button is clicked', () => {
    const mockAddToBasket = vi.fn();
    const basketContext = { ...mockBasketContext, addToBasket: mockAddToBasket };
    
    renderWithProviders(<ShopCard {...mockProduct} />, basketContext);
    
    const addButton = screen.getByRole('toggleBasket');
    fireEvent.click(addButton);
    
    expect(mockAddToBasket).toHaveBeenCalledWith(mockProduct);
  });

  it('should prevent navigation when toggle Basket button is clicked', () => {
    const mockAddToBasket = vi.fn();
    const basketContext = { ...mockBasketContext, addToBasket: mockAddToBasket };
    
    renderWithProviders(<ShopCard {...mockProduct} />, basketContext);
    
    const addButton = screen.getByRole('toggleBasket');
    const clickEvent = new MouseEvent('click', { bubbles: true });
    const preventDefaultSpy = vi.spyOn(clickEvent, 'preventDefault');
    const stopPropagationSpy = vi.spyOn(clickEvent, 'stopPropagation');
    
    fireEvent(addButton, clickEvent);
    
    expect(preventDefaultSpy).toHaveBeenCalled();
    expect(stopPropagationSpy).toHaveBeenCalled();
  });
});

describe('CartCard Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render cart item information correctly', () => {
    renderWithProviders(<CartCard {...mockCartItem} />);
    const units = screen.getAllByText("kg")
    expect(screen.getByText('Tomatoes')).toBeInTheDocument();
    expect(screen.getByText(/\$4\.99/)).toBeInTheDocument();
    expect(screen.getByDisplayValue('2')).toBeInTheDocument();
    expect(screen.getByText('$9.98')).toBeInTheDocument(); // 4.99 * 2
    expect(units[0]).toBeInTheDocument()
  });

  it('should render product image with correct src and alt', () => {
    renderWithProviders(<CartCard {...mockCartItem} />);
    
    const image = screen.getByAltText('Fresh organic tomatoes');
    expect(image).toHaveAttribute('src', '/images/tomatoes.jpg');
  });

  it('should calculate and display correct total price', () => {
    const item = { ...mockCartItem, quantity: 3 };
    renderWithProviders(<CartCard {...item} />);
    
    expect(screen.getByText('$14.97')).toBeInTheDocument(); // 4.99 * 3
  });

  it('should call removeFromBasket when remove button is clicked', () => {
    const mockRemoveFromBasket = vi.fn();
    const basketContext = { ...mockBasketContext, removeFromBasket: mockRemoveFromBasket };
    
    renderWithProviders(<CartCard {...mockCartItem} />, basketContext);
    
    const removeButton = screen.getByRole('button', { name: /removeFromBasket/i });
    fireEvent.click(removeButton);
    
    expect(mockRemoveFromBasket).toHaveBeenCalledWith(mockCartItem);
  });

  it('should call changeQuantity when increment button is clicked', () => {
    const mockChangeQuantity = vi.fn();
    const basketContext = { ...mockBasketContext, changeQuantity: mockChangeQuantity };
    
    renderWithProviders(<CartCard {...mockCartItem} />, basketContext);
    
    const incrementButton = screen.getByRole('button', { name: /increaseQuantity/i });
    fireEvent.click(incrementButton);
    
    expect(mockChangeQuantity).toHaveBeenCalledWith(mockCartItem, 3); // 2 + 1
  });

  it('should call changeQuantity when decrement button is clicked', () => {
    const mockChangeQuantity = vi.fn();
    const basketContext = { ...mockBasketContext, changeQuantity: mockChangeQuantity };
    
    renderWithProviders(<CartCard {...mockCartItem} />, basketContext);
    
    const decrementButton = screen.getByRole('button', { name: /decreaseQuantity/i });
    fireEvent.click(decrementButton);
    
    expect(mockChangeQuantity).toHaveBeenCalledWith(mockCartItem, 1); // 2 - 1
  });

  it('should call removeFromBasket when quantity is 1 and decrement is clicked', () => {
    const mockRemoveFromBasket = vi.fn();
    const basketContext = { ...mockBasketContext, removeFromBasket: mockRemoveFromBasket };
    const itemWithQuantity1 = { ...mockCartItem, quantity: 1 };
    
    renderWithProviders(<CartCard {...itemWithQuantity1} />, basketContext);
    
    const decrementButton = screen.getByRole('button', { name: /decreaseQuantity/i });
    fireEvent.click(decrementButton);
    
    expect(mockRemoveFromBasket).toHaveBeenCalledWith(itemWithQuantity1);
  });

  it('should display quantity input as readonly', () => {
    renderWithProviders(<CartCard {...mockCartItem} />);
    
    const quantityInput = screen.getByDisplayValue('2');
    expect(quantityInput).toHaveAttribute('readonly');
  });

  it('should have correct minimum value for quantity input', () => {
    renderWithProviders(<CartCard {...mockCartItem} />);
    
    const quantityInput = screen.getByDisplayValue('2');
    expect(quantityInput).toHaveAttribute('min', '0');
  });
});