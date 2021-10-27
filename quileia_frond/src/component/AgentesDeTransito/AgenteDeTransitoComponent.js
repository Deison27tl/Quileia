import React from "react";
import axios from "axios";
import { Modal, ModalBody, ModalFooter } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt, faRoad, faSearch } from '@fortawesome/free-solid-svg-icons';

const baseUrl = 'http://localhost:8080/api/v1/';
const baseUrlAllVias = 'http://localhost:8080/api/v2/';



class AgenteDeTransitoComponent extends React.Component {
    state = {
        data: [],
        dataVias: [],
        dataFilter: [],

        modalEliminar: false,
        modalDetalles: false,
        modalFiltro: false,
        form: {
            name: '',
            codigo: '',
            years_experiencia: '',
            cod_secretaria: '',

            via: {
                id: '',
                nivel_congestion: ''
            }
        }
    }

    peticionGet = () => {
        axios.get(baseUrl + "all").then(response => {
            console.log(response.data);
            this.setState({ data: response.data });

        }).catch(error => {
            console.log(error.message);
        })
    }
    peticionGetVias = () => {
        axios.get(baseUrlAllVias + "all").then(response => {
            console.log(response.data);
            this.setState({ dataVias: response.data });

        }).catch(error => {
            console.log(error.message);
        })
    }
    peticionFilter() {
        axios.get(baseUrl + "find/" + this.state.form.codigo).then(response => {

            this.setState({ dataFilter: response.data })

            if (this.state.dataFilter.codigo === undefined) {

                alert("No se encuentra registrado !!!")

            } else {
               
                alert("Nombre: " + this.state.dataFilter.name + '\r' +
                "Codigo: " + this.state.dataFilter.codigo + '\r' +
                "Tipó de via: " + this.state.dataFilter.via.tipó_via + '\r' +
                "Calle o Carretera: " + this.state.dataFilter.via.cll_cr + '\r' +
                "Numero: " + this.state.dataFilter.via.numero + '\r' +
                "Nivel de congestion: " + this.state.dataFilter.via.nivel_congestion)

                
            }
            
        })
  
    }
    peticionPost = async () => {

        await axios.get(baseUrlAllVias + "find/" + this.state.form.via.id).then(response => {

            let nivelCongestion = response.data.nivel_congestion

            if (nivelCongestion >= 30) {
                axios.post(baseUrl + "save", this.state.form).then(response => { alert("Guardado Correctamente !!!") })
            } else {
                alert("La via es considerada de baja congestion !!!")
             
            } 
        }).catch(error => {
            console.log(error.message);
        })
    }
    peticionDelete = () => {
        axios.delete(baseUrl + "delete/" + this.state.form.codigo).then(response => {
            this.setState({ modalEliminar: false });
            this.peticionGet();
        }).catch(error => {
            console.log(error.message);
        })
    }
    seleccionarAgentesDetransito = (agentesDeTransito) => {
        this.setState({
            form: {
                name: agentesDeTransito.name,
                codigo: agentesDeTransito.codigo,
                cod_secretaria: agentesDeTransito.cod_secretaria,
                years_experiencia: agentesDeTransito.years_experiencia,
                via: {
                    id: agentesDeTransito.via.id,
                    nivel_congestion: agentesDeTransito.via.nivel_congestion
                }
            }
        })
    }

