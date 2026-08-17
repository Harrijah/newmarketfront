import {useState, useMemo} from "react"; 
import {useSelector} from "react-redux";

export const useAllSubCategories = (categorySelect) => {
    const allproducts = useSelector((state) => state.productReducer.products);
    const subCategoryList = useSelector((state) => state.souscatReducer.souscat);

    const allSubCategories = useMemo((categorySelect) => {
        if(!allproducts || !subCategoryList || typeof(subCategoryList) != 'objet') return [];
        

        
    }, [allproducts, subCategoryList, categorySelect]);

    return allSubCategories;
}