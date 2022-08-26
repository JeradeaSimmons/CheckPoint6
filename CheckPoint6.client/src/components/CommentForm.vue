<template>

<section class="">
  <form @submit.prevent="handleSubmit">
      <div class="my-3">
        <label for="" class="form-label"></label>
       <textarea name="body" id="body"  v-model="editable.body" cols="35" rows="10"></textarea>
      </div>
      <button class="btn btn-dark">Comment</button>
    </form>
</section>




</template>

<script>
import { ref } from "vue";
import { useRoute } from "vue-router";
import { commentsService } from "../services/CommentsServices";
import Pop from "../utils/Pop";


export default {





setup() {

const editable = ref({})
const route = useRoute()

return {
editable,
async handleSubmit(){
  try {
    editable.value.eventId = route.params.eventId
    await commentsService.create(editable.value)
    editable.value = {}
    Pop.success('Thanks for the Comment')
  } catch (error) {
    Pop.error(error)
  }
}
  };
},
};
</script>




<style lang="scss" scoped>
</style>