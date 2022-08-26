import { Auth0Provider } from "@bcwdev/auth0provider";
import { commentsService } from "../services/CommentsService";
import BaseController from "../utils/BaseController";





export class CommentsController extends BaseController{
  constructor(){
    super('api/comments')
    this.router
    .use(Auth0Provider.getAuthorizedUserInfo)
    .post('', this.createComment)
    .delete('/:id', this.deleteComment)
  }
 async deleteComment(req,res,next) {
   try {
   const deleteComment = await commentsService.deleteComment(req.params.id, req.userInfo.id)
     return res.send(deleteComment)
   } catch (error) {
     next(error)
   }
  }
  async createComment(req,res,next) {
    try {
    req.body.creatorId = req.userInfo.id
    let comment = await commentsService.createComment(req.body)
      return res.send(comment)
    } catch (error) {
      next(error)
    }
  }
}