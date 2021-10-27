import React from 'react';
import './style.css'
import { BrowserRouter as Router, Link, Switch } from "react-router-dom";
import AgenteDeTransitoComponent from '../AgentesDeTransito/AgenteDeTransitoComponent'
import ViaComponent from '../Vias/ViaComponent';

const Navbar = () => {
    return (
        <div>
       
            <div className="logo">
                <img src="logo.jpg" alt="" />
            </div>
            <hr />
            <Router>
            <div >
                <Link to="/agentesDeTransito" className="btn btn-light">Agentes de Tranasito</Link>
                {" "}
                <Link to="/vias" className="btn btn-light">Vias</Link>
            </div>
            <Switch>
                <Router path="/agentesDeTransito">
  
                    <AgenteDeTransitoComponent />
                   
                </Router>
                <Router path="/vias">
                    <ViaComponent />
                </Router>
            </Switch>
        </Router> 
        </div>
    );
}

export default Navbar;