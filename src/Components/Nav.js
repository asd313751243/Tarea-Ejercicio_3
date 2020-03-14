import React from 'react'
import './Nav.css'
import {Link} from 'react-router-dom'

function Nav(){

    const color ={
        color: 'white'
    }

    return(
    <nav>
        <ul className="link">
            <Link style={color} to="/producto">
            <li>Producto</li>
            </Link>
            <Link style={color} to="/proveedor">
            <li>Proveedor</li>
            </Link>
        </ul>
    </nav>
    )
    }

export default Nav;