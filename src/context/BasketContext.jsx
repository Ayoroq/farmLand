import { createContext, useState, useEffect } from "react";

export const BasketContext = createContext(null);

export default function BasketProvider({ children }) {
  // get the items in the basket if they already exists
  const [basket, setBasket] = useState(
    localStorage.getItem("basket")
      ? JSON.parse(localStorage.getItem("basket"))
      : []
  );

  // Update the localStorage when the basket item changes
  useEffect(() => {
    localStorage.setItem("basket", JSON.stringify(basket));
  }, [basket]);

  const addToBasket = (item, quantity = 1) => {
    if (basket.find((i) => i.id === item.id)) {
      setBasket((prev) => prev.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + quantity } : i)))
    } else {
      setBasket((prev) => [...prev, { ...item, quantity }]);
    }
  };

  const changeQuantity = (item, quantity) => {
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

  return (
    <BasketContext.Provider
      value={{
        basket,
        addToBasket,
        removeFromBasket,
        clearBasket,
        getTotalItems,
        changeQuantity
      }}
    >
      {children}
    </BasketContext.Provider>
  );
}