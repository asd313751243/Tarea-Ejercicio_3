import React,{Component} from 'react';
import './Producto.css';
import Input from './Components/Input';

class Producto extends Component {

    constructor(props){
        super(props)
        this.state ={

        }
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
            id: ID,
            Nombre_Producto: this.state.Nombre_Producto,
            Descripcion: this.state.Descripcion,
            Fecha_Vencimiento: this.state.Fecha_Vencimiento,
            Nombre_Proveedor: this.state.Nombre_Proveedor
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
                    <Input title="Nombre_Producto" handleChange={this.ToTableProd}></Input>
                    <Input title="Descripcion" handleChange={this.ToTableProd}></Input>
                    <Input title="Fecha_Vencimiento" handleChange={this.ToTableProd}></Input>
                    <Input title="Nombre_Proveedor" handleChange={this.ToTableProd}></Input>
                    <div>
                        <button type="submit" class="btn btn-secondary">Ejecutar</button>
                    </div>
                </form>
            </div>
            <div className="table-wrapper">
            <table className="table table-striped table-dark">
                   <thead>
                        <th>Operations</th>
                        <th>Results</th>
                   </thead>
                   
                </table>       
            </div>
        </div>
      )
  }
}

export default Producto;