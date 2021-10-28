import classes from './header.module.css'

const header = () => {
    return (
        <div>
            <img className={classes.bgImg} src="https://images.unsplash.com/photo-1544716278-e513176f20b5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1074&q=80" />
        </div>
    );
}

export default header;
