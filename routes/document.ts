import Document from "../controllers/Document";
import { pdfUpload } from "../helpers/documentUpload";
const express = require("express");
const router = express.Router();
const document = new Document();

router.get("/", document.getlist);
router.post("/",pdfUpload.single("pdf"), document.createDocument);
router.delete("/:id", document.deleteDocument);
router.get("/search", document.search);
module.exports = router;
