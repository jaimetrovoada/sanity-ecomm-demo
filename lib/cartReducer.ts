import { createContext, useContext } from "react";

export type CartProduct = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  size: string;
};

export interface CartState {
  cartItems: CartProduct[];
  totalPrice: number;
}

export enum CartActions {
  ADD_ITEM = "ADD_ITEM",
  REMOVE_ITEM = "REMOVE_ITEM",
  CLEAR_CART = "CLEAR_CART",
  INCREMENT_QUANTITY = "INCREMENT_QUANTITY",
  DECREMENT_QUANTITY = "DECREMENT_QUANTITY",
}

export type CartAction = {
  type: CartActions;
  payload: CartProduct;
};

const initialState = {
  cartItems: [],
  totalPrice: 0,
};

export const cartReducer = (state: CartState, action: CartAction) => {
  switch (action.type) {
    case CartActions.ADD_ITEM:
      return {
        cartItems: [...state.cartItems, action.payload],
        totalPrice: state.totalPrice + action.payload.price,
      };
    case CartActions.REMOVE_ITEM:
      return {
        cartItems: state.cartItems.filter(
          (item) => item.id !== action.payload.id,
        ),
        totalPrice:
          state.totalPrice - action.payload.price * action.payload.quantity,
      };
    case CartActions.CLEAR_CART:
      return {
        cartItems: [],
        totalPrice: 0,
      };
    case CartActions.INCREMENT_QUANTITY:
      return {
        cartItems: state.cartItems.map((item) => {
          if (item.id === action.payload.id) {
            return { ...item, quantity: action.payload.quantity };
          }
          return item;
        }),
        totalPrice: state.totalPrice + action.payload.price,
      };
    case CartActions.DECREMENT_QUANTITY:
      return {
        cartItems: state.cartItems.map((item) => {
          if (item.id === action.payload.id) {
            return { ...item, quantity: action.payload.quantity };
          }
          return item;
        }),
        totalPrice: state.totalPrice - action.payload.price,
      };
    default:
      return state;
  }
};

type CartConextType = {
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
};
export const CartContext = createContext<CartConextType>({
  state: initialState,
  dispatch: () => {},
});

// The useCart hook for accessing the shopping cart state
export const useCart = () => {
  const { state, dispatch } = useContext(CartContext);
  return { state, dispatch };
};
