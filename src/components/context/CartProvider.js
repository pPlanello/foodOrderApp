import { useReducer } from "react";

import CartContext from "./CartContext";

const defaultCartState = {
    items: [],
    totalAmount: 0
};

const cartReducer = (state, action) => {
    if (action.type === 'ADD_ITEM') {
        const updateItems = state.items.concat(action.item);
        const updateTotalAmount = state.totalAmount + (action.item.price * action.item.amount);
        return {
            items: updateItems,
            totalAmount: updateTotalAmount
        };
    }

    if (action.type === 'DELETE_ITEM') {
        const updateItems = state.items.concat(action.item);
        const updateTotalAmount = state.totalAmount - (action.item.price * action.item.amount);
        return {
            items: updateItems,
            totalAmount: updateTotalAmount
        };
    }

    return defaultCartState;
};

const CartProvider = (props) => {

    const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState);

    const addItemToCart = (item) => {
        dispatchCartAction({type: 'ADD_ITEM', item});
    };

    const removeItemToCart = (id) => {
        dispatchCartAction({type: 'DELETE_ITEM', id});
    };

    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToCart,
        removeItem: removeItemToCart
    };

    return (
        <CartContext.Provider value={cartContext}>
            {props.children}
        </CartContext.Provider>
    );
};

export default CartProvider;