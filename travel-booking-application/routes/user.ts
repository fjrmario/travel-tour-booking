const express = require("express");
const router = express.Router();

const { verifyUser, verifyAdmin } = require("../utility/verifyToken.ts");
const user = require("../controllers/userController.ts");

router.put("/:id", verifyUser, user.updateUser);
router.delete("/:id", verifyUser, user.deleteUser);
router.get("/:id", verifyUser, user.getSingleUser);
router.get("/", verifyAdmin, user.getAllUser);

module.exports = router;
