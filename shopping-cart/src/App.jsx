import { useState,useEffect } from "react";
import ProductList from "./Components/ProductList";


const App = () => {
  const [loading,SetLoading]= useState(true);
  const [products,setProducts]= useState([]);
  const [error,setError]= useState(null);
  useEffect(() => {
    const fetchproducts= async () => {
      try {
        const res= await fetch("api/products");
        if(!res.ok) throw new Error("Not able to fetch");
        const data= await res.json();
        console.log(data);
        setProducts(data);

        
      } catch (err) {
        setError(err.message);
        
      }
      finally{
        SetLoading(false);
      }
      
    }
  
    fetchproducts()
  }, [])
  
  return ( 
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">Product catalog</h1>
      {loading &&<p>Loading....</p>}
      {error &&<div className="error">{error}</div>}
      <ProductList products={products} setProducts={setProducts}/>
      
    </div>
   );
}
 
export default App;