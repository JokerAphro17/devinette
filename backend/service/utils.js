module.exports.userCreateError = (err) => {
  let errors = { pseudo: "" };

  if (err.original.sqlMessage.includes("pseudo"))
    errors.pseudo = "Numero incorrect ou déjà pris";
  return errors;
};

module.exports.createUuid = () => {
  let uuid = "";
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < 6; i++) {
    uuid += possible.charAt(Math.floor(Math.random() * possible.length));
    uuid += "-";
    for (let j = 0; j < 6; j++) {
      uuid += possible.charAt(Math.floor(Math.random() * possible.length));
    }
  }
  return uuid;
};
