<template>
  <div class="marker" :style="position" @click.stop="handleClick">
    <UserLogo :user="user" v-if="!isCreating" />
    <form @submit.prevent="submitMarker" class="marker__form" v-if="isCreating">
      <div class="marker__form-wrapper">
        <div class="marker__form-top">
          <span class="marker__form-title">Ваш комментарий</span>
          <div class="marker__form-close" @click="cancelMarker">&#10006;</div>
        </div>
        <TextareaComponent @handleSubmit="handleTextareaSubmit" />
      </div>
    </form>
  </div>
</template>

<style lang="scss">
.marker {
  position: absolute;
  border: 4px solid #fff;
  border-radius: 50%;
  cursor: pointer;
  width: 38px;
  height: 38px;
  background-color: #fff;
  box-shadow: 0 0 10px rgb(0 0 0 / 10%);
  &::after {
    content: "";
    position: absolute;
    width: 0;
    height: 0;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-top: 10px solid #fff;
    left: -8px;
    bottom: -7px;
    transform: rotateZ(37deg);
  }
  &:hover {
    border-color: #e0e0e0;
    &::after {
      border-top-color: #e0e0e0;
    }
  }
  &__form {
    z-index: 11;
    position: absolute;
    left: 150%;
    top: -5px;
    box-shadow: 0 0 10px rgb(0 0 0 / 10%);
    border-radius: 6px;
    overflow: hidden;
    &-wrapper {
      background-color: rgba(255, 255, 255, 0.3);
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
  }
}
</style>

<script>
import UserLogo from "@/components/UserLogo.vue";
import TextareaComponent from "@/components/ui/TextareaComponent.vue";

export default {
  components: { UserLogo, TextareaComponent },
  props: ["marker"],
  computed: {
    user() {
      return this.$store.getters.users.find(
        (user) => this.marker.authorId === user.id
      );
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
      this.$emit("submitMarker", this.comment);
    },
    handleTextareaSubmit(comment) {
      console.log(23);
      this.$emit("submitMarker", comment);
    },
    cancelMarker() {
      this.$emit("cancelMarker");
    },
  },
};
</script>
