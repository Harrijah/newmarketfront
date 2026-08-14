import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {useRayonsWithProducts}  from "../hooks/useRayonsWithProducts";



const Magasincol = ({setMonrayon}) => {
    // variables
    const rayons = useRayonsWithProducts();

    // fonctions
    const choisirunrayon = (id) => {
        setMonrayon(id);
    }
    

    return (
        <select onChange={(e) => choisirunrayon(e.target.value)} >
            <option key={'0'} value="0">Choisir une catégorie</option>
            {rayons}
        </select>
    )

}
export default Magasincol;