import { useReducer } from "react";

import CartContext from "./CartContext";

const defaultCartState = {
    items: [],
    totalAmount: 0
};

const cartReducer = (state, action) => {
    if (action.type === 'ADD_ITEM') {
        const updateTotalAmount = state.totalAmount + (action.item.price * action.item.amount);

        const existingCardItemIndex = state.items.findIndex(item => item.id === action.item.id);
        const existingCardItem = state.items[existingCardItemIndex];

        let updatedItems;

        if (existingCardItem) {
            const updatedItem = {
                ...existingCardItem,
                amount: existingCardItem.amount + action.item.amount
            };

            updatedItems = [...state.items];
            updatedItems[existingCardItemIndex] = updatedItem;
        } else {
            updatedItems = state.items.concat(action.item);
        }

        return {
            items: updatedItems,
            totalAmount: updateTotalAmount
        };
    }

    if (action.type === 'DELETE_ITEM') {
        const existingCardItemIndex = state.items.findIndex(item => item.id === action.id);
        const existingCardItem = state.items[existingCardItemIndex];

        const updatedTotalAmount = state.totalAmount - existingCardItem.price;

        let updatedItems;

        if (existingCardItem.amount === 1) {
            updatedItems = state.items.filter(item => item.id !== action.id);
        } else {
            const updatedItem = { ...existingCardItem, amount: existingCardItem.amount - 1 };
            updatedItems = [...state.items];
            updatedItems[existingCardItemIndex] = updatedItem;
        }

        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        };
    }

    if (action.type === 'CLEAR') {
        return defaultCartState;
    }

    return defaultCartState;
};

const CartProvider = (props) => {

    const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState);

    const addItemToCart = (item) => {
        dispatchCartAction({ type: 'ADD_ITEM', item });
    };

    const removeItemToCart = (id) => {
        dispatchCartAction({ type: 'DELETE_ITEM', id });
    };

    const clearCartHandler = () => {
        dispatchCartAction({type: 'CLEAR'})
    };

    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToCart,
        removeItem: removeItemToCart,
        clearCart: clearCartHandler
    };

    return (
        <CartContext.Provider value={cartContext}>
            {props.children}
        </CartContext.Provider>
    );
};

export default CartProvider;