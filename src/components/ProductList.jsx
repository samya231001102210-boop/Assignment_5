
import React from "react";
import { useCart } from "../context/CartContext";

const products = [
  {
    id: 1,
    name: "Laptop",
    price: 55000
  },
  {
    id: 2,
    name: "Smartphone",
    price: 25000
  },
  {
    id: 3,
    name: "Headphones",
    price: 2000
  },
  {
    id: 4,
    name: "Smart Watch",
    price: 5000
  },
  {
    id: 5,
    name: "Keyboard",
    price: 1500
  },
  {
    id: 6,
    name: "Camera",
    price: 35000
  }
];

function ProductList() {
  const { dispatch } = useCart();

  return (
    <section className="products-section">

      <h2>Our Products</h2>

      <div className="product-grid">

        {products.map(product => (

          <div className="product-card" key={product.id}>

            <h3>{product.name}</h3>

            <p className="price">
              ₹{product.price.toLocaleString("en-IN")}
            </p>

            <button
              onClick={() =>
                dispatch({
                  type: "ADD_TO_CART",
                  payload: product
                })
              }
            >
              Add to Cart
            </button>

          </div>

        ))}

      </div>

    </section>
  );
}

export default ProductList;
