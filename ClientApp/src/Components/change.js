import React, { useState } from "react";
import {Link} from "react-router-dom";
import axios from "axios";

const Change = ()=>{

  const alert = (message,color) => (<div role="alert" className={`alert alert-success ${color} border-danger`} style={{maxWidth: '550px'}}>
    <span><strong>Alert</strong>{message}</span></div>)

  const initialState = {
    email : "",
    password : "",
    newpassword : "",
    newpasswordverif : "",
    alert : false,
    alertMessage : null,
  }
  const [state,setState] = useState(initialState);

  const handleChange = event => {
    setState({
      ...state,
      [event.target.name] : event.target.value
    })
  }

  const handleSubmit = event =>{
    event.preventDefault();
    const post = axios.post("/api/login",{
      email : state.email,
      password : state.password
    })
    .then(result => {
      if(result.data){
        if(state.newpassword !== state.newpasswordverif){
          setState({
            ...state,
            alert : true,
            alertMessage : alert("verifier bien que vos nouveau mots de passe correspondent","bg-warning")
        });
        }
        axios.post("/api/useredit",{
          email : state.email,
          password : state.newpassword
        })
        .then(result => setState({
          ...state,
          alert : true,
          alertMessage : alert("mot de passe change avec succes","bg-success")
      }))
        .catch(err => {

        })
      }
      else{
        setState({
          ...state,
          alert : true,
          alertMessage : alert("verifier lemail ou lancien mot de passe","bg-warning")
      });
      }
    })
    .catch(err => {

    })
    
  }

    return(
        <div>
            <div className="container">
            {state.alertMessage}
        <h1>changer votre mot de passe.</h1>
        <form onSubmit={(e)=> handleSubmit(e)}>
          <input className="form-control" onChange={(e)=>handleChange(e)} type="text" name="email"  placeholder="Adresse email" required style={{height: '60px', marginBottom: '15px', maxWidth: '550px'}} value={state.email} />
        <input className="form-control" onChange={(e)=>handleChange(e)} type="password" name="password" placeholder="ancien Mot de passe" style={{height: '60px', marginBottom: '15px', maxWidth: '550px'}} value={state.password}/>
        <input className="form-control" onChange={(e)=>handleChange(e)} type="password" name="newpassword" placeholder="nouveau mot de passe" style={{height: '60px', marginBottom: '15px', maxWidth: '550px'}} value={state.newpassword}/>
        <input className="form-control" onChange={(e)=>handleChange(e)} type="password" name="newpasswordverif" placeholder="verifier nouveau mot de passe" style={{height: '60px', marginBottom: '15px', maxWidth: '550px'}} value={state.newpasswordverif}/>
        <small>Entrez votre email et mot de passe ici sil vous plait</small>
        <button className="btn btn-primary btn-block" type="submit" style={{height: '50px', borderRadius: '5px', marginBottom: '8px', marginTop: '8px', maxWidth: '550px'}}>Button</button>
          <Link to="/signup">Ou creer un compte ici.</Link>
          <Link to="/" className="ml-2">Connectez vous.</Link>
        </form>
      </div>
        </div>
    )
}


export default Change;