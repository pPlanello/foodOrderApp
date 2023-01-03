import { useContext } from 'react';
import CartContext from '../context/CartContext';
import classes from './MealItem.module.css';
import MealItemFrom from './MealItemForm';

const MealItem = (props) => {

    const cartContext = useContext(CartContext);

    const price = `${props.price.toFixed(2)} €`;

    const addToCartHandler = (amount) => {
        cartContext.addItem({
            id: props.id,
            name: props.name,
            amount,
            price: props.price 
        });
    };

    return (
        <li className={classes.meal}>
            <div>
                <h3>{props.name}</h3>
            </div>
            <div className={classes.description}>
                {props.description}
            </div>
            <div className={classes.price}>
                {price}
            </div>
            <div>
                <MealItemFrom id={props.id} onAddToCart={addToCartHandler}/>
            </div>
        </li>
    );
};

export default MealItem;