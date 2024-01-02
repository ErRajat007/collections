import path from "path";

const multer = require("multer");

const storageEngine = multer.diskStorage({
  destination: "./public/images",
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
  //Allowed file extensions
  const fileTypes = /jpeg|jpg|png|gif|svg/;

  //check extension names
  const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());

  const mimeType = fileTypes.test(file.mimetype);

  if (mimeType && extName) {
    return cb(null, true);
  } else {
    cb("Error: You can Only Upload Images!!");
  }
};

export const upload = multer({
  storage: storageEngine,
  // limits: { fileSize: 1000000 },
  fileFilter: (_req: any, file: any, cb: any) => {
    checkFileType(file, cb);
  },
});
