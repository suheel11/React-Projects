import React,{ Component } from 'react';
import Aux from '../../hoc/Aux.js';
import Burger from '../../components/Burger/Burger.js';
import BurgerControls from '../../components/Burger/BurgerControls/BurgerControls.js';
import Modal from '../../components/UI/Modal/Modal.js';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary.js';
import axios from '../../AxiosOrders.js';
import Spinner from '../../components/UI/Spinner/Spinner.js';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler.js';

const INGREDIENT_PRICES = {
    salad:0.5,
    cheese:0.4,
    meat:1.3,
    bacon:0.7
}

class BurgerBuilder extends Component{
    state = {
        ingredients:null,
        price:0,
        purchasable:false,
        purchasing:false,
        loading:false
    }

    componentDidMount(){
        axios.get('https://react-my-burger-38432.firebaseio.com/ingredients.json')
        .then(response =>{
            this.setState({ingredients:response.data});
        })
    }
    upadtePurchasable= (ingredients) => {
        const total = Object.keys(ingredients).map(ing => {
            return ingredients[ing]
        }).reduce((sum,el)=>{
            return sum+el;
        },0)
        this.setState({purchasable:total>0});
    }
    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const newCount = oldCount-1;
        const updateIngredients = {
            ...this.state.ingredients
        }
        if(newCount >= 0){
            updateIngredients[type]=newCount;
        }else{
            updateIngredients[type]=0;
        }
        //or we can just put 
        // if(newCount < 0){
        //     return
        // }
        const oldPrice=this.state.price;
        let newPrice=oldPrice;
        if(newCount >= 0){
            newPrice=oldPrice-INGREDIENT_PRICES[type];
        }
        this.setState({
            ingredients:updateIngredients,
            price:newPrice
        })
        this.upadtePurchasable(updateIngredients);
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const newCount = oldCount +1
        const updateIngredients = {
            ...this.state.ingredients
        }
        updateIngredients[type] = newCount;
        const oldPrice= this.state.price;
        const newPrice=oldPrice+INGREDIENT_PRICES[type];
        this.setState({
            ingredients:updateIngredients,
            price:newPrice
        })
        this.upadtePurchasable(updateIngredients);
        }

    purchaseHandler = () =>{
        this.setState({purchasing:true});
    }

    purchaseCancelHandler = () =>{
        this.setState({purchasing:false});
    }

    purchaseContinueHandler = () => {
        //alert('Thank you for the order');
        // this.setState({loading:true});
        // const order = {
        //     ingredients:this.state.ingredients,
        //     price:this.state.price,
        //     customer:{
        //         name:'Suheel Vallamkonda',
        //         address:{
        //             street:'Street',
        //             zipcode:'1111',
        //             country:'USA'
        //         },
        //         email:'suh@suh.com',
        //     },
        //     deliveryMethod:'fast'
        // }
        // axios.post('/orders.json', order)
        // .then(res =>{
        //     console.log(res);
        //     this.setState({loading:false, purchasing:false})
        // })
        // .catch(error =>{
        //     console.log(error);
        //     this.setState({loading:false, purchasing:false});
        // })
        const queryParams =[];
        for(let i in this.state.ingredients){
            queryParams.push(encodeURIComponent(i)+'='+encodeURIComponent(this.state.ingredients[i]));
        }
        const queryString = queryParams.join('&');
        this.props.history.push({
            pathname:'/checkout',
            search: '?'+ queryString
        });
    }

    render(){
        const disabledInfo ={
            ...this.state.ingredients
        }
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <=0;
        }
        let orderSummary =null;
        let burger = <Spinner />;
        console.log(this.state.ingredients);
        if(this.state.ingredients){
            burger=(
                <Aux>
                <Burger ingredients={this.state.ingredients}/>
                <BurgerControls addIng={this.addIngredientHandler} 
                removeIng={this.removeIngredientHandler}
                price={this.state.price}
                purchasable={this.state.purchasable}
                orderModal={this.purchaseHandler}
                disabled={disabledInfo}/>
                </Aux>
            );
            orderSummary = (
                <OrderSummary ingredients={this.state.ingredients} 
                        clickCancel={this.purchaseCancelHandler}
                        clickCont={this.purchaseContinueHandler}
                        price={this.state.price}/>
            )   
        }
        if(this.state.loading){
            orderSummary = <Spinner />
        }
        return(
            <Aux>
                <Modal show={this.state.purchasing} purchasingCancel={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

export default withErrorHandler(BurgerBuilder, axios);