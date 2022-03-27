const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");
const { authenticated } = require("../middleware/authMiddleware");
const upload = require("../middleware/upload")


router.post("/login", userController.loginUser);
router.get("/logout", userController.logoutUser);
router.post("/user/new" ,   upload.single('avatar') ,   authenticated, userController.createuser);
router.get("/users", authenticated, userController.getAllusers);
router.get("/user/:id", authenticated , userController.getuserById);
router.put("/user/update/:id", authenticated ,userController.updateuser);
router.delete("/user/delete/:id", authenticated , userController.deleteuser);
module.exports = router;
