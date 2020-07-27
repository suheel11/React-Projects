import React from 'react';
import classes from './Toolbar.css';
import Logo from '../../Logo/Logo.js';
import NavigationItems from '../NavigationItems/NavigationItems.js';
import Menu from '../../Menu/Menu.js';

const toolbar = (props) => {
    return(
        <div className={classes.Toolbar}>
            <Menu click={props.click} />
            <div className={classes.Logo}>
            <Logo/>
            </div>
            <nav className={classes.DesktopOnly}>
                <NavigationItems />
            </nav>
        </div>
    )
}

export default toolbar;