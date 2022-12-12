<template>
  <div
    class="marker"
    :class="{ creating: isCreating, opened: opened }"
    :style="position"
    @click.stop="handleClick"
    @keydown.esc="cancelMarker"
  >
    <div class="marker__inner">
      <UserLogo :user="user" v-if="!isCreating" />
      <div class="marker__content" v-if="!isCreating">
        <div class="marker__info">
          <div class="marker__author">{{ userName }}</div>
          <div class="marker__date">{{ date }}</div>
        </div>
        <div class="marker__comment">{{ marker.firstComment }}</div>
      </div>
      <form
        @submit.prevent="submitMarker"
        class="marker__form"
        v-if="isCreating || opened"
        ref="markerFormEl"
      >
        <div class="marker__form-wrapper">
          <div class="marker__form-top">
            <span class="marker__form-title">Ваш комментарий</span>
            <div class="marker__form-controls">
              <div class="marker__form-accept" @click.stop="acceptMarker">
                &check;
              </div>
              <div class="marker__form-close" @click.stop="cancelMarker">
                &#10006;
              </div>
            </div>
          </div>
          <div class="marker__form-middle">
            <div
              ref="commentsEl"
              class="marker__form-comments"
              v-if="!isCreating"
            >
              <CommentComponent :comment="firstComment" />
              <CommentComponent
                v-for="comment in comments"
                :key="comment.id"
                :comment="comment"
              />
            </div>
            <div class="marker__form-inputs">
              <TextareaComponent
                @handleSubmit="submitComment"
                @textareaInput="textareaInput"
                :placeholder="'Ответить'"
                v-if="!isCreating"
              />
              <TextareaComponent
                @handleSubmit="submitMarker"
                @textareaInput="textareaInput"
                :placeholder="'Ответить'"
                v-else
              />
              <button class="marker__form-button" v-if="!isCreating">
                <IconComponent :name="'send'" />
              </button>
            </div>
          </div>
          <div class="marker__form-bottom" v-if="isCreating">
            <div class="marker__form-users">
              <UserSelectComponent
                :label="'Кому'"
                :options="users"
                :default="0"
                @input="changeSelect"
              />
            </div>
            <button class="marker__form-button">
              <IconComponent :name="'send'" />
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<style lang="scss">
$transition-speed: 0.1s;
.marker {
  $--max-height: 500px;
  $--top: 0;
  $-left: 0;
  position: absolute;
  &__inner {
    position: absolute;
    bottom: 0;
    border: 4px solid #fff;
    cursor: pointer;
    border-radius: 16px 16px 16px 0px;
    min-width: 32px;
    min-height: 32px;
    background-color: #fff;
    box-shadow: 0 0 10px rgb(0 0 0 / 10%);
    display: flex;
    transition: min-width $transition-speed ease-in-out,
      padding $transition-speed ease-in-out;
  }
  &__content {
    visibility: hidden;
    overflow: hidden;
    max-width: 0;
    font-size: 11px;
    transition: max-width $transition-speed ease-in-out,
      max-height $transition-speed ease-in-out,
      margin-left $transition-speed ease-in-out;
  }
  &:not(.creating):not(.opened):hover {
    z-index: 30;
    .marker__inner {
      min-width: 240px;
      padding: 5px;
      .marker__content {
        margin-left: 10px;
        visibility: visible;
        max-width: 240px;
      }
      .marker__comment {
        max-height: 150px;
      }
    }
  }
  &__info {
    display: flex;
  }
  &__author {
    font-weight: 600;
    margin-right: 10px;
    color: #555;
  }
  &__date {
    color: #aaa;
  }
  &__comment {
    text-align: left;
    margin-top: 5px;
    max-height: 0px;
    min-width: 180px;
    overflow: hidden;
    transition: max-height $transition-speed ease-in-out;
  }
  &__form {
    z-index: 20;
    position: fixed;
    //position: absolute;
    //left: 40px;
    //top: -5px;
    width: 280px;
    box-shadow: 0 0 10px rgb(0 0 0 / 10%);
    border-radius: 6px;
    background-color: #e9e9e9;
    &-wrapper {
      display: flex;
      flex-direction: column;
      padding: 10px;
      cursor: default;
    }
    &-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
    }
    &-title {
      font-weight: 600;
      font-size: 14px;
    }
    &-controls {
      display: flex;
    }
    &-accept {
      font-family: monospace;
      font-size: 16px;
      font-weight: 600;
      margin-right: 5px;
    }
    &-close,
    &-accept {
      cursor: pointer;
      width: 20px;
      height: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      &:hover {
        background-color: #e0e0e0;
      }
    }
    &-middle {
      display: flex;
      flex-direction: column;
    }
    &-comments {
      margin-bottom: 10px;
      max-height: $--max-height;
      overflow-y: auto;
      padding-right: 10px;
      &::-webkit-scrollbar {
        width: 5px;
      }
      &::-webkit-scrollbar-track {
        background-color: #e0e0e0;
      }
      &::-webkit-scrollbar-thumb {
        background-color: #a0a0a0;
      }
    }
    &-inputs {
      display: flex;
      align-items: flex-end;
      .marker__form-button {
        margin-left: 10px;
      }
    }
    &-bottom {
      margin-top: 10px;
      display: flex;
      align-items: center;
      flex-wrap: nowrap;
      justify-content: space-between;
      font-size: 14px;
    }
    &-users {
      width: 100%;
      padding-right: 10px;
    }
    &-button {
      background-color: #3f99e8;
      border-radius: 6px;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 3px;
      cursor: pointer;
      border: none;
    }
  }
}
</style>

