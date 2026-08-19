import {useMemo} from "react";
import {useSelector} from "react-redux";

export const useCategoryWithProducts = (rayonSelect, rayonlist) => {
    const allproducts = useSelector((state) => state.productReducer.products);
    const categoryList = useSelector((state) => state.categorieReducer.categorie);

    const filteredCategory = useMemo(() => {
        if (!allproducts || !categoryList) return [];

        // lister les IDs de catégories où il y a des produits
        const categoryIds = new Set(
            allproducts.map((catid) => catid.categorie)
        );
    
        // filtrer les catégories où il y a des produits
        const remainingCategory = categoryList.filter((cat) => categoryIds.has(cat.id));
        
        return remainingCategory
            .filter((cat) => cat.rayon == rayonSelect)
            .map((cat) => (
                <option key={cat.id} value={cat.id}>
                    {cat.categorie}
                </option>
            ));
    }, [allproducts, categoryList, rayonSelect, rayonlist]);

    return filteredCategory;


}