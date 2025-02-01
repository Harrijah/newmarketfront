import { convertToRaw, EditorState } from "draft-js";
import React, { useEffect, useRef, useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import { rayonsgen } from "../Assets/Functions";
import { useDispatch, useSelector } from "react-redux";
import { addNewBlog } from "../action/blog.action";
import { isEmpty } from "../Assets/Utils";

const BlogForm = ({userdata, storedata}) => {
    // ----------------------- Variables
    const [listeArticle, setListeArticle] = useState([]);
    const [monArticle, setMonArticle] = useState();
    const articles = useSelector(state => state.blogReducer.articles);
    const categorieArticle = rayonsgen();
    const formRef = useRef();
    const dispatch = useDispatch();

    // ----------------------- Fonctions

    // Montrer la liste d'articles
    const showAList = () => {
        const templist = !isEmpty(articles) && Array.from(articles)
            .filter(article => Number(article.storeid) == Number(storedata.id))
            .map(article => (
            <li key={article.id}>
                <span className="modifyprod"><button className="nomproduit">{article.title}</button></span>
                <button className="myfontawesome"><i className="fas fa-times"></i></button>
            </li>
        ));

        setListeArticle(templist);
    }

    // Mise à jour de l'Editor
    const nouvelArticle = (newEditorState) => {
        setMonArticle(newEditorState);
    }

    //Image
    const [couverture, setCouverture] = useState([]);
    // Editor
    const textOfEdtitor = monArticle ? monArticle.getCurrentContent() : '';
    const finalNew = monArticle ? convertToRaw(textOfEdtitor) : '';

    // Ecrire un nouvel article
    const addNews = (e) => {
        e.preventDefault();
        const data = {
            userid : userdata.id,
            storeid: storedata.id,
            categorie: formRef.current[0].value,
            title: formRef.current[2].value,
            content: JSON.stringify(finalNew),
            couverture: couverture[0],
        }
        dispatch(addNewBlog(data));

        // Effacer le formulaire
        formRef.current.reset();
        setMonArticle(EditorState.createEmpty());
        
    }
    
    // ----------------------- Logique
    useEffect(() => { 
        showAList();
    }, [articles]);


    return (
        <div className="monmagasin">
            <div className="infoblock">
                <h2>Mes articles</h2>
                <ul>
                    { listeArticle }
                </ul>
            </div>
            <div className="infoblock">
                <h2>Ajouter un article</h2>
                <form ref={formRef} onSubmit={(e) => addNews(e)} encType='multipart/form-data'>
                    <label htmlFor="categorie">Choisissez une catégorie</label>
                    <select name="categorie">
                        {categorieArticle}
                        <option value={'19'}>Astuces et Conseils</option>
                        <option value={'20'}>Non catégorisé</option>
                    </select><br />
                    <label htmlFor="articleImage">Ajoutez une image de couverture</label>
                    <input type="file" name="articleImage" id="" onChange={(e) => setCouverture(e.target.files)} /><br/>
                    <label htmlFor="articleTitre">Titre de votre actualité</label>
                    <input type="text" name="articleTitre" placeholder="Ex: Découvrez comment utiliser nos produits" />
                    <br />
                    <Editor editorState={monArticle} onEditorStateChange={nouvelArticle} placeholder="Ajouter du texte, ici" ></Editor>
                    <input type="submit" value="Envoyer" />
                </form>
            </div>
        </div>
    );
}

export default BlogForm;