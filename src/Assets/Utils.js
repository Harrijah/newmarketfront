export const isEmpty = (value) => {
    return (
        value === undefined ||
        value === null ||
        (typeof value === 'object' && Object.keys(value).length === 0) ||
        (typeof value === 'string' && value.trim().length === 0)
    );
};

// séparateur de milliers
export const numStr = (a, b) => {
  a = "" + a;
  b = b || " ";
  var c = "",
    d = 0;
  while (a.match(/^0[0-9]/)) {
    a = a.substr(1);
  }
  for (var i = a.length - 1; i >= 0; i--) {
    c = d != 0 && d % 3 == 0 ? a[i] + b + c : a[i] + c;
    d++;
  }
  return c;
};

// active le modal de recherche rapide de produits dans la barre de navigation
export const rapidsearchmodal = (clientsearchvalue, setRapidsearch) => {
  if (clientsearchvalue != "") {
    setRapidsearch(true);
    document.body.style.overflow = "hidden";
  } else {
    setRapidsearch(false);
    document.body.style.overflow = "auto";
  }
};

/** 
 * cherche et retourne une valeur depuis n'importe quelle table dans MySQL
 * base : le nom de la table dans MySQL
 * id : l'id de l'item
 * request : le nom de la colonne dans la table où l'on cherche l'information
 */
export const searchinfo = (base, id, request) => {
  const tempinfo =
    !isEmpty(base) &&
    typeof base == "object" &&
    base.find((info) => info.id == id);
  if (tempinfo && request in tempinfo) {
    return tempinfo[request];
  } else {
    return "";
  }
};

/** choisir un rayon */
export const rayonchoice = (e) => {
  const [rayonselect, setRayonselect] = useState(0);
  setRayonselect(e.target.value);
  return rayonselect;
};

