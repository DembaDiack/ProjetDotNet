import React from 'react';
import {BrowserRouter as Router,Switch,Route} from "react-router-dom";
import Login from "./Components/login";
import Signup from "./Components/signup"
import Ajout from "./Components/ajout";
import Products from "./Components/product";
import Navbar from './Components/NavBar';
import Modif from "./Components/Modif";

function App() {
  return (
    <Router>
      <Navbar/>
      <Switch>
        <Route exact path="/" component={Login}/>
        <Route exact path="/signup" component={Signup}/>
        <Route exact path="/ajouter" component={Ajout}/>
        <Route exact path="/liste" component={Products}/>
        <Route exact path="/produit/:id" component={Modif}/>
      </Switch>
    </Router>
  );
}

export default App;
