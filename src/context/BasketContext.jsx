import { createContext, useState, useEffect } from "react";

export const BasketContext = createContext(null);

export default function BasketProvider({ children }) {
  // get the items in the basket if they already exists
  const [basket, setBasket] = useState(() => {
    try {
      const stored = localStorage.getItem('basket');
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error(error);
      return [];
    }
  });

  // Update the localStorage when the basket item changes
  useEffect(() => {
    localStorage.setItem("basket", JSON.stringify(basket));
  }, [basket]);

  const addToBasket = (item, quantity = 1) => {
    if (basket.find((i) => i.id === item.id)) {
      setBasket((prev) => prev.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + quantity } : i)))
      return
    } else {
      setBasket((prev) => [...prev, { ...item, quantity }]);
    }
  };

  const changeQuantity = (item, quantity) => {
    if(isNaN(quantity) || quantity < 1) return
    setBasket((prev) =>
      prev.map((i) => (i.id === item.id ? { ...i, quantity } : i))
    );
  };

  const removeFromBasket = (item) => {
    setBasket((prev) => prev.filter((i) => i.id !== item.id));
  };

  // Clear the basket
  const clearBasket = () => {
    setBasket([]);
  };

  // Get the total number of items in the cart
  const getTotalItems = () => {
    return basket.length;
  };

  const getTax = () => {
    return (basket.reduce((acc, item) => acc + item.price * item.quantity, 0) * 0.1);
  }

  const getSubTotal = () => {
    return (basket.reduce((acc, item) => acc + item.price * item.quantity, 0));
  }

  const getShipping = () => {
    return 8;
  }

  const getTotal = () => {
    return (getSubTotal() + getTax() + getShipping());
  }

  return (
    <BasketContext.Provider
      value={{
        basket,
        addToBasket,
        removeFromBasket,
        clearBasket,
        getTotalItems,
        changeQuantity, 
        getSubTotal,
        getTax, 
        getShipping,
        getTotal
      }}
    >
      {children}
    </BasketContext.Provider>
  );
}