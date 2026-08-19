import {useMemo} from "react";
import {useSelector} from "react-redux";

export const useAllCategories = (rayonSelect, rayonlist) => {
    const categoryList = useSelector((state) => state.categorieReducer.categorie);

    const categoryOption = useMemo(() => {
        if (!categoryList || typeof(categoryList) !== 'object') return [];

        return (
            categoryList.map((category, index) => category.idrayon == rayonSelect && (
                <option key={category.id || index} value={category.id}>
                    {category.categorie}
                </option>
            ))
        );
    }, [categoryList, rayonSelect, rayonlist]);

    return categoryOption;
}