import foodImage from '../assets/food_background.jpg'
import ButtonToolBar from './ButtonToolBar/ButtonToolBar';
import classes from './ToolBar.module.css';

const ToolBar = (props) => {

    return (<>
        <header className={classes.header}>
            <h1>JustFood</h1>
            <ButtonToolBar onClick={props.onShowCart}/>
        </header>
        <div className={classes['main-image']}>
            <img src={foodImage} alt="Food background"/>
        </div>
    </>);
}

export default ToolBar;