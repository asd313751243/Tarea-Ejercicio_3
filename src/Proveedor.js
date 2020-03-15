import React,{Component} from 'react';
import './Proveedor.css';
import Input from './Components/Input'

class Proveedor extends Component {

    constructor(props){
      super(props)
      this.state ={
        itemsProv: [],
        Id_Proveedor: -1
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
      Id_Proveedor: ID,
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
      if(this.state.Id_Proveedor != -1){
        histories[this.state.Id_Proveedor].Nombre_Proveedor = this.state.Nombre_Proveedor;
        histories[this.state.Id_Proveedor].Direccion = this.state.Direccion;
        histories[this.state.Id_Proveedor].Numero_Telefono = this.state.Numero_Telefono;
      }
      else{
        histories.push(history);
      }
      localStorage.setItem("HisProv", JSON.stringify(histories));
    }
    this.setState({
      Id_Proveedor: -1,
      Nombre_Proveedor: "",
      Direccion: "",
      Numero_Telefono: ""
    })
    this.componentDidMount();
  }

  ToUpdateProv = (val) =>{

    this.setState({
        Id_Proveedor: this.state.itemsProv[val].Id_Proveedor,
        Nombre_Proveedor: this.state.itemsProv[val].Nombre_Proveedor,
        Direccion: this.state.itemsProv[val].Direccion,
        Numero_Telefono: this.state.itemsProv[val].Numero_Telefono
    })
    //alert(this.state.Nombre_Producto);
  }  

  ToPreviewProv = (e) =>{
    /*this.setState = ({
        [e.target.title]: e.target.value
    })*/
    let partialState = {};
    partialState[e.target.title] = e.target.value;
    this.setState(partialState);
  }

  render(){
    return (
      <div className="Proveedor">
        <div className="input-wrapper">
          <h1>Proveedor</h1>
          <form onSubmit={this.ToHistoryProv}>
            <Input title="Nombre_Proveedor" handleChange={this.ToPreviewProv} type="text" data={this.state.Nombre_Proveedor}></Input>
            <Input title="Direccion" handleChange={this.ToPreviewProv} type="text" data={this.state.Direccion}></Input>
            <Input title="Numero_Telefono" handleChange={this.ToPreviewProv} type="number" data={this.state.Numero_Telefono}></Input>
            <div className="button-wrapper">
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
                        <td><button type="button" class="btn btn-info"onClick={()=>this.ToUpdateProv(item.Id_Proveedor)}>Actualizar</button></td>
                        <td><button type="button" class="btn btn-danger"onClick={()=>this.ToDeleteProv(item.Id_Proveedor)}>Eliminar</button></td>
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
