import React, { useState, useEffect } from "react";


const SearchBar = (props)=>{
    const initialState = {
        query : ""
    }
    const [state,setState] = useState(initialState);

    const handleChange = e => {
        setState({
            ...state,
            [e.target.name] : e.target.value
        })
    }
    useEffect(()=>{
        props.loadProducts(state.query);
    },[state.query]);
    
    return(
        <input className="form-control"
            onChange={(e) => handleChange(e)}
            type="text" name="query"  
            placeholder="Rechercher un produit" 
            required style={{height: '60px', marginBottom: '15px'}} 
            value={state.query} />
    )
}

export default SearchBar;