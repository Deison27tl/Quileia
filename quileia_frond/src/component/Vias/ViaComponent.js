import React from "react";
import axios from "axios";
import { Modal, ModalBody, ModalFooter } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

const baseUrl = 'http://localhost:8080/api/v2/';

class ViaComponent extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            data: [],
            dataAgentes: [],
            modalEliminar: false,
            modalAlerta: false,
            modalAgenteDeTransito: false,
            form: {
                id: '',
                tipó_via: '',
                cll_cr: '',
                numero: '',
                nivel_congestion: '',
            }
        }
    }
    peticionGet = () => {
        axios.get(baseUrl + "all").then(response => {
            this.setState({ data: response.data });
        }).catch(error => {
            console.log(error.message);
        })
    }

    peticionPost = async () => {

        let nivelCongestion = this.state.form.nivel_congestion;
     

        if (nivelCongestion >= 1 && nivelCongestion <= 100) {
            await axios.post(baseUrl + "save", this.state.form).then(response => {
                alert("Guardado Correctamente !!!")
                this.peticionGet();

            }).catch(error => {
                console.log(error.message);
            })

        } else {
            alert("El nivel de congestion debe ser entre 1 y 100")
        }
    }

    peticionDelete = () => {
        axios.delete(baseUrl + "delete/" + this.state.form.id).then(response => {
            this.setState({ modalEliminar: false });
            this.peticionGet();
        }).catch(error => {
            console.log(error.message);
        })
    }
    seleccionarVias = (via) => {
        this.setState({
            form: {
                id: via.id,
                tipó_via: via.tipó_via,
                cll_cr: via.cll_cr,
                numero: via.numero,
                nivel_congestion: via.nivel_congestion
            }
        })
    }
    handleChange = async e => {
        e.persist();
        await this.setState({
            form: {
                ...this.state.form,
                [e.target.name]: e.target.value
            }
        });
        console.log(this.state.form);
    }
    componentDidMount() {
        this.peticionGet();
    }

    render() {
        const { form } = this.state;
        return (
            <div className="container mt-5 text-center">
                <div className="card">
                    <div className="card-header text-center" >
                        <strong> Vias</strong>
                    </div>
                    <form className="row g-3">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-2">
                                    <input name="id" maxLength="6" placeholder="Identificador" type="text" className="form-control" onChange={this.handleChange} value={form ? form.id : ''} required />
                                </div>
                                <div className="col-md-3">
                                    <select className="form-select" name="tipó_via" id="tipó_via" onChange={this.handleChange} value={form ? form.tipó_via : ''} required>
                                        <option selected disabled value="">Tipó de via</option>
                                        <option id="Autopista">Autopista</option>
                                        <option id="Carretera Principal">Carretera Principal</option>
                                        <option id="Carretera Secundaria">Carretera Secundaria</option>
                                    </select>
                                </div>
                                <div className="col-md-3">
                                    <select name="cll_cr" className="form-select" id="cll_cr" onChange={this.handleChange} value={form ? form.cll_cr : ''} required>
                                        <option selected disabled value="">Calle o carretera</option>
                                        <option id="Calle">Calle</option>
                                        <option id="Carretera">Carretera</option>
                                    </select>
                                </div>
                                <div className="col-md-2">
                                    <input name="numero" id="numero" maxLength="6" placeholder="Numero" type="text" className="form-control" onChange={this.handleChange} value={form ? form.numero : ''} required />

                                </div>
                                <div className="col-md-2">
                                    <input name="nivel_congestion" maxLength="3" id="nivel_congestion" placeholder="Nivel de congestion" type="text" className="form-control" onChange={this.handleChange} value={form ? form.nivel_congestion : ''} required />
                                </div>
                                <div className="row">
                                    <div className="mt-3">
                                        <button type="submit" className="btn btn-primary" onClick={() => this.peticionPost()} >Guardar</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <br /><br />
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <td><strong>Identificador</strong></td>
                            <td><strong>Tipo de via</strong></td>
                            <td><strong>Calle o Carretera</strong></td>
                            <td><strong>Numero</strong></td>
                            <td><strong>Nivel de congestion</strong></td>
                            <td><strong>Accion</strong></td>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.data.map(vias => {
                            return (
                                <tr key={vias.id}>
                                    <td><strong>{vias.id}</strong></td>
                                    <td>{vias.tipó_via}</td>
                                    <td>{vias.cll_cr}</td>
                                    <td>{vias.numero}</td>
                                    <td>{vias.nivel_congestion}</td>
                                    <td>
                                        <button className="btn btn-success" onClick={() => { this.seleccionarVias(vias) }}><FontAwesomeIcon icon={faEdit} /></button>
                                        {"   "} <button className="btn btn-danger" onClick={() => { this.seleccionarVias(vias); this.setState({ modalEliminar: true }) }}><FontAwesomeIcon icon={faTrashAlt} /></button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>

                <Modal isOpen={this.state.modalEliminar}>
                    <ModalBody>
                        Estás seguro que deseas eliminar este registro
                    </ModalBody>
                    <ModalFooter>
                        <button className="btn btn-danger" onClick={() => this.peticionDelete()}>Sí</button>
                        <button className="btn btn-secundary" onClick={() => this.setState({ modalEliminar: false })}>No</button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}
export default ViaComponent;
