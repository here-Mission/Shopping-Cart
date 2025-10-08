
import ProductList from "./Components/ProductList";
import Header from "./Components/header";

const App = () => {
  
  
  return ( 
  <>
    <Header/>
      <div className="min-h-screen bg-gray-100 p-6">
        <h1 className="text-3xl font-bold mb-6">Product Catalog</h1>
        <ProductList />
      </div>
      </>
   );
}
 
export default App;