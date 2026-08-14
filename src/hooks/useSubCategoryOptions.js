import {useMemo} from "react";
import {useSelector} from "react-redux";

/* 
retourne la liste des sous-catégories où il y a des produits, selon la catégorie sélectionnée 
*/
export const useSubCategoryOptions = (categorySelect) => {
    const allproducts = useSelector((state) => state.productReducer.products);
    const subCategoryList = useSelector((state) => state.souscatReducer.souscat);

    const subCategoryOptions = useMemo(() => {
        if(!allproducts || !subCategoryList || typeof(subCategoryList) !== 'object') return [];

        // filtrer les sous-catégories où il y a seulement des produits
        const usedProductsSubCat = new Set(allproducts.souscat);
        // Tous les produits utilisés
        const xxx = allproducts.filter((x) => allproducts.x.has(usedProductsSubCat));


        return subCategoryList.map((categorySelect, index) => categorySelect == xxx.categorie && (
            <option key={subCategoryList.id || index} value={subCategoryList.id} >
                {xxx.souscat}
            </option>
        ))
    });

    return subCategoryOptions;
}