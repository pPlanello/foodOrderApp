import { useRef, useState } from 'react';

import Input from '../shared/Input';
import classes from './MealItemForm.module.css';

const MealItemFrom = (props) => {
    const [amountIsValid, setAmountIsValid] = useState(true);
    const amountInputRef = useRef();

    const submitHandler = (event) => {
        event.preventDefault();

        const enteredAmount = +(amountInputRef.current.value); // Parse string to number with +

        if (amountInputRef.current.value.trim().length === 0
            || enteredAmount < 1 || enteredAmount > 5) {
            setAmountIsValid(false);
            return;
        }

        props.onAddToCart(enteredAmount);
    };

    const inputConfig = {
        id: 'amount' + props.id,
        type: 'number',
        min: '1',
        max: '5',
        step: '1',
        defaultValue: '1'
    };

    return (
        <form className={classes.form} onSubmit={submitHandler}>
            <Input
                ref={amountInputRef}
                label='Amount'
                input={inputConfig}/>
            <button>Add</button>
            {!amountIsValid && <p style={{color: 'red'}}>Please enter a valid amount (1-5).</p>}
        </form>
    );
};

export default MealItemFrom;