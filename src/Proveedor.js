import React,{Component} from 'react';
import './Proveedor.css';
import Input from './Components/Input'

class Proveedor extends Component {

    constructor(props){
      super(props)
      this.state ={
        itemsProv: []
      }
    }

    componentDidMount(){
      if(localStorage.getItem("HisProv")==null){
        return null
      }
      else{
        this.FillProvTable();
      }
    }

    FillProvTable = () =>{
      this.setState({
        itemsProv: JSON.parse(localStorage.getItem("HisProv"))
    })
    }

  ToTableProv = (e) =>{
    /*this.setState = ({
        [e.target.title]: e.target.value
    })*/
    let partialState = {};
    partialState[e.target.title] = e.target.value;
    this.setState(partialState);
  }

  ToHistoryProv = (e) =>{
    e.preventDefault();
    let ID;
    if(localStorage.getItem("HisProv")==null){
      ID=0;
    }
    else{
      ID= JSON.parse(localStorage.getItem("HisProv")).length;
    }

    let history = {
      Id_Producto: ID,
      Nombre_Proveedor: this.state.Nombre_Proveedor,
      Direccion: this.state.Direccion,
      Numero_Telefono: this.state.Numero_Telefono
    }

    if(localStorage.getItem('HisProv') == null){
      let histories = [];
      histories.push(history);
      localStorage.setItem("HisProv", JSON.stringify(histories));
    }
    else{
      let histories = JSON.parse(localStorage.getItem('HisProv'));
      histories.push(history);
      localStorage.setItem("HisProv", JSON.stringify(histories));
    }
    this.componentDidMount();
  }

  render(){
    return (
      <div className="Proveedor">
        <div className="input-wrapper">
          <h1>Proveedor</h1>
          <form onSubmit={this.ToHistoryProv}>
            <Input title="Nombre_Proveedor" handleChange={this.ToTableProv} type="text"></Input>
            <Input title="Direccion" handleChange={this.ToTableProv} type="text"></Input>
            <Input title="Numero_Telefono" handleChange={this.ToTableProv} type="number"></Input>
            <div>
              <button type="submit" class="btn btn-secondary">Ejecutar</button>
            </div>
          </form>
        </div>
        <div className="table-wrapper">
            <table className="table table-striped table-dark">
                   <thead>
                        <th>Id_Proveedor</th>
                        <th>Nombre_Proveedor</th>
                        <th>Direccion</th>
                        <th>Numero_Telefono</th>
                   </thead>
                   <tbody>
                   {this.state.itemsProv.map((item) => (
                        <tr>
                        <td>{ item.Id_Proveedor }</td>
                        <td>{ item.Nombre_Proveedor }</td>
                        <td>{ item.Direccion }</td>
                        <td>{ item.Numero_Telefono }</td>
                        <td><button type="button" class="btn btn-info">Actualizar</button></td>
                        <td><button type="button" class="btn btn-danger">Eliminar</button></td>
                        </tr>
                   ))}
                   </tbody>
                </table>       
            </div>
      </div>
      )
  }
}

export default Proveedor;
