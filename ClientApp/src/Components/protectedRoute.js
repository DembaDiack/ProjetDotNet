import React from "react";
import {Route, Redirect} from "react-router-dom";
import Auth from "../Auth/Auth";

const ProtectedRoute = props => {
    const auth = new Auth();
    if(auth.isConnected()){
        return <Route component={props.comp} exact path={props.path}/>
    }
    else{
        return <Redirect to="/"/>
    }
    
}
export default ProtectedRoute;