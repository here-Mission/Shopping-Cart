import ProductCard from "./ProductCard";
import { ProductProvider } from "../Context/ProductContext";
import { useProduct } from "../Context/ProductContext";
const ProductList = () => {
    const {products,loading,error} = useProduct();
    return ( 
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {loading &&<p>Loading....</p>}
      {error &&<div className="error">{error}</div>}
        {products.map((product)=>(
            <ProductCard product={product} key={product.id}/>
          

        ))}
      </div>
     );
} 
 
export default ProductList;