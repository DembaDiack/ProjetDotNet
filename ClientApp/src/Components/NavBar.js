import React from "react";
import {Link} from "react-router-dom";




const Navbar = (props)=>{
  
  
  
  const connect = <Link className="btn btn-primary" to="/">Connection</Link>;
  const disconnect = <Link className="btn btn-primary" to="/">Deconnection</Link>;
  





    return(
        <nav className="navbar navbar-light navbar-expand-md">
        <div className="container-fluid">
        <Link to="/" className="navbar-brand">Stocky</Link>
          <button data-toggle="collapse" className="navbar-toggler" data-target="#navcol-1"><span className="sr-only">Toggle navigation</span><span className="navbar-toggler-icon" /></button>
          <div className="collapse navbar-collapse" id="navcol-1">
            <ul className="nav navbar-nav">
              <li className="nav-item" role="presentation">
                <Link to="/ajouter" className="nav-link active">Ajouter Produit</Link>
                </li>
              <li className="nav-item" role="presentation">
                <Link to="/liste" className="nav-link active">liste des Produit</Link>
                </li>
              
            </ul>
          </div>
          {props.connected ? disconnect : connect}
          </div>
      </nav>
    )
}
export default Navbar;