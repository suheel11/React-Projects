import React, { Component} from 'react';
import Aux from '../../hoc/Aux.js';
import classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar.js';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer.js';

class Layout extends Component{
    state = {
        showSideDrawer:false
    }

    sideDrawerHandler = () =>{
        this.setState({showSideDrawer:false});
    }

    sideDrawerToggleHandler = ((prevState)=>{
        return this.setState({showSideDrawer:!prevState.showSideDrawer})
    })
    render(){
        return(
            <Aux>
                <Toolbar click={this.sideDrawerToggleHandler}/>
                <SideDrawer open={this.state.showSideDrawer}
                click={this.sideDrawerHandler}/>
                <main className={classes.Content}>
                {this.props.children}
                </main>
                
            </Aux>
        )
    }
}

export default Layout;