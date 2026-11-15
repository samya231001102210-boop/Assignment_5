
import React, { useState } from "react";
import { useCart } from "../context/CartContext";

function Cart() {

  const { state, dispatch } = useCart();

  const [couponCode, setCouponCode] = useState("");
  const [message, setMessage] = useState("");

  // Calculate subtotal
  const subtotal = state.cart.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  );

  // Calculate discount
  const discountAmount =
    subtotal * state.discount / 100;

  // Calculate taxable amount
  const taxableAmount =
    subtotal - discountAmount;

  // Calculate GST
  const gst = taxableAmount * 18 / 100;

  // Calculate grand total
  const grandTotal = taxableAmount + gst;

  // Apply coupon
  const applyCoupon = () => {

    const code = couponCode.trim().toUpperCase();

    if (code === "SAVE10") {

      dispatch({
        type: "APPLY_COUPON",
        payload: {
          code: "SAVE10",
          discount: 10
        }
      });

      setMessage("10% discount applied successfully!");

    } else {

      dispatch({ type: "REMOVE_COUPON" });

      setMessage("Invalid coupon code!");

    }
  };

  return (

    <section className="cart-section">

      <h2>Shopping Cart</h2>

      {state.cart.length === 0 ? (

        <p className="empty-cart">
          Your cart is empty!
        </p>

      ) : (

        <>

          {/* Cart Items */}

          {state.cart.map(item => (

            <div className="cart-item" key={item.id}>

              <div className="item-details">

                <h3>{item.name}</h3>

                <p>
                  Price: ₹{item.price.toLocaleString("en-IN")}
                </p>

              </div>

              {/* Quantity Update */}

              <div className="quantity">

                <button
                  onClick={() =>
                    dispatch({
                      type: "UPDATE_QUANTITY",
                      payload: {
                        id: item.id,
                        quantity: item.quantity - 1
                      }
                    })
                  }
                >
                  -
                </button>

                <span>{item.quantity}</span>

                <button
                  onClick={() =>
                    dispatch({
                      type: "UPDATE_QUANTITY",
                      payload: {
                        id: item.id,
                        quantity: item.quantity + 1
                      }
                    })
                  }
                >
                  +
                </button>

              </div>

              {/* Item Total */}

              <p>
                ₹{(item.price * item.quantity).toLocaleString("en-IN")}
              </p>

              {/* Remove Item */}

              <button
                className="remove-btn"
                onClick={() =>
                  dispatch({
                    type: "REMOVE_ITEM",
                    payload: item.id
                  })
                }
              >
                Remove
              </button>

            </div>

          ))}

          {/* Coupon Section */}

          <div className="coupon">

            <h3>Apply Coupon</h3>

            <input
              type="text"
              placeholder="Enter coupon code"
              value={couponCode}
              onChange={e => setCouponCode(e.target.value)}
            />

            <button onClick={applyCoupon}>
              Apply Coupon
            </button>

            <p>{message}</p>

            {state.coupon && (

              <button
                className="remove-btn"
                onClick={() => {
                  dispatch({ type: "REMOVE_COUPON" });
                  setMessage("Coupon removed!");
                  setCouponCode("");
                }}
              >
                Remove Coupon
              </button>

            )}

            <p>
              Available Coupon: <b>SAVE10</b>
            </p>

          </div>

          {/* Bill Summary */}

          <div className="bill">

            <h3>Order Summary</h3>

            <p>
              <span>Subtotal:</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </p>

            <p>
              <span>Discount ({state.discount}%):</span>
              <span>-₹{discountAmount.toFixed(2)}</span>
            </p>

            <p>
              <span>GST (18%):</span>
              <span>₹{gst.toFixed(2)}</span>
            </p>

            <hr />

            <h2>
              <span>Grand Total:</span>
              <span>₹{grandTotal.toFixed(2)}</span>
            </h2>

          </div>

        </>

      )}

    </section>

  );
}

export default Cart;
