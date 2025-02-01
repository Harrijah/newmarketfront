import React from 'react';
import Navigation from '../template-parts/Navigation';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { isEmpty } from '../Assets/Utils';



const BlogPage = () => {
    // ----------------------------------------- variables
    const allproductslist = useSelector((state) => state.productReducer.products);
    const magasins = useSelector((state) => state.storeReducer.allstore);
    const marques = useSelector((state) => state.marqueReducer.marque);
    const articles = useSelector(state => state.blogReducer.articles);
    const id = useParams();
    const currentNew = !isEmpty(articles) && Array
        .from(articles)
        .filter(article => Number(article.id) == Number(id.id));
    

    return (
        <>
            <h2></h2>
            <div>
                <Navigation allproductslist={allproductslist} magasins={magasins} marques={marques} />
                <div
                    className="imagesection"
                    style={{width: '400px'}}
                >
                    <img
                        src={"https://web.axel.mg/uploads/" + currentNew[0]?.couverture} 
                        alt="Mon image"
                        style={{width: '100%'}}
                    />
                </div>
                <div><h1>{ currentNew[0]?.title }</h1></div>
            </div>

        </>
    )

}

export default BlogPage;