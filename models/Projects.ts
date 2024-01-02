const mongoose = require("mongoose");

const projects = mongoose.Schema({
  projectName: {
    type: String,
  },
  userEndPoint: {
    type: String,
  },
  projectEndPoint: {
    type: String,
  },
  initialMessage: {
    type: String, 
  },
  suggestedMessage: {
    type: String,
  },
  theme: {
    type: Number,
  },
  headerColor: {
    type: String,
  },
  file: {
    type: String,
  },
  removeProjectProfileImage: { //removeBotProfileImage
    type: Boolean,
  },
  userMessageColor: {
    type: String,
  },
  removeProjectIcon: {//removeChatIcon
    type: Boolean,
  },
  projectBubbleColor: {
    type: String,
  },
  alignProjectBubbleButtonColor: {
    type: Number,
  },
  date: {
    type: String,
  },
  value: {
    type: String, 
  },
  labelName: {
    type: String,
  },
  projectMsgColor: {
    type: String,
  },
  internal: { type: Boolean ,required: true},
  url: { type: String },
  datasource: { type: Number },
  profileImageUrl: { type: String },
  tags:{type:String}
});

module.exports = mongoose.model("hiteshi_projects", projects);
