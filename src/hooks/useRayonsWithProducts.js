import { useMemo } from "react";
import {useSelector} from "react-redux";

export function useRayonsWithProducts() {
    const allProducts = useSelector((state) => state.productReducer.products);
    const rayonlist = useSelector((state) => state.rayonReducer.rayon);

    return useMemo(() => {
        if (!allProducts || !rayonlist) return [];

        /** dédoublonnage des IDs des rayons auxquels sont rattachés des produits */
        const useRayonIds = new Set(allProducts.map((p) => p.rayon));

        /** filtrer la liste de rayon, afin de ne garder que ceux avec des produits */
        const useRayonsWithProducts = rayonlist.filter((rayon ) => useRayonIds.has(rayon.id));

        return useRayonsWithProducts.map((rayon, index) => (
            <option key={rayon.id || index} value={rayon.id}>
                {rayon.rayon}
            </option>
        ));

        
    }, [allProducts, rayonlist]);

}