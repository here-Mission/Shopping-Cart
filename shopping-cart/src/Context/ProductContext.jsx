import { createContext, useContext, useState, useEffect } from "react";

// ✅ Context creation
export const ProductContext = createContext();

export function ProductProvider({ children }) {
  // ❗ Fix capitalization of setLoading
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // ✅ Fix the fetch path (add leading slash)
        const res = await fetch("/api/products");
        if (!res.ok) throw new Error("Not able to fetch");
        const data = await res.json();
        console.log(data);
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false); // ✅ Fix function name
      }
    };

    fetchProducts();
  }, []);

  return (
    <ProductContext.Provider value={{ loading, products, error }}>
      {children}
    </ProductContext.Provider>
  );
}

// ✅ Custom hook
export function useProduct() {
  return useContext(ProductContext);
}
