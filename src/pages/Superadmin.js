import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { isEmpty } from "../Assets/Utils";
import { searchinfo } from "../Assets/Functions";

const Superadmin = () => {
    // ------------------------------ variables
    const adList = useSelector((state) => state.adsReducer.myads);
    const magasins = useSelector((state) => state.storeReducer.allstore);
    const [allAds, setAllAds] = useState([]);

    // ------------------------------ fonctions
    const showAds = () => {
        const templist = !isEmpty(adList) && Array.from(adList).map((ad) => (
            <div key={ad.id}> 
                <input type="checkbox" name={ad.titre} id={ad.titre} />
                <label htmlFor={ad.titre}>{ad.titre} - de <b>{ searchinfo(magasins, ad.storeid, "nommagasin") }</b></label><br />
            </div>
        ));
        setAllAds(templist);
    }


    // ------------------------------ logiques
    useEffect(() => {
        showAds();
     }, [adList]);


    return (
        <>
            <div id="panelAdmin">
                {allAds}
            </div>


            <div id="panelPub">

            </div>
        </>
    )


}

export default Superadmin;