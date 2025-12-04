import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, renderHook, act } from '@testing-library/react';
import { useContext } from 'react';
import BasketProvider, { BasketContext } from '../context/BasketContext';

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  clear: vi.fn(),
};
global.localStorage = localStorageMock;

// Testing product data
const mockProduct1 = {
  id: 1,
  name: 'Tomatoes',
  price: 4.99,
  unit: 'kg',
};

const mockProduct2 = {
  id: 2,
  name: 'Apples',
  price: 5.99,
  unit: 'kg',
};

// Helper to render hook with provider
const renderBasketHook = (initialValue = null) => {
  if (initialValue) {
    localStorageMock.getItem.mockReturnValue(JSON.stringify(initialValue));
  }
  
  const wrapper = ({ children }) => (
    <BasketProvider>{children}</BasketProvider>
  );
  
  return renderHook(() => useContext(BasketContext), { wrapper });
};

describe('BasketContext', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorageMock.getItem.mockReturnValue(null);
  });

  describe('Initialization', () => {
    it('should initialize with empty basket when localStorage is empty', () => {
      const { result } = renderBasketHook();
      expect(result.current.basket).toEqual([]);
    });

    it('should initialize with data from localStorage', () => {
      const initialBasket = [{ ...mockProduct1, quantity: 2 }];
      const { result } = renderBasketHook(initialBasket);
      expect(result.current.basket).toEqual(initialBasket);
    });

    it('should handle invalid JSON in localStorage', () => {
      localStorageMock.getItem.mockReturnValue('invalid json');
      const { result } = renderBasketHook();
      expect(result.current.basket).toEqual([]);
    });
  });

  describe('addToBasket', () => {
    it('should add new item to empty basket', () => {
      const { result } = renderBasketHook();
      
      act(() => {
        result.current.addToBasket(mockProduct1);
      });

      expect(result.current.basket).toEqual([
        { ...mockProduct1, quantity: 1 }
      ]);
    });

    it('should add item with custom quantity', () => {
      const { result } = renderBasketHook();
      
      act(() => {
        result.current.addToBasket(mockProduct1, 3);
      });

      expect(result.current.basket).toEqual([
        { ...mockProduct1, quantity: 3 }
      ]);
    });

    it('should increase quantity if item already exists', () => {
      const initialBasket = [{ ...mockProduct1, quantity: 2 }];
      const { result } = renderBasketHook(initialBasket);
      
      act(() => {
        result.current.addToBasket(mockProduct1, 3);
      });

      expect(result.current.basket).toEqual([
        { ...mockProduct1, quantity: 5 }
      ]);
    });
  });

  describe('removeFromBasket', () => {
    it('should remove item from basket', () => {
      const initialBasket = [
        { ...mockProduct1, quantity: 2 },
        { ...mockProduct2, quantity: 1 }
      ];
      const { result } = renderBasketHook(initialBasket);
      
      act(() => {
        result.current.removeFromBasket(mockProduct1);
      });

      expect(result.current.basket).toEqual([
        { ...mockProduct2, quantity: 1 }
      ]);
    });

    it('should do nothing if item not in basket', () => {
      const initialBasket = [{ ...mockProduct1, quantity: 2 }];
      const { result } = renderBasketHook(initialBasket);
      
      act(() => {
        result.current.removeFromBasket(mockProduct2);
      });

      expect(result.current.basket).toEqual(initialBasket);
    });
  });

  describe('changeQuantity', () => {
    it('should update item quantity', () => {
      const initialBasket = [{ ...mockProduct1, quantity: 2 }];
      const { result } = renderBasketHook(initialBasket);
      
      act(() => {
        result.current.changeQuantity(mockProduct1, 5);
      });

      expect(result.current.basket).toEqual([
        { ...mockProduct1, quantity: 5 }
      ]);
    });

    it('should not update quantity for invalid values', () => {
      const initialBasket = [{ ...mockProduct1, quantity: 2 }];
      const { result } = renderBasketHook(initialBasket);
      
      act(() => {
        result.current.changeQuantity(mockProduct1, 0);
      });

      expect(result.current.basket).toEqual(initialBasket);
    });

    it('should not update quantity for NaN values', () => {
      const initialBasket = [{ ...mockProduct1, quantity: 2 }];
      const { result } = renderBasketHook(initialBasket);
      
      act(() => {
        result.current.changeQuantity(mockProduct1, 'invalid');
      });

      expect(result.current.basket).toEqual(initialBasket);
    });
  });

  describe('clearBasket', () => {
    it('should clear all items from basket', () => {
      const initialBasket = [
        { ...mockProduct1, quantity: 2 },
        { ...mockProduct2, quantity: 1 }
      ];
      const { result } = renderBasketHook(initialBasket);
      
      act(() => {
        result.current.clearBasket();
      });

      expect(result.current.basket).toEqual([]);
    });
  });

  describe('getTotalItems', () => {
    it('should return total quantity of all items', () => {
      const initialBasket = [
        { ...mockProduct1, quantity: 2 },
        { ...mockProduct2, quantity: 3 }
      ];
      const { result } = renderBasketHook(initialBasket);
      
      expect(result.current.getTotalItems()).toBe(5);
    });

    it('should return 0 for empty basket', () => {
      const { result } = renderBasketHook();
      expect(result.current.getTotalItems()).toBe(0);
    });
  });

  describe('Price calculations', () => {
    const basketWithItems = [
      { ...mockProduct1, quantity: 2 }, // 4.99 * 2 = 9.98
      { ...mockProduct2, quantity: 1 }  // 5.99 * 1 = 5.99
    ]; // Total: 15.97

    it('should calculate correct subtotal', () => {
      const { result } = renderBasketHook(basketWithItems);
      expect(result.current.getSubTotal()).toBe(15.97);
    });

    it('should calculate correct tax (10%)', () => {
      const { result } = renderBasketHook(basketWithItems);
      expect(result.current.getTax()).toBeCloseTo(1.597, 2);
    });

    it('should return fixed shipping cost', () => {
      const { result } = renderBasketHook(basketWithItems);
      expect(result.current.getShipping()).toBe(8);
    });

    it('should calculate correct total', () => {
      const { result } = renderBasketHook(basketWithItems);
      const expected = 15.97 + 1.597 + 8; // subtotal + tax + shipping
      expect(result.current.getTotal()).toBeCloseTo(expected, 2);
    });

    it('should return 0 for empty basket calculations', () => {
      const { result } = renderBasketHook();
      expect(result.current.getSubTotal()).toBe(0);
      expect(result.current.getTax()).toBe(0);
      expect(result.current.getTotal()).toBe(8); // Only shipping
    });
  });

  describe('localStorage integration', () => {
    it('should save to localStorage when basket changes', () => {
      const { result } = renderBasketHook();
      
      act(() => {
        result.current.addToBasket(mockProduct1);
      });

      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'basket',
        JSON.stringify([{ ...mockProduct1, quantity: 1 }])
      );
    });
  });
});