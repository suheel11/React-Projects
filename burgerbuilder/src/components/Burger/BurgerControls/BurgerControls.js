import React from 'react';
import classes from './BurgerControls.css';
import BurgerControl from './BurgerControl/BurgerControl.js';

const controls = [
    {label:'Salad', type:'salad'},
    {label:'Meat', type:'meat'},
    {label:'Bacon', type:'bacon'},
    {label:'Cheese', type:'cheese'},
]

const burgerControls = (props) => {
    return(
        <div className={classes.BurgerControls}>
            <p>Current Price: $<strong>{props.price.toFixed(2)}</strong></p>
            {controls.map(cntl =>{
                return <BurgerControl 
                key={cntl.label} 
                label={cntl.label} 
                addIng={() => props.addIng(cntl.type)}
                removeIng={() => props.removeIng(cntl.type)}
                disabled={props.disabled[cntl.type]}
                />
            })}
            <button disabled={!props.purchasable} 
            className={classes.OrderButton}
            onClick={props.orderModal}>Order Now</button>
        </div>
    )
}

export default burgerControls;