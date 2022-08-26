import { dbContext } from "../db/DbContext"
import { BadRequest, Forbidden } from "../utils/Errors"





class CommentsService{
 async deleteComment(commentId, userId) {
  const comment = await dbContext.Comments.findById(commentId)
  if(!comment){
    throw new BadRequest('No Comment')
  }
  if(comment.creatorId != userId){
    throw new Forbidden('Not your comment')
  }
  await comment.remove()
  return 'comment deleted'
 }
 async getComments(query = {}) {
  const comments = await dbContext.Comments.find(query).populate('creator', 'name picture')
  return comments
 }
 async createComment(newComment) {
    const comment = await dbContext.Comments.create(newComment)
    await comment.populate('creator', 'name picture')
    return comment
  }







}

export const commentsService = new CommentsService()