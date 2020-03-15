import React,{Component} from 'react';
import './Proveedor.css';
import Input from './Components/Input'

class Proveedor extends Component {

    constructor(props){
      super(props)
      this.state ={
        itemsProv: [],
        histories_prod: [],
        Id_Proveedor_update: -1
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
        itemsProv: JSON.parse(localStorage.getItem("HisProv")),
        histories_prod: JSON.parse(localStorage.getItem('HisProd'))
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
      Numero_Telefono: this.state.Numero_Telefono,
      Estado_Proveedor: "Activo"
    }

    if(localStorage.getItem('HisProv') == null){
      let histories = [];
      histories.push(history);
      localStorage.setItem("HisProv", JSON.stringify(histories));
    }
    else{
      let histories = JSON.parse(localStorage.getItem('HisProv'));
      if(this.state.Id_Proveedor_update != -1){
        histories[this.state.Id_Proveedor_update].Nombre_Proveedor = this.state.Nombre_Proveedor;
        histories[this.state.Id_Proveedor_update].Direccion = this.state.Direccion;
        histories[this.state.Id_Proveedor_update].Numero_Telefono = this.state.Numero_Telefono;
      }
      else{
        histories.push(history);
      }
      localStorage.setItem("HisProv", JSON.stringify(histories));
    }
    this.setState({
      Id_Proveedor_update: -1,
      Nombre_Proveedor: "",
      Direccion: "",
      Numero_Telefono: ""
    })
    this.componentDidMount();
  }

  ToUpdateProv = (val) =>{
    
    if(this.state.itemsProv[val].Estado_Proveedor == "Activo"){
      this.setState({
        Id_Proveedor_update: this.state.itemsProv[val].Id_Proveedor,
        Nombre_Proveedor: this.state.itemsProv[val].Nombre_Proveedor,
        Direccion: this.state.itemsProv[val].Direccion,
        Numero_Telefono: this.state.itemsProv[val].Numero_Telefono
    })
    }
    else{
      alert("El registro esta eliminado");
      return null
    }

    //alert(this.state.Nombre_Producto);
  }  

  ToDeleteProv = (id) =>{
    let evaluar = true;
    for(var i=0; i<this.state.histories_prod.length; i++){
      if(this.state.histories_prod[i].Id_Proveedor == this.state.itemsProv[id].Id_Proveedor 
        && this.state.histories_prod[i].Estado_Producto == "Activo"){
        evaluar = false;
      }
    }
    if(evaluar == false){
      alert("El registro tiene dependencias");
      return null
    }
    else{
      if(this.state.itemsProv[id].Estado_Proveedor == "Activo"){
        this.state.itemsProv[id].Estado_Proveedor = "Eliminado"
        localStorage.setItem("HisProv", JSON.stringify(this.state.itemsProv));
        this.componentDidMount();
      }
      else{
        alert("El registro esta eliminado");
        return null
      }
    }

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
                        <th>Estado_Proveedor</th>
                   </thead>
                   <tbody>
                   {this.state.itemsProv.map((item) => (
                        <tr>
                        <td>{ item.Id_Proveedor }</td>
                        <td>{ item.Nombre_Proveedor }</td>
                        <td>{ item.Direccion }</td>
                        <td>{ item.Numero_Telefono }</td>
                        <td>{ item.Estado_Proveedor }</td>
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
