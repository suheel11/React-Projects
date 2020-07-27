import React, { Component } from 'react';
import Aux from '../../../hoc/Aux.js';
import Button from '../../UI/Button/Button.js';
import {Link} from 'react-router-dom';

class OrderSummary extends Component{
    componentWillUpdate(){
        console.log("updating")
    }
    render(){
        const order = Object.keys(this.props.ingredients)
    .map(ingkey =>{
    return <li key={ingkey}><span style={{textTransform: 'capitalize'}}>{ingkey} :</span>{this.props.ingredients[ingkey]}</li>
    })
    //console.log(order);
    return(
        <Aux>
            <h3>Order Summary</h3>
            <p>Your delecious order contains the following ingrdients</p>
            <ul>
                {order}
            </ul>
    <p>Price : <strong>${this.props.price.toFixed(2)}</strong></p>
            <p>Continue to Checkout ?</p>
            <Button btnType='Danger' click={this.props.clickCancel}>Cancel</Button>
            <Button btnType='Success' click={this.props.clickCont}>Continue</Button>
        </Aux>
    )
    }
}

export default OrderSummary;