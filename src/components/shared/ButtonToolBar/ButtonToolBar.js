import { useContext, useEffect, useState } from 'react';

import classes from './ButtonToolBar.module.css';
import CartIcon from '../../assets/CartIcon';
import CartContext from '../../context/CartContext';

const ButtonToolBar = (props) => {

    const [buttonIsHighlighed, setButtonIsHighlighed] = useState(false);

    const cartContext = useContext(CartContext);

    const numberOfCartItems = cartContext.items.reduce((currentNumber, item) => {
        return currentNumber + item.amount;
    }, 0);

    const buttonClasses = `${classes.button} ${buttonIsHighlighed ? classes.bump : ''}`;

    useEffect(() => {
        if (cartContext.items.length === 0) {
            return;
        }
        setButtonIsHighlighed(true);

        const timer = setTimeout(() => setButtonIsHighlighed(false), 300);

        return () => {
            clearTimeout(timer);
        };
    }, [cartContext]);

    return (
        <button onClick={props.onClick} className={buttonClasses}>
            <span className={classes.icon}><CartIcon /></span>
            <span>Your Cart</span>
            <span className={classes.badge}>{numberOfCartItems}</span>
        </button>
    );
};

export default ButtonToolBar;