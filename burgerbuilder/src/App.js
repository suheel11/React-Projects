import React, { Component } from 'react';
import './App.css';
import Layout from './components/Layout/Layout.js';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder.js';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Checkout from './containers/Checkout/Checkout';

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
        <Layout>
        <Switch>
            <Route path='/' exact component={BurgerBuilder}/>
            <Route path='/checkout' component={Checkout}/>
            <Route path='/order' exact render={()=><h1>Your order has been booked</h1>}/>
            <Route render={()=><h1>Page Not found</h1>}/>
        </Switch>
        </Layout>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
