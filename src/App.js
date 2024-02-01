import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "components/Navbar";
import Home from "pages/Home";
import ProductList from "pages/product/ProductList";
import CartList from "pages/cart/CartList";
import UserList from "pages/user/UserList";

function App() {
  return (
    <BrowserRouter>
      <div className="relative flex flex-col">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product" element={<ProductList />} />
          <Route path="/cart" element={<CartList />} />
          <Route path="/user" element={<UserList />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
