import React, { useEffect, useState } from "react";
import Editbutton from "./Editbutton";
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from "../action/createaccount.action";
import { showMyproduct } from "../action/showproduct.action";
import { modalposition } from "../action/position.action";


// import './_aboutme.scss';
const Aboutme = ({ aboutUser }) => {
    
    const dispatch = useDispatch();

    /** mettre chaque item dans un tableau afin de faciliter la modification dans une boucle
     * userinfos[0] représente le nom de l'item au frontend (exemple : "Nom")
     * userinfos[1] représente la valeur de cet item dans MySQL (exemple : "DUPONT")
     * userinfos[2] représente le nom de la colonne dans MySQL afin de faciliter la modification dans le code
     */
    const userinfos = [
        ['Nom', aboutUser.nom, 'nom'],
        ['Prénom', aboutUser.prenom, 'prenom'],
        ['Adresse', aboutUser.adresse, 'adresse'],
        ['Ville', aboutUser.ville, 'ville'],
        ['Code postal', aboutUser.codepostal, 'codepostal'],
        ['Pays', aboutUser.pays, 'pays'],
        ['Téléphone', aboutUser.telephone, 'telephone'],
        ['Email', aboutUser.email, 'email'],
    ];


    /** fonction  pour modifier la valeur d'un item */
    function submitedit(i, newValue) {
        const data = {
            id: aboutUser.id,
            name: userinfos[i][2],
            input: newValue,
            updatedat: new Date().toDateString(),
        }
        dispatch(updateUser(data));
    }

    return (
        <div className="monmagasin">
            <h1>A propos de moi </h1>
            <div className="infoblock">
                <h2>Mes informations</h2>
                {/**  
                 * liste des items dans la section "Mes informations" 
                 * chaque item (exemple : Nom : DUPONT) se trouve dans un composant nommé "Editbutton"
                 * il s'agit d'une boucle dont les informations se trouvent dans le tableau "userinfos"
                 * */}
                <ul>
                    {
                        userinfos.map((user, i) => {
                            <Editbutton
                                key = {user[2]}
                                userinfos = {userinfos}
                                i={i}
                                submitedit={submitedit}
                            />
                        })
                    } 
                </ul>
            </div>
        </div>
    )
}

export default Aboutme;
