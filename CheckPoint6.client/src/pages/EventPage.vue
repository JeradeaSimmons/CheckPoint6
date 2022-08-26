<template>

  <div class="row d-flex justify-content-center my-4 ">
    <div class="col-md-7 card bg-dark">
      <img class="my-3 img-fluid" :src="event.coverImg" alt="" height="550">
      <h2 v-if="event.isCanceled == true"><img src="https://i0.wp.com/moguldom.com/wp-content/uploads/2019/09/800X800_canceled.gif?fit=480%2C480&ssl=1" alt="" height="100"></h2>
      <h2 v-if="event.capacity <= 0"><img src="https://media1.giphy.com/media/ftSsFBJqT84nvE5YUh/200w.gif?cid=82a1493bh59kpwbxul5jeb8r32z1zzbbfpapknze62ztfa77&rid=200w.gif&ct=g" alt="" height="100"></h2>
      <h2>{{ event.name }}</h2>
      
      <b> When:{{ new Date(event.startDate).toLocaleDateString('de-DE', {
          month: 'short', day:
            'numeric', year: '2-digit', hour: 'numeric', minute: "numeric"
        })
      }}</b>
    

      <b> Where:{{event.location}}</b>
      <b>Capacity:{{event.capacity}}</b>
  
      <p>{{ event.description }}</p>

    </div>
    <div class="col-md-4">
      <div class="row d-flex justify-content-center text-center">
        <div class="col-md-10">
          <button class="btn btn-dark my-3" v-if="event.isCanceled == false && event.capacity > 0 && !hasTicket"  @click="buyTicket()">
            BUY TICKET!
          </button>
        </div>
        <div class="col-md-10">
          <button class="btn btn-danger" v-if="event.creatorId == account.id && event.isCanceled == false" @click="cancelEvent()">
            CANCEL EVENT
          </button>
        </div>
         <div class="col-md-2 m-3" v-for="t in ticketProfiles">

          <img :src="t.profile.picture" alt="" height="50" :title="t.profile.name">
        </div>
        <div class="col-md-11 col-lg-12">
          <CommentForm />
        </div>
         <div class="row d-flex justify-content-center text-center">
    <div class="col-md-11">
      <CommentCard :comment="c" v-for="c in comments" :key="c.id" />
    </div>
  </div>
      </div>
    </div>
  </div>



</template>
<script>
import { computed } from "@vue/reactivity";
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import { AppState } from "../AppState";
import { commentsService } from "../services/CommentsServices";
import { eventsService } from "../services/EventsService";
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";
import CommentForm from "../components/CommentForm.vue";
import { ticketsService } from "../services/TicketsService";


export default {
    setup() {
        const route = useRoute();
        async function getEventById() {
            try {
                await eventsService.getById(route.params.eventId);
            }
            catch (error) {
                logger.error(error);
                Pop.toast(error.message, "error");
            }
        }
        async function getCommentsByEventId() {
            try {
                await commentsService.getCommentsByEventId(route.params.eventId);
            }
            catch (error) {
                Pop.error(error);
            }
        }

async function getTicketProfiles(){
  try {
    await ticketsService.getTicketProfilesByEvent(route.params.eventId)
  } catch (error) {
    logger.error(error)
    Pop.toast(error.message, 'error')
  }

}

        onMounted(() => {
            getEventById();
            getCommentsByEventId();
            getTicketProfiles()
        });
    return {
      event: computed(() => AppState.activeEvent),
      comments: computed(() => AppState.comments),
      ticketProfiles: computed(() => AppState.ticketProfiles),
      account: computed(() => AppState.account),
      activeEvent: computed(()=> AppState.activeEvent),
      hasTicket: computed(()=> {
        if (AppState.ticketProfiles.find(t => t.accountId == AppState.account.id)){
          return true
        }
        return false
      }),


      async buyTicket() {
        try {
          let newTicket = {
            eventId: AppState.activeEvent.id,
            accountId: AppState.account.id
          }
          await ticketsService.createTicket(newTicket)
        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, 'error')
        }
      },

      async cancelEvent() {
        try {
          // const event = AppState.activeEvent(e => e.creatorId == AppState.user.id)
          await eventsService.cancelEvent(route.params.eventId)
          
        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, 'error')
        }
      }









        };
    },
    components: { CommentForm }
};
</script>
<style lang="scss" scoped>
</style>