    handleChange = async e => {
        e.persist();
        await this.setState({
            form: {
                ...this.state.form,
                [e.target.name]: e.target.value,
                via: {
                    ...this.state.form.via,
                    [e.target.name]: e.target.value
                }
            }
        });
        console.log(this.state.form);
    }
    componentDidMount() {
        this.peticionGet();
        this.peticionGetVias();
    }
    render() {
        const { form } = this.state;
        return (
            <div className="container mt-5 text-center">
                <div className="col-md-3">
                    <table>
                        <tr>
                            <input name="codigo" maxLength="6" placeholder="Codigo del agente" type="text" className="form-control" onChange={this.handleChange} required />
                            <td>   <button type="submit" className="btn btn-primary" onClick={() => { this.peticionFilter(); this.setState({ modalFiltro: true }) }} ><FontAwesomeIcon icon={faSearch} /></button></td>
                        </tr>
                    </table>
                    <br />
                </div>
                <div className="card">
                    <div className="card-header text-center">
                        <strong>Agentes de Transito</strong>
                    </div>
                    <form className="row g-3" >
                        <div className="card-body">
                            <div className="row ">
                                <div className="col-md-3">
                                    <input name="name" maxLength="20" placeholder="Nombre" type="text" className="form-control" onChange={this.handleChange} value={form ? form.name : ''} required />
                                </div>
                                <div className="col-md-2">
                                    <input name="codigo" maxLength="6" placeholder="Codigo del agente" type="text" className="form-control" onChange={this.handleChange} value={form ? form.codigo : ''} required />
                                </div>
                                <div className="col-md-2">
                                    <input name="years_experiencia" maxLength="2" placeholder="Años de experiencia" type="text" className="form-control" onChange={this.handleChange} value={form ? form.years_experiencia : ''} required />
                                </div>
                                <div className="col-md-2">
                                    <input name="cod_secretaria" maxLength="6" placeholder="Codigo de la secretaria" type="text" className="form-control" onChange={this.handleChange} value={form ? form.cod_secretaria : ''} required />
                                </div>
                                {/*       <div className="col-md-2" >
                                <input name="id" placeholder="Selecciona una via" type="text" className="form-control" onChange={this.handleChange} value={form.via ? form.via.id : ''}  required/>
                                </div> */}
                                <div className="col-md-2">
                                    <select name="id" className="form-control" onChange={this.handleChange} >
                                        <option selected disabled >Selecciona una Via</option>
                                        {this.state.dataVias.map(vias => (
                                            <option key={vias.id} value={vias.id}>{vias.id}{/* {" "}{vias.tipó_via}{" - "}{vias.cll_cr}{" N° "}{vias.numero} */} </option>
                                        )
                                        )}
                                    </select>
                                </div>
                                <div className="col-md-1" >
                                    <i className="btn" id="vias" onClick={() => { this.setState({ modalDetalles: true }) }}><FontAwesomeIcon icon={faRoad} /></i>
                                </div>
                            </div>
                            <div className="row">
                                <div className="mt-3">
                                    <button type="submit" className="btn btn-primary" onClick={() => this.peticionPost()}>Guardar</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <br /><br />
                <table className="table table-hover ">
                    <thead>
                        <tr>
                            <td><strong>Nombre</strong></td>
                            <td><strong>Codigo del agente</strong></td>
                            <td><strong>Años de experiencia</strong></td>
                            <td><strong>Codigo del la secretaria</strong></td>
                            <td><strong>Cod. Via actual</strong></td>
                            <td><strong>Cod. Via actual</strong></td>
                            <td><strong>Accion</strong></td>
                        </tr>
                    </thead>
                    <tbody >
                        {this.state.data.map(agentesDeTransito => {
                            return (
                                <tr key={agentesDeTransito.codigo}>
                                    <td>{agentesDeTransito.name}</td>
                                    <td>{agentesDeTransito.codigo}</td>
                                    <td>{agentesDeTransito.years_experiencia}</td>
                                    <td>{agentesDeTransito.cod_secretaria}</td>
                                    <td>{agentesDeTransito.via.id}</td>
                                    <td>{agentesDeTransito.via.nivel_congestion}</td>
                                    <td>
                                        <button className="btn btn-success" onClick={() => { this.seleccionarAgentesDetransito(agentesDeTransito) }}><FontAwesomeIcon icon={faEdit} /></button>
                                        {"   "} <button className="btn btn-danger" onClick={() => { this.seleccionarAgentesDetransito(agentesDeTransito); this.setState({ modalEliminar: true }) }}><FontAwesomeIcon icon={faTrashAlt} /></button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                <Modal isOpen={this.state.modalEliminar}>
                    <ModalBody>
                        Estás seguro que deseas eliminar este registro {form.name}
                    </ModalBody>
                    <ModalFooter>
                        <button className="btn btn-danger" onClick={() => this.peticionDelete()}>Sí</button>
                        <button className="btn btn-secundary" onClick={() => this.setState({ modalEliminar: false })}>No</button>
                    </ModalFooter>
                </Modal>

                <Modal isOpen={this.state.modalDetalles} size="lg">
                    <ModalBody>
                        <table className="table table-hover  text-center">
                            <thead>
                                <tr>
                                    <td><strong>Identificador</strong></td>
                                    <td><strong>Tipo de via</strong></td>
                                    <td><strong>Calle o Carretera</strong></td>
                                    <td><strong>Numero</strong></td>
                                    <td><strong>Nivel de congestion</strong></td>
                                </tr>
                            </thead>
                            <tbody >
                                {this.state.dataVias.map(vias => {
                                    return (
                                        <tr key={vias.id}>
                                            <td>{vias.id}</td>
                                            <td>{vias.tipó_via}</td>
                                            <td>{vias.cll_cr}</td>
                                            <td>{vias.numero}</td>
                                            <td>{vias.nivel_congestion}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                            <br />
                        </table>
                        <div class="mx-auto" style={{ width: "15%" }}>
                            <button className="btn btn-danger" onClick={() => { this.setState({ modalDetalles: false }) }}>Cerrar</button>
                        </div>
                    </ModalBody>
                </Modal>
            </div >
        );
    }
}
export default AgenteDeTransitoComponent;
