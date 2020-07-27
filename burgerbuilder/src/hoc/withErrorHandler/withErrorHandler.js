import React, {Component} from 'react';
import Aux from '../Aux.js';
import Modal from '../../components/UI/Modal/Modal.js';

const error = (WrappedComponent, axios) =>{
return class extends Component {
    state ={
        error:null
    }
    ComponentDidMount(){
        axios.interceptors.request.use(req=>{
            this.setState({error:null});
            return req;
        });
        axios.interceptors.response.use(res => res,error=>{
            console.log("suheeee"+error);
            this.setState({error:error});
        });
    }

    errorComformed = () =>{
        this.setState({error:null});
    }
    render(){
        console.log("suheel"+this.state.error)
        return(
        <Aux>
            <Modal show={this.state.error}
            purchasingCancel={this.errorComformed}>
                {this.state.error ? this.state.error.message:null}
            </Modal>
            <WrappedComponent {...this.props}/>
        </Aux>
        )
    }
}
}

export default error;