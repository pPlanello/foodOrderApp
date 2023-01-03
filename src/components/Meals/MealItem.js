import classes from './MealItem.module.css';
import MealItemFrom from './MealItemForm';

const MealItem = (props) => {

    const price = `${props.price.toFixed(2)} €`;

    return (
        <li className={classes.meal}>
            <div>
                <h3>{props.title}</h3>
            </div>
            <div className={classes.description}>
                {props.description}
            </div>
            <div className={classes.price}>
                {price}
            </div>
            <div>
                <MealItemFrom />
            </div>
        </li>
    );
};

export default MealItem;