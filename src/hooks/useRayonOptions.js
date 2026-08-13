import { useMemo } from "react";
import { useSelector } from "react-redux";

// retourne la liste de tous les rayons
export function useRayonOptions() {
  const rayonlist = useSelector((state) => state.rayonReducer.rayon);

  const rayonOptions = useMemo(() => {
    if (!rayonlist || typeof rayonlist !== "object") return [];

    return rayonlist.map((rayon, index) => (
      <option key= {rayon.id || index} value = {rayon.id}>
        {rayon.rayon}
      </option>
    ));

  }, [rayonlist]);

  return rayonOptions;
};

