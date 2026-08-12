import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateUser } from '../action/createaccount.action';

export default function Editbutton({  userinfos, champs, i, submitedit }) {
    
    const [isUpdating, setIsUpdating] = useState(false);

    function editinfo() {
        setIsUpdating(!isUpdating);
    }
    const [newValue, setNewValue] = useState(champs[i]);

    return (
        // chaque ligne du bouton
        <li>
            // contient les informations 
            <span className='item'><b> {userinfos[i][0]}</b> : </span>

            // formulaire pour changer chaque valeur des informations de l'utilisateur || Possibilité de modifier directement chaque information indépendament des autres. Si le bouton "crayon" est cliqué : alors modification directe, sinon, le champ garde sa valeur initiale
            <span className="response">
                {!isUpdating ? ( newValue ) : (
                <form onSubmit={(e) => { e.preventDefault(); submitedit(i, newValue); setIsUpdating(false); }} className="responseform">
                    <input defaultValue={newValue} onChange={(e) => setNewValue(e.target.value)} />
                    <input type="submit" value='&#10004;' />
                </form>
                        
            )} </span>
            
            // bouton de modification 
            {!isUpdating &&
                <button className='myfontawesome' onClick={() => editinfo()}>
                    <i className="fa fa-edit"></i>
                </button>
            }
        </li>
    )
}