<script>
import UserLogo from "@/components/UserLogo.vue";
import TextareaComponent from "@/components/ui/TextareaComponent.vue";
import UserSelectComponent from "@/components/ui/UserSelectComponent";
import IconComponent from "@/components/IconComponent";
import CommentComponent from "@/components/CommentComponent.vue";
import dateMixin from "@/mixins/dateMixin";

export default {
  components: {
    UserSelectComponent,
    UserLogo,
    TextareaComponent,
    IconComponent,
    CommentComponent,
  },
  data: () => ({
    comment: "",
    sendTo: null,
    opened: false,
    interval: false,
  }),
  props: ["marker"],
  mixins: [dateMixin],
  async mounted() {},
  computed: {
    user() {
      return this.$store.getters.users.find(
        (user) => this.marker.authorId == user.id
      );
    },
    userName() {
      return this.user?.name || "";
    },
    users() {
      const $users = [{ id: -1, name: "Выберите значение" }];
      this.$store.getters.users.forEach((user) => {
        if (user.id != this.$store.getters.currentId) {
          $users.push(user);
        }
      });
      return $users;
    },
    position() {
      const { x, y } = this.marker.position;
      return `top: ${y}px; left: ${x}px;`;
    },
    isCreating() {
      return this.marker.isCreating || false;
    },
    date() {
      return this.dateFilter(this.marker.created);
    },
    firstComment() {
      return {
        authorId: this.marker.authorId,
        text: this.marker.firstComment,
        created: this.marker.created,
      };
    },
    comments() {
      if (!this.$store.getters.getCommentsById(this.marker.markerId)) {
        return;
      }
      return this.$store.getters.getCommentsById(this.marker.markerId).content;
    },
  },
  methods: {
    async handleClick() {
      if (this.opened) {
        return;
      }
      await this.$store.dispatch("loadComments", this.marker.markerId);
      this.opened = true;
      this.setCommentsWrapperProps();
      this.$emit("markerClick", this.marker);
    },
    cancelMarker() {
      this.opened = false;
      this.$emit("cancelMarker");
    },
    submitMarker() {
      if (!this.comment.length) {
        return;
      }
      this.$emit("submitMarker", {
        comment: this.comment,
        sendTo: this.sendTo,
      });
    },
    submitComment() {
      if (!this.comment.length) {
        return;
      }
      this.$emit("submitComment", {
        comment: this.comment,
        markerId: this.marker.markerId,
      });

      this.setCommentsWrapperProps();
    },
    acceptMarker() {
      this.$store.dispatch("acceptMarker", this.marker.markerId);
      this.$emit("cancelMarker");
    },
    setFormProps() {},
    setCommentsWrapperProps() {
      setTimeout(() => {
        console.log(this.$refs);
        this.$refs.commentsEl.scrollTop = this.$refs.commentsEl.scrollHeight;
        this.$refs.markerFormEl.style.top = 0;
      }, 10);
    },
    changeSelect(user) {
      this.sendTo = user;
    },
    textareaInput(comment) {
      this.comment = comment;
    },
    getFormProperties() {},
  },
};
</script>
