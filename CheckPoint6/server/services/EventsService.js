import { dbContext } from "../db/DbContext"
import { BadRequest, Forbidden } from "../utils/Errors"



class EventsService{

async getEventById(id) {
  const event = await dbContext.Events.findById(id).populate('creator', 'name picture')
  if(!event){
    throw new BadRequest('no Event by that ID')
  }
  return event
 }
 async getAllEvents() {
  const events = await dbContext.Events.find().sort({createdAt: -1}).populate('creator' , 'name picture')
  return events
 }
 async create(newEvent) {
   const event = await dbContext.Events.create(newEvent)
   await event.populate('creator', 'name picture')
   return event
  }
 async editEvent(eventData,id,userId) {
  const event = await this.getEventById(id)
if (event.isCanceled == true){
  throw new Forbidden('Cannot Edit A Canceled Event')
}
 
  if (event.creatorId != userId) {
    throw new Forbidden('Not your event')
  }
event.name = eventData.name || event.name
event.description = eventData.description || event.description

 


 await event.save()
 return event
  }


  async cancelEvent(id,userId) {
    const event = await this.getEventById(id)
    if (event.creatorId != userId){
      throw new Forbidden('NOT YOUR EVENT')
    }
    event.isCanceled = !event.isCanceled
    await event.save()
    return `Event ${event.name} was canceled`
  }

}


export const eventsService = new EventsService()