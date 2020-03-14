import React,{Component} from 'react';
import './Proveedor.css';
import Input from './Components/Input'

class Proveedor extends Component {
  render(){
    return (
      <div className="Proveedor">
        <h1>Proveedor</h1>
        <form>
          <Input title="NombreProveedor"></Input>
          <Input title="Direccion"></Input>
          <Input title="Numero Telefono"></Input>
        </form>
      </div>
      )
  }
}

export default Proveedor;
