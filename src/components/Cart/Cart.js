import classes from './Cart.module.css';

const Cart = (props) => {

    const cartItems = props.cartItems.map(item => <li>{item.name}</li>);

    return (
        <div>
            {cartItems}
            <div className={classes.total}>
                <span>Total Amount:</span>
                <span></span>
            </div>
            <div className={classes.actions}>
                <button className={classes['button--alt']}>Close</button>
                <button className={classes.button}>Order</button>
            </div>
        </div>
    );
};

export default Cart;