import { Request, Response } from "express";
import { DeleteImage } from "../helpers/imageDelete";
const message = require('../helpers/messages');
const apiResponse = require('../helpers/responses');
const ProjectModel = require("../models/Projects");


class Projects { 
  async getlist(req: Request, res: Response) {
    try {
      
      let limit =req.query.limit || 10
      let skip = req.query.skip || 0;
   
      const results = await ProjectModel.find({},null,{ skip, limit});
      let count = results.length;
      res.json({ status: 200, message: 'All Projects Details', data: results ,count});
    } catch (err: any) {
      return apiResponse.serverErrorResponse(res, err.message);
    }
  }
  async createProject(req: any, res: Response) {
    try {
      console.log(req.body, "ggggg", {
        ...req.body,
        profileImageUrl: req?.file?.filename,
      });
      const list = await ProjectModel.create({
        ...req.body,
        profileImageUrl: req?.file?.filename,
        date: new Date().toLocaleString().split(',')[0]
      });
     
      apiResponse.successResponseWithData(res,message.successMsg.ProjectCreted,list)
    } catch (err: any) {
      DeleteImage(req?.file?.filename);
      return apiResponse.serverErrorResponse(res, err.message);
    }
  }
  async updateProject(req: any, res: Response) {
    try {
      const projects = await ProjectModel.findOne({ _id: req.params.id });
      if (!projects) {
        apiResponse.notFoundResponse(res, message.errorMsg.NotFoundProject);
      } else {
        DeleteImage(projects.profileImageUrl);
        const updatedProject = await ProjectModel.findOneAndUpdate(
          { _id: req.params.id },
          { ...req.body, profileImageUrl: req?.file?.filename },
          { new: true }
        );
        updatedProject &&
         apiResponse.successResponseWithData(res,message.successMsg.ProjectUpdate,updatedProject)
      }
    } catch (err: any) {
      return apiResponse.serverErrorResponse(res, err.message);
    }
  }

  async search(req:Request, res:Response){
    try{
      let searchParam= req.query.searchParam;
      let limit =req.query.limit || 10;
      let skip =req.query.page||0;
      if (!searchParam) {
        return res.status(400).json({ status: 400, message: 'Missing keyword parameter', data: null });
      }
    
      const results = await ProjectModel.find({
       $or:[
        {projectName:{$regex:searchParam,$options: 'i' }},
        {tags:{$regex:searchParam,$options: 'i' }}
       ]
        },
        null,
        { skip, limit }
        );
        let count = results.length;

        res.json({ status: 200, message: 'Search results', data: results ,count});
    }catch(err){
      return res.json({err:err})
    }
  }  
}

export default Projects;
