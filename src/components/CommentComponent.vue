<template>
  <div class="comment">
    <div class="comment__info">
      <UserInfo :user="comment.user" />
      <div class="comment__date">{{ comment.date }}</div>
    </div>
    <div class="comment__content">{{ comment.text }}</div>
  </div>
</template>

<style lang="scss">
.comment {
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
    padding-left: 45px;
    font-size: 0.9rem;
  }
}
</style>

<script>
import UserInfo from "@/components/UserInfo";
export default {
  components: { UserInfo },
  props: ["comment"],
  mounted() {},
  computed: {
    user() {
      const user = this.$store.getters.users.find(
        (user) => user.id === this.comment.user
      );
      console.log(user);
      return user;
    },
  },
};
</script>
