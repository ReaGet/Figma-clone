<template>
  <div class="user__logo" :style="{ 'background-color': computeLogoColor }">
    <img v-if="image" src="#" alt="logo" class="user__logo-image" />
    <span v-else class="user__logo-letter">{{ letter }}</span>
  </div>
</template>

<style lang="scss">
.user {
  display: flex;
  align-items: center;
  &__logo {
    flex-shrink: 0;
    border-radius: 50%;
    overflow: hidden;
    background-color: red;
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
    &-letter {
      color: #fff;
    }
  }
}
</style>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: () => ({
        image: null,
        name: "User unnamed",
      }),
    },
  },
  data: () => ({
    logoColor: "#333",
  }),
  computed: {
    computeLogoColor() {
      const hue =
        this.data.name.split("").reduce((sum, l) => {
          return sum + l.charCodeAt(0);
        }, 0) % 360;
      const hsl = `hsl(${hue}, 65%, 66%)`;
      return hsl;
    },
    letter() {
      return this.data.name.charAt(0).toUpperCase();
    },
    image() {
      return this.data.image;
    },
  },
};
</script>
