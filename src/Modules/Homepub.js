import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";


const Homepub = () => {
    const listeDePub = useSelector(state => state.adsReducer.myads); // récupérer les pubs sous forme tableau d'objets
    const [pubActiveIdx, setPubActiveIdx] = useState(0);

    useEffect(() => {
        // récupérer la pub active (au début de la pub d'index = 0)
        const pubActive = listeDePub[pubActiveIdx];

        // créer un timer pour chanfer la pub active
        const timer = setTimeout(() => {
            // changer la pub active à la suivante
            setPubActiveIdx((pubActiveIdx + 1) % listeDePub.length);
        }, 1000);

        // nettoyer le timer à chaque changement de pub active ou à la fin du composant
        return () => clearTimeout(timer);

    }, [pubActiveIdx, listeDePub]);

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