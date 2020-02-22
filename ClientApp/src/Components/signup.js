import React, { useState} from "react";
import {Link} from "react-router-dom";
import axios from "axios";

const Signup = ()=>{
    const alert = (message,color) => (<div role="alert" className={`alert alert-success ${color} border-danger`} style={{maxWidth: '550px'}}>
    <span><strong>Alert</strong>{message}</span></div>)
    const initialState = {
        email : "examaple@gmail.com",
        password : "",
        confirmation : "",
        alert : 1,
        alertMessage : null
    }
    const [state,setState] = useState(initialState)

    
    const handleChange = event => {
        
        setState({...state,[event.target.name] : event.target.value})
        console.log({
            [event.target.name] : event.target.value
        })
    }


    const handleSubmit = event => {
        event.preventDefault();
        if(state.password === state.confirmation){
            setState({
                ...state,
                alert : false,
                alertMessage : null
            });
            axios.post("/api/signup",{
                email : state.email,
                password : state.password
            })
            .then(result => {
                if(result.data === 1)
                {
                    setState({
                        ...state,
                        alert : false,
                        alertMessage : alert("compte cree avec success","bg-success")
                    });
                }
                if(result.data === 0){
                    setState({
                        ...state,
                        alert : true,
                        alertMessage : alert("le compte existe deja","bg-warning")
                    });
                }
                if(result.data === 2){
                    setState({
                        ...state,
                        alert : true,
                        alertMessage : alert("une erreur est survenue","bg-warning")
                    });
                }
            })
            .catch(err => {
                console.log(err);
            })
        }
        else{
            setState({
                ...state,
                alert : true,
                alertMessage : alert(" les mots de passes ne correspondent pas","bg-warning")
            });
            console.log(state.alertMessage);
        }
    }
    return(
        <div>
            <div className="container">
                {state.alertMessage}
            <h1>Inscrivez vouss</h1>
            <form onSubmit={(e) => handleSubmit(e)}>
                <input onChange={(e)=> handleChange(e)} className="form-control" type="text" name="email" value={state.email} placeholder="Adresse email" required style={{height: '60px', marginBottom: '15px', maxWidth: '550px'}} />
                <input onChange={(e)=> handleChange(e)} className="form-control" type="password" value = {state.password} name="password" placeholder="Mot de passe" style={{height: '60px', marginBottom: '15px', maxWidth: '550px'}} />
                <input onChange={(e)=> handleChange(e)} className="form-control" type="password" value = {state.confirmation} name="confirmation" placeholder="Confirmation Mot de passe" style={{height: '60px', marginBottom: '15px', maxWidth: '550px'}} />
                <small>Entrez votre email et mot de passe ici sil vous plait</small>
            <button className="btn btn-primary btn-block" type="submit" style={{height: '50px', borderRadius: '5px', marginBottom: '8px', marginTop: '8px', maxWidth: '550px'}}>Button</button>
            <Link to="/">Ou Connectez vous</Link>
            </form>
        </div>
        </div>
    )
}


export default Signup;