<template>
  <div
    class="marker__form-wrapper"
    ref="markerWrapperEl"
    @keydown.esc="this.$emit('closeForm')"
  >
    <div class="marker__form-top">
      <span class="marker__form-title">Ваш комментарий</span>
      <div class="marker__form-controls">
        <div
          class="marker__form-accept"
          @click.stop="removeMarker"
          v-if="can('deleteMarker')"
        >
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
      <form class="marker__form-inputs" @submit.prevent="submitForm">
        <TextareaComponent
          @handleSubmit="submitForm"
          @textareaInput="(c) => (comment = c)"
          :placeholder="'Ответить'"
        />
        <button class="marker__form-button">
          <IconComponent :name="'send'" />
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import TextareaComponent from "@/components/ui/TextareaComponent.vue";
import IconComponent from "@/components/ui/IconComponent";
import CommentComponent from "@/components/CommentComponent.vue";

export default {
  components: {
    TextareaComponent,
    IconComponent,
    CommentComponent,
  },
  data: () => ({
    comment: "",
    offset: {
      x: 50,
      y: -20,
    },
    contentEl: document.querySelector(".content"),
  }),
  props: ["marker"],
  mounted() {
    this.setFormProperties();
  },
  computed: {
    comments() {
      // !this.$store.getters.getCommentsById(this.marker.markerId)
      if (!this.marker) {
        return;
      }
      return this.$store.getters.getCommentsById(this.marker.markerId);
    },
    firstComment() {
      return {
        text: this.marker.firstComment,
        authorId: this.marker.authorId,
        created: this.marker.created,
      };
    },
  },
  watch: {},
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
      setTimeout(() => this.setFormProperties(), 100);
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
        authorId: this.$store.getters.currentUser.id,
        markerId: this.marker.markerId,
      };
    },
    can(perm) {
      return this.$store.getters.can(perm);
    },
    setFormProperties() {
      this.$refs.commentsEl.style.maxHeight = `${
        this.contentEl.offsetHeight + this.offset.y * 2 - 100
      }px`;
      let { x, y } = this.calculateFormOffset(this.marker.position);
      this.$refs.markerWrapperEl.style.top = `${y}px`;
      this.$refs.markerWrapperEl.style.left = `${x}px`;
    },
    calculateFormOffset({ x, y }) {
      let newX = x + this.offset.x,
        newY = y + this.offset.y,
        formWidth = this.$refs.markerWrapperEl.offsetWidth,
        formHeight = this.$refs.markerWrapperEl.offsetHeight,
        contentComputedStyles = getComputedStyle(this.contentEl),
        contentWidth =
          this.contentEl.offsetWidth -
          parseFloat(contentComputedStyles.paddingRight) -
          parseFloat(contentComputedStyles.paddingLeft),
        contentHeight = this.contentEl.offsetHeight,
        diffX = contentWidth - (newX + formWidth + this.offset.x),
        diffY = contentHeight - (newY + formHeight - this.offset.y);
      newX = Math.min(newX, Math.max(newX + diffX, this.offset.x));
      newY = Math.min(newY, Math.max(newY + diffY, -this.offset.y));
      return { x: newX, y: newY };
    },
  },
};
</script>
