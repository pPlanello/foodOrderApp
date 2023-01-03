import { useContext } from 'react';

import CartItem from './CartItem';
import CartContext from '../context/CartContext';
import Modal from '../shared/Modal/Modal';
import classes from './Cart.module.css';

const Cart = (props) => {
    const cartContext = useContext(CartContext);

    const totalAmount = cartContext.totalAmount.toFixed(2);
    const hasItems = cartContext.items.length > 0;
    
    const cartItemAddHandler = (item) => {
        cartContext.addItem(item);
    };

    const cartItemRemoveHandler = (id) => {
        cartContext.removeItem(id);
    };

    return (
        <Modal onClose={props.onClose}>
            <ul>
                {cartContext.items.map(item =>
                    <CartItem
                        key={item.id}
                        name={item.name}
                        amount={item.amount}
                        price={item.price}
                        onAdd={cartItemAddHandler.bind(null, item)}
                        onRemove={cartItemRemoveHandler.bind(null, item.id)}/>
                )}
            </ul>
            <div className={classes.total}>
                <span>Total Amount:</span>
                <span>{totalAmount} €</span>
            </div>
            <div className={classes.actions}>
                <button
                    className={classes['button--alt']}
                    onClick={props.onClose}>
                    Close
                </button>
                <button
                    className={classes.button}
                    onClick={props.onOrder}
                    disabled={!hasItems}>
                    Order
                </button>
            </div>
        </Modal>
    );
};

export default Cart;