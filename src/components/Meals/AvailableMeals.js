import { useEffect, useState } from 'react';
import Card from '../shared/Card';
import classes from './AvailableMeals.module.css';
import MealItem from './MealItem';
import { db } from '../firebase/firebase';
import { onValue, ref } from 'firebase/database';

const AvailableMeals = (props) => {
    const [meals, setMeals] = useState([]);

    useEffect(() => {
        return getMeals(setMeals);
    }, []);

    const mealsList = meals.map(meal =>
        <MealItem
            key={meal.id}
            id={meal.id}
            name={meal.name}
            description={meal.description}
            price={meal.price} />
    );

    return (
        <section className={classes.meals}>
            <Card>
                <ul>
                    {mealsList}
                </ul>
            </Card>
        </section>
    );
};

export default AvailableMeals;


const getMeals = (setMeals) => {
    const query = ref(db, 'meals');

    return onValue(query, snapshot => {
        const data = snapshot.val();

        const transforMeals = [];

        Object.keys(data).forEach(key => {
            let meal = data[key];

            transforMeals.push({
                id: key,
                name: meal.name,
                description: meal.description,
                price: meal.price
            });
        });

        setMeals(transforMeals);
    });
}