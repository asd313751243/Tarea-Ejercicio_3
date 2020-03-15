import React,{Component} from 'react';
import './Producto.css';
import Input from './Components/Input';

class Producto extends Component {

    constructor(props){
        super(props)
        this.state ={
            itemsProd: [],
            Id_Producto: -1
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
            itemsProd: JSON.parse(localStorage.getItem("HisProd"))
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
            Id_Proveedor: this.state.Id_Proveedor
        }

        if(localStorage.getItem('HisProd') == null){
            let histories = [];
            histories.push(history);
            localStorage.setItem("HisProd", JSON.stringify(histories));
        }
        else{
            let histories = JSON.parse(localStorage.getItem('HisProd'));
            if(this.state.Id_Producto != -1){
                histories[this.state.Id_Producto].Nombre_Producto = this.state.Nombre_Producto;
                histories[this.state.Id_Producto].Descripcion = this.state.Descripcion;
                histories[this.state.Id_Producto].Fecha_Vencimiento = this.state.Fecha_Vencimiento;
                histories[this.state.Id_Producto].Id_Proveedor = this.state.Id_Proveedor;
            }
            else{
                histories.push(history);
            }
            localStorage.setItem("HisProd", JSON.stringify(histories));
        }
        this.setState({
            Id_Producto: -1,
            Nombre_Producto: "",
            Descripcion: "",
            Fecha_Vencimiento: "",
            Id_Proveedor: ""
        });
        this.componentDidMount();
    }

    ToUpdateProd = (val) =>{

        this.setState({
            Id_Producto: this.state.itemsProd[val].Id_Producto,
            Nombre_Producto: this.state.itemsProd[val].Nombre_Producto,
            Descripcion: this.state.itemsProd[val].Descripcion,
            Fecha_Vencimiento: this.state.itemsProd[val].Fecha_Vencimiento,
            Id_Proveedor: this.state.itemsProd[val].Id_Proveedor
        })
        //alert(this.state.Nombre_Producto);
    }

    ToPreviewProd = (e) =>{
        /*this.setState = ({
            [e.target.title]: e.target.value
        })*/
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
                    <Input title="Id_Proveedor" handleChange={this.ToPreviewProd} type="number" data={this.state.Id_Proveedor}></Input>
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
                   </thead>
                   <tbody>
                   {this.state.itemsProd.map((item) => (
                        <tr>
                        <td>{ item.Id_Producto }</td>
                        <td>{ item.Nombre_Producto }</td>
                        <td>{ item.Descripcion }</td>
                        <td>{ item.Fecha_Vencimiento }</td>
                        <td>{ item.Id_Proveedor }</td>
                        <td><button type="button" class="btn btn-info" onClick={()=>this.ToUpdateProd(item.Id_Producto)}>Actualizar</button></td>
                        <td><button type="button" class="btn btn-danger" onClick={()=>this.ToDelete(item.Id_Producto)}>Eliminar</button></td>
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