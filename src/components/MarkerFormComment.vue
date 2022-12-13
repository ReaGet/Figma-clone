<template>
  <form
    @submit.prevent="submitForm"
    class="marker__form"
    ref="markerFormEl"
    @keydown.esc="this.$emit('closeForm')"
  >
    <div class="marker__form-wrapper">
      <div class="marker__form-top">
        <span class="marker__form-title">Ваш комментарий</span>
        <div class="marker__form-controls">
          <div class="marker__form-accept" @click.stop="removeMarker">
            &check;
          </div>
          <div class="marker__form-close" @click.stop="this.$emit('closeForm')">
            &#10006;
          </div>
        </div>
      </div>
      <div class="marker__form-middle">
        <div ref="commentsEl" class="marker__form-comments">
          <CommentComponent :comment="firstComment" />
          <CommentComponent
            v-for="comment in comments"
            :key="comment.commentId"
            :comment="comment"
          />
        </div>
        <div class="marker__form-inputs">
          <TextareaComponent
            @handleSubmit="submitForm"
            @textareaInput="(c) => (comment = c)"
            :placeholder="'Ответить'"
          />
          <button class="marker__form-button">
            <IconComponent :name="'send'" />
          </button>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
import TextareaComponent from "@/components/ui/TextareaComponent.vue";
import IconComponent from "@/components/ui/IconComponent";
import CommentComponent from "@/components/CommentComponent.vue";
// import Faye from "@/utils/faye";

export default {
  components: {
    TextareaComponent,
    IconComponent,
    CommentComponent,
  },
  data: () => ({
    comment: "",
  }),
  props: ["marker"],
  mounted() {
    this.$refs.markerFormEl.style.top = `${this.marker.position.y - 20}px`;
    this.$refs.markerFormEl.style.left = `${this.marker.position.x + 50}px`;
  },
  computed: {
    comments() {
      if (
        !this.marker ||
        !this.$store.getters.getCommentsById(this.marker.markerId)
      ) {
        return;
      }
      return this.$store.getters.getCommentsById(this.marker.markerId).content;
    },
    firstComment() {
      return {
        text: this.marker.firstComment,
        authorId: this.marker.authorId,
        created: this.marker.created,
      };
    },
  },
  methods: {
    async submitForm() {
      if (!this.comment.length) {
        return;
      }
      const comment = await this.$store.dispatch(
        "addCommentRequest",
        this.createComment()
      );
      if (!comment) {
        return;
      }
      this.comment = "";
    },
    removeMarker() {
      this.$store.dispatch("removeMarker", this.marker.markerId);
      this.$emit("closeForm");
    },
    createComment() {
      return {
        text: this.comment,
        created: new Date(),
        authorId: this.$store.getters.currentId,
        markerId: this.marker.markerId,
      };
    },
  },
};
</script>
