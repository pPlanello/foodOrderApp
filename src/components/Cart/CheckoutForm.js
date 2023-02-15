import { useRef, useState } from 'react';

import classes from './CheckoutForm.module.css';

const isEmpty = (value) => value.trim() === '';
const isMoreFiveChars = (value) => value.trim().length > 5;

const CheckoutForm = (props) => {
    const [formInputsValidity, setFormInputsValidity] = useState({
        name: true,
        street: true,
        city: true,
        postal: true
    });

    const nameInputRef = useRef();
    const streetInputRef = useRef();
    const postalInputRef = useRef();
    const cityInputRef = useRef();

    const confirmHandler = (event) => {
        event.preventDefault();

        const name = nameInputRef.current.value;
        const street = streetInputRef.current.value;
        const postal = postalInputRef.current.value;
        const city = cityInputRef.current.value;

        const isNameValid = !isEmpty(name) && isMoreFiveChars(name);
        const isStreetValid = !isEmpty(street) && isMoreFiveChars(street);
        const isPostalValid = !isEmpty(postal) && isMoreFiveChars(postal);
        const isCityValid = !isEmpty(city) && isMoreFiveChars(city);

        setFormInputsValidity({
            name: isNameValid,
            street: isStreetValid,
            city: isPostalValid,
            postal: isCityValid
        });

        const isFormValid = isNameValid && isStreetValid && isPostalValid && isCityValid;

        if (!isFormValid) {
            return;
        }

        props.onSubmit({
            name,
            street,
            city,
            postal
        });
    }

    return (
        <form onSubmit={confirmHandler}>
            <div className={`${classes.control} ${formInputsValidity.name ? '' : classes.invalid}`}>
                <div className={classes.labelTitle}>
                    <label htmlFor='name'>Your Name</label>
                    {!formInputsValidity.name && <span>Incorrect or mandatory field</span>}
                </div>
                <input ref={nameInputRef} type='text' id='name' />
            </div>

            <div className={`${classes.control} ${formInputsValidity.street ? '' : classes.invalid}`}>
                <div className={classes.labelTitle}>
                    <label htmlFor='street'>Street</label>
                    {!formInputsValidity.street && <span>Incorrect or mandatory field</span>}
                </div>
                <input ref={streetInputRef} type='text' id='street' />
            </div>

            <div className={`${classes.control} ${formInputsValidity.postal ? '' : classes.invalid}`}>
                <div className={classes.labelTitle}>
                    <label htmlFor='postal'>Postal Code</label>
                    {!formInputsValidity.postal && <span>Incorrect or mandatory field</span>}
                </div>
                <input ref={postalInputRef} type='text' id='postal' />
            </div>

            <div className={`${classes.control} ${formInputsValidity.city ? '' : classes.invalid}`}>
                <div className={classes.labelTitle}>
                    <label htmlFor='city'>City</label>
                    {!formInputsValidity.city && <span>Incorrect or mandatory field</span>}
                </div>
                <input ref={cityInputRef} type='text' id='city' />
            </div>

            <div className={classes.actions}>
                <button type='button' onClick={props.onCancel}>Cancel</button>
                <button className={classes.submit}>Confirm</button>
            </div>
        </form>);
};

export default CheckoutForm;
