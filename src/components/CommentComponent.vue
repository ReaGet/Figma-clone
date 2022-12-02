<template>
  <div class="marker">
    <div class="comment__info">
      <UserInfo :data="data.user" />
      <div class="comment__date">{{ date }}</div>
    </div>
    <div class="comment__content">{{ text }}</div>
  </div>
</template>

<style lang="scss">
.marker {
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
  props: {
    data: {
      type: Object,
      default: () => ({
        user: null,
        date: "dd-mm-yyyy",
        text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda beatae, doloremque fuga minima repellat tenetur. Doloremque eius et eum fugit itaque iure magnam placeat quos recusandae, velit! Hic, labore suscipit?",
      }),
    },
  },
  mounted() {},
  computed: {
    date() {
      console.log(this.data);
      return this.data.date || "dd-mm-yyyy";
    },
    text() {
      return (
        this.data.text ||
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda beatae, doloremque fuga minima repellat tenetur. Doloremque eius et eum fugit itaque iure magnam placeat quos recusandae, velit! Hic, labore suscipit?"
      );
    },
  },
};
</script>
