import Input from '../shared/Input';
import classes from './MealItemForm.module.css';

const MealItemFrom = (props) => {
    const inputConfig = {
        id: 'amount',
        type: 'number',
        min: '1',
        max: '5',
        step: '1',
        defaultValue: '1'
    };
    return (
        <form className={classes.form}>
            <Input label="Amount" input={inputConfig}/>
            <button>Add</button>
        </form>
    );
};

export default MealItemFrom;