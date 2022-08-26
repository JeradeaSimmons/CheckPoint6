<template>


<router-link :to="{ name: 'Event', params: { eventId: events.id } }">
<div class="card elevation-3 bg-dark">

  <h3>  {{events.name}}</h3>
  <img  :src="events.coverImg" alt="" height="400">
 
  
 
</div>


</router-link>




</template>







<script>
import { router } from "../router";

export default {
 props: { events: {type: Object, required: true}},
setup(props) {
  return {
          goTo() {
        router.push({ name: 'EventPage', params: { eventId: props.events.id } })
      }

  };
},
};
</script>
<style lang="scss" scoped>
</style>