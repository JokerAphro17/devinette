const {
  models: { user },
} = require("../../db/db");

module.exports.getAll = async () => {
  return user.findAll();
};

module.exports.create = async (payload) => {
  return await user.create(payload);
};

module.exports.update = async (userId, payload) => {
  const data = await user.update(payload, {
    where: {
      Id: userId,
    },
  });
  return await this.findById(userId);
};

module.exports.findById = async (userId) => {
  return await user.findOne({ where: { Id: userId } });
};

module.exports.findByPseudo = async (pseudo) => {
  return await user.findOne({ where: { pseudo } });
};

module.exports.delete = async (userId) => {
  return await user.destroy({ where: { Id: userId } });
};
