import React,{Component} from 'react';
import './Producto.css';
import Input from './Components/Input';

class Producto extends Component {

    constructor(props){
        super(props)
        this.state ={
            itemsProd: [],
            histories_prov: [],
            filtrar: [],
            Id_Producto_update: -1
        }
    }

    componentDidMount(){
        if(localStorage.getItem("HisProd")==null){
            return null;
        }
        else{
            this.FillProdTable();
        }
    }


    FillProdTable = () =>{
        
        this.setState({
            itemsProd: JSON.parse(localStorage.getItem("HisProd")),
            histories_prov: JSON.parse(localStorage.getItem('HisProv'))
        })
    }

    ToHistoryProd = (e) =>{
        e.preventDefault();
        let ID;
        if(localStorage.getItem("HisProd")==null){
            ID=0;
        }
        else{
            ID= JSON.parse(localStorage.getItem("HisProd")).length;
        }

        let history = {
            Id_Producto: ID,
            Nombre_Producto: this.state.Nombre_Producto,
            Descripcion: this.state.Descripcion,
            Fecha_Vencimiento: this.state.Fecha_Vencimiento,
            Id_Proveedor: this.state.Id_Proveedor,
            Estado_Producto: "Activo"
        }

        if(localStorage.getItem('HisProd') == null){
            let histories = [];
            histories.push(history);
            localStorage.setItem("HisProd", JSON.stringify(histories));
        }
        else{
            let histories = JSON.parse(localStorage.getItem('HisProd'));
            if(this.state.Id_Producto_update != -1){
                histories[this.state.Id_Producto_update].Nombre_Producto = this.state.Nombre_Producto;
                histories[this.state.Id_Producto_update].Descripcion = this.state.Descripcion;
                histories[this.state.Id_Producto_update].Fecha_Vencimiento = this.state.Fecha_Vencimiento;
                histories[this.state.Id_Producto_update].Id_Proveedor = this.state.Id_Proveedor;
            }
            else{
                histories.push(history);
            }
            localStorage.setItem("HisProd", JSON.stringify(histories));
        }
        this.setState({
            Id_Producto_update: -1,
            Nombre_Producto: "",
            Descripcion: "",
            Fecha_Vencimiento: "",
            Id_Proveedor: ""
        });
        this.componentDidMount();
    }

    ToUpdateProd = (val) =>{
        if(this.state.itemsProd.Estado_Producto == "Activo"){
            this.setState({
                Id_Producto_update: this.state.itemsProd[val].Id_Producto,
                Nombre_Producto: this.state.itemsProd[val].Nombre_Producto,
                Descripcion: this.state.itemsProd[val].Descripcion,
                Fecha_Vencimiento: this.state.itemsProd[val].Fecha_Vencimiento,
                Id_Proveedor: this.state.itemsProd[val].Id_Proveedor
            })
        }
        else{
            return null;
        }
    
        //alert(this.state.Nombre_Producto);
    }

    ToDeleteProd = (val) =>{
        if(this.state.itemsProd[val].Estado_Producto == "Activo"){
            this.state.itemsProd[val].Estado_Producto = "Eliminado";
            localStorage.setItem("HisProd", JSON.stringify(this.state.itemsProd));
            this.componentDidMount();
        }
        else{
            return null;
        }
    }

    ToPreviewProd = (e) =>{
        /*this.setState = ({
            [e.target.title]: e.target.value
        })*/
        if(this.state.filtrar.length == 0){
            for(var i=0; i<this.state.histories_prov.length; i++){
                if(this.state.histories_prov[i].Estado_Proveedor == "Activo"){
                    this.state.filtrar.push(this.state.histories_prov[i]);
                }
            }
        }

        let partialState = {};
        partialState[e.target.title] = e.target.value;
        this.setState(partialState);
    }


  render(){
    return (
        <div className="Producto">
            <div className="input-wrapper">
                <h1>Producto</h1>
                <form onSubmit={this.ToHistoryProd}>
                    <Input title="Nombre_Producto" handleChange={this.ToPreviewProd} type="text" data={this.state.Nombre_Producto}></Input>
                    <Input title="Descripcion" handleChange={this.ToPreviewProd} type="text" data={this.state.Descripcion}></Input>
                    <Input title="Fecha_Vencimiento" handleChange={this.ToPreviewProd} type="date" data={this.state.Fecha_Vencimiento}></Input>
                    <select className="form-control" title="Id_Proveedor" onChange={this.ToPreviewProd} required>
                        <option value="" disabled selected hidden>---Seleccionar---</option>
                        {this.state.filtrar.map((item) =>(
                            <option value={item.Id_Proveedor}>{item.Id_Proveedor} : {item.Nombre_Proveedor} </option>
                        ))} 
                    </select>
                    <div className="button-wrapper">
                        <button type="submit" className="btn btn-secondary">Ejecutar</button>
                    </div>
                </form>
            </div>
            <div className="table-wrapper">
            <table className="table table-striped table-dark">
                   <thead>
                        <th>Id_Producto</th>
                        <th>Nombre_Producto</th>
                        <th>Descripcion</th>
                        <th>Fecha_Vencimiento</th>
                        <th>Id_Proveedor</th>
                        <th>Estado_Producto</th>
                   </thead>
                   <tbody>
                   {this.state.itemsProd.map((item) => (
                        <tr>
                        <td>{ item.Id_Producto }</td>
                        <td>{ item.Nombre_Producto }</td>
                        <td>{ item.Descripcion }</td>
                        <td>{ item.Fecha_Vencimiento }</td>
                        <td>{ item.Id_Proveedor }</td>
                        <td>{ item.Estado_Producto }</td>
                        <td><button type="button" class="btn btn-info" onClick={()=>this.ToUpdateProd(item.Id_Producto)}>Actualizar</button></td>
                        <td><button type="button" class="btn btn-danger" onClick={()=>this.ToDeleteProd(item.Id_Producto)}>Eliminar</button></td>
                        </tr>
                   ))}
                   </tbody>
                </table>       
            </div>
        </div>
      )
  }
}

export default Producto;