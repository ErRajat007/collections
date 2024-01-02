import Projects from "../controllers/Projects";
import { upload } from "../helpers/imageUpload";
const express = require("express");
const router = express.Router();
const verifyToken = require('../helpers/jwt');


const project = new Projects();

router.get("/",verifyToken, project.getlist);
router.post("/", upload.single("image"), project.createProject);
router.patch("/:id", upload.single("image"), project.updateProject);
router.get("/search", project.search);

router.get("/search", project.search);

module.exports = router;
