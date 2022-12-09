<template>
  <div
    class="marker"
    :class="{ creating: isCreating, opened: opened }"
    :style="position"
    @click.stop="handleClick"
  >
    <div class="marker__inner">
      <UserLogo :user="user" v-if="!isCreating" />
      <div class="marker__content" v-if="!isCreating">
        <div class="marker__info">
          <div class="marker__author">{{ userName }}</div>
          <div class="marker__date">{{ marker.date }}</div>
        </div>
        <div class="marker__comment">{{ marker.firstComment }}</div>
      </div>
      <form
        @submit.prevent="submitMarker"
        class="marker__form"
        v-if="isCreating || opened"
      >
        <div class="marker__form-wrapper">
          <div class="marker__form-top">
            <span class="marker__form-title">Ваш комментарий</span>
            <div class="marker__form-close" @click.stop="cancelMarker">
              &#10006;
            </div>
          </div>
          <div class="marker__form-middle">
            <div class="marker__form-comments" v-if="!isCreating">
              <CommentComponent
                v-for="comment in comments"
                :key="comment.id"
                :comment="comment"
              />
            </div>
            <div class="marker__form-inputs">
              <TextareaComponent
                @handleSubmit="submitMarker"
                @textareaInput="textareaInput"
                :placeholder="'Ответить'"
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
    position: absolute;
    //left: 150%;
    left: 40px;
    top: -5px;
    width: 280px;
    box-shadow: 0 0 10px rgb(0 0 0 / 10%);
    border-radius: 6px;
    //background-color: rgba(255, 255, 255, 0.5);
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
      margin-bottom: 10px;
    }
    &-title {
      font-weight: 600;
      font-size: 14px;
    }
    &-close {
      cursor: pointer;
    }
    &-middle {
      display: flex;
      flex-direction: column;
    }
    &-comments {
      margin-bottom: 10px;
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
  }),
  props: ["marker"],
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
    comments() {
      const comments = [
        {
          user: this.marker.authorId,
          text: this.marker.firstComment,
          created: this.marker.created,
        },
      ];
      comments.push(
        ...this.$store.getters.getCommentsById(this.marker.id).content
      );
      return comments;
    },
  },
  methods: {
    handleClick() {
      this.opened = true;
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
    changeSelect(user) {
      this.sendTo = user;
    },
    textareaInput(comment) {
      this.comment = comment;
    },
  },
};
</script>
