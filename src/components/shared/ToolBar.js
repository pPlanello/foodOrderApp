import foodImage from '../assets/food_background.jpg'
import ButtonToolBar from './ButtonToolBar';
import classes from './ToolBar.module.css';

const ToolBar = (props) => {
    return (<>
        <header className={classes.header}>
            <h1>JustFood</h1>
            <ButtonToolBar />
        </header>
        <div className={classes['main-image']}>
            <img src={foodImage} alt="Food background"/>
        </div>
    </>);
}

export default ToolBar;