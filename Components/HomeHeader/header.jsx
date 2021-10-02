import classes from './header.module.css'

const header = () => {
    return (
        <div>
            <img className={classes.bgImg} src="./images/Background.jpg" />
        </div>
    );
}

export default header;