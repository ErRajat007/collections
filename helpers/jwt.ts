import { Request, Response, NextFunction } from 'express';
import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';
const JWT = require('jsonwebtoken');
const apiResponse = require('../helpers/responses');
const message = require('../helpers/messages')
// Define a custom type for the user property
interface CustomRequest extends Request {
	user?: any; // Adjust the type accordingly
  }
let jwt_secret=process.env.JWT_SECRET

	const accessToken = async (req: CustomRequest, res: Response, next:NextFunction) => {
		try {
			const { authorization } = req.headers;
		
			if (!authorization || authorization === 'null') {
				return apiResponse.unauthorizedResponse(res,message.errorMsg.Unauthorized)
			}
			const bearerToken=authorization.slice(7)
			const decodedKey = await JWT.verify(bearerToken, jwt_secret) 
			req.user = decodedKey;
			return next();
		} catch (error) {
			 // Handle token verification errors
			 if (error instanceof JsonWebTokenError) {
				return res.status(401).json({ status: false, message: 'Unauthorized: Invalid token' });
			  } else if (error instanceof TokenExpiredError) {
				return res.status(401).json({ status: false, message: 'Unauthorized: Token expired' });
			  } else {
				return res.status(500).json({ status: false, message: 'Internal Server Error' });
			  }
		}
	}


module.exports = accessToken;
