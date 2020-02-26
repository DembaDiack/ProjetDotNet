import React, { useState } from "react";
import {Link} from "react-router-dom";
import axios from "axios";
import auth from "../Auth/Auth";
import Auth from "../Auth/Auth";

const Login = ()=>{

  const alert = (message,color) => (<div role="alert" className={`alert alert-success ${color} border-danger`} style={{maxWidth: '550px'}}>
    <span><strong>Alert</strong>{message}</span></div>)

  const initialState = {
    email : "",
    password : "",
    alert : 1,
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
    if(state.password !== "")
    {
      const post = axios.post("/api/login",{
        email : state.email,
        password : state.password
      })
      .then(result => {
        
        console.log(post);
        console.log(result);
        if(result.data){
          setState({
                ...state,
                alert : false,
                alertMessage : alert("Connecte aves succes","bg-success")
            });
            const auth = new Auth();
            console.log(auth.connect(state.email).checkConnection());
        }
        else{
          setState({
            ...state,
            alert : true,
            alertMessage : alert("verifier vos coordonee","bg-warning")
        });
        }
      })
      .catch(err => {
        console.log(err);
      })
    }
  }











    return(
        <div>
            <div className="container">
            {state.alertMessage}
        <h1>connectez vous.</h1>
        <form onSubmit={(e)=> handleSubmit(e)}>
          <input className="form-control" onChange={(e)=>handleChange(e)} type="text" name="email"  placeholder="Adresse email" required style={{height: '60px', marginBottom: '15px', maxWidth: '550px'}} value={state.email} />
        <input className="form-control" onChange={(e)=>handleChange(e)} type="password" name="password" placeholder="Mot de passe" style={{height: '60px', marginBottom: '15px', maxWidth: '550px'}} value={state.password}/>
        <small>Entrez votre email et mot de passe ici sil vous plait</small>
        <button className="btn btn-primary btn-block" type="submit" style={{height: '50px', borderRadius: '5px', marginBottom: '8px', marginTop: '8px', maxWidth: '550px'}}>Button</button>
          <Link to="/signup">Ou creer un compte ici.</Link>
        </form>
      </div>
        </div>
    )
}


export default Login;