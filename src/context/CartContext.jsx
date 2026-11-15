
import React, { createContext, useContext, useReducer } from "react";

const CartContext = createContext();

const initialState = {
  cart: [],
  coupon: "",
  discount: 0
};

function cartReducer(state, action) {
  switch (action.type) {

    case "ADD_TO_CART": {
      const existing = state.cart.find(
        item => item.id === action.payload.id
      );

      if (existing) {
        return {
          ...state,
          cart: state.cart.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        };
      }

      return {
        ...state,
        cart: [
          ...state.cart,
          { ...action.payload, quantity: 1 }
        ]
      };
    }

    case "REMOVE_ITEM":
      return {
        ...state,
        cart: state.cart.filter(
          item => item.id !== action.payload
        )
      };

    case "UPDATE_QUANTITY":
      return {
        ...state,
        cart: state.cart.map(item =>
          item.id === action.payload.id
            ? {
                ...item,
                quantity: Math.max(1, action.payload.quantity)
              }
            : item
        )
      };

    case "APPLY_COUPON":
      return {
        ...state,
        coupon: action.payload.code,
        discount: action.payload.discount
      };

    case "REMOVE_COUPON":
      return {
        ...state,
        coupon: "",
        discount: 0
      };

    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(
    cartReducer,
    initialState
  );

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
