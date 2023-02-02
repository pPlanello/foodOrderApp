import { useEffect, useState } from 'react';
import Card from '../shared/Card';
import classes from './AvailableMeals.module.css';
import MealItem from './MealItem';
import { db } from '../firebase/firebase';
import { onValue, ref } from 'firebase/database';

const AvailableMeals = (props) => {
    const [meals, setMeals] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => getMeals(setMeals, setIsLoading), []);

    if (isLoading) {
        return (
            <section className={classes.MealsLoading}>
                <p>Loaging...</p>
            </section>
        );
    }

    return (
        <section className={classes.meals}>
            <Card>
                <ul>{
                    meals.map(meal =>
                        <MealItem
                            key={meal.id}
                            id={meal.id}
                            name={meal.name}
                            description={meal.description}
                            price={meal.price} />
                    )}
                </ul>
            </Card>
        </section>
    );
};

export default AvailableMeals;


const getMeals = (setMeals, setIsLoading) => {
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
        setIsLoading(false);
    });
}