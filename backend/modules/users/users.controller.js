const { userCreateError, createUuid } = require("../../service/utils");
const userService = require("./user.service");

module.exports.getUser = async (req, res) => {
  const users = await userService.getAll();
  res.status(200).json({ msg: "success", users });
};

module.exports.create = async (req, res) => {
  let user;
  try {
    if (Object.keys(req.body).length === 0)
      return res
        .status(400)
        .json({ success: false, message: "pas de données" });
    const { pseudo } = req.body;
    if (!pseudo) {
      return res.status(400).json({ success: false, message: "pseudo vide" });
    }
    const d = {
      pseudo,
    };
    user = await userService.findByPseudo(pseudo);
    if (user) {
      return res
        .status(200)
        .json({ success: true, data: user, message: "utilisateur trouvé" });
    }
    d.id = createUuid();
    user = await userService.create(d);
    return res
      .status(201)
      .json({ success: true, data: user, message: "utilisateur créé" });
  } catch (err) {
    const errors = userCreateError(err);
    console.log(err);
    res.status(500).json({ success: false, message: "erreur serveur", errors });
  }
};

module.exports.update = async (req, res) => {
  if (Object.keys(req.body).length === 0)
    return res.status(400).json({ success: false, message: "pas de données" });
  const u = await userService.findById(req.params.id);
  const d = {
    ...req.body,
    mark: u.mark + req.body.mark,
  };
  const user = await userService.update(req.params.id, d);
  res
    .status(200)
    .json({ success: true, data: user, message: "Utilisateur mis à jour" });
};

module.exports.findOne = async (req, res) => {
  const user = await userService.findById(req.params.id);
  if (!user) {
    return res
      .status(404)
      .json({ success: false, message: "Utilisateur non trouvé" });
  }
  res
    .status(200)
    .json({ success: true, data: user, message: "Utilisateur trouvé" });
};

module.exports.delete = async (req, res) => {
  const user = await userService.delete(req.params.id);
  res.status(200).json({ success: true, message: "Utilisateur supprimé" });
};
