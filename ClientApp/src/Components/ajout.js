import React, { useState,useEffect } from "react";
import {Link} from "react-router-dom";
import Axios from "axios";
import Auth from "../Auth/Auth";

const Ajout = ()=>{
    const auth = new Auth();
    const email = auth.getEmail();
    const alert = (message,color) => (<div role="alert" className={`alert alert-success ${color} border-danger`} style={{maxWidth: '550px'}}>
    <span><strong>Alert</strong>{message}</span></div>)
    const email_verif = email;

    const initialState = {
        matricule : "",
        quantite : 0,
        email : "",
        image : null,
        prix : 0,
        nom : ""
    }
    const initialAlertState = {
        alert : 1,
        alertMessage : null
    }
  const [state,setState] = useState(initialState);
  const [alertState,setAlertState] = useState(initialAlertState);

  useEffect(()=>{
    
    console.log("email",email);
      Axios.get("api/count")
      .then(result => {
          console.log(result.data);
          setState({
              ...state,
              email : email,
              matricule : result.data + 1
          })
      })
      .catch(err => {
          console.log(err);
      })
  },[])
  const handleChange = event => {
      setState({
          ...state,
          [event.target.name] : event.target.value
      })
  }
  const handlerSubmit = (event) => {
      event.preventDefault();
      console.log(state);
      if(email_verif !== state.email){
          return
      }
      Axios.post("api/ajout",{
        ...state
      })
      .then(result => {
        Axios.get("api/count")
        .then(result => {
            console.log(result.data);
            setState({
                ...state,
                matricule : result.data + 1
            })
        })
        .catch(err => {
            console.log(err);
        })
          setAlertState({
            alert : true,
            alertMessage : alert("element ajouter","bg-success")
          })
      })
      .catch(err => {
          console.log(err);
      })
  }
  const handleImage = img => {
    const reader = new FileReader();
    reader.readAsDataURL(img.target.files[0]);
    reader.onload = data => {
        setState({
            ...state,
            image : data.target.result
        })
    }
  }
    return(
        <div>
            <div className="container">
            <div className="row">
            <div className="col-md-5">
                {alertState.alertMessage}
                <h1>Ajouter Produit</h1>
                <form onSubmit={(e) => handlerSubmit(e)} method="POST">
                    <input className="form-control" onChange={(e)=>handleChange(e)} value={state.matricule} type="number" name="matricule" placeholder="Matricule" required style={{height: '60px', marginBottom: '15px', maxWidth: '550px'}} disabled={true} />
                    <small className="d-block">Quantite</small>
                    <input className="form-control" onChange={(e)=>handleChange(e)} value={state.quantite} type="number" name="quantite" placeholder="Quantite" required style={{height: '60px', marginBottom: '15px', maxWidth: '550px'}} />
                    <input className="form-control" onChange={(e)=>handleChange(e)} value={state.email} type="text" name="email" placeholder="Adresse email" required style={{height: '60px', marginBottom: '15px', maxWidth: '550px'}} disabled={true}/>
                    <small className="d-block">Nom</small>
                <input className="form-control" onChange={(e)=>handleChange(e)} value={state.nom} type="text" name="nom" placeholder="Nom du produit" required style={{height: '60px', marginBottom: '15px', maxWidth: '550px'}} />
                    <small className="d-block">Prix</small>
                <input className="form-control" onChange={(e)=>handleChange(e)} value={state.prix} type="number" name="prix" placeholder="prix" required style={{height: '60px', marginBottom: '15px', maxWidth: '550px'}} />
                <span>changer l'image :&nbsp;</span><input type="file" name="image" onChange={(e)=>handleImage(e)}/><small className="d-block">verifier que le matricule ne soit pas un duplicatat</small>
                <button className="btn btn-primary btn-block" type="submit" style={{height: '50px', borderRadius: '5px', marginBottom: '8px', marginTop: '8px', maxWidth: '550px'}}>Button</button>
                <Link to="/liste">Voit votre stock</Link>
                </form>
            </div>
            <div className="col-md-7">
            <Link to={`/produit/${state.matricule}`}>
            <img className="img-fluid" src={state.image}/>
            </Link>
            </div>
            </div>
            </div>
        </div>
    )
}


export default Ajout;