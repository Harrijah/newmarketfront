import {useMemo} from 'react';
import {useSelector} from 'react-redux';

export const useAllStores = (rayonSelect) => {
	const stores = useSelector((state) => state.storeReducer.allstore);
	
	const storeList = useMemo(()=> {
	if(!stores || typeof(stores) != 'object') return [];
		return stores
			.filter((store) => store.categorie == rayonSelect)
			.map((store) => (
				<option key={store.id} value={store.id}>
					{store.nommagasin}
				</option>
			));
	}, [stores, rayonSelect]);
	
	return storeList;

}