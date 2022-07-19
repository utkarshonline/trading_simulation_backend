/**

 * Author: Dharmay Sureja

 * BannerID: B00904061

 * Email:dh276903@dal.ca

*/

import { Router, Request, Response, NextFunction } from "express";
import Controller from "../../utils/interfaces/controller.interface";
import CommentsService from "../comments/comments.service";
import CommentsModel from "../comments/comments.model";
const rn = require("random-number");

export default class CommentsController implements Controller {
  public path = "/comments";
  public router = Router();
  private CommentsService = new CommentsService();
  constructor() {
    this.initialiseRoutes();
  }

  private initialiseRoutes(): void {

    this.router.post(`${this.path}`, this.getComments);
    this.router.put(`${this.path}`, this.addComments);
    this.router.post(`${this.path}/delete`, this.deleteComments);

  }

  private addComments = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const { userID, comment, blogsID, first_name} = req.body;
      const options = {
        min: 12345,
        max: 20000,
        integer: true,
      };
      const comments = new CommentsModel();
      comments.userID = userID;
      comments.blogsID = blogsID;
      comments.commentID = rn(options).toString();
      comments.comment=comment;
      comments.first_name=first_name;
    // console.log("userid =",userID)
    //   const prof = await this.CommentsService.getProfileById(userID);
      const addBlogs = await this.CommentsService.addComments(comments);
      // console.log("hellloww",prof);
      res.sendStatus(201);
    } catch (error: any) {
      console.log("C"+error.message);
      res.sendStatus(400);
    }
  };

  private getComments = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const {  blogsID} = req.body;
      const comments = await this.CommentsService.getComments(blogsID);
      res.send({ comments: comments });
    } catch (error: any) {
      console.log(error.message);
      res.send(400);
      //next(new HttpException(400, error.message));
    }
  };

  private deleteComments = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const { commentID } = req.body;

      console.log(commentID);
      const comments = await this.CommentsService.deleteBlogs(commentID);
      res.send( 201 );
    } catch (error: any) {
      console.log(error.message);
      res.send(400);
      //next(new HttpException(400, error.message));
    }
  };
}
