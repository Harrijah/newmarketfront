import {useMemo} from "react";
import {useSelector} from "react-redux";

export const useAllBrands = (rayonSelect) => {
	const marques = useSelector((state) => state.marqueReducer.marque);
	
	const brandList = useMemo (() => {
		if(!marques || typeof(marques) != 'object') return [];
		
        return marques
        .filter((brand) => brand.idrayon == rayonSelect)
        .map((brand) => (
            <option key={brand.id} value={brand.id}>
                {brand.marque}
            </option>)
        )
		
	}, [rayonSelect, marques]);
	return brandList;
}