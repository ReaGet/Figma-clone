<template>
  <div
    class="sidebar-marker"
    :class="{ opened: marker.opened }"
    @click.stop="handleClick"
  >
    <UserInfo :user="author" />
    <div class="sidebar-marker__info">
      <div class="sidebar-marker__title">{{ this.marker.title }}</div>
      <div class="sidebar-marker__date">{{ date }}</div>
    </div>
    <div class="sidebar-marker__content">
      <div class="sidebar-marker__first">{{ firstComment }}</div>
      <div class="sidebar-marker__comments" v-if="expanded">
        <CommentComponent
          v-for="comment in comments.slice(0, count)"
          :key="comment.commentId"
          :comment="comment"
          :controls="false"
        />
        <div
          class="sidebar-marker__comments-more"
          @click.stop="showMore"
          v-if="count < comments.length"
        >
          Показать еще
        </div>
      </div>
    </div>
    <div
      class="sidebar-marker__footer"
      v-if="users.length > 1 || marker.commentsCount > 1"
      @click.stop="toggleComments"
    >
      <div class="sidebar-marker__footer-users" v-if="users.length > 1">
        <UserLogo v-for="user in users" :key="user.id" :user="user" />
      </div>
      <div
        class="sidebar-marker__footer-comments"
        v-if="marker.commentsCount > 1 && !expanded"
      >
        {{ commentsCount }}
      </div>
      <div class="sidebar-marker__footer-comments" v-else>Скрыть</div>
      <i class="sidebar-marker__footer-icon" :class="{ expanded: expanded }">
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
    background-color: #fafdfd;
  }
  & + & {
    margin-top: 15px;
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
    .comment {
      .comment__content {
        font-size: 12px;
      }
    }
  }
  &__first {
    text-align: left;
    font-size: 12px;
    color: rgba(0, 0, 0, 0.9);
    line-height: 1.2em;
    word-break: break-word;
  }
  &__comments {
    margin-top: 20px;
    &-more {
      font-size: 14px;
      margin-top: 10px;
      color: #888;
    }
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
      &.expanded {
        transform: rotateZ(180deg);
      }
    }
  }
}
</style>

<script>
import UserInfo from "@/components/user/UserInfo.vue";
import UserLogo from "@/components/user/UserLogo.vue";
import dateMixin from "@/mixins/dateMixin";
import textMixin from "@/mixins/textMixin";
import CommentComponent from "@/components/CommentComponent.vue";
export default {
  components: { CommentComponent, UserInfo, UserLogo },
  props: ["marker"],
  mixins: [dateMixin, textMixin],
  data: () => ({
    expanded: false,
    count: 0,
    step: 5,
  }),
  mounted() {
    this.count = this.step;
  },
  computed: {
    date() {
      return this.dateFilter(this.marker.created);
    },
    commentsCount() {
      return `ответов ${this.marker.commentsCount}`;
    },
    author() {
      return this.$store.getters.users.find(
        (user) => user.id == this.marker.authorId
      );
    },
    users() {
      return this.$store.getters.users.filter((user) =>
        this.marker?.users?.includes(user.id)
      );
    },
    comments() {
      return (
        this.$store.getters.getCommentsById(this.marker.markerId)?.slice(1) ||
        []
      );
    },
    firstComment() {
      return (
        (this.marker.firstComment &&
          this.substring(this.marker.firstComment, 91)) ||
        ""
      );
    },
  },
  methods: {
    async handleClick() {
      if (this.marker.opened) {
        return;
      }
      if (!this.isCreating) {
        await this.$store.dispatch("loadComments", this.marker.markerId);
      }
      this.$emit("markerClick", this.marker);
    },
    async toggleComments() {
      if (!this.isCreating && !this.expanded) {
        await this.$store.dispatch("loadComments", this.marker.markerId);
      }
      this.expanded = !this.expanded;
      if (!this.expanded) {
        this.count = this.step;
      }
    },
    showMore() {
      this.count += this.step;
    },
  },
};
</script>
