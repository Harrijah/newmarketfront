import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty } from "../Assets/Utils";
import { addMyAds } from "../action/ads.action";



const Pub = ({userdata, storedata}) => {
    // ---------------------------------- Variables  --------------------------------------
    const [listeDePubs, setListeDePubs] = useState([]);
    const pubRef = useRef();
    const dispatch = useDispatch();
    const myads = useSelector((state) => state.productReducer.products);
    
    // soumettre la pub dans la base de données
    const [images, setImages] = useState([]);

    const submitpub = (e) => {
        e.preventDefault();
        const data = {
            userid: userdata.id,
            storeid: storedata.id,
            titre: pubRef.current[0].value,
            imagepub: images[0],
            texte: pubRef.current[2].value,
            lien: pubRef.current[3].value
        }
        dispatch(addMyAds(data));
        // console.log(data);
        

    }

    
    // ---------------------------------- Fonctions  --------------------------------------
    // afficher la liste des publicités 
    const showlist = () => {
        // console.log(myads);
        const templist = !isEmpty(myads) && Array.from(myads)
            .filter((ad) => ad.storeid == storedata.id)
            .map((ad) => (
            <li key={ad.id} className="">
                    <span className="modifyprod">
                        <button className="nomproduit">{ad.nomproduit}</button>
                    </span>
                    <button className="myfontawesome"><i className="fas fa-check"></i></button>
                    <button className="myfontawesome"><i className="fas fa-times"></i></button>
            </li>
        ));

        setListeDePubs(templist);
    }




    
    

    // ---------------------------------- Logiques  --------------------------------------
    // lancer l'affichage de la liste de pubs
    useEffect(() => {
        showlist();
        // console.log(myads);
        
    }, []);

    return (
        <div className="monmagasin">
            <h1>Mes publicités</h1>
            {/* *****************************************************************
                                    Ajouter une publicité 
                ***************************************************************** */}
            
            <div className="infoblock">
                <h2>Ajouter une publicité</h2>
                <form ref={pubRef} encType="multipart/form-data">
                    <label htmlFor="titre">Entrez un titre pour votre publicité</label>
                    <input type="text" name="titre" /><br />
                    <label htmlFor="image">Entrez votre image (format : vertical/portrait)</label>
                    <input type="file" name="image" onChange={(e) => setImages(e.target.files)} /><br />
                    <label htmlFor="texte">Insérez un texte (optionnel /  Caractères max: 255)</label>
                    <input type="text" name="text" /><br />
                    <label htmlFor="lien">Entrez un lien de destination pour votre pub (optionnel)</label>
                    <input type="text" name="lien" /><br />
                    {/* <input type="submit" value="Enregistrer" /> */}
                    <button onClick={(e) => { submitpub(e)}}> Envoyer </button>
                </form>

            </div>

            <div className="infoblock">
                <h2>Liste de mes publicités</h2>
                <ul>
                    {!isEmpty(listeDePubs) && listeDePubs}
                </ul>
            </div>

        </div>
    )

}
export default Pub;