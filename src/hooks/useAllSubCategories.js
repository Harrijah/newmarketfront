import { useMemo} from "react"; 
import {useSelector} from "react-redux";

export const useAllSubCategories = (categorySelect) => {
    const subCategoryList = useSelector((state) => state.souscatReducer.souscat);

    const allSubCategories = useMemo(() => {
        if(!subCategoryList || typeof(subCategoryList) != 'object') return [];

        return subCategoryList
            .filter((sc) => sc.category == categorySelect)
            .map((sc) => (
                <option key = {sc.id} value = {sc.id}>
                    {sc.souscategorie}
                </option>
                )
            )
        
    }, [ subCategoryList, categorySelect]);

    return allSubCategories;
}