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

        // créer un Set de sous-catégorie où il y a des produits
        const usedSubCarIds = new Set(allproducts.map((p) => p.souscategorie));
        
        // Filtrer la liste des Sous-catégories avec le Set où il y a des produits
        const subCatsWithProducts = subCategoryList.filter((sc) => usedSubCarIds.has(sc.id));

        // la liste des sous-catégories qui sont enfant de la catégorie sélectionnée
        return subCatsWithProducts.map((categorySelect, index) => subCatsWithProducts.categorie == subCatsWithProducts && (
            <option key={subCatsWithProducts.id || index} value={subCatsWithProducts.id} >
                {subCatsWithProducts.souscat}
            </option>
        ))
    }, [categorySelect]);

    return subCategoryOptions;
}