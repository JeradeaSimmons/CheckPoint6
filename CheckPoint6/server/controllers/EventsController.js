import { Auth0Provider } from "@bcwdev/auth0provider";
import { commentsService } from "../services/CommentsService";
import { eventsService } from "../services/EventsService";
import { ticketsService } from "../services/TicketsService";
import BaseController from "../utils/BaseController";





export class EventsController extends BaseController{
  constructor(){
    super('api/events')
    this.router
      .get('', this.getAllEvents)
      .get('/:id', this.getEventById)
      .get('/:id/tickets', this.getMyTickets)
      .get('/:id/comments', this.getComments)
      .use(Auth0Provider.getAuthorizedUserInfo)   
     
      .post('', this.create)
      .put('/:id', this.editEvent)
      .delete('/:id', this.cancelEvent)


  }
 async getComments(req,res,next) {
   try {
   const comments = await commentsService.getComments({eventId: req.params.id})
     return res.send(comments)
   } catch (error) {
     next(error)
   }
  }
  async getMyTickets(req,res,next) {
    try {
    let tickets = await ticketsService.getMyTickets(req.params.id)
    return res.send(tickets)
    } catch (error) {
      next(error)
    }
  }


  

  async getEventById(req,res,next) {
    try {
    const event = await eventsService.getEventById(req.params.id)
      return res.send(event)
    } catch (error) {
      next(error)
    }
  }
  async getAllEvents(req,res,next) {
    try {
    const events = await eventsService.getAllEvents()
      return res.send(events)
    } catch (error) {
      next(error)
    }
  }
  async create(req,res,next) {
    try {
    req.body.creatorId = req.userInfo.id
    const event = await eventsService.create(req.body)
      return res.send(event)
    } catch (error) {
      next(error)
    }
  }


   async editEvent(req,res,next) {
   try {
   const eventData = req.body
   const event = await eventsService.editEvent(eventData,req.params.id, req.userInfo.id)

     res.send(event)
   } catch (error) {
     next(error)
   }
  }

  async cancelEvent(req,res,next) {
    try {
    const event = await eventsService.cancelEvent(req.params.id, req.userInfo.id)
      res.send(event)
    } catch (error) {
      next(error)
    }
  }






















}