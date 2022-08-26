<template>



<section class="card bg-dark p-4">
<form @submit.prevent="handleSubmit" class="row">

            <div class="col-12"> <h2> Your Event</h2></div>
            <div class="col-4">
              <label for="name" class="form-label">Name</label>
              <input type="text" v-model="editable.name" class="form-control" name="name" id="name">
            </div>
            <div class="col-4">
              <label for="capacity" class="form-label">Capacity</label>
              <input type="text" v-model="editable.capacity" class="form-control" name="capacity" id="capacity">
            </div>
            <div class="col-4">
              <label for="location" class="form-label">Location</label>
              <input type="text" v-model="editable.location" class="form-control" name="location" id="location">
            </div>
            <div class="col-4">
              <label for="startDate" class="form-label">Date</label>
              <input type="date" v-model="editable.startDate" class="form-control" name="startDate" id="startDate">
            </div>
            <div class="col-4">
              <label for="coverImg" class="form-label">Cover Image</label>
              <input type="url" v-model="editable.coverImg" class="form-control" name="coverImg" id="coverImg">
            </div>
            <div class="col-4">
              <label for="type" class="form-label ">Type</label>
              <select v-model="editable.type" name="type" id="type" class="form-control">
                <option value="concert">Concert</option>
                <option value="convention">Convention</option>
                <option value="sport">Sport</option>
                <option value="Digital">Digital</option>
              </select>
            </div>
            <div class="col-12">
              <label for="description" class="form-label">Description</label>
              <textarea type="text-area" v-model="editable.description" class="form-control" name="description" id="description"></textarea>
            </div>
            <button class="col-12 btn btn-pill btn-light my-5">Submit</button>
           
          </form> 
          </section>















</template>
<script>
import { ref, watchEffect } from "vue";
import { useRouter } from "vue-router";
import { AppState } from "../AppState";
import { eventsService } from "../services/EventsService";
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";


export default {
setup() {
const router = useRouter()
const editable = ref({})
    watchEffect(() => {
      if (!AppState.events) { return }
      editable.value = { ...AppState.activeEvent }
    })

return {
  editable,
  async handleSubmit(){
    try {
      const event = await eventsService.createEvent(editable.value)
      editable.value = {}
      router.push({ name: 'Event', params: { eventId: event.id } })
      
    } catch (error) {
      logger.error(error)
      Pop.toast(error.message, 'error')
    }
  }
};
},
};
</script>
<style lang="scss" scoped>
</style>