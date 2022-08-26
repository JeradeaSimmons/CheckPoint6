import { applyStyles } from "@popperjs/core"
import { AppState } from "../AppState"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"





class EventsService{
async getAll(){
  const res = await api.get('api/events')
  logger.log('Got Events', res.data)
  AppState.events = res.data

}

async getById(eventId){
  const res = await api.get('api/events/' + eventId)
  logger.log('EVENT BY ID', res.data)
  AppState.activeEvent = res.data
}

async createEvent(newEvent){
  const res =  await api.post('api/events', newEvent)
  AppState.events.unshift(res.data)
  logger.log('new event', res.data)
  return res.data
}

async cancelEvent(eventId){
  const res = await api.delete('api/events/' + eventId)

}

}


export const eventsService = new EventsService()