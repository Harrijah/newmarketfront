import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { isEmpty } from "../Assets/Utils";


const Homepub = () => {
    const listeDePubBrute = useSelector(state => state.adsReducer.myads); // récupérer les pubs sous forme tableau d'objets
    const listeDePub = !isEmpty(listeDePubBrute) && Array.from(listeDePubBrute).filter((ad) => ad['active'] == '1'); // filtrer les pubs "cochées" dans la bdd
    console.log(listeDePub);
    
    const [pubActiveIdx, setPubActiveIdx] = useState(0);

    useEffect(() => {
        // récupérer la pub active (au début de la pub d'index = 0)
        const pubActive = listeDePub[pubActiveIdx];

        // créer un timer pour changer la pub active
        const timer = setTimeout(() => {
            // changer la pub active à la suivante
            setPubActiveIdx((pubActiveIdx + 1) % listeDePub.length);
        }, 1000);

        // nettoyer le timer à chaque changement de pub active ou à la fin du composant
        return () => clearTimeout(timer);

    }, [pubActiveIdx, listeDePubBrute]);

    // si pas de pub disponible, on afficher un message ou alors une pub par défaut
    if (listeDePub.length === 0) {
        return <div>Pas de pub disponible</div>
    }

    // récupérer la pub active
    const pubActive = listeDePub[pubActiveIdx];



    return (
        <>
            <img src={`https://web.axel.mg/uploads/${pubActive.imagepub}`} alt={pubActive.titre} />
        </>
    )
}
export default Homepub;