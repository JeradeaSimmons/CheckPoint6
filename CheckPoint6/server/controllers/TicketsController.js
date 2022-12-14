import { Auth0Provider } from "@bcwdev/auth0provider";
import { eventsService } from "../services/EventsService";
import { ticketsService } from "../services/TicketsService";
import BaseController from "../utils/BaseController";





export class TicketsController extends BaseController{
constructor(){
  super('api/tickets')
  this.router
  .use(Auth0Provider.getAuthorizedUserInfo)
  .post('', this.createTicket)
  .delete('/:id', this.deleteTicket)
}

  async createTicket(req,res,next) {
    try {
    req.body.accountId = req.userInfo.id
    const ticket = await ticketsService.createTicket(req.body)
      return res.send(ticket)
      
    } catch (error) {
      next(error)
    }
  }

  async deleteTicket(req,res,next) {
   try {
   const message = await ticketsService.deleteTicket(req.params.id, req.userInfo.id)
     return res.send(message)
   } catch (error) {
     next(error)
   }
  }




}