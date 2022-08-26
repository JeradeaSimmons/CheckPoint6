import { dbContext } from "../db/DbContext"
import { BadRequest, Forbidden } from "../utils/Errors"
import { eventsService } from "./EventsService"




class TicketsService{
  async getEventTickets(accountId) {
   let tickets = await dbContext.Tickets.find({accountId: accountId}).populate('event')
   return tickets
  }
  async getMyTickets(eventId) {
    let tickets = await dbContext.Tickets.find({eventId: eventId}).populate('profile', 'name picture')
    return tickets
  }

  async createTicket(newTicket) {
    // go find event and check if capacity is full or not
  const event = await eventsService.getEventById(newTicket.eventId)
  // @ts-ignore
  if (event.capacity <= 0) {
    throw new BadRequest('SOLD OUT!!')
  }
  
   
   const ticket = await dbContext.Tickets.create(newTicket)
  //  once ticket is created adjust capacity as needed
  // @ts-ignore
  event.capacity  -= 1
   await ticket.populate('event')
   await ticket.populate('profile', 'name picture')
  //  save event with new capacity
  // await ticket.save ()
await event.save()
   return ticket
  }


  async deleteTicket(id, userId) {
    const ticket = await dbContext.Tickets.findById(id)
    if (!ticket) {
      throw new BadRequest('No Ticket')
    }
    if(ticket.accountId != userId){
      throw new Forbidden('Not your ticket')
    }
    await ticket.remove()
    const event = await eventsService.getEventById(ticket.eventId)
 // @ts-ignore
 event.capacity += 1

  
   
    await event.save()
    return 'Ticket Deleted'
  }



}


export const ticketsService = new TicketsService()