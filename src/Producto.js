import React,{Component} from 'react';
import './Producto.css';
import Input from './Components/Input';

class Producto extends Component {

    constructor(props){
        super(props)
        this.state ={
            itemsProd: []
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
            histories.push(history);
            localStorage.setItem("HisProd", JSON.stringify(histories));
        }
        this.componentDidMount();
    }

    ToTableProd = (e) =>{
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
                    <Input title="Nombre_Producto" handleChange={this.ToTableProd} type="text"></Input>
                    <Input title="Descripcion" handleChange={this.ToTableProd} type="text"></Input>
                    <Input title="Fecha_Vencimiento" handleChange={this.ToTableProd} type="date"></Input>
                    <Input title="Id_Proveedor" handleChange={this.ToTableProd} type="number"></Input>
                    <div>
                        <button type="submit" class="btn btn-secondary">Ejecutar</button>
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

export default Producto;