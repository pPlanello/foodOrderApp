import { useContext, useState } from 'react';
import { db } from '../firebase/firebase';
import { ref, set } from 'firebase/database';
import { v4 as uuid} from 'uuid';

import CartItem from './CartItem';
import CartContext from '../context/CartContext';
import Modal from '../shared/Modal/Modal';
import classes from './Cart.module.css';
import CheckoutForm from './CheckoutForm';

const Cart = (props) => {
    const [isCheckout, setIsCheckout] = useState(false);
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
        submitOrderMealsFromFirebase(userData, cartContext.items);
    }

    return (
        <Modal onClose={props.onClose}>
            <ul className={classes['cart-items']}>
                {cartContext.items.map(item =>
                    <CartItem
                        key={item.id}
                        name={item.name}
                        amount={item.amount}
                        price={item.price}
                        onAdd={cartItemAddHandler.bind(null, item)}
                        onRemove={cartItemRemoveHandler.bind(null, item.id)} />
                )}
            </ul>
            <div className={classes.total}>
                <span>Total Amount:</span>
                <span>{totalAmount} €</span>
            </div>
            {isCheckout && <CheckoutForm onSubmit={submitOrderHandler} onCancel={props.onClose}/>}
            {
                !isCheckout &&
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
            }
        </Modal>
    );
};

export default Cart;


const submitOrderMealsFromFirebase = (userData, orderItems) => {

    const ordersBody = {
        user: userData,
        orderItems,
        orderDate: new Date().toISOString()
    }

    console.log(ordersBody)
    const idOrder = uuid();

    const ordersDataBase = ref(db, 'orders/' + idOrder)
    set(ordersDataBase, ordersBody).catch(alert);
}