import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { isEmpty } from "../Assets/Utils";
import { convertFromRaw, convertToRaw, EditorState } from "draft-js";
import draftToHtml from "draftjs-to-html";
import { useNavigate } from "react-router-dom";


const Homeblog = () => {
    //------------------------- Variables
    const articles = useSelector(state => state.blogReducer.articles)
    const [newsList, setNewsList] = useState();
    const goto = useNavigate();
    const mylink = (id) => {
        goto('/news/' + id);
    }


    //------------------------- Fonctions
    // lire les données de WYSIWYG
    const convertDraftToHtml = (rawContentState) => {
        const contentState = convertFromRaw(rawContentState);
        const editorState = EditorState.createWithContent(contentState);
        return draftToHtml(convertToRaw(editorState.getCurrentContent()));
    }

    const transformToText = (blocContent) => {
        const htmlString = convertDraftToHtml(JSON.parse(blocContent));
        const tempElement = document.createElement('div');
        tempElement.innerHTML = htmlString;
        const mytext = tempElement.innerText || tempElement.textContent;
        return mytext.length > 30 ? mytext.substring(0, 30) + ' ...' : mytext;
    }

    // faire une liste d'articles
    const showNews = () => {
        const templist = !isEmpty(articles) && Array.from(articles)
            .slice(-3)
            .map(article => (
                <div className="productbox" key={article.id} style={{minWidth: '275px'}}>
                    <div className="elementscontainer">
                        <div className="imgsection">
                            <button onClick={() => mylink(article.id)}>
                                <img src={'https://web.axel.mg/uploads/'+ article.couverture} alt="Pas d'image pour l'instant" />
                            </button>
                        </div>
                        <div className="txtsection">
                            <a><button
                                onClick={() => mylink(article.id)}
                                style={{
                                    backgroundColor: 'none',
                                    border: 'none',
                                    width: '100%',
                                    cursor: 'pointer'
                                }}
                            >{article.title}</button><h3></h3></a>
                            <div className="otherdetails">
                                {/* <div dangerouslySetInnerHTML={{ __html: convertDraftToHtml(JSON.parse(article.content)) }} /> */}
                                {transformToText(article.content)}
                            </div>
                        </div>
                        <button
                            className="homebutton02"
                            style={{ display: 'block', width: '50%', margin: '5px auto' }}
                            onClick={() => mylink(article.id)}
                        >Lire la suite</button>
                    </div>
                </div>
            )
        );
        setNewsList(templist);
    }



    //------------------------- Logiques
    //afficher les articles de blog
    useEffect(() => { 
        showNews();
    }, [articles]);

    return (
        <div className="productfilter">
            <div className="filtercontainer">
                <h2>Les actus des boutiques membres</h2>
            </div>
            <div className="productscontainer" style={{alignItems: 'top'}}>
                { newsList }
            </div>

        </div>
    )

}

export default Homeblog;