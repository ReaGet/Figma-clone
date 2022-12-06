<template>
  <div class="sidebar-marker">
    <UserInfo :user="author" />
    <div class="sidebar-marker__info">
      <div class="sidebar-marker__title">{{ title }}</div>
      <div class="sidebar-marker__date">{{ date }}</div>
    </div>
    <div class="sidebar-marker__content">{{ marker.firstComment }}</div>
    <div class="sidebar-marker__footer" v-if="users.length > 1">
      <div class="sidebar-marker__footer-users">
        <UserLogo v-for="user in users" :key="user.id" :user="user" />
      </div>
      <div class="sidebar-marker__footer-comments"></div>
      <i class="sidebar-marker__footer-icon">
        <svg
          width="24px"
          height="24px"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M9.46967 5.46967C9.76256 5.17678 10.2374 5.17678 10.5303 5.46967L16.5303 11.4697C16.8232 11.7626 16.8232 12.2374 16.5303 12.5303L10.5303 18.5303C10.2374 18.8232 9.76256 18.8232 9.46967 18.5303C9.17678 18.2374 9.17678 17.7626 9.46967 17.4697L14.9393 12L9.46967 6.53033C9.17678 6.23744 9.17678 5.76256 9.46967 5.46967Z"
            fill="#030D45"
          />
        </svg>
      </i>
    </div>
  </div>
</template>

<style lang="scss">
$border-radius: 6px;
.sidebar-marker {
  background-color: #fff;
  padding: 10px 15px;
  border-radius: $border-radius;
  cursor: pointer;
  &:hover {
    opacity: 0.9;
  }
  & + & {
    margin-top: 15px;
  }
  .user__title {
    font-size: 0.9rem;
  }
  &__info {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: nowrap;
    color: #c0c0c0;
    padding: 10px 0;
    font-size: 0.7rem;
  }
  &__content {
    text-align: left;
    font-size: 12px;
    color: rgba(0, 0, 0, 0.9);
    line-height: 1.2em;
  }
  &__footer {
    background-color: #f5f5f5;
    padding: 5px;
    border-radius: $border-radius;
    margin-top: 10px;
    display: flex;
    align-items: center;
    &:hover {
      background-color: #f0f0f0;
      cursor: pointer;
    }

    &-users {
      //background-color: red;
      position: relative;
      display: flex;

      .user__logo {
        width: 20px;
        height: 20px;
        font-size: 0.9rem;

        & + .user__logo {
          margin-left: -5px;
        }
      }
    }

    &-comments {
      font-size: 0.9rem;
      margin-left: 10px;
      color: #a0a0a0;
    }

    &-icon {
      display: flex;
      margin-left: auto;
    }
  }
}
</style>

<script>
import UserInfo from "@/components/UserInfo";
import UserLogo from "@/components/UserLogo.vue";
export default {
  components: { UserInfo, UserLogo },
  props: ["marker"],
  mounted() {},
  computed: {
    date() {
      return this.marker.date || "dd-mm-yyyy";
    },
    text() {
      return (
        this.marker.text ||
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda beatae, doloremque fuga minima repellat tenetur. Doloremque eius et eum fugit itaque iure magnam placeat quos recusandae, velit! Hic, labore suscipit?"
      );
    },
    comments() {
      return [];
    },
    commentsCount() {
      return `${this.comments.length} ответ`;
    },
    title() {
      return this.marker.title;
    },
    author() {
      return this.$store.getters.users.find(
        (user) => user.id === this.marker.authorId
      );
    },
    users() {
      return this.$store.getters.users.filter((user) =>
        this.marker.users.includes(user.id)
      );
    },
  },
};
</script>
