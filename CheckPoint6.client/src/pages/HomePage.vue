<template>



  <div class="row d-flex justify-content-center my-4">
    <div class="col-2 btn bg-dark " @click="filterTerm = ''">All</div>
    <div class="col-2 btn bg-dark" @click="filterTerm = 'concert'">Concerts</div>
    <div class="col-2 btn bg-dark" @click="filterTerm = 'convention'">Conventions</div>
    <div class="col-2 btn bg-dark" @click="filterTerm = 'sport'">Sports</div>
    <div class="col-2 btn bg-dark" @click="filterTerm = 'digital'">Digital</div>
  </div>

<div class="row d-flex justify-content-center text-center my-3">
  <div class="col-md-6">
    <EventForm />
  </div>
</div>
  <div class="row d-flex justify-content-evenly text-center my-3">
    <div class="col-md-4 my-4" v-for="e in events" :key="e.id">
      <EventCard :events="e" />
    </div>
  </div>









</template>



<script>
import { computed } from "@vue/reactivity";
import { onMounted, ref } from "vue";
import { AppState } from "../AppState";
import { eventsService } from "../services/EventsService";
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";
import EventCard from "../components/EventCard.vue";
import EventForm from "../components/EventForm.vue";

export default {
    setup() {
     const filterTerm = ref('')
        async function getEvents() {
            try {
                await eventsService.getAll();
            }
            catch (error) {
                logger.error(error);
                Pop.toast(error.message, "error");
            }
        }
        onMounted(() => {
            getEvents();
        });
        return {
        filterTerm,
            events: computed(() => AppState.events.filter(e => filterTerm.value ? e.type == filterTerm.value : true))
        };
    },
    components: { EventCard, EventForm }
};
</script>
















<style lang="scss" scoped>
</style>



