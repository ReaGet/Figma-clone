<template>
  <div class="user">
    <UserLogo :data="data" />
    <div class="user__title">
      <div class="user__name">{{ name }}</div>
      <div v-if="isItMe" class="user__who">(Вы)</div>
    </div>
  </div>
</template>

<style lang="scss">
.user {
  display: flex;
  align-items: center;
  &__title {
    display: flex;
    flex-wrap: nowrap;
    padding: 0 5px;
  }
  &__who {
    margin-left: 10px;
    color: #d0d0d0;
  }
}
</style>

<script>
import UserLogo from "@/components/UserLogo";
export default {
  components: { UserLogo },
  props: {
    data: {
      type: Object,
      default: () => ({
        image: null,
        name: "User unnamed",
        isItMe: false,
      }),
    },
  },
  data: () => ({
    logoColor: "#333",
  }),
  async mounted() {
    // console.log(this.$store.getters.users);
    // console.log(await this.$store.dispatch("getUserById", 1));
    console.log(2);
  },
  computed: {
    computeLogoColor() {
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
    name() {
      return this.data.name;
    },
    isItMe() {
      return this.data.isItMe;
    },
    image() {
      return this.data.image;
    },
  },
};
</script>
