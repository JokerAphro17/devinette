const userController = require("./users.controller");
const router = require("express").Router();

router.get("/", userController.getUser);
router.get("/:id", userController.findOne);
router.post("/", userController.create);
router.put("/:id", userController.update);
router.delete("/:id", userController.delete);
module.exports = router;
