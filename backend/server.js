const express = require("express");
const cors = require("cors");
const db = require("./db/db");
const usersRoute = require("./modules/users/users.router");
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(`/api/users`, usersRoute);
(async () => {
  await db.sequelize.sync();
})();
app.listen(PORT, () =>
  console.log(`la connexion est établie sur le port ${PORT}`)
);
