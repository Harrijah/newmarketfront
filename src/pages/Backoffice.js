import React, { useEffect, useRef, useState } from "react";
import Bomagasin from "../Components/Bomagasin";
import Boproducts from "../Components/Boproducts";
import Bocommands from "../Components/Bocommands";
import Navigation from "../template-parts/Navigation";
import Footer from "../template-parts/Footer";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Boban from "../Components/Boban";
import Rightmaincontent from "../Components/Rightmaincontent";
import Bocol from "../Components/Bocol";
import Leftlateralcolumn from "../Components/Leftlateralcolumn";
import { isEmpty } from "../Assets/Utils";
import { getstoredata } from "../action/store.action";
import Moncompte from "./Moncompte";
import Pub from "../Components/Pub";
import BlogForm from "../Components/BlogForm";
import Superadmin from "./Superadmin";


// CSS : pages/_backoffice.scss
const Backoffice = () => {
    const [mychoice, setMychoice] = useState('magasin');
    const isConnected = useSelector((state) => state.createaccountReducer.isConnected);
    const navigate = useNavigate();
    const userdata = useSelector((state) => state.createaccountReducer.user);
    const storedata = useSelector((state) => state.storeReducer.store);
    const Products = useSelector((state) => state.productReducer.products);
    const allproductslist = useSelector((state) => state.productReducer.products);
    const magasins = useSelector((state) => state.storeReducer.allstore);
    const marques = useSelector((state) => state.marqueReducer.marques);
    const User = useSelector((state) => state.createaccountReducer.user);
    const dispatch = useDispatch();

    /* ********************************************
    **** Afficher les produits dans Backoffice ****
    ******************************************** */
    const [myprodlist, setMyprodlist] = useState([]);
    const premyproducts = [];
    
    // les boutons du leftcol
    const bobutton = userdata.id == 1 ? [
        {
            button: 'magasin',
            text: 'A propos du magasin'
        },
        {
            button: 'products',
            text: 'Produits'
        },
        {
            button: 'commands',
            text: 'Commandes'
        },
        {
            button: 'pub',
            text: 'Publicité'
        },
        {
            button: 'blogform',
            text: 'Blog'
        }, 
        {
            button: 'superadmin',
            text: 'Admin'
        },
        {
            button: 'moncompte',
            text: 'Retour à mon compte'
        }
    ] : [
        {
            button: 'magasin',
            text: 'A propos du magasin'
        },
        {
            button: 'products',
            text: 'Produits'
        },
        {
            button: 'commands',
            text: 'Commandes'
        },
        {
            button: 'pub',
            text: 'Publicité'
        },
        {
            button: 'blogform',
            text: 'Blog'
        },
        {
            button: 'moncompte',
            text: 'Retour à mon compte'
        }
    ];

    const myproducts = () => {
        if (!isEmpty(Products)) {
            for (let i = 0; i < Products.length; i++) {
                if (!isEmpty(Products) && Products[i].storeid == storedata.id) {
                    premyproducts.push(Products[i]);
                }
            }
        };

        // const premyproducts = !isEmpty(Products) && Products.filter((chosen) => chosen.storeid == storedata.id);
        setMyprodlist(premyproducts);
        // return myprodlist; // Retourner la liste filtrée}
    }
    // Si n'est pas connecté, alors renvoie à la page d'accueil <= MBOLA TSY MANDEHA
    useEffect(() => {
        !isConnected && navigate('/');
        !isEmpty(User) ? dispatch(getstoredata(User.id)) : '';
        // sessionStorage.getItem('user');

    }, [isConnected, navigate, User]);

    useEffect(() => { 
        if (!isEmpty(Products)) {
            myproducts();
        }
    }, [Products]);
    

    
    // Définit le contenu (Composant) à afficher dans le backoffice
    let content;
    switch (mychoice) {
        case 'magasin':
            content = <Bomagasin userdata={userdata} storedata={storedata} />
            break;
        case 'products':
            content = <Boproducts userdata={userdata} storedata={storedata} productslist={!isEmpty(Products) && Products ? myprodlist : ''} />
            break;
        case 'commands':
            content = <Bocommands />
            break;
        case 'pub':
            content = <Pub userdata={userdata} storedata={storedata} />
            break;
        case 'superadmin':
            userdata.id == 1 ? content = <Superadmin /> : ''
            break;
        case 'blogform':
            content = <BlogForm userdata={userdata} storedata={storedata} />
            break;
        default:
            content = <Bomagasin userdata={userdata} storedata={storedata} />
            break;
    }

    // Si n'est pas connecté, alors renvoie à la page d'accueil
    useEffect(() => {
        !isConnected && navigate('/');
    }, [isConnected, navigate]);

    const leftColumnRef = useRef(null);
    const rightContentRef = useRef(null);

    useEffect(() => {
        const leftColumnHeight = rightContentRef.current.getBoundingClientRect().height;
        leftColumnRef.current.style.minHeight = `${leftColumnHeight}px`;
        if (mychoice == 'moncompte') {
            navigate('/moncompte');
        }

    }, [mychoice]);
    

    return (
        <div className="container">
            <Navigation allproductslist={allproductslist} magasins={magasins} marques={marques} />
            <Boban />
            <Leftlateralcolumn leftColumnRef={leftColumnRef} button={ <Bocol setMychoice={setMychoice} mychoice={mychoice} bobutton={bobutton} /> } />
            <Rightmaincontent rightContentRef={rightContentRef}  content={content}/>
            <Footer />
        </div>
    ) 
}

export default Backoffice;