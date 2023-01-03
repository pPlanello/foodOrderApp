import Modal from '../shared/Modal/Modal';
import classes from './Cart.module.css';

const Cart = (props) => {

    const cartItems = props.cartItems.map(item => <li>{item.name}</li>);

    return (
        <Modal onClose={props.onClose}>
            {cartItems}
            <div className={classes.total}>
                <span>Total Amount:</span>
                <span></span>
            </div>
            <div className={classes.actions}>
                <button className={classes['button--alt']} onClick={props.onClose}>Close</button>
                <button className={classes.button} onClick={props.onOrder}>Order</button>
            </div>
        </Modal>
    );
};

export default Cart;