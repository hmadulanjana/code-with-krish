import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Order from "./pages/Orders";
import Customer from "./pages/Customers";
import Product from "./pages/Products";
import NavBar from "./components//NavBar";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <div className="container d-flex flex-column justify-content-center align-items-center min-vh-100">
        <Routes>
          <Route path="/" element={<Order />} />
          <Route path="/product" element={<Product/>} />
          <Route path="/customer" element={<Customer/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
