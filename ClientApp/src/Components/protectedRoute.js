import React from "react";
import {Route, Redirect} from "react-router-dom";

const ProtectedRoute = props => {
    const Component = props.Component;
    const auth = new Auth();
    return (
        <Route {...props}
        render={
            ()=>{
                return <Component/>
            }
        }
        />
    )
}
export default ProtectedRoute;