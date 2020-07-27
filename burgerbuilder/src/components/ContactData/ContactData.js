import React, { Component } from 'react';
import Button from '../UI/Button/Button';
import classes from './ContactData.css';

class ContactData extends Component{
    state={
        name:'',
        email:'',
        address:{
            street:'',
            postalCode:''
        }
    }

    orderHandler = ()=>{
        this.props.history.push('/order');
    }
    render(){
        return(
            <div className={classes.ContactData}>
                <form>
                <h4>Enter your Data</h4>
                <input className={classes.Input} type='text' name='name' placeholder='Your Name'/>
                <input className={classes.Input} type='text' name='email' placeholder='Your Email'/>
                <input className={classes.Input} type='text' name='street' placeholder='Street'/>
                <input className={classes.Input} type='text' name='postalCode' placeholder='Postal Code'/>
                </form>
                <Button btnType="Success" click={this.orderHandler}>Order</Button>
            </div>
        )
    }
}

export default ContactData;