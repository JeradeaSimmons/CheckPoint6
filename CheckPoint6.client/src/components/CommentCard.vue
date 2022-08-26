<template>
  <div class="row d-flex ">
    <div class="col card bg-dark my-3">
      <div class="row d-flex justify-content-between">
        <div class="col-md-3">
          <div> <img class="rounded" :src="comment.creator.picture" alt="" height="50" :title="comment.creator.name">
          </div>
        </div>
        <div class="col-md-5 my-3">
          {{ comment.body }}
        </div>
        <div class="col-md-3 my-3">
          <button class="btn btn-small" @click="deleteComment()">❌</button>
        </div>
      </div>

    </div>
  </div>




</template>
<script>
import { computed } from "@vue/reactivity";
import { AppState } from "../AppState";
import { commentsService } from "../services/CommentsServices";
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";

export default {
  props: {comment: {type: Object, required: true}},
setup() {
  return {





    account: computed(()=> AppState.account),
    async deleteComment(){
      try {
        const commentToDelete = AppState.comments.find(c => c.creatorId == AppState.account.id)
        await commentsService.deleteComment(commentToDelete.id)
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