<template>
  <div class="comment">
    <div class="comment__info">
      <UserInfo :user="user" />
      <div class="comment__date">{{ dateFilter(comment.created) }}</div>
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
    //padding-left: 29px;
    padding-top: 10px;
    font-size: 0.9rem;
    color: #555555;
  }
}
</style>

<script>
import UserInfo from "@/components/UserInfo";
import dateMixin from "@/mixins/dateMixin";
export default {
  components: { UserInfo },
  mixins: [dateMixin],
  props: ["comment"],
  mounted() {
    console.log(this.comment);
  },
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
