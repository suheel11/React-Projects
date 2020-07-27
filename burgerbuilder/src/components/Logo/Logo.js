import React from 'react';
import logoImage from '../../assets/images/burger-logo.png';
import classes from './Logo.css';

const logo = (props)=> {
    return(
        <div className={classes.Logo} style={{height:props.height}}>
            <img src={logoImage} alt='MyBurger'/>
        </div>
    )
}

export default logo;
