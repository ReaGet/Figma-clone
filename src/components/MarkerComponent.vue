<template>
  <div
    class="marker"
    :class="{ creating: isCreating }"
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
        v-if="isCreating"
      >
        <div class="marker__form-wrapper">
          <div class="marker__form-top">
            <span class="marker__form-title">Ваш комментарий</span>
            <div class="marker__form-close" @click="$emit('cancelMarker')">
              &#10006;
            </div>
          </div>
          <TextareaComponent
            @handleSubmit="submitMarker"
            @textareaInput="textareaInput"
          />
          <div class="marker__form-bottom">
            <div class="marker__form-users">
              <UserSelectComponent
                :label="'Кому'"
                :options="users"
                :default="0"
                @input="changeSelect"
              />
            </div>
            <button class="marker__form-button">
              <svg
                width="28px"
                height="28px"
                viewBox="0 0 28 28"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                fill="#fff"
              >
                <path
                  d="M3.78963301,2.77233335 L24.8609339,12.8499121 C25.4837277,13.1477699 25.7471402,13.8941055 25.4492823,14.5168992 C25.326107,14.7744476 25.1184823,14.9820723 24.8609339,15.1052476 L3.78963301,25.1828263 C3.16683929,25.4806842 2.42050372,25.2172716 2.12264586,24.5944779 C1.99321184,24.3238431 1.96542524,24.015685 2.04435886,23.7262618 L4.15190935,15.9983421 C4.204709,15.8047375 4.36814355,15.6614577 4.56699265,15.634447 L14.7775879,14.2474874 C14.8655834,14.2349166 14.938494,14.177091 14.9721837,14.0981464 L14.9897199,14.0353553 C15.0064567,13.9181981 14.9390703,13.8084248 14.8334007,13.7671556 L14.7775879,13.7525126 L4.57894108,12.3655968 C4.38011873,12.3385589 4.21671819,12.1952832 4.16392965,12.0016992 L2.04435886,4.22889788 C1.8627142,3.56286745 2.25538645,2.87569101 2.92141688,2.69404635 C3.21084015,2.61511273 3.51899823,2.64289932 3.78963301,2.77233335 Z"
                ></path>
              </svg>
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
  &:not(.creating):hover {
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
    left: 150%;
    top: -5px;
    box-shadow: 0 0 10px rgb(0 0 0 / 10%);
    border-radius: 6px;
    background-color: rgba(255, 255, 255, 0.5);
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

export default {
  components: {
    UserSelectComponent,
    UserLogo,
    TextareaComponent,
  },
  data: () => ({
    comment: "",
    sendTo: null,
  }),
  props: ["marker"],
  computed: {
    user() {
      return this.$store.getters.users.find(
        (user) => this.marker.authorId === user.id
      );
    },
    userName() {
      return this.user?.name || "";
    },
    users() {
      const $users = [{ id: -1, name: "Выберите значение" }];
      this.$store.getters.users.forEach((user) => {
        if (user.id !== this.$store.getters.currentId) {
          $users.push(user);
        }
      });
      return $users;
    },
    position() {
      const { x, y } = this.marker.position;
      return `top: ${y}px; left: ${x}px;`;
    },
    state() {
      return this.marker.state;
    },
    isCreating() {
      return this.marker.isCreating || false;
    },
  },
  methods: {
    handleClick() {
      this.$emit("markerClick", this.marker);
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
