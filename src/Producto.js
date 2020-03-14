import React,{Component} from 'react';
import './Producto.css';
import Input from './Components/Input';

class Producto extends Component {

  render(){
    return (
        <div className="Producto">
            <h1>Producto</h1>
            <form>
                <Input title="Nombre_Producto"></Input>
                <Input title="Descripcion"></Input>
                <Input title="Fecha_Vencimiento"></Input>
                <Input title="Nombre_Proveedor"></Input>
            </form>
        </div>
      )
  }
}

export default Producto;