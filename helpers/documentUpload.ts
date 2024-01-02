import path from "path";
const multer = require("multer");

const storageEngine = multer.diskStorage({
  destination: "./public/document",
  filename: (
    _req: any,
    file: { originalname: any },
    cb: (arg0: null, arg1: string) => void
  ) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const checkFileType = function (
  file: { originalname: any; mimetype: string },
  cb: any
) {

  const fileTypes = /pptx|ppt|pdf/;
  const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimeTypes = [
    'application/pdf',
    'application/vnd.ms-powerpoint',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation'
  ];

  const mimeType = mimeTypes.includes(file.mimetype);
  if (mimeType && extName) {
    return cb(null, true);
  } else {
    cb("Error: You can only upload PPT, PPTX, or PDF documents!", false);
  }
};

export const pdfUpload = multer({
  storage: storageEngine,
  // limits: { fileSize: 1000000 },
  fileFilter: (_req: any, file: any, cb: any) => {
    checkFileType(file, cb);
  },
});
