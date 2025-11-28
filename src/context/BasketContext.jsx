import { createContext, useState, useEffect, use } from "react";

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

  const addToBasket = (item) => {
    setBasket((prev) => [...prev, item]);
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
      }}
    >
      {children}
    </BasketContext.Provider>
  );
}
