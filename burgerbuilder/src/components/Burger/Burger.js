import React from 'react';
import BurgerIngredients from './BurgerIngredients/BurgerIngredients.js';
import classes from './Burger.css';

const burger = (props) => {
    let transformedIngredients = Object.keys(props.ingredients)
    .map(ingKey => {
        return [...Array(props.ingredients[ingKey])].map((_,i) => {
            return <BurgerIngredients key={ingKey + i} type={ingKey} />
        });
    }
        ).reduce((ary,el) => {
            return ary.concat(el);
        },[]);
    
    if(transformedIngredients.length===0){
        transformedIngredients = (<p>Please start adding the products</p>)
    }
    return(
        <div className={classes.Burger}>
            <BurgerIngredients type="bread-top"/>
            {transformedIngredients}
            <BurgerIngredients type="bread-bottom"/>
        </div>
    );
}

export default burger;