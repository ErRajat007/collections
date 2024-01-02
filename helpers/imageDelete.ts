const fs = require("fs");

export const DeleteImage = (filename: string) => {
  fs.unlink(`public/images/${filename}`, (err: any) => {
    if (err) {
      console.error(err);
      return false;
    } else return true;
  });
};
