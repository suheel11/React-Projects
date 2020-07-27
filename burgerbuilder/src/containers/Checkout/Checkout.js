import React, {Component} from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import {Route} from 'react-router-dom';
import ContactData from '../../components/ContactData/ContactData';

class Checkout extends Component {
    state={
        ingredients:{
            bacon:1,
            meat:1,
            cheese:1,
            salad:1
        }
    }

    componentDidMount(){
        const query = new URLSearchParams(this.props.location.search);
        const ingredients ={};
        for(let param of query.entries()){
            //['salad','1']
            console.log('param[0]'+param[0]);
            console.log('param[1]'+param[1]);
            ingredients[param[0]] = +param[1];
        }
        this.setState({ingredients:ingredients});
    }

    cancelOrderHandler= ()=>{
        this.props.history.goBack();
    }

    contOrderHandler = ()=>{
        this.props.history.replace('/checkout/contact-data');
    }
    render(){
        return(
            <div>
                <CheckoutSummary cancelOrder={this.cancelOrderHandler} contOrder={this.contOrderHandler} ingredients={this.state.ingredients}/>
                <Route path={this.props.match.path +'/contact-data'} component={ContactData}/>
            </div>
        )
    }
}

export default Checkout;