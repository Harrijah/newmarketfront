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

