import React, { useState,useEffect } from "react";
import Product from "./productComp";
import axios from "axios";
import Search from "./searchBar";

const Products = () => {
    const initialState = {
        Products : []
    }
    const [state,setState] = useState(initialState);
    const loadProducts = (query = null)=>{
        let link;
        if(query === null || query === "" || query === "null"){
            link = "/api/products";   
        }
        else{
            link = `/api/search?q=${query}`;
        }
        console.log(link);
        return axios.get(link)
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
            return true;
        })
        .catch(err => {
            console.log(err);
        })
    };

    useEffect(()=>{
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