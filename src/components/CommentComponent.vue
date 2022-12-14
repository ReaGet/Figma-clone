<template>
  <div class="comment" :class="{ editing: editing }">
    <div class="comment__info">
      <UserInfo :user="user" />
      <div class="comment__date">{{ dateFilter(comment.created) }}</div>
    </div>
    <div class="comment__content" v-if="!editing">{{ comment.text }}</div>
    <form class="marker__form-inputs" v-else>
      <TextareaComponent @handleSubmit="submitForm" :placeholder="'Ответить'" />
      <button class="marker__form-button">
        <IconComponent :name="'send'" />
      </button>
    </form>
    <IconComponent
      :name="'pencil'"
      :color="'#000'"
      :width="16"
      :height="16"
      @click="handleEditClick"
      v-if="can('editComment')"
    />
  </div>
</template>

<style lang="scss">
.comment {
  position: relative;
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
    word-break: break-word;
  }
  .marker__form-inputs {
    margin-top: 10px;
  }
  .pencil {
    display: none;
    position: absolute;
    cursor: pointer;
    bottom: 0;
    right: 0;
  }
  &:not(.editing):hover {
    .pencil {
      display: block;
    }
  }
}
</style>

<script>
import UserInfo from "@/components/UserInfo";
import dateMixin from "@/mixins/dateMixin";
import IconComponent from "@/components/ui/IconComponent";
import TextareaComponent from "@/components/ui/TextareaComponent";

export default {
  components: { IconComponent, UserInfo, TextareaComponent },
  mixins: [dateMixin],
  props: ["comment"],
  data: () => ({
    editing: false,
  }),
  mounted() {},
  computed: {
    user() {
      const user = this.$store.getters.users.find(
        (user) => user.id === this.comment.authorId
      );
      return user || {};
    },
  },
  methods: {
    submitForm(comment) {
      console.log(comment);
    },
    handleEditClick() {
      this.editing = true;
      console.log(this.comment);
    },
    can(perm) {
      return this.$store.getters.can(perm);
    },
  },
};
</script>
