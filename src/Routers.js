import React, { Component } from 'react'
import {BrowserRouter , Route, Switch} from 'react-router-dom';
import Proveedor from './Proveedor'
import Producto from './Producto'
import Nav from './Components/Nav'

class Routers extends Component{
    render(){
        return(
            <div>
                <BrowserRouter>
                <Nav/>
                <Switch>
                    <Route exact path="/producto" component={Producto}></Route>
                    <Route exact path="/proveedor" component={Proveedor}></Route>
                </Switch>
                </BrowserRouter>

            </div>
        )
    }
}

export default Routers;