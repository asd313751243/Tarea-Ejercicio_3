import React,{Component} from 'react';
import './Proveedor.css';
import Input from './Components/Input'

class Proveedor extends Component {

    constructor(props){
      super(props)
      this.state ={

      }
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
      id: ID,
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
    console.log(this.state)
  }

  render(){
    return (
      <div className="Proveedor">
        <div className="input-wrapper">
          <h1>Proveedor</h1>
          <form onSubmit={this.ToHistoryProv}>
            <Input title="Nombre_Proveedor" handleChange={this.ToTableProv}></Input>
            <Input title="Direccion" handleChange={this.ToTableProv}></Input>
            <Input title="Numero_Telefono" handleChange={this.ToTableProv}></Input>
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

export default Proveedor;
