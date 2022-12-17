<template>
  <div class="comment" :class="{ editing: editing }">
    <div class="comment__info">
      <UserInfo :user="user" />
      <div class="comment__date">{{ dateFilter(comment.created) }}</div>
    </div>
    <div class="comment__content" v-if="!editing">{{ this.comment.text }}</div>
    <form class="marker__form-inputs" @submit.prevent="submitForm" v-else>
      <TextareaComponent
        @handleSubmit="submitForm"
        @textareaInput="(c) => (newComment = c)"
        :placeholder="'Ответить'"
        :value="this.comment.text"
      />
      <button class="marker__form-button">
        <IconComponent :name="'send'" />
      </button>
    </form>
    <div class="marker__form-actions">
      <IconComponent
        :name="'remove'"
        :color="'#000'"
        :width="17"
        :height="17"
        @click="handleRemoveClick"
        v-if="can('removeComment')"
      />
      <IconComponent
        :name="'pencil'"
        :color="'#000'"
        :width="16"
        :height="16"
        @click="handleEditClick"
        v-if="can('editComment')"
      />
    </div>
  </div>
</template>

<style lang="scss">
.comment {
  position: relative;
  & + & {
    margin-top: 20px;
  }
  &__info {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: nowrap;
  }
  &__date {
    font-size: 0.7rem;
    color: #c0c0c0;
  }
  &__content {
    text-align: left;
    padding-top: 10px;
    font-size: 0.9rem;
    color: #555555;
    word-break: break-word;
  }
  .marker__form-inputs {
    margin-top: 10px;
  }
  .marker__form-actions {
    display: none;
    position: absolute;
    cursor: pointer;
    bottom: 0;
    right: 0;
    padding: 5px 0 0 5px;
    border-top-left-radius: 6px;
    background-color: rgb(233 233 233 / 100%);

    .remove {
      margin-right: 10px;
    }
  }
  &:not(.editing):hover {
    .marker__form-actions {
      display: block;
    }
  }
}
</style>

<script>
import UserInfo from "@/components/user/UserInfo.vue";
import dateMixin from "@/mixins/dateMixin";
import IconComponent from "@/components/ui/IconComponent";
import TextareaComponent from "@/components/ui/TextareaComponent";

export default {
  components: { IconComponent, UserInfo, TextareaComponent },
  mixins: [dateMixin],
  props: ["comment"],
  data() {
    return {
      editing: false,
      newComment: this.comment.text,
    };
  },
  mounted() {},
  computed: {
    user() {
      const user = this.$store.getters.users.find(
        (user) => user.id === this.comment.authorId
      );
      return user || {};
    },
  },
  methods: {
    async submitForm() {
      if (this.comment.text === this.newComment) {
        this.editing = false;
        return;
      }
      await this.$store.dispatch("updateCommentRequest", {
        ...this.comment,
        text: this.newComment,
      });
      this.editing = false;
    },
    handleEditClick() {
      this.editing = true;
      console.log(this.comment);
    },
    async handleRemoveClick() {
      await this.$store.dispatch("removeCommentRequest", this.comment);
    },
    can(perm) {
      return this.$store.getters.can(perm);
    },
  },
};
</script>
