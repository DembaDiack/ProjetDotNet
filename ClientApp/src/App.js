import React from 'react';
import {BrowserRouter as Router,Switch,Route} from "react-router-dom";
import Login from "./Components/login";
import Signup from "./Components/signup"
import Ajout from "./Components/ajout";
import Products from "./Components/product";
import Navbar from './Components/NavBar';
import Modif from "./Components/Modif";
import Auth from "./Auth/Auth";
import ProtectedRoute from "./Components/protectedRoute";
import Change from "./Components/change";

function App() {
  const auth = new Auth();
  return (
    <Router>
      <Navbar connected={auth.isConnected()} email={auth.getEmail()}/>
      <Switch>
        <Route exact path="/" component={Login}/>
        <Route exact path="/signup" component={Signup}/>
        <Route exact path="/change" component={Change}/>
        <ProtectedRoute path="/ajouter" comp={Ajout}/>
        <ProtectedRoute path="/liste" comp={Products}/>
        <ProtectedRoute path="/produit/:id" comp={Modif}/>
      </Switch>
    </Router>
  );
}

export default App;
