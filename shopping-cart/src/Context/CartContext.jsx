import { useContext, createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
    const [cart, setCart] = useState(() => {
  try {
    const stored = localStorage.getItem('cart');
    const parsed = stored ? JSON.parse(stored) : [];

    // Ensure parsed is an array
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error("Failed to load cart from localStorage:", error);
    return [];
  }
});


    useEffect(()=>{
        localStorage.setItem('cart',JSON.stringify(cart));

    },[cart]);

    const removefromcart = (id) => {
    setCart((prev) =>
        prev
            .map((item) =>
                item.id === id
                    ? { ...item, qty: item.qty - 1 }
                    : item
            )
            .filter((item) => item.qty > 0) // remove if qty is now 0
    );
};

    const resetcart=()=>{
        setCart([]);
    }

    const addtoCart = (product) => {
        setCart((prev) => {
            const existing = prev.find((item) => item.id === product.id);
            
            if (existing) {
                return prev.map((item) =>
                    item.id === product.id
                        ? { ...item, qty: item.qty + 1 }
                        : item
                );
            }

            return [...prev, { ...product, qty: 1 }];
        });
    };

    return (
        <CartContext.Provider value={{ cart, addtoCart,removefromcart,resetcart }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    return useContext(CartContext);
}
