<template>
  <div class="user">
    <UserLogo :user="user" />
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
  props: ["user"],
  data: () => ({
    logoColor: "#333",
  }),
  mounted() {},
  computed: {
    name() {
      return this.user.name;
    },
    isItMe() {
      return this.user.isItMe;
    },
    image() {
      return this.user.image;
    },
  },
};
</script>
