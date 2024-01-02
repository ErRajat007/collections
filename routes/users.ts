const express = require("express");
const router = express.Router();
const verifyToken = require('../helpers/jwt');

import Users from "../controllers/Users";
const users = new Users();

router.get("/", verifyToken,users.getlist);
router.post("/",verifyToken, users.createUser);

 
module.exports = router;
