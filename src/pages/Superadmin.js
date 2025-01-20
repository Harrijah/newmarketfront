import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty } from "../Assets/Utils";
import { searchinfo } from "../Assets/Functions";
import { showad } from "../action/ads.action";

const Superadmin = () => {
    // ------------------------------ variables
    const dispatch = useDispatch();
    const adList = useSelector((state) => state.adsReducer.myads);
    const magasins = useSelector((state) => state.storeReducer.allstore);
    const [allAds, setAllAds] = useState([]);
    const [showthisad, setShowthisad] = useState('');

    // ------------------------------ fonctions
    const sendAdStatus = (e, id) => {
        const adpos = e.pageY - e.clientY;
        const data = {
            adpos: adpos,
            adstatus: true,
            id: id
        }
        // console.log(data);
        dispatch(showad(data));
    }
    const showAds = () => {
        const templist = !isEmpty(adList) && Array.from(adList).map((ad) => (
            <div key={ad.id} className="adlister"> 
                <button className="adname" onClick={(e) => sendAdStatus(e, ad.id)}>
                    {ad.titre} - <b>{searchinfo(magasins, ad.storeid, "nommagasin")}</b>
                </button>
                <input type="checkbox" name={ad.titre} id={ad.titre} />
                <label htmlFor={ad.titre}>Mettre en ligne</label>
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
                {allAds}
            </div>


        </div>


    )
}

export default Superadmin;