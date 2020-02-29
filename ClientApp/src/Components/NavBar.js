import React, { useState, useEffect } from "react";
import {Link} from "react-router-dom";
import Auth from "../Auth/Auth";



const Navbar = (props)=>{
  const connect = <Link className="btn btn-primary" to="/">Connection</Link>;
  const disconnect = <Link className="btn btn-primary" to="/" onClick={()=>logout()}>{props.email}</Link>;
  const initialState = {
    connect_button : connect
  }
  const auth = new Auth();

  const [state,setState] = useState(initialState);
  const logout = ()=>{
    auth.disconnect();
    setState({
      ...state,
      connect_button : connect
    });
  }
  useEffect(()=>{
    if(props.connected){
      setState({
        ...state,
        connect_button : disconnect
      })
    }
    else{
      setState({
        ...state,
        connect_button : connect
      })
    }
  },[props.connected])




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
          {state.connect_button}
          </div>
      </nav>
    )
}
export default Navbar;