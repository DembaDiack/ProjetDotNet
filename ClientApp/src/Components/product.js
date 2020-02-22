import React, { useState,useEffect } from "react";
import Navbar from "./NavBar";
import {Link} from "react-router-dom";
import Product from "./productComp";
import axios from "axios";
import Search from "./searchBar";

const Products = () => {
    const initialState = {
        Products : []
    }
    const [state,setState] = useState(initialState);
    const loadProducts = (query = null)=>{
        console.log("herererererrere : ",query);
        let link = "/api/products";
        if(query !== null || query !== ""){
            link = `/api/search?q=${query}`;
        }
        axios.get(link)
        .then(result => {
            const tab = result.data.map(elem => {
                return <Product 
                loadProducts={loadProducts}
                matricule={elem.matricule}
                img={elem.image}
                email={elem.email}
                key={elem.Id}
                quantite={elem.quantite}
                Id={elem.Id}
                nom={elem.nom}
                />
            });
            console.log(result);
            setState({
                ...state,
                Products : tab
            })
        })
        .catch(err => {
            console.log(err);
        })
    };

    useEffect(()=>{
        console.log("products",state.Products);
        if(state.Products.length <= 0 ){
            loadProducts();
        }
    },[]);
    return (
        <div>
            <div className="container">
            <div className="row">
            <div className="col-md-12">
            <h1 className="d-xl-flex justify-content-xl-center">Liste de produits</h1>
            <div className="container">
            <Search loadProducts={loadProducts}/>
            </div>
            </div>
            <div className="row">
                {state.Products}
            </div>
            </div>
        </div>
        </div>
    )
}

export default Products;