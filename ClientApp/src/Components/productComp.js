import React, { useState } from "react";
import {Link} from "react-router-dom";
import axios from "axios";
import Auth from "../Auth/Auth";

const Product = (props) => {
    const auth = new Auth();
    const email = auth.getEmail();
    const email_verif = email;

    const [state,setState] = useState({
        ...props
    })
    const handleDim = id => {
        if(state.email !== email_verif){
            return;
        }
        if(state.quantite !== 0 ){
            const newQuantite = state.quantite - 1;
            setState({
                ...state,
                quantite : newQuantite
            });
            axios.post("/api/edit",{
                matricule : state.matricule,
                email : state.email,
                image : state.img,
                quantite : newQuantite,
                Id : state.Id,
                nom : state.nom
            })
            .then(result => {
                console.log(result);
                
            })
            .catch(err => {
                console.log(err);
            })
        }
    }
    const handleSupp = id => {
        if(state.email !== email_verif){
            return;
        }
        axios.post("/api/delete",{
            matricule : state.matricule,
            email : state.email,
            image : state.email,
            quantite : state.quantite,
            Id : state.Id
        })
        .then(result => {
            console.log(result);
            state.loadProducts(null);
        })
        .catch(err => {
            console.log(err);
        })
    }
    return(
        <div className="col-sm-6 col-md-4 offset-xl-0 item">
            <Link to={`/produit/${state.matricule}`}>
            <img className="img-fluid" src={props.img} alt={"produit"} />
            </Link>
            <small>Matricule : {state.matricule}</small>
            <br />
            <small>Nom : {state.nom}</small>
            <br />

            <small>Quantite : {state.quantite}</small>
        <h3 className="name">{state.email}</h3>
        <div className="dropdown show">
            <button className="btn btn-primary dropdown-toggle" data-toggle="dropdown" aria-expanded="true" type="button">
                menu
                </button>
          <div className="dropdown-menu" role="menu">
              <Link to={`/produit/${state.matricule}`} role="presentation" className="dropdown-item">modifier</Link>
              <Link to={"/liste"} role="presentation" className="dropdown-item" onClick={()=>handleSupp(state.matricule)}>supprimer</Link>
              <Link to={"/liste"} role="presentation" className="dropdown-item" onClick={()=> handleDim(props.Id)}>diminuer</Link>
              </div>
        </div></div>
    )
}
export default Product;