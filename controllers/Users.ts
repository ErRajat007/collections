import { Request, Response } from "express";
const UsersSchema = require("../models/Users");
const apiResponse = require('../helpers/responses');
const message = require('../helpers/messages');
const bcrypt = require('bcrypt');


class Users {
  async getlist(req: Request, res: Response) {
    try {
      const list = await UsersSchema.find({}, { password:0 });
      return apiResponse.successResponseWithData(
        res,
        message.successMsg.GetAllUsers,
        list
      ); 
    } catch (err:any) {
      return apiResponse.serverErrorResponse(res, err.message);
    }
  }
  async createUser(req: Request, res: Response) {
    try {

      let hash = await bcrypt.hash(req.body.password,10);
      let userInfo= new UsersSchema({
        email:req.body.email,
        password:hash,
        isAdmin:req.body.isAdmin
        
    })
      const user =await userInfo.save();
      return apiResponse.successResponseWithData(res,message.successMsg.UserCreated,user)
    } catch (err: any) {
      return apiResponse.serverErrorResponse(res, err.message);
    }
  }
 

}

export default Users;
