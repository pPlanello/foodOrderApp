import classes from './ButtonToolBar.module.css';
import CartIcon from '../assets/CartIcon';

const ButtonToolBar = (props) => {
    return (
        <button className={classes.button}>
            <span className={classes.icon}><CartIcon /></span>
            <span>Your Cart</span>
            <span className={classes.badge}>3</span>
        </button>
    );
};

export default ButtonToolBar;