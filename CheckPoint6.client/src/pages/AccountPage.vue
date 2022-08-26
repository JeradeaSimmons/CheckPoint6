<template>
  <div class="text-center row d-flex justify-content-evenly">
    <div class="col-md-12"><h1>Welcome {{ account.name }}</h1></div>
    <div class="col-md-12"><img class="img-fluid" :src="account.picture" alt="" /></div>
    
    <div class="col-md-2 card bg-dark align-items-center m-3" v-for="t in ticketEvents" :key="t.id"> 
    <h5 class="mb-3">{{t.event.name}}</h5>
    <img :src="t.event.coverImg" alt="" height="">
    <button class="btn btn-small btn-light btn-round my-3" @click="deleteTicket(t.id)">Cancel</button>
    </div>
   
  </div>

 
</template>

<script>
import { computed, onMounted } from 'vue'
import { AppState } from '../AppState'
import { ticketsService } from "../services/TicketsService"
import { logger } from "../utils/Logger"
import Pop from "../utils/Pop"
export default {
  name: 'Account',
  setup() {

async function getTicketEvents(){
  try {
    await ticketsService.getTicketEventByAccount()
  } catch (error) {
    logger.error(error)
    Pop.toast(error.message, 'error')
  }
}
onMounted(()=> {
  getTicketEvents()
})


    return {
      account: computed(() => AppState.account),
      ticketEvents: computed(()=> AppState.ticketEvents),
      tickets: computed(()=> AppState.tickets),


async deleteTicket(id){
try {
//  const ticket = AppState.tickets.find(t => t.id == id)
 await ticketsService.deleteTicket(id) 
 await ticketsService.getTicketEventByAccount()
} catch (error) {
  logger.error(error)
  Pop.toast(error.message, 'error')
}
}




    }
  }
}
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
