import { useMemo } from "react";
import useSelector from "react-redux";

export function useRayonsWithProducts() {
    const allProducts = useSelector(() => state.productReducer.products);
    const rayonlist = useSelector(() => state.rayonReducer.rayon);

    return useMemo(() => {
        if (!allproductslist || !rayonlist) return [];

        /** dédoublonnage des IDs des rayons auxquels sont rattachés des produits */
        const useRayonIds = new Set(allProducts.map((p) => p.rayon));

        /** filtrer la liste de rayon, afin de ne garder que ceux avec des produits */
        const useRayonsWithProducts = rayonlist.filter((rayon ) => useRayonIds.has(rayon.id));

        return useRayonsWithProducts.map((rayon, index) => (
            <option key={rayon.id || index} value={rayon.id}>
                {rayon.rayon}
            </option>
        ));

        
    }, [allproductslist, rayonlist]);

}