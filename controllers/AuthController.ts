import { Request, Response } from "express";
const apiResponse = require('../helpers/responses');
const message = require('../helpers/messages');
const UsersSchema = require("../models/Users");
const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');

import {
	createAccessToken,
	createRefreshToken,
  } from "../helpers/token";

class AuthController {
	async loginUser(req: Request, res: Response) {
		try {
		  const { email, password } = req.body;
		  if(!email){
			return apiResponse.validationError(res,message.errorMsg.EmailRequiredError)
		  }
		  if(!password){
			return apiResponse.validationError(res,message.errorMsg.PasswordRequiredError,)
		  }
		  //add encrypted pwsd here
	
		  const isExists = await UsersSchema.find({email:req.body.email});
		  if (isExists.length > 0) {
	
			let user = isExists[0]
			bcrypt.compare(password, user.password, async(err:Error, verified:boolean) => {
			  if(verified){            
				const accessToken = await createAccessToken({
				  _id:user._id,
				  email: email,
				 
				});
				const refreshToken = await createRefreshToken({
				  _id:user._id,
				  email: email,
				});   
				return apiResponse.successResponseWithData(
				  res,
				  message.successMsg.LoginSuccess,
				  {
					_id:user._id,
					email:user.email,
					isAdmin:user.isAdmin,
					accessToken: accessToken,
					refreshToken: refreshToken,
				  }
				); 
			  }else{
				return apiResponse.unauthorizedResponse(
				  res,
				  message.errorMsg.WrongPassword
				)}
			})
		  }else {
			return apiResponse.unauthorizedResponse(res,message.errorMsg.WrongPassword)
		  }
		} catch (err: any) {
		  return apiResponse.serverErrorResponse(res, err.message);
		}}
  
	
	async reIssueToken(req: Request, res: Response) {
		try {
			const token = req.body.token;
			const tokenVerify= JWT.verify(token, process.env.JWT_SECRET);
			const accessToken = await createAccessToken(tokenVerify.data);
			// res
			//   .status(200)
			//   .json({ message: true, data: { accessToken: accessToken } });
			return apiResponse.successResponseWithData(res,message.successMsg.ReIssueAccessTokenSuccess,accessToken)
		} catch (err:any) {
			return apiResponse.serverErrorResponse(res, err.message);
		}
		}
 
  }
  
  
  export default AuthController;
  