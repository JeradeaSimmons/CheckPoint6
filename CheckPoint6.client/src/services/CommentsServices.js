import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"







class CommentsService{

  async create (newComment){
    const res = await api.post('api/comments', newComment)
    logger.log('Comment Created',res.data)
    AppState.comments.push(res.data)
  }

  async getCommentsByEventId(eventId){
    const res = await api.get(`api/events/${eventId}/comments`)
    logger.log('Comments', res.data)
    AppState.comments = res.data
  }

  async deleteComment(commentId){
    const res = await api.delete('api/comments/'+commentId)
    AppState.comments = AppState.comments.filter(c => c.id != commentId)
    
  }



}

export const commentsService = new CommentsService()