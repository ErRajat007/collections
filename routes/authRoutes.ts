import AuthController from "../controllers/AuthController";
const express = require("express");
const router = express.Router();
const authController = new AuthController();
  

router.post("/login", authController.loginUser);
router.get("/refresh", authController.reIssueToken);

module.exports = router;
