import { useContext } from 'react';

import classes from './ButtonToolBar.module.css';
import CartIcon from '../../assets/CartIcon';
import CartContext from '../../context/CartContext';

const ButtonToolBar = (props) => {

    const cartContext = useContext(CartContext);

    const numberOfCartItems = cartContext.items.reduce((currentNumber, item) => {
        return currentNumber + item.amount;
    }, 0);

    return (
        <button onClick={props.onClick} className={classes.button}>
            <span className={classes.icon}><CartIcon /></span>
            <span>Your Cart</span>
            <span className={classes.badge}>{numberOfCartItems}</span>
        </button>
    );
};

export default ButtonToolBar;