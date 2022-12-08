<template>
  <div class="user">
    <UserLogo :user="user" />
    <div class="user__title">
      <div class="user__name">{{ user.name }}</div>
      <div class="user__who" v-if="user.id === currentId">(Вы)</div>
    </div>
  </div>
</template>

<style lang="scss">
.user {
  display: flex;
  align-items: center;
  width: 100%;
  &__title {
    display: flex;
    flex-wrap: nowrap;
    padding: 0 5px;
    overflow: hidden;
    font-size: 0.9rem;
  }
  &__name {
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  &__who {
    margin-left: 10px;
    color: #919191;
  }
}
</style>

<script>
import UserLogo from "@/components/UserLogo";
export default {
  components: { UserLogo },
  props: ["user"],
  async mounted() {
    // console.log(this.$store.getters.users);
    // console.log(await this.$store.dispatch("getUserById", 1));
    // console.log(this.user);
    console.log();
  },
  computed: {
    currentId() {
      return this.$store.getters.currentId;
    },
  },
};
</script>
