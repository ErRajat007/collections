const mongoose = require("mongoose");

const documents = new mongoose.Schema({
    projectID: { type: String },
    path: { type: String },
    tags: { type: String },
    type: { type: String },
    date: { type: Date },
    fileName: {
        type: String,
      }
});

module.exports = mongoose.model("hiteshi_documents", documents);
