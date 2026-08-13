import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateUser } from '../action/createaccount.action';

/** ce composant est un boucle d'items (exemple : Nom, Prénom, etc.) dans la section "Mes informations". Il y a un composant Editbutton par item. */
export default function Editbutton({  userinfos, i, submitedit }) {
    /** état de la modification */
    const [isUpdating, setIsUpdating] = useState(false);
    
    /** valeur par défaut de l'item */
    const [newValue, setNewValue] = useState(userinfos[i][1]);
    
    /** pour afficher le formulaire de modification */
    function editinfo() {
        setIsUpdating(!isUpdating);
    }

    return (
        {/** une ligne par item */}
        <li>
            {/** nom de l'item (exemple : Nom */}
            <span className='item'><b> {userinfos[i][0]}</b> : </span>
            
            <span className="response">
                {/** valeur actuelle dans la base de données */}
                {!isUpdating ? ( newValue 
                    ) : (
                /** formulaire pour modifier la valeur */
                <form onSubmit={(e) => { e.preventDefault(); submitedit(i, newValue); setIsUpdating(false); }} className="responseform">
                    <input defaultValue={newValue} onChange={(e) => setNewValue(e.target.value)} />
                    <input type="submit" value='&#10004;' />
                </form>
                        
            )} </span>
            
            {/** bouton pour lancer la modification */}
            {!isUpdating &&
                <button className='myfontawesome' onClick={() => editinfo()}>
                    <i className="fa fa-edit"></i>
                </button>
            }
        </li>
    )
}
