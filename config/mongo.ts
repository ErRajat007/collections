import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const URL= process.env.DATA_CONNECTION_URL;
// const URL="mongodb+srv://deependrahiteshi:Info%40123@cluster0.vdzwhhx.mongodb.net/hiteshiChatbot"
if (URL) {
    mongoose.connect(URL)
      .then(() => console.log("success"))
      .catch(() => console.log("error"));
  } else {
    console.log("MongoDB URL is undefined");
  }