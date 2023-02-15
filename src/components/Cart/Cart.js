import { useContext, useState } from 'react';
import { db } from '../firebase/firebase';
import { ref, set } from 'firebase/database';
import { v4 as uuid } from 'uuid';

import CartItem from './CartItem';
import CartContext from '../context/CartContext';
import Modal from '../shared/Modal/Modal';
import classes from './Cart.module.css';
import CheckoutForm from './CheckoutForm';

const Cart = (props) => {
    const [isCheckout, setIsCheckout] = useState(false);
    const [isSubmitOrder, setIsSubmitOrder] = useState(false);
    const [idOrder, setIdOrder] = useState(null);

    const cartContext = useContext(CartContext);

    const totalAmount = cartContext.totalAmount.toFixed(2);
    const hasItems = cartContext.items.length > 0;

    const cartItemAddHandler = (item) => {
        cartContext.addItem(item);
    };

    const cartItemRemoveHandler = (id) => {
        cartContext.removeItem(id);
    };

    const orderCardHandler = () => {
        setIsCheckout(true);
    }

    const submitOrderHandler = (userData) => {
        const orderData = {
            user: userData,
            orderItems: cartContext.items,
            orderDate: new Date().toISOString()
        }

        submitOrderMealsFromFirebase(orderData, setIdOrder, setIsSubmitOrder);

        if (idOrder) {
            cartContext.clearCart();
        }
    }

    // Components HTML
    const cartItemsHTML = (cartContext.items.map(item =>
        <CartItem
            key={item.id}
            name={item.name}
            amount={item.amount}
            price={item.price}
            onAdd={cartItemAddHandler.bind(null, item)}
            onRemove={cartItemRemoveHandler.bind(null, item.id)} />));

    const userFormHTML = (isCheckout && <CheckoutForm onSubmit={submitOrderHandler} onCancel={props.onClose} />);

    const buttonActionsHTML = (!isCheckout &&
        <div className={classes.actions}>
            <button
                type='button'
                onClick={props.onClose}>
                Close
            </button>
            <button
                className={classes.submit}
                onClick={orderCardHandler}
                disabled={!hasItems}>
                Order
            </button>
        </div>
    );

    return (
        <Modal onClose={props.onClose}>
            {!isSubmitOrder && (<>
                <ul className={classes['cart-items']}>
                    {cartItemsHTML}
                </ul>
                <div className={classes.total}>
                    <span>Total Amount:</span>
                    <span>{totalAmount} €</span>
                </div>
                {userFormHTML}
                {buttonActionsHTML}
            </>)}

            {isSubmitOrder && (<>
                <p>The order was send correctly with <strong>ID: {idOrder}</strong></p>
                <div className={classes.actions}>
                    <button
                        type='button'
                        onClick={props.onClose}>
                        Close
                    </button>
                </div>
            </>)}
        </Modal>
    );
};

export default Cart;


const submitOrderMealsFromFirebase = (orderData, setIdOrder, setIsSubmitOrder) => {

    const idOrder = uuid();

    const ordersDataBase = ref(db, 'orders/' + idOrder);

    set(ordersDataBase, orderData)
        .then(() => {
            console.info("Data update correctly with ID=" + idOrder);
            setIdOrder(idOrder);
            setIsSubmitOrder(true);
        })
        .catch((error) => {
            console.error(error);
            setIdOrder(null);
            setIsSubmitOrder(false);
        });
}