import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty } from "../Assets/Utils";
import { searchinfo } from "../Assets/Functions";
import { showad, updateAdState } from "../action/ads.action";

const Superadmin = () => {
    // ------------------------------ variables
    const dispatch = useDispatch();
    const adList = useSelector((state) => state.adsReducer.myads);
    const magasins = useSelector((state) => state.storeReducer.allstore);
    const [allAds, setAllAds] = useState([]);

    // ------------------------------ fonctions
    // afficher une pub dans un modal
    const sendAdStatus = (e, id) => {
        const adPosition = e.pageY - e.clientY;
        const data = {
            id: id,
            adpos: adPosition,
            adstatus: true,
        }
        // console.log(data);
        dispatch(showad(data));
    }
    // changer l'état de la pub dans la table "ads" - mysql
    const reverseAdState = (id, activeStatus) => {
        const newstatus = (Number(activeStatus) == 1) ? 0 : 1;
        const data = {
            id: id,
            active: newstatus
        }
        console.log('this is our data : ' + data);
        
        dispatch(updateAdState(data)); // envoyer la modification à la bdd via Redux / action => updateAdState()
    }
    // générer la liste brute de publicités dans la bdd
    const showAds = () => {
        const templist = !isEmpty(adList) && Array.from(adList).map((ad) => (
            <div key={ad.id} className="adlister"> 
                <button
                    className="adname"
                    onClick={(e) => sendAdStatus(e, ad.id)} // afficher la pub dans un modal (passant par Redux car le modal est dans le footer)
                >
                    {ad.titre} - <b>{searchinfo(magasins, ad.storeid, "nommagasin")}</b>
                </button>
                <input
                    type="checkbox"
                    name={ad.titre}
                    checked={Number(ad.active) == '1' ? 'checked' : ''} // vérifie si dans la bdd la colonne "active" de la pub est 0 ou 1
                    />
                <label
                    htmlFor={ad.titre}
                    onClick={(e) => reverseAdState(ad.id, ad.active)} // changer le statut "checked" de la checkbox => passe par mysql
                >Mettre en ligne</label>
                <button className="supprimer">Supprimer</button><br />
            </div>
        ));
        setAllAds(templist);
    }

    // ------------------------------ logiques
    useEffect(() => {
        showAds();
     }, [adList]);

    return (
        <div id="panelAdmin">
            <div className="adlistcontainer">
                {/* affichage de la liste de pubs finale */}
                {allAds}
            </div>
        </div>
    )
}
export default Superadmin;