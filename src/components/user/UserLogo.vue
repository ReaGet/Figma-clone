<template>
  <div class="user__logo" :style="{ 'background-color': computeLogoColor }">
    <img v-if="image" src="#" alt="logo" class="user__logo-image" />
    <span v-else class="user__logo-letter">{{ letter }}</span>
  </div>
</template>

<style lang="scss">
.user {
  &__logo {
    flex-shrink: 0;
    border-radius: 50%;
    overflow: hidden;
    background-color: red;
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1rem;
    line-height: 1rem;
    &-letter {
      color: #fff;
    }
  }
}
</style>

<script>
export default {
  props: ["user"],
  data: () => ({
    logoColor: "#fff",
  }),
  mounted() {},
  computed: {
    computeLogoColor() {
      if (!this.user) {
        return this.logoColor;
      }
      const hue =
        this.name.split("").reduce((sum, l) => {
          return sum + l.charCodeAt(0);
        }, 0) % 360;
      const hsl = `hsl(${hue}, 65%, 66%)`;
      return hsl;
    },
    letter() {
      return this.name.charAt(0).toUpperCase();
    },
    image() {
      return this.user?.image;
    },
    name() {
      return this.user?.name || "";
    },
  },
};
</script>
