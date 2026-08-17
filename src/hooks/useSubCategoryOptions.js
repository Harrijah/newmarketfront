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

        // créer un Set d'Id de sous-catégorie où il y a des produits
        const usedSubCarIds = new Set(allproducts.map((p) => p.souscategorie));
        
        // Filtrer la liste des Sous-catégories avec le Set où il y a des produits
        const subCatsWithProducts = subCategoryList.filter((sc) => usedSubCarIds.has(sc.id));

        // la liste des sous-catégories qui sont enfants de la catégorie sélectionnée
        return subCatsWithProducts.map((subCategory, index) => subCategory.categorie == categorySelect && (
            <option key={subCategory.id || index} value={subCategory.id} >
                {subCategory.souscategorie}
            </option>
        ))
    }, [categorySelect, allproducts, subCategoryList]);

    return subCategoryOptions;
}