import { Request, Response } from "express";
const apiResponse = require('../helpers/responses');
const message = require('../helpers/messages');
const DocumentSchema = require("../models/Documents");

class Document {
  async getlist(req: Request, res: Response) {

    try {

      let limit =req.query.limit || 10
      let skip = req.query.skip || 0;
   
      const results = await DocumentSchema.find({},null,{ skip, limit});
      let count = results.length;
      res.json({ status: 200, message: 'All Projects Details', data: results ,count});
    } catch (err: any) {
      return apiResponse.serverErrorResponse(res, err.message);
    }
  }

  async createDocument(req: Request, res: Response) {
    try {
      let date = new Date().toISOString();
      let path: string = "../public/document/";
      interface MulterFile {
        filename: string;
      }
      interface MulterRequest extends Request {
        file: any;
      }
      let filename = (req as MulterRequest)?.file?.filename;
      const document = await DocumentSchema.create({ ...req.body, date, path, fileName: filename });
      if (document) {
        apiResponse.successResponseWithData(res, message.successMsg.DocumentCreted, document)
      }
      else{
        apiResponse.notFoundResponse(res, message.errorMsg.NotFoundDocument);
      }
    } catch (err: any) {
      return apiResponse.serverErrorResponse(res, err.message);
    }
  }
  async deleteDocument(req: Request, res: Response) {
    try {
      const FindId= await DocumentSchema.findOne({ projectID: req.params.id });
      
      const document = await DocumentSchema.deleteOne({ projectID: req.params.id });
      if (FindId) {
        apiResponse.successResponseWithData(res, message.successMsg.DocumentDeleted, document)
      }
      else{
        apiResponse.notFoundResponse(res, message.errorMsg.NotFoundDocument);
      }
    } catch (err:any) {
      return apiResponse.serverErrorResponse(res, err.message);
    }
  };

  async search(req:Request, res:Response){
    try{
      
      let searchParam= req.query.searchParam;
      let limit =req.query.limit || 10;
      let skip =req.query.page||0;
      if (!searchParam) {
        return res.status(400).json({ status: 400, message: 'Missing keyword parameter', data: null });
      }
    
      const results = await DocumentSchema.find({
       $or:[
        {tags:{$regex:searchParam,$options: 'i' }}
       ]
        },
        null,
        { skip, limit }
        );
        let count = results.length;

        res.json({ status: 200, message: 'Search results', data: results ,count});
    }catch(err){
      console.log("err")
      return res.json({err:err})
    }
  }  
}


export default Document;
