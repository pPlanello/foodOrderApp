import { useContext, useState } from 'react';

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
            {isCheckout && <CheckoutForm onCancel={props.onClose}/>}
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