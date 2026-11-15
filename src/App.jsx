
import React from "react";
import { CartProvider } from "./context/CartContext";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import "./App.css";

function App() {

  return (

    <CartProvider>

      <div className="app">

        <header>
          <h1>My Shopping Store</h1>
          <p>Shop your favourite products online!</p>
        </header>

        <ProductList />

        <Cart />

        <footer>
          <p>Copyright 2026 My Shopping Store</p>
        </footer>

      </div>

    </CartProvider>

  );
}

export default App;
