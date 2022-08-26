import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { accountService } from "./AccountService"
import { api } from "./AxiosService"




class TicketsService{

async createTicket(newTicket){
  const res = await api.post('api/tickets', newTicket)
  logger.log('Ticket Created', res.data)
  AppState.ticketProfiles.push(res.data) && AppState.activeEvent.capacity --
  
}
async getTicketProfilesByEvent(eventId){
  const res = await api.get(`api/events/${eventId}/tickets`)
  logger.log('GET TICKET EVENTS', res.data)
  AppState.ticketProfiles = res.data
}

async getTicketEventByAccount(){
  const res = await api.get('account/tickets')
  logger.log('GET MY TICKETS', res.data)
  AppState.ticketEvents = res.data
}

async deleteTicket(ticketId){
  const res = await api.delete('api/tickets/'+ticketId)
  AppState.tickets = AppState.tickets.filter(t => t.id != ticketId)
 
  
}



}

export const ticketsService = new TicketsService